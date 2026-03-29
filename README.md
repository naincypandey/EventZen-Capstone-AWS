
-----

# EventZen – Polyglot Microservices Event Management System

**Capstone Project | Developed by: NAINCY PANDEY**  
**In Association with: Deloitte**

This repository contains a scalable, multi-tier event management platform built using a polyglot microservices architecture. It demonstrates the integration of **Java (Spring Boot)**, **.NET 8**, and **Node.js** services.

-----

##  System Architecture & Tech Stack

  * **Frontend:** ReactJS (Vite, Tailwind CSS, Axios)
  * **Auth Service (Java):** Spring Boot handles secure JWT-based authentication and RBAC.
  * **Venue Service (.NET):** ASP.NET Core manages venue infrastructure and availability logic.
  * **Attendee Service (Node.js):** Express.js processes event bookings and ticket metadata.
  * **Databases:** Hybrid model using **MySQL** (Relational) and **MongoDB Atlas** (NoSQL).
  * **Reverse Proxy:** Nginx handles request routing and security as an API Gateway.

<img width="4156" height="2132" alt="Nginx Reverse Proxy-2026-03-28-093258" src="https://github.com/user-attachments/assets/e38fad44-36c3-48bc-ae90-6bb8484ed7fc" />


-----

##  Quick Start: AWS Deployment (Self-Hosted)

Follow these steps to deploy the full system on an Amazon Linux 2023 EC2 instance.

### 1\. Infrastructure Requirements

Before deploying, ensure your EC2 instance meets these specifications:

  * **Instance Type:** `t3.medium` (Minimum 4GB RAM required for building microservices).
  * **Storage:** 20GB EBS Volume (To accommodate Docker images and build layers).
  * **OS:** Amazon Linux 2023.

### 2\. Security Group Configuration (Inbound Rules)

Configure your AWS Security Group to allow traffic on the following ports:

  * **80 (HTTP):** Unified Nginx Gateway.
  * **5173:** Frontend UI access.
  * **8080:** Java Auth Service / Swagger UI.
  * **5059:** .NET Venue Service / Swagger UI.
  * **22 (SSH):** For remote terminal access.

### 3\. Install Prerequisites

```bash
sudo yum update -y
sudo yum install docker git -y
sudo systemctl start docker
sudo usermod -a -G docker ec2-user
```

*Note: Log out and log back in to apply group changes.*

### 4\. Setup Docker Buildx

```bash
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/buildx/releases/download/v0.17.0/buildx-v0.17.0.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
chmod +x ~/.docker/cli-plugins/docker-buildx
```

### 5\. Clone and Launch

```bash
git clone https://github.com/naincypandey/EventZen-Capstone-AWS
cd EventZen-Capstone-AWS
docker-compose up --build -d
```

-----

##  Quick Start: Local Development (Docker)

Choose this method to run the application on your local machine using Docker Desktop.

```bash
# Clone the repository
git clone https://github.com/naincypandey/EventZen-Capstone-AWS

# Navigate to the folder
cd EventZen-Capstone-AWS

# Start all microservices
docker-compose up --build -d
```

-----

## 🔗 Backend Expectations

  * **Auth Service (Java):** Expects a MySQL connection for JWT validation and user persistence.
  * **Venue Service (.NET):** Manages venue infrastructure and availability via REST APIs.
  * **Attendee Service (Node.js):** Connects to **MongoDB Atlas** for high-availability booking storage.

-----

##  Deployment Evidence

Once successfully deployed, the infrastructure should show all containers in a started/healthy state.

```bash
docker-compose ps
```

**Expected Output:** Verified 11/11 units active, including the Nginx Gateway and all 3 microservices.

-----

### **Evaluation URLs**

  * **Frontend UI:** `http://[YOUR-EC2-IP]:5173`
  * **Auth Swagger:** `http://[YOUR-EC2-IP]:8080/swagger-ui/index.html`
  * **Venue Swagger:** `
