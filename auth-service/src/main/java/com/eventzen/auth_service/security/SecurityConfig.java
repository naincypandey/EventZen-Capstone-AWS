package com.eventzen.auth_service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Password encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Security filter chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF (Swagger won't work with CSRF enabled)
                .csrf(csrf -> csrf.disable())

                // Authorize requests
                .authorizeHttpRequests(auth -> auth

                        // Auth endpoints are public
                        .requestMatchers("/auth/**").permitAll()

                        // Swagger & API docs public
                        .requestMatchers(
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-ui/index.html"
                        ).permitAll()

                        // Any other requests need authentication
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}