package com.eventzen.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.eventzen.auth_service")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}