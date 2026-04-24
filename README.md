---

# 🕯️ Loom & Lume – Scalable Microservices E-Commerce Platform

A **production-ready, distributed e-commerce system** built using **Java Spring Boot microservices + React/Next.js**, designed to demonstrate **real-world scalability, fault tolerance, and event-driven architecture**.

---

## 🌐 Live Links

* 🛍️ **Application**: https://loomandlume.shop
* 📘 **Swagger (Aggregated APIs)**: https://api.loomandlume.shop/swagger-ui/index.html

---

## ⚡ Key Highlights

* 🧩 Built **10+ microservices** with **Spring Boot & WebFlux API Gateway**
* 🔐 Implemented **OTP-based authentication with Redis + JWT (Access + Refresh in cookies)**
* 🔄 Designed **event-driven order workflow using Apache Kafka**
* ⚡ Integrated **Resilience4j** for circuit breaking & fault tolerance
* 🔍 Developed **Elasticsearch-powered search engine (PLP filtering, faceting)**
* 📦 Built **distributed order orchestration with inventory reservation**
* 💳 Integrated **Razorpay + Cash on Delivery**
* 📊 Implemented **full observability using Zipkin + ELK stack**
* 🐳 Containerized infrastructure using **Docker Compose**
* 🧱 Enforced **clean architecture with shared common library**

---

## 🏗️ High-Level Architecture (HLD)

```text
                         ┌──────────────────────┐
                         │      Frontend        │
                         │   (Next.js / React)  │
                         └─────────┬────────────┘
                                   │
                          ┌────────▼────────┐
                          │   API Gateway   │
                          │  (WebFlux)      │
                          └────────┬────────┘
                                   │
     ┌───────────────┬─────────────┼───────────────┬───────────────┐
     │               │             │               │               │
     ▼               ▼             ▼               ▼               ▼
 Auth Service   Profile Service  Product Service  Cart Service  Search Service
 (OTP + JWT)    (User Data)      (Catalog + Inv)  (Cart/Wishlist)(ElasticSearch)
     │               │             │               │               │
     ▼               ▼             ▼               ▼               ▼
   Redis        PostgreSQL     PostgreSQL      PostgreSQL     Elasticsearch

                                   │
                           ┌───────▼────────┐
                           │  Order Service │
                           │  (Orchestrator)│
                           └───────┬────────┘
                                   │
        ┌───────────────┬──────────┼───────────────┬───────────────┐
        ▼               ▼          ▼               ▼               ▼
 Cart Service     Product Service  Payment Service Notification   Offer Service
 (Fetch items)    (Price + Stock)  (Razorpay)     Service         (Coupons)
                                      │
                                      ▼
                                External Gateway
```

## 🔄 Core Distributed Workflow (Order Flow -> Accurate Orchestrator + Event Flow)

User → API Gateway → Order Service

**STEP 1**: Fetch Cart Items (SYNC)
→ Order Service → Cart Service (Feign)
→ Get selected cart items

**STEP 2**: Validate Products (SYNC)
→ Order Service → Product Service (Feign)
→ Validate:
   - Latest price
   - Availability

**STEP 3**: Apply Coupons (SYNC)
→ Order Service → Offer Service
→ Validate coupon

**STEP 4**: Calculate Price Breakup

-------------------------------------

**STEP 5**: Reserve Inventory (ASYNC)
→ Order Service → Kafka → Product Service
→ Inventory Reservation

→ Product Service → Kafka → Order Service
→ "Inventory Reserved" Event

-------------------------------------

**STEP 6**: Initiate Payment (ASYNC)
→ Order Service → Kafka → Payment Service

→ Payment Service → Razorpay

→ Payment Service → Kafka → Order Service
→ "Payment Success" Event

-------------------------------------

**STEP 7**: Finalize Order (ASYNC FAN-OUT)

→ Order Service → Kafka → Product Service
   (Deduct actual stock)

→ Order Service → Kafka → Notification Service
   (Send email)

→ Order Service → Kafka → Cart Service
   (Clear purchased items)

-------------------------------------

**STEP 8**: Order Completed ✅



## 🔐 Authentication & Security Design

* OTP-based login (stored in Redis)
* JWT issued via Auth Service:

  * Access Token (short-lived)
  * Refresh Token (persistent)
* Stored securely in **HTTP-only cookies**
* API Gateway:

  * Validates JWT using RSA public key
  * Injects headers:

    * `X-User-Id`
    * `X-User-Roles`
* Downstream services:

  * Enforce **RBAC via @PreAuthorize**
  * Custom security filters applied

---

## 🧠 Architectural Decisions

* **API Gateway Pattern** → centralized routing & security - Reactive for high throughput
* **Database per service** → loose coupling & scalability
* **Event-driven communication (Kafka)** → async, resilient flows
* **Feign Clients** → synchronous internal calls
* **Shared Common Module** → reusable configs, DTOs, filters
* **Resilience4j** → circuit breaker + retry patterns + fallback

---

## 📦 Microservices Breakdown

| Service              | Responsibility                            |
| -------------------- | ----------------------------------------- |
| API Gateway          | Routing, auth filters, header propagation |
| Auth Service         | OTP login, JWT issuance                   |
| Profile Service      | User profile, addresses                   |
| Product Service      | Products, variants, inventory             |
| Cart Service         | Cart & wishlist                           |
| Order Service        | Central orchestrator                      |
| Payment Service      | Razorpay integration                      |
| Notification Service | Email/SMS                                 |
| Search Service       | Elasticsearch queries                     |
| Offer Service        | Coupons & discounts                       |

---

## 🔍 Observability

* **Zipkin** → distributed tracing across services
* **ELK Stack**:

  * Logstash → ingestion
  * Elasticsearch → storage
  * Kibana → visualization
* Logs include:

  * TraceId
  * SpanId
  * Service correlation

---

## 🧩 Design Patterns

* Singleton (Spring Beans)
* Strategy Pattern (Notification channels)
* Factory Pattern (Notification strategy factory)
* Circuit Breaker (Resilience4j)
* Event-Driven Architecture (Kafka)

---

## 🛠️ Tech Stack

* **Backend**: Java, Spring Boot, WebFlux
* **Frontend**: React, Next.js
* **DB**: PostgreSQL, Redis, Elasticsearch
* **Messaging**: Kafka
* **Observability**: Zipkin, ELK
* **DevOps**: Docker, Docker Compose

---

## 🧪 Key Use Cases

### 🔐 Login

* OTP → Redis → JWT issued → Profile initialized

### 🔍 Search (PLP)

* Query → Elasticsearch → filters + facets

### 📄 Product Details (PDP)

* Product Service → variants + pricing

### 🛒 Cart

* Add/update/remove → Cart Service

### 📦 Order

* Multi-service orchestration + Kafka events

---

## 🧱 Project Structure

```bash
backend/
  ├── apiGatewayService
  ├── authService
  ├── profileService
  ├── productService
  ├── cartService
  ├── orderService
  ├── paymentService
  ├── notificationService
  ├── searchEngineService
  ├── offerService
  ├── common

frontend/
  └── ecommerce (Next.js)
```

---

## 👩‍💻 Author

**1. Trishita Majumder**

**2. Subhajit Paul**

---