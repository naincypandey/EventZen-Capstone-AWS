package com.eventzen.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.eventzen") // This forces Spring to find the .security package
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}