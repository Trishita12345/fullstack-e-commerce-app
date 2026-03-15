# Fullstack E-Commerce Application

A comprehensive microservices-based e-commerce platform with a modern frontend and scalable backend architecture.

## Prerequisites & Installation

### 1️⃣ Update the System

First update system packages:

```bash
sudo apt update && sudo apt upgrade -y
```

### 2️⃣ Install Git

For version control:

```bash
sudo apt install git -y
git --version  # Verify
```

### 3️⃣ Install Docker

Install Docker engine:

```bash
curl -fsSL https://get.docker.com -o install-docker.sh
sudo sh install-docker.sh
```

Add your user to docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
docker --version  # Verify
```

### 4️⃣ Install Docker Compose

For microservices orchestration:

```bash
sudo apt install docker-compose-plugin -y
docker compose version  # Verify
```

### 5️⃣ Install Java (Spring Boot)

Spring Boot services require Java 17 or 21:

```bash
sudo apt install openjdk-21-jdk -y
java -version  # Verify
```

### 6️⃣ Install Node.js (Next.js)

Using NVM (Node Version Manager):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
node -v && npm -v  # Verify
```

---

## Getting Started

Follow these steps to set up and run the entire application:

### Step 1: Setup & Run Frontend App

Navigate to the frontend directory and install dependencies:

```bash
cd frontend/ecommerce
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Step 2: Run Kafka Setup

Initialize Kafka for messaging:

```bash
cd kafka-setup
docker compose -f docker-compose.yml up -d
```

Verify Kafka is running:

```bash
docker ps | grep kafka
```

### Step 3: Load Database Backup

Restore the database from backup using PostgreSQL:

```bash
# Make sure your PostgreSQL container is running first
docker exec -i <postgres-container-name> psql -U <username> -d <database-name> < db_backup.sql
```

Example:

```bash
docker exec -i product_service_postgres_container psql -U user -d postgres < db_backup.sql
```

Or via direct psql connection:

```bash
psql -U <username> -d <database-name> < db_backup.sql
```

### Step 4: Start Backend Services

Build and run the microservices (in separate terminals):

```bash
# API Gateway
cd backend/apiGatewayService
mvn clean install
mvn spring-boot:run

# Cart Service
cd backend/cartService
docker compose up -d
mvn clean install
mvn spring-boot:run

# Product Service
cd backend/productService
docker compose up -d
mvn clean install
mvn spring-boot:run

# And continue with other services as needed...
# - orderService
# - paymentService
# - profileService
# - offerService
# - seachEngineService
```

---

## Architecture Overview

- **Frontend**: Next.js React application
- **Backend**: Spring Boot microservices
- **Message Queue**: Apache Kafka
- **Database**: MySQL (with backup support)
- **Orchestration**: Docker & Docker Compose

## Project Structure

```
├── frontend/ecommerce/    # Next.js React app
├── backend/               # Spring Boot microservices
│   ├── apiGatewayService/
│   ├── cartService/
│   ├── productService/
│   ├── orderService/
│   ├── paymentService/
│   ├── profileService/
│   ├── offerService/
│   ├── seachEngineService/
│   └── common-auth/       # Shared authentication
├── kafka-setup/           # Kafka configuration
└── db_backup.sql          # Database backup file
```