# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Loom & Lume** — a microservices e-commerce platform with a Spring Boot backend (Java 17) and a Next.js 16 frontend (TypeScript). Services communicate synchronously via OpenFeign and asynchronously via Apache Kafka. Each backend service has its own PostgreSQL database (database-per-service pattern). The API Gateway is reactive (Spring Cloud Gateway WebFlux); all downstream services use the servlet stack.

## Build & Run Commands

### Shared common library (must build first — all downstream services depend on it)
```bash
cd backend/common && mvn clean install
```

### Build any backend service
```bash
cd backend/<serviceName> && mvn clean install
```

### Run any backend service
```bash
cd backend/<serviceName> && mvn spring-boot:run
```

### Infrastructure (each service has its own compose file for its DB)
```bash
cd backend/<serviceName> && docker compose up -d   # per-service PostgreSQL
cd backend/kafka-setup && docker compose up -d      # Kafka + Zookeeper + Kafka UI
cd backend/observability-setup && docker compose up -d  # Zipkin + ELK stack
```

### Frontend
```bash
cd frontend/ecommerce && npm install
cd frontend/ecommerce && npm run dev     # dev server (Turbopack) on :3000
cd frontend/ecommerce && npm run build   # production build
cd frontend/ecommerce && npm run lint    # ESLint with --fix
```

### Frontend database (Prisma, used for Better Auth)
```bash
cd frontend/ecommerce && docker compose up -d   # PostgreSQL on :5432
cd frontend/ecommerce && npx prisma generate
cd frontend/ecommerce && npx prisma db push
```

### Dev CLI (terminal UI to manage all services)
```bash
cd dev-cli && npm install && npx ts-node src/index.ts
```

## Service Port Map

| Service            | Port | DB Port |
|--------------------|------|---------|
| API Gateway        | 8080 | —       |
| Product Service    | 8081 | 5431    |
| Cart Service       | 8082 | 5433    |
| Profile Service    | 8083 | 5434    |
| Order Service      | 8084 | 5435    |
| Offer Service      | 8085 | 5436    |
| Payment Service    | 8086 | 5437    |
| Search Service     | 8087 | 9200 (ES) |
| Auth Service       | 8088 | 5438    |
| Notification Svc   | 8090 | —       |
| Kafka              | 9092 | —       |
| Kafka UI           | 8089 | —       |
| Zipkin             | 9411 | —       |
| Kibana             | 5601 | —       |
| Logstash           | 5000 | —       |
| Frontend           | 3000 | 5432    |

## Architecture

### Backend — `backend/`

- **`common/`** — shared library installed to local Maven repo. Contains: `SecurityConfig`, `GatewayHeaderAuthenticationFilter`, `FeignConfig`, `CommonSwaggerConfig`, `GlobalExceptionHandler`, shared DTOs (`model/dto/`), Kafka event classes (`model/event/`), and `AuditEntity` base class. Spring Boot 4.0 parent. All downstream services declare `<dependency>com.e_commerce:common:1.0.0</dependency>`.
- **`apiGatewayService/`** — Spring Cloud Gateway (WebFlux, Spring Boot 3.5). Routes requests via `/api/<service-name>/**` with `StripPrefix=2`. Validates JWT (RSA, OAuth2 resource server), injects `X-User-Id` and `X-User-Roles` headers via `CookieToHeaderFilter` + `UserContext` filter. Resilience4j circuit breakers on all routes. This is the only service that is NOT servlet-based.
- **Individual services** follow a standard layout: `controller/`, `service/impl/`, `model/entity/`, `model/dto/`, `repository/`, `kafka/`, `client/` (Feign interfaces). Database migrations via Liquibase (`src/main/resources/db/changelog/`). JPA with `ddl-auto: none`.

### Inter-service communication

- **Synchronous**: OpenFeign clients in `client/` packages. The Order Service has Feign clients for Cart, Product, Offer, Payment, and Profile. Auth Service calls Profile. Feign config propagates gateway headers (`X-User-Id`, `X-User-Roles`).
- **Asynchronous (Kafka)**: Order flow uses event-driven orchestration:
  1. Order Service produces `OrderCreatedEvent` → Product Service consumes, reserves inventory
  2. Product Service produces `InventoryReserveEvent` → Order Service consumes
  3. Order Service produces `OrderReservedEvent` → Payment Service consumes
  4. Payment Service produces `PaymentStatusEvent` → Order Service consumes
  5. Order Service produces `OrderFulfilledEvent` → Product (stock deduct), Cart (clear items), Notification (email), Search (update index)

### Frontend — `frontend/ecommerce/`

Next.js 16 with App Router. Uses Mantine UI component library, Zustand for client state (`utils/store/`), and Tailwind CSS. API calls go through `lib/apiFetch.ts` which handles JWT refresh (cookie-based), 401 retry, and 403 → `forbidden()`. Server-side fetches use `lib/serverApiFetch.ts` with cookie injection. Route groups: `(customer)`, `(customer-checkout)`, `(authentication)`, `admin`. Reusable components live in `src/(components)/`. Rich text editing via TipTap. Razorpay integration for payments (`utils/loadRazorpay.ts`). Better Auth for frontend authentication with Prisma/PostgreSQL.

### Security model

The API Gateway validates JWTs and injects user context headers. Downstream services read `X-User-Id` and `X-User-Roles` from the `GatewayHeaderAuthenticationFilter` (in common) and enforce RBAC via `@PreAuthorize`. Services bind to `127.0.0.1` only — Nginx is the sole public-facing entry point.

### Deployment

Nginx reverse proxy: `loomandlume.shop` → `:3000`, `api.loomandlume.shop` → `:8080`. SSL via Certbot. All backend services and infrastructure bind to localhost.

## Key Conventions

- The search service directory is misspelled as `seachEngineService` (not `searchEngineService`) — this is intentional/legacy, do not rename.
- Spring Boot versions differ: API Gateway uses 3.5.x, common uses 4.0.0, other services use 4.0.x. Be careful with dependency compatibility.
- Swagger is aggregated at the API Gateway: each service exposes `/v3/api-docs`, the gateway collects them under `/api/<service-name>/v3/api-docs`.
- Frontend env var `NEXT_PUBLIC_API_URL` points to the API Gateway base path (`/api`).
- Kafka event DTOs are shared via the common module (`com.e_commerce.common.model.event.*`). Changes to event classes affect both producers and consumers across services.
