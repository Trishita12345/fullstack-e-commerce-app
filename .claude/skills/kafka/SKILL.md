---
name: kafka-conventions
description: Kafka event-driven patterns for Loom & Lume — topic naming, producer/consumer patterns, event classes, consumer groups, and the order flow choreography
invokedBy: claude
---

# Kafka Conventions — Loom & Lume

## Topic Registry

Topics are defined as constants in `com.e_commerce.common.utils.Constants.java`:

| Constant | Topic Name | Producer | Consumer(s) |
|----------|-----------|----------|-------------|
| `ORDER_CREATED_TOPIC` | `order-created` | orderService | productService, notificationService |
| `ORDER_CONFIRMED_FOR_NOTIFY_TOPIC` | `order-confirmed-for-notify` | orderService | notificationService |
| `ORDER_RESERVED_TOPIC` | `order-reserved` | orderService | paymentService |
| `INVENTORY_RESERVATION_TOPIC` | `inventory-reservation` | productService | orderService |
| `PAYMENT_CREATED_TOPIC` | `payment-created` | paymentService | — |
| `PAYMENT_SUCCESS_TOPIC` | `payment-success` | paymentService | orderService |
| `ORDER_FULFILLED_TOPIC` | `order-fulfilled` | orderService | productService, cartService, notificationService, seachEngineService |
| `PRODUCT_SEARCH_INDEX_UPDATED_TOPIC` | `product-search-index-updated` | productService | seachEngineService |
| `PRODUCT_SEARCH_INDEX_DELETED_TOPIC` | `product-search-index-deleted` | productService | seachEngineService |
| `EMAIL_VERIFICATION_NOTIFY_TOPIC` | `email-verification-notify` | profileService | notificationService |

## Adding a New Topic

1. Add constant to `Constants.java` in common module
2. Rebuild common: `cd backend/common && mvn clean install`
3. Create event class in `com.e_commerce.common.model.event`
4. Create producer in source service's `kafka/` package
5. Create consumer in target service's `kafka/` package
6. Configure consumer in target service's `application.yaml`

## Event Class Pattern

Location: `backend/common/src/main/java/com/e_commerce/common/model/event/`

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventNameEvent {
    private UUID orderId;
    private UUID userId;
    // event-specific fields
}
```

Existing event classes: `OrderCreatedEvent`, `OrderFulfilledEvent`, `OrderReservedEvent`, `OrderConfimedNotificationEvent`, `InventoryReserveEvent`, `PaymentCreatedEvent`, `PaymentStatusEvent`, `ProductSearchDocumentEvent`

## Producer Pattern

Location: `[service]/src/main/java/com/e_commerce/[service]/kafka/[Event]Producer.java`

```java
@Service
@AllArgsConstructor
public class EventNameProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishEventName(EventNameEvent event) {
        kafkaTemplate.send(Constants.TOPIC_NAME, event.getId().toString(), event);
    }
}
```

- Inject `KafkaTemplate<String, Object>`
- Use entity ID as message key (ensures ordering per entity)
- Use `Constants.TOPIC_NAME` (never hardcode topic strings)

## Consumer Pattern

Location: `[service]/src/main/java/com/e_commerce/[service]/kafka/[Event]Consumer.java`

```java
@Service
@AllArgsConstructor
public class EventNameConsumer {

    private final IRelevantService relevantService;

    @KafkaListener(topics = Constants.TOPIC_NAME, groupId = "[service-name]-service-group")
    public void consumeEventName(EventNameEvent event) {
        relevantService.handleEvent(event);
    }
}
```

- Consumer group ID: `[service-name]-service-group` (e.g., `product-service-group`)
- One consumer class per topic per service
- Delegate processing to service layer (keep consumer thin)

## Consumer Configuration (application.yaml)

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JacksonJsonSerializer
      observation-enabled: true
    consumer:
      group-id: [service-name]-service-group
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JacksonJsonDeserializer
      properties:
        spring.json.trusted.packages: "*"
        spring.json.value.default.type: com.e_commerce.common.model.event.[PrimaryEventClass]
      observation-enabled: true
```

If a service consumes multiple event types, configure per-listener type mapping or use `@Header(KafkaHeaders.RECEIVED_TOPIC)` to route.

## Order Flow Choreography

```
1. Customer places order
   OrderService → [order-created] → ProductService

2. ProductService reserves inventory
   ProductService → [inventory-reservation] → OrderService

3. OrderService marks as reserved
   OrderService → [order-reserved] → PaymentService

4. PaymentService processes payment
   PaymentService → [payment-success] → OrderService

5. OrderService fulfills (fan-out to 4 consumers)
   OrderService → [order-fulfilled] → ProductService (deduct stock)
                                     → CartService (clear items)
                                     → NotificationService (email)
                                     → SearchService (update index)
```

## Infrastructure

- Kafka broker: `localhost:9092`
- Kafka UI: `localhost:8089`
- Docker Compose: `backend/kafka-setup/docker-compose.yaml`
