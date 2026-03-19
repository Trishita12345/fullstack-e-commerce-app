# Fullstack E-Commerce Platform

A **microservices-based e-commerce platform** with a modern frontend and scalable backend architecture.

This project includes:

* **Next.js frontend**
* **Spring Boot microservices**
* **Kafka messaging**
* **PostgreSQL database**
* **Docker-based infrastructure**
* **Nginx reverse proxy**
* **API Gateway architecture**

---

# Architecture Overview

```
Internet
   ↓
Nginx Reverse Proxy
   ↓
Next.js Frontend (Port 3000)
   ↓
Spring Cloud Gateway (Port 8080)
   ↓
Microservices
   ├── product-service
   ├── cart-service
   ├── order-service
   ├── payment-service
   ├── profile-service
   ├── offer-service
   └── search-engine-service
        ↓
Kafka + Databases
```

---

# Tech Stack

### Frontend

* Next.js 15+
* React
* TypeScript
* Mantine UI
* NextAuth

### Backend

* Spring Boot
* Spring Cloud Gateway
* Maven
* REST APIs

### Infrastructure

* Docker
* Docker Compose
* PostgreSQL
* Apache Kafka
* Nginx

---

# Remote Development Setup

This section explains how to **run the entire system on a remote development server**.

---

# 1. System Preparation

Update system packages.

```bash
sudo apt update && sudo apt upgrade -y
```

---

# 2. Install Git

```bash
sudo apt install git -y
git --version
```

---

# 3. Install Docker

```bash
curl -fsSL https://get.docker.com -o install-docker.sh
sudo sh install-docker.sh
```

Add your user to docker group.

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify installation.

```bash
docker --version
```

---

# 4. Install Docker Compose

```bash
sudo apt install docker-compose-plugin -y
docker compose version
```

---

# 5. Install Java (Spring Boot)

```bash
sudo apt install openjdk-21-jdk -y
java -version
```

---

# 6. Install Node.js

Using **NVM (Node Version Manager)**.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
```

Install Node.

```bash
nvm install 20
node -v
npm -v
```

---

# Project Structure

```
project-root
│
├── frontend/ecommerce
│
├── backend
│   ├── apiGatewayService
│   ├── cartService
│   ├── productService
│   ├── orderService
│   ├── paymentService
│   ├── profileService
│   ├── offerService
│   ├── searchEngineService
│   └── common-auth
│
├── kafka-setup
│
└── db_backup.sql
```

---

# Frontend Setup (Next.js)

Navigate to frontend.

```bash
cd frontend/ecommerce
```

Install dependencies.

```bash
npm install
```

---

# Create Environment File

Create `.env` file.

```
BETTER_AUTH_SECRET=11Iyv9ssbui5XjV2mDItRRleRgPEw1au
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND=http://localhost:3000

DATABASE_URL=postgresql://user:pass123@127.0.0.1:5432/testdb

GOOGLE_CLIENT_SECRET=XXXXXXXXXX
GOOGLE_CLIENT_ID=XXXXXXXXXXXX

NEXT_PUBLIC_API_URL=https://api.loomandlume.shop/api
```

---

# Start Database (Docker)

Run database container.

```bash
docker compose up -d
```

Verify container.

```bash
docker ps
```

---

# Prisma Setup

Generate Prisma client.

```bash
npx prisma generate
```

Push schema to database.

```bash
npx prisma db push
```

Optional: Open Prisma Studio.

```bash
npx prisma studio
```

---

# Run Frontend

```bash
npm run dev
```

Application will run at:

```
http://localhost:3000
```

---

# Kafka Setup

Navigate to Kafka directory.

```bash
cd kafka-setup
```

Start Kafka services.

```bash
docker compose up -d
```

Verify Kafka container.

```bash
docker ps | grep kafka
```

---

# Backend Microservices

Each microservice can be started independently.

# Install Maven

```bash 
sudo apt install maven -y
```

Proceed to follow **shell.md** for each microservice run in background.

## Common-Auth

first build common auth library

```bash 
cd backend/common-auth/
mvn clean install
```

---

## API Gateway

```bash
cd backend/apiGatewayService
mvn clean install

mvn spring-boot:run 
or
nohup mvn spring-boot:run > /dev/null 2>&1 &
sudo ss -ltnp | grep :8080
```

Runs on

```
https://api.loomandlume.shop
```

---

## Product Service

```bash
cd backend/productService
docker compose up -d
```
---


# Database Restore (Optional)

If you have database backup.

```bash
docker exec -i <postgres-container-name> psql -U <username> -d <database> < db_backup.sql
```

Example:

```bash
docker exec -i product_service_postgres_container psql -U user -d product_db < db_backup.sql
```
```bash 
mvn clean install
mvn spring-boot:run
or
nohup mvn spring-boot:run > /dev/null 2>&1 &
sudo ss -ltnp | grep :8081
```

---

## Cart Service

```bash
cd backend/cartService
docker compose up -d
mvn clean install
mvn spring-boot:run
or

nohup mvn spring-boot:run > /dev/null 2>&1 &
sudo ss -ltnp | grep :8082
```

---

## Other Services

Repeat same pattern.

```
orderService - 8084
paymentService - 8086
profileService - 8083
offerService - 8085
searchEngineService - 8087
```

Example:

```bash
cd backend/orderService
docker compose up -d
mvn clean install
mvn spring-boot:run
```

---

# Running the Entire System

Final running services.

```
Frontend → https://loomandlume.shop
API Gateway → https://api.loomandlume.shop
Kafka → Docker
Databases → Docker
```

Frontend calls backend using:

```
NEXT_PUBLIC_API_URL=https://api.loomandlume.shop/api
```

---

# Useful Development Commands

Start frontend

```bash
npm run dev
```

Build frontend

```bash
npm run build
```

Run production server

```bash
npm start
```

---

# Troubleshooting

## Docker Containers

Check running containers.

```bash
docker ps
```

View logs.

```bash
docker logs <container_name>
```

---

## Prisma Issues

Clear Prisma cache.

```bash
rm -rf node_modules/.prisma
npx prisma generate
```

---

## Dependency Issues

Reset dependencies.

```bash
rm -rf node_modules package-lock.json
npm install
```

---

# Development Tips

* Use **Prisma Studio** for database inspection
* Use **Swagger UI** for API testing
* Run services in **separate terminals**
* Use **Docker for all infrastructure**

---

# Future Improvements

* Dockerize all microservices
* Add Kubernetes deployment
* Add CI/CD pipelines
* Add Redis caching
* Implement distributed tracing

---

# License

This project is private and not licensed for public use.

---
