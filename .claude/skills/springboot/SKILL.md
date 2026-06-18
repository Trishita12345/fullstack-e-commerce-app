---
name: springboot-conventions
description: Spring Boot project conventions for Loom & Lume backend services — package structure, service/repository patterns, security, DTOs, entity base class, and version awareness
invokedBy: claude
---

# Spring Boot Conventions — Loom & Lume

## Package Structure

Root package: `com.e_commerce.[serviceName]`

```
com.e_commerce.[serviceName]/
├── controller/
│   ├── admin/           — Admin-only endpoints (@PreAuthorize("hasRole('ADMIN')"))
│   └── customer/        — Customer-facing endpoints (authenticated via X-User-Id)
├── service/
│   ├── I[Name]Service.java          — Interface
│   └── impl/
│       └── [Name]Service.java       — Implementation (@Service, @AllArgsConstructor)
├── model/
│   ├── [Entity].java                — JPA entity (extends AuditEntity)
│   ├── enums/                       — Enum types
│   └── dto/
│       └── [domain]/                — Domain-grouped DTOs
│           ├── [Name]RequestDTO.java
│           └── [Name]ResponseDTO.java
├── repository/
│   └── I[Name]Repository.java       — extends JpaRepository<Entity, UUID>
├── kafka/
│   ├── [Event]Producer.java
│   └── [Event]Consumer.java
├── client/
│   └── I[Service]Client.java        — Feign interface
├── config/                          — Service-specific configuration
└── cron/                            — Scheduled jobs
```

## Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| Service interface | `I[Name]Service` | `IWishlistService` |
| Service impl | `[Name]Service` | `WishlistService` |
| Repository | `I[Name]Repository` | `IWishlistItemRepository` |
| Controller | `[Name]Controller` | `CustomerWishlistController` |
| Entity | `[Name]` (singular) | `WishlistItem` |
| DTO | `[Name]DTO` or `[Name]RequestDTO` / `[Name]ResponseDTO` | `WishlistToggleResponseDTO` |
| Feign client | `I[Service]Client` | `IProductClient` |

## Entity Pattern

All entities extend `AuditEntity` from the common module:

```java
@Entity
@Table(name = "table_name")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EntityName extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // fields...
}
```

`AuditEntity` provides `createdAt` and `updatedAt` via `@PrePersist` / `@PreUpdate`.

## Controller Pattern

```java
@RestController
@RequestMapping("/endpoint-prefix")
@AllArgsConstructor  // Constructor injection via Lombok
public class NameController {

    private final INameService nameService;

    @GetMapping("/path")
    @PreAuthorize("hasRole('ADMIN')")  // Only for admin endpoints
    public ResponseEntity<ResponseDTO> method() {
        return ResponseEntity.ok(nameService.doSomething());
    }
}
```

- Admin controllers go in `controller/admin/`
- Customer controllers go in `controller/customer/`
- Public endpoints use path prefix `/public/` and are permitted in SecurityConfig

## Security

Security is handled by the common module:
- `SecurityConfig` registers `GatewayHeaderAuthenticationFilter` before `UsernamePasswordAuthenticationFilter`
- The filter reads `X-User-Id` and `X-User-Roles` headers (injected by API Gateway)
- Public paths: `/public/**`, `/swagger-ui/**`, `/v3/api-docs/**`, `/error`, `/actuator/**`
- Get current user ID in service layer: `SecurityContextHolder.getContext().getAuthentication().getName()`
- RBAC: `@PreAuthorize("hasRole('ADMIN')")`, `@PreAuthorize("hasRole('CUSTOMER')")`

## DTO Conventions

- Separate request and response DTOs (never expose entities directly)
- Group DTOs by domain in sub-packages: `model/dto/product/`, `model/dto/wishlist/`
- Use Lombok: `@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`
- Use `@Valid` on controller parameters for request validation

## Common Module Dependency

All services depend on `com.e_commerce:common:1.0.0`:
- Shared: `SecurityConfig`, `GatewayHeaderAuthenticationFilter`, `FeignConfig`, `GlobalExceptionHandler`, `AuditEntity`
- Shared DTOs: `com.e_commerce.common.model.dto.*`
- Shared events: `com.e_commerce.common.model.event.*`
- Constants: `com.e_commerce.common.utils.Constants`

**If you modify common, you MUST rebuild:** `cd backend/common && mvn clean install`

## Spring Boot Version Awareness

| Service | Spring Boot | Spring Cloud | Notes |
|---------|------------|-------------|-------|
| apiGatewayService | 3.5.x | — | WebFlux (reactive), NOT servlet |
| common | 4.0.0 | 2025.1.0 | Shared library |
| All other services | 4.0.x | 2025.1.x | Servlet stack |

Do NOT use WebFlux APIs in downstream services. Do NOT use servlet APIs in the gateway.

## Application Config Patterns

```yaml
server:
  port: [service port]
  address: 127.0.0.1  # Bind to localhost only

spring:
  application:
    name: [service-name]
  jpa:
    hibernate:
      ddl-auto: none  # ALWAYS none — Liquibase manages schema
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db-changelog-master.yaml
```

## Exception Handling

- `GlobalExceptionHandler` from common handles all exceptions
- Returns `ErrorResponse` with: `error`, `message`, `status`, `traceId`, `timestamp`, `path`
- Service-specific exceptions should extend appropriate Spring exceptions or use `ResponseStatusException`
