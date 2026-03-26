package com.eventzen.auth_service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF for microservices/Swagger
                .csrf(csrf -> csrf.disable())

                // 2. Enable CORS (Required for cross-origin browser requests)
                .cors(Customizer.withDefaults())

                // 3. Set up Authorization
                .authorizeHttpRequests(auth -> auth
                        // Public Auth Endpoints
                        .requestMatchers("/auth/**").permitAll()

                        // Public Swagger & API Docs
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resource/**",
                                "/webjars/**"
                        ).permitAll()

                        // Everything else secured
                        .anyRequest().authenticated()
                )

                // 4. Handle Frame Options for Swagger UI
                .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    // CORS Configuration to allow requests from any origin (helpful for dev/testing)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}