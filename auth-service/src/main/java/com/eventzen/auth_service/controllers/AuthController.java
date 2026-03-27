package com.eventzen.auth_service.controllers;

import com.eventzen.auth_service.entities.User;
import com.eventzen.auth_service.repositories.UserRepository;
import com.eventzen.auth_service.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth") // FIXED: Matches the /api/auth path from your logs
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("Registration request received for: " + user.getUsername());
        try {
            // Check if user already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username already taken!"));
            }

            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User Registered Successfully!"));
        } catch (Exception e) {
            System.err.println("Error saving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Login attempt for: " + user.getUsername());
        try {
            // 1. Find user
            User dbUser = userRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2. Check Password
            if (encoder.matches(user.getPassword(), dbUser.getPassword())) {
                String token = jwtUtils.generateToken(dbUser.getUsername());

                System.out.println("User " + dbUser.getUsername() + " logged in as: " + dbUser.getRole());

                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "role", dbUser.getRole(),
                        "username", dbUser.getUsername()
                ));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Credentials"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}