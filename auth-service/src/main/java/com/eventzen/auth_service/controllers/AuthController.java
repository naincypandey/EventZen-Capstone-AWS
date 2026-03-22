package com.eventzen.auth_service.controllers;

import com.eventzen.auth_service.entities.User;
import com.eventzen.auth_service.repositories.UserRepository;
import com.eventzen.auth_service.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
// We use "*" to allow everything, but adding the specific port helps "noob" errors
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private BCryptPasswordEncoder encoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        System.out.println("Registration request received for: " + user.getUsername());
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);
            return "User Registered Successfully!";
        } catch (Exception e) {
            System.out.println("Error saving user: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        // 1. Find user by username
        User dbUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check Password (Case sensitive!)
        if (encoder.matches(user.getPassword(), dbUser.getPassword())) {
            String token = jwtUtils.generateToken(dbUser.getUsername());

            // 3. Logging the role
            System.out.println("User " + dbUser.getUsername() + " logged in with role: " + dbUser.getRole());

            return Map.of(
                    "token", token,
                    "role", dbUser.getRole(), // This will be 'ROLE_USER' or 'ADMIN'
                    "username", dbUser.getUsername()
            );
        }
        throw new RuntimeException("Invalid Credentials");
    }
}