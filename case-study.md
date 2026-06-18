# Loom & Lume

## A Production-Inspired Ecommerce Platform Built with Next.js, Spring Boot Microservices, Elasticsearch, Kafka, Redis, and OAuth2-Based Security

### Project Overview

Loom & Lume is a modern ecommerce platform designed to simulate the architecture, workflows, and operational challenges of a real-world commerce system.

While the storefront showcases a candle business, the platform was intentionally built as a reusable ecommerce foundation capable of supporting multiple product domains, business models, and catalog structures.

The primary objective was to go beyond a traditional CRUD application and explore how modern ecommerce systems are designed, secured, deployed, monitored, and scaled in production environments.

The platform currently includes over 100 APIs, 50+ screens, distributed services, search infrastructure, payment processing, event-driven communication, observability tooling, and secure authentication workflows.

---

## Business Problem

Most learning projects focus only on UI implementation or simple backend APIs.

The goal of Loom & Lume was to bridge the gap between development and production by building a complete ecommerce ecosystem that includes:

* Product discovery
* Product management
* Search infrastructure
* Authentication and authorization
* Payment processing
* Order management
* Notifications
* Monitoring and tracing
* Security
* Deployment and infrastructure

The project was designed to provide hands-on experience with technologies and architectural patterns commonly used in modern enterprise systems.

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Mantine UI

### Backend

* Java 17
* Spring Boot
* Spring Security
* PostgreSQL

### Search & Performance

* Elasticsearch
* Redis

### Event-Driven Architecture

* Kafka

### Security

* OAuth2-inspired Authentication Architecture
* Access Tokens
* Refresh Tokens
* HTTP-Only Cookies
* OTP-Based Authentication
* Role-Based Authorization
* API Gateway

### Observability

* Zipkin
* Logstash

### Reliability & Infrastructure

* Docker
* VPS Deployment
* Custom Domain
* HTTPS / SSL
* Rate Limiting
* Resilience4j

---

## Scale of the Platform

The platform currently includes:

* 100+ REST APIs
* 50+ application screens
* Multiple backend services
* Dedicated authentication infrastructure
* Event-driven communication
* Full-text search
* Payment workflows
* Responsive mobile experience

---

## Architecture

Loom & Lume follows a microservices-based backend architecture.

### Frontend Layer

* Next.js Application
* React
* TypeScript

### API Management

* API Gateway

### Core Services

* Authentication Service
* User Service
* Product Service
* Order Service
* Payment Service
* Notification Service

### Data & Infrastructure

* PostgreSQL
* Elasticsearch
* Redis
* Kafka

### Monitoring & Observability

* Zipkin
* Logstash

This architecture allows independent service responsibilities while maintaining a cohesive ecommerce experience.

---

## Key Features

### Product Discovery

Users can:

* Browse products
* Search products
* Filter products
* Navigate category hierarchies
* Explore product details

### Advanced Search Experience

A major focus area of the project was search.

The platform integrates Elasticsearch to provide fast and scalable search capabilities.

Additionally, users can access a global search experience using:

`Cmd + K`

This allows users to instantly search products and orders from anywhere within the application.

Instead of navigating through multiple screens, users can directly locate the information they need through a single command.

---

## Flexible Product Hierarchy

The platform supports deeply nested product categories.

Example:

* Candles
  * Aromatherapy
  * Decorative Candles
    * Tall Candles

This design enables the platform to support a wide range of ecommerce domains beyond candles, including:

* Fashion
* Electronics
* Home Decor
* Beauty Products
* Lifestyle Products

---

## Shopping Experience

Customers can:

* Browse products
* Add items to cart
* Manage wishlist
* Complete checkout
* View order history
* Manage profile information
* Receive notifications

The user experience is fully responsive and optimized for both desktop and mobile devices.

---

## Payment Integration

The platform integrates with Razorpay to support secure payment processing.

The implementation handles:

* Successful payments
* Failed transactions
* Order updates
* Refund scenarios
* Payment verification workflows

Building payment flows provided valuable experience with transactional systems and real-world commerce requirements.

---

## Admin Platform

The administrative experience provides operational control over the ecommerce ecosystem.

Current and planned capabilities include:

* Product Management
* User Management
* Order Management
* Configuration Management
* Analytics and Reporting

The objective was to understand how businesses manage products, inventory, users, and operational workflows at scale.

---

## Security Architecture

Security was treated as a core architectural requirement.

Key implementations include:

* Dedicated Authentication Service
* OAuth2-inspired authentication flow
* Access Token Management
* Refresh Token Management
* OTP-Based Login Flow
* Role-Based Authorization
* API Gateway Validation
* Secure HTTP-Only Cookies
* HTTPS Encryption
* Rate Limiting

Instead of relying on a simple session-based approach, the project explores security patterns commonly used in distributed systems.

---

## Reliability & Fault Tolerance

The platform incorporates multiple mechanisms to improve system reliability.

### Resilience4j

Used to improve fault tolerance and service stability.

### Kafka

Used for asynchronous communication and event-driven workflows between services.

### Redis

Used to improve performance and reduce unnecessary database access.

These components help simulate production-grade architecture patterns.

---

## Monitoring & Observability

Understanding system behavior in production was a major learning objective.

The platform integrates:

### Zipkin

Used for distributed request tracing across services.

### Logstash

Used for centralized log collection and analysis.

These tools provide visibility into:

* Request execution
* Service dependencies
* Response times
* Error tracking
* Performance bottlenecks

---

## Deployment

The application is containerized using Docker and deployed on a VPS environment.

Deployment setup includes:

* Dockerized services
* Custom domain configuration
* SSL certificate setup
* HTTPS support
* Public internet accessibility

Live Application: [loomandlume.shop](https://loomandlume.shop)

Repository: [github.com/Trishita12345/fullstack-e-commerce-app](https://github.com/Trishita12345/fullstack-e-commerce-app)

---

## Challenges & Learnings

### Building Search Infrastructure

Implementing Elasticsearch required learning:

* Index design
* Search queries
* Result optimization
* Product discovery patterns

### Payment Gateway Integration

Integrating Razorpay introduced challenges around:

* Payment verification
* Failure handling
* Refund workflows
* Transaction consistency

### Distributed Architecture

Designing and integrating multiple services required:

* Service communication
* Authentication propagation
* Event handling
* Error recovery

### Deployment & Operations

Deploying publicly accessible applications introduced practical experience with:

* Infrastructure management
* HTTPS configuration
* Domain management
* Production troubleshooting

### Observability

Implementing Zipkin and Logstash provided hands-on experience with monitoring and debugging distributed systems.

---

## My Contributions

I was involved throughout the complete software development lifecycle.

Responsibilities included:

* Frontend architecture design
* Backend architecture design
* Spring Boot service development
* API development
* Authentication and authorization implementation
* Elasticsearch integration
* Kafka integration
* Redis integration
* Payment gateway integration
* API Gateway configuration
* Security implementation
* Deployment and infrastructure setup
* Docker configuration
* HTTPS and SSL setup
* Logging and tracing integration
* End-to-end system integration

---

## Results

Loom & Lume evolved from a learning project into a production-inspired ecommerce platform that demonstrates:

* Modern frontend engineering
* Microservices architecture
* Secure authentication workflows
* Full-text search capabilities
* Event-driven communication
* Distributed tracing
* Payment integration
* Production deployment practices
* Fault-tolerant design patterns
* Responsive user experience

The project continues to serve as a practical environment for exploring advanced ecommerce and distributed system concepts while applying modern engineering practices end-to-end.
