package com.eventzen.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// Explicitly scan the base package to find SecurityConfig and AuthController
@ComponentScan(basePackages = "com.eventzen")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}