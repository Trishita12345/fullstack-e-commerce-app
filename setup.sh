#!/bin/bash

# Fullstack E-Commerce App - Complete Setup Script
# This script automates the entire setup process

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Utility functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

print_header "Fullstack E-Commerce Application Setup"

# Step 1: Check Prerequisites
print_header "Step 1: Checking Prerequisites"

if command_exists git; then
    print_success "Git is installed"
else
    print_error "Git is not installed. Please install it first."
    exit 1
fi

if command_exists docker; then
    print_success "Docker is installed"
else
    print_error "Docker is not installed. Please install it first."
    exit 1
fi

if command_exists docker; then
    print_success "Docker Compose is installed"
else
    print_error "Docker Compose is not installed. Please install it first."
    exit 1
fi

if command_exists java; then
    print_success "Java is installed"
else
    print_error "Java is not installed. Please install Java 21 first."
    exit 1
fi

if command_exists node; then
    print_success "Node.js is installed"
else
    print_error "Node.js is not installed. Please install Node 20 first."
    exit 1
fi

# Step 2: Setup and Run Frontend
print_header "Step 2: Setting up Frontend Application"

if [ -d "frontend/ecommerce" ]; then
    cd frontend/ecommerce
    print_info "Installing frontend dependencies..."
    npm install
    print_success "Frontend dependencies installed"
    cd "$SCRIPT_DIR"
else
    print_error "Frontend directory not found"
    exit 1
fi

read -p "Start frontend dev server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting frontend dev server in a new terminal..."
    cd frontend/ecommerce
    npm run dev &
    FRONTEND_PID=$!
    cd "$SCRIPT_DIR"
    print_success "Frontend running on http://localhost:3000 (PID: $FRONTEND_PID)"
fi

# Step 3: Run Kafka Setup
print_header "Step 3: Setting up Kafka"

if [ -d "kafka-setup" ]; then
    cd kafka-setup
    print_info "Starting Kafka containers..."
    docker compose -f docker-compose.yml up -d
    
    # Wait for Kafka to be ready
    print_info "Waiting for Kafka to be ready..."
    sleep 10
    
    if docker ps | grep -q kafka; then
        print_success "Kafka is running"
    else
        print_error "Kafka failed to start"
        exit 1
    fi
    cd "$SCRIPT_DIR"
else
    print_error "Kafka setup directory not found"
    exit 1
fi

# Step 4: Load Database Backup
print_header "Step 4: Loading Database Backup"

if [ -f "db_backup.sql" ]; then
    read -p "Do you have a running database container? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter database container name: " CONTAINER_NAME
        read -sp "Enter MySQL root password: " DB_PASSWORD
        echo
        
        print_info "Loading database backup..."
        docker exec -i "$CONTAINER_NAME" mysql -u root -p"$DB_PASSWORD" < db_backup.sql
        print_success "Database backup loaded successfully"
    else
        print_info "Skipping database backup for now."
        print_info "You can load it later with: docker exec -i <container-name> mysql -u root -p < db_backup.sql"
    fi
else
    print_error "db_backup.sql not found"
fi

# Step 5: Start Backend Services
print_header "Step 5: Starting Backend Services"

print_info "Building and running backend services..."
print_info "Services will start in separate processes"

# Function to start a service
start_service() {
    local service_name=$1
    local service_path="backend/$service_name"
    
    if [ -d "$service_path" ]; then
        print_info "Starting $service_name..."
        cd "$service_path"
        
        # Start docker compose if exists
        if [ -f "compose.yaml" ] || [ -f "docker-compose.yml" ]; then
            print_info "  → Starting Docker containers..."
            docker compose up -d 2>/dev/null || true
        fi
        
        # Build and run Spring Boot
        print_info "  → Building with Maven..."
        mvn clean install -q
        
        # Run in background
        print_info "  → Starting Spring Boot service..."
        nohup mvn spring-boot:run > "$SCRIPT_DIR/${service_name}.log" 2>&1 &
        print_success "$service_name started (see ${service_name}.log for details)"
        
        cd "$SCRIPT_DIR"
    else
        print_error "$service_path not found"
    fi
}

# Start all services
SERVICES=("apiGatewayService" "cartService" "productService" "orderService" "paymentService" "profileService" "offerService" "seachEngineService")

read -p "Start all backend services? This may take a while. (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    for service in "${SERVICES[@]}"; do
        start_service "$service"
        sleep 5  # Stagger startup
    done
else
    print_info "You can start services manually later with:"
    echo "  cd backend/<service-name>"
    echo "  mvn clean install"
    echo "  mvn spring-boot:run"
fi

# Final Summary
print_header "Setup Complete! 🎉"

echo -e "${GREEN}Your application is ready!${NC}\n"

echo "📱 Frontend:"
echo "  → http://localhost:3000\n"

echo "📋 Backend Services typically run on:"
echo "  → API Gateway: http://localhost:8080"
echo "  → Cart Service: http://localhost:8081"
echo "  → Product Service: http://localhost:8082"
echo "  → Order Service: http://localhost:8083"
echo "  → Payment Service: http://localhost:8084"
echo "  → Profile Service: http://localhost:8085"
echo "  → Offer Service: http://localhost:8086"
echo "  → Search Engine Service: http://localhost:8087\n"

echo "🗂️ Kafka:"
echo "  → Running in Docker\n"

echo "📊 View logs:"
echo "  → Frontend: npm logs"
echo "  → Services: cat <service-name>.log\n"

echo "🛑 To stop services:"
echo "  → Kill frontend: kill $FRONTEND_PID (if running)"
echo "  → Stop Kafka: cd kafka-setup && docker compose down"
echo "  → Stop services: kill %% (to kill all background jobs)\n"

print_success "Happy coding! 🚀"
