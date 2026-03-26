package com.eventzen.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.eventzen.auth_service") // Force scan all sub-packages
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}