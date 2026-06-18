---
name: microservices-conventions
description: Inter-service communication patterns for Loom & Lume — Feign clients, API Gateway routing, service registry, Resilience4j, and error propagation
invokedBy: claude
---

# Microservices Conventions — Loom & Lume

## Service Registry

| Service | Port | DB Port | Spring Boot |
|---------|------|---------|-------------|
| apiGatewayService | 8080 | — | 3.5.x (WebFlux) |
| productService | 8081 | 5431 | 4.0.x |
| cartService | 8082 | 5433 | 4.0.x |
| profileService | 8083 | 5434 | 4.0.x |
| orderService | 8084 | 5435 | 4.0.x |
| offerService | 8085 | 5436 | 4.0.x |
| paymentService | 8086 | 5437 | 4.0.x |
| seachEngineService | 8087 | 9200 (ES) | 4.0.x |
| authService | 8088 | 5438 | 4.0.x |
| notificationService | 8090 | — | 4.0.x |

**Note:** `seachEngineService` is intentionally misspelled — do NOT rename.

## API Gateway Routing

Routes: `/api/<service-name>/**` with `StripPrefix=2`

Example: `GET /api/product-service/product/page` → `GET /product/page` on productService:8081

The gateway:
1. Validates JWT (RSA, OAuth2 resource server)
2. Extracts user info from JWT
3. Injects `X-User-Id` and `X-User-Roles` headers via `CookieToHeaderFilter`
4. Forwards to downstream service

## Feign Client Pattern

Location: `[callerService]/src/main/java/com/e_commerce/[callerService]/client/I[TargetService]Client.java`

```java
@FeignClient(
    name = "[target-service-name]",
    url = "${feign.client.[target-service-name].url}",
    configuration = FeignConfig.class
)
public interface ITargetServiceClient {

    @GetMapping("/endpoint")
    ResponseDTO getData(@RequestParam("id") UUID id);

    @PostMapping("/endpoint")
    ResponseDTO createData(@RequestBody RequestDTO request);
}
```

### Feign URL Configuration (application.yaml)

```yaml
feign:
  client:
    product-service:
      url: http://localhost:8081
    cart-service:
      url: http://localhost:8082
    profile-service:
      url: http://localhost:8083
    offer-service:
      url: http://localhost:8085
    payment-service:
      url: http://localhost:8086
```

### FeignConfig (Common Module)

`FeignConfig` in `com.e_commerce.common.config` propagates ALL request headers except `content-length` and `host`. This ensures `X-User-Id` and `X-User-Roles` flow from the gateway through inter-service calls.

## Internal Endpoints

For Feign-to-Feign calls (not exposed via Gateway), prefix endpoints with `/internal/`:

```java
@RestController
@RequestMapping("/internal/product")
public class InternalProductController {
    @PostMapping("/place-order/get-total-price")
    public ProductPriceDTO getPricesForPlaceOrder(@RequestBody List<CartItemDTO> items) { ... }
}
```

Internal endpoints are still authenticated (headers propagated via Feign) but not routed through the Gateway.

## Security Header Flow

```
Browser → Gateway → Downstream Service → Feign Target
         [JWT]     [X-User-Id]          [X-User-Id]
                   [X-User-Roles]       [X-User-Roles]
```

- Gateway extracts JWT claims → injects `X-User-Id`, `X-User-Roles` headers
- `GatewayHeaderAuthenticationFilter` on each downstream service reads these headers
- `FeignConfig` propagates headers to any Feign call targets
- Get user ID in code: `SecurityContextHolder.getContext().getAuthentication().getName()`

## Resilience4j

Configured per Feign target in `application.yaml`:

```yaml
resilience4j:
  circuitbreaker:
    instances:
      productService:
        slidingWindowSize: 5
        failureRateThreshold: 50
        waitDurationInOpenState: 10s
        minimumNumberOfCalls: 5
  retry:
    instances:
      productService:
        maxAttempts: 3
        waitDuration: 1s
  timelimiter:
    instances:
      productService:
        timeoutDuration: 10s
```

Used in orderService for all Feign calls to downstream services.

## Error Response Format

All services return errors through `GlobalExceptionHandler` (common module):

```json
{
  "error": "Not Found",
  "message": "Product item not found",
  "status": 404,
  "traceId": "abc123",
  "timestamp": "2026-06-18T10:00:00",
  "path": "/product/123"
}
```

## Observability

- **Tracing:** Micrometer + Brave → Zipkin (`http://127.0.0.1:9411`)
- **Logging:** Logstash Logback Encoder → ELK stack
- **Trace propagation:** Automatic via Micrometer observation (Kafka, Feign, HTTP)
- **Kibana:** `http://localhost:5601`

## Swagger / API Docs

Each service exposes: `/v3/api-docs`
Gateway aggregates: `/api/<service-name>/v3/api-docs`

## Adding a New Feign Client

1. Create interface in caller's `client/` package: `I[Target]Client.java`
2. Annotate with `@FeignClient(name, url, configuration)`
3. Add URL to caller's `application.yaml` under `feign.client`
4. Inject in service layer via constructor (`@AllArgsConstructor`)
5. Consider adding Resilience4j config if the call is critical path

## Deployment

- All services bind to `127.0.0.1` (not 0.0.0.0)
- Nginx reverse proxy is the sole public entry point
- `loomandlume.shop` → `:3000` (frontend)
- `api.loomandlume.shop` → `:8080` (gateway)
- SSL via Certbot
