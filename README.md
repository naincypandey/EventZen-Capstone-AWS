EventZen – Polyglot Microservices Event Management System

Capstone Project | Developed by: NAINCY PANDEY

In Association with: Deloitte
________________________________________

Overview

EventZen is a scalable, multi-tier event management platform built using a polyglot microservices architecture. It streamlines venue infrastructure management, 
secure user authentication, and attendee registration through three specialized backend services integrated via a unified Nginx Gateway.
________________________________________

 System Architecture & Tech Stack

•Frontend: ReactJS (Vite, Tailwind CSS, Axios)

•	Auth Service (Java): Spring Boot handles secure JWT-based authentication and RBAC.

•	Venue Service (.NET): ASP.NET Core manages venue infrastructure and availability logic.

•	Attendee Service (Node.js): Express.js processes event bookings and ticket metadata.

•	Databases: Hybrid model using MySQL (Relational) and MongoDB Atlas (NoSQL).

•	Reverse Proxy: Nginx handles request routing and security as an API Gateway.
________________________________________

 Method 1: Hosting on AWS (Self-Hosted)

This method describes deploying the containerized application on an AWS EC2 instance.
System Requirements

•	EC2 Instance: t3.medium recommended (Minimum 4GB RAM).

•	OS: Amazon Linux 2023.

•	Security Groups: Allow inbound TCP ports: 80 (Nginx), 5173 (Frontend), 8080 (Auth), 5059 (Venue), and 22 (SSH).
Deployment Steps

Step 1: Install Prerequisites



sudo yum update -y

sudo yum install docker git -y

sudo systemctl start docker

sudo usermod -a -G docker ec2-user

 Log out and log back in for group changes to take effect

Step 2: Clone the Repository



git clone https://github.com/naincypandey/EventZen-Capstone-AWS

cd EventZen-Capstone-AWS

Step 3: Handle Docker Buildx Requirements

If the deployment fails with compose build requires buildx 0.17.0 or later, run the following commands to install the required plugins:



mkdir -p ~/.docker/cli-plugins

curl -SL https://github.com/docker/buildx/releases/download/v0.17.0/buildx-v0.17.0.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx chmod +x ~/.docker/cli-plugins/docker-buildx

Step 4: Launch the Microservices



docker-compose up --build -d

Step 5: Access Application

Open your browser and navigate to:

http://[YOUR-EC2-PUBLIC-IP]:5173

________________________________________

Method 2: Running Locally (via Docker)

System Requirements

•	Docker Desktop (with Docker Compose installed).

•	Available Ports: 80, 5173, 8080, 5059, 5001.

Steps to Run

1.	Clone the Repo: git clone [Repo-Link]

2.	Navigate to Directory: cd EventZen-Capstone-AWS

3.	Deploy: docker-compose up --build -d

4.	Access UI: http://localhost:5173

________________________________________

 Database Initialization

The MySQL container initializes the necessary schemas on startup. To populate baseline baseline data:

1.	Access the MySQL container or use MySQL Workbench.

2.	Run scripts located in the /database directory.

3.	MongoDB Atlas: Ensure your cluster connection string is correctly configured in the docker-compose.yml or .env file.

________________________________________

 Key API Endpoints


Service	Endpoint	Method	Purpose

Auth	/api/auth/login	POST	Authenticate & get JWT

Auth	/api/auth/register	POST	Register new User/Admin

Venue	/api/venue	GET/POST	Manage Venue Infrastructure

Booking	/api/booking	POST	Process Event Registrations

________________________________________

 Deployment Evidence

The system utilizes a 6-container architecture managed via Docker Compose.

•	Container Status: Verified 11/11 units active.

•	Gateway: Nginx routing verified for all microservices.

________________________________________

