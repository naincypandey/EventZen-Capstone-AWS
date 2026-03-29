
# EventZen – Polyglot Microservices Event Management System

**Capstone Project | Developed by: NAINCY PANDEY**  
**In Association with: Deloitte**

This repository contains a scalable, multi-tier event management platform built using a polyglot microservices architecture. It demonstrates the integration of **Java (Spring Boot)**, **.NET 8**, and **Node.js** services.

---

 Overview
EventZen is a scalable, multi-tier event management platform built using a polyglot microservices architecture. It streamlines venue infrastructure management, secure user authentication, and attendee registration through three specialized backend services integrated via a unified Nginx Gateway.

---

System Architecture & Tech Stack

Frontend: ReactJS (Vite, Tailwind CSS, Axios)

Auth Service (Java): Spring Boot handles secure JWT-based authentication and RBAC.

Venue Service (.NET): ASP.NET Core manages venue infrastructure and availability logic.

Attendee Service (Node.js): Express.js processes event bookings and ticket metadata.

Databases: Hybrid model using MySQL (Relational) and MongoDB Atlas (NoSQL).

Reverse Proxy: Nginx handles request routing and security as an API Gateway.

---


 System Architecture

EventZen follows a decoupled Microservices Architecture where each service is independently developed, containerized, and deployed:

Entry Point: An Nginx Reverse Proxy acts as the API Gateway, managing SSL termination (if applicable) and routing traffic based on URL path (e.g., /api/auth vs /api/booking).

Polyglot Logic:

Java Spring Boot: Handles high-security authentication and authorization logic.

ASP.NET Core 8: Manages performance-intensive venue infrastructure operations.

Node.js Express: Processes flexible, document-based attendee and booking logic.

Polyglot Persistence:

MySQL: Relational data integrity for users and venues.

MongoDB Atlas: Distributed cloud storage for dynamic booking records.

<img width="1024" height="525" alt="image" src="https://github.com/user-attachments/assets/ce95fb16-e544-4cea-b205-b9a75d5ad5db" />


---

##  Quick Start: AWS Deployment (Self-Hosted)
Follow these steps to deploy the full system on an Amazon Linux 2023 EC2 instance.

### 1. Install Prerequisites
```bash
sudo yum update -y
sudo yum install docker git -y
sudo systemctl start docker
sudo usermod -a -G docker ec2-user
```
*Note: Log out and log back in to apply group changes.*

### 2. Setup Docker Buildx
If your system requires Buildx 0.17.0+ for the build process:
```bash
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/buildx/releases/download/v0.17.0/buildx-v0.17.0.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
chmod +x ~/.docker/cli-plugins/docker-buildx
```

### 3. Clone and Launch
```bash
git clone https://github.com/naincypandey/EventZen-Capstone-AWS
cd EventZen-Capstone-AWS
docker-compose up --build -d
```

---

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

---

##  Common Requirements
*   **Docker & Docker Compose**
*   **AWS EC2 Instance:** `t3.medium` (minimum 4GB RAM)
*   **Security Groups:** Open ports `80`, `5173`, `8080`, and `5059`

---

## 🔗 Backend Expectations
*   **Auth Service (Java):** Expects a MySQL connection for JWT validation and user persistence.
*   **Venue Service (.NET):** Manages venue infrastructure and availability via REST APIs.
*   **Attendee Service (Node.js):** Connects to **MongoDB Atlas** for high-availability booking storage.

---

##  Deployment Evidence
Once successfully deployed, the infrastructure should show all containers in a started/healthy state.

```bash
docker-compose ps
```
**Expected Output:** Verified 11/11 units active, including the Nginx Gateway and all 3 microservices.

---

### **Evaluation URLs**
*   **Frontend UI:** `http://[IP-OR-LOCALHOST]:5173`
*   **Auth Swagger:** `http://[IP-OR-LOCALHOST]:8080/swagger-ui/index.html`
*   **Venue Swagger:** `

