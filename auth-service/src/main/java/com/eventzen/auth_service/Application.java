package com.eventzen.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// This line ensures Spring looks into the .security folder for your config
@ComponentScan(basePackages = {"com.eventzen.auth_service"})
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}