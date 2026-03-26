
EventZen – Microservices Event Management System

Capstone Project | Developed by: NAINCY PANDEY

In Association with: Deloitte
________________________________________
Overview

EventZen is a scalable, multi-tier event management platform built using a microservices architecture. It streamlines event planning, venue management, and attendee registrations through three specialized backend services.
________________________________________
System Architecture & Tech Stack

Frontend: ReactJS (Vite, Tailwind CSS, Axios)

Auth Service (Java): Spring Boot handles user/admin authentication and role-based access.

Venue Service (.NET): ASP.NET Core manages venue infrastructure (CRUD operations).

Attendee Service (Node.js): Express.js processes event bookings and ticket logic.

Database: MySQL for persistent data integrity.

Reverse Proxy: Nginx handles routing and security as a gateway.
________________________________________
Method 1: Running Locally (via Docker)

System Requirements

Docker Desktop (with Docker Compose installed)

Ports Available:

80 (Nginx)
5173 (Frontend)
8080 (Auth Service)
5059 (Venue Service)
5001 (Attendee Service)
________________________________________
Steps to Run

Step 1: Clone the Repository

git clone [Your-Repo-Link-Here]
cd EventZen-Capstone-AWS

Step 2: Launch Services

docker-compose up --build -d

Step 3: Access the Application

Frontend UI
http://localhost:5173

Unified API Gateway
http://localhost:80
________________________________________
Method 2: Hosting on AWS (Self-Hosted)

System Requirements
EC2 Instance
t3.medium recommended (minimum 4GB RAM)
Storage
Minimum 20GB EBS Volume

Security Groups
Allow inbound TCP ports:
80 (HTTP)
5173 (Frontend)
22 (SSH)
________________________________________
Deployment Steps

Step 1: Install Prerequisites

sudo yum update -y

sudo yum install docker git -y

sudo systemctl start docker

sudo usermod -a -G docker ec2-user

Step 2: Clone and Deploy

git clone [Repo-Link-Here]

cd EventZen-Capstone-AWS

sudo /usr/local/bin/docker-compose up --build -d

Step 3: Access Application

Open in browser:
http://[YOUR-EC2-PUBLIC-IP]:5173
________________________________________
Database Initialization

The MySQL container initializes an empty database on startup.

To populate baseline data (Users and Venues):

Step 1
Open MySQL Workbench or access the MySQL container

Step 2
Run SQL scripts from:
/database
Or follow schema from the ER Diagram.
________________________________________
Key Endpoints

Auth APIs

/api/auth/login

/api/auth/register

Venue APIs

/api/venue

GET

POST

PUT

Booking APIs

/api/booking

POST

________________________________________

