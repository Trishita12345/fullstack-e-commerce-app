# ADR-001: Event-Driven Choreography for Order Flow

**Date:** 2026-06-18
**Status:** Accepted

## Context

The order fulfillment flow spans multiple services: Order, Product (inventory), Payment, Cart, Notification, and Search. We needed to decide how these services coordinate during the order lifecycle — from creation through payment to fulfillment.

The order flow involves these sequential steps:
1. Order created → inventory must be reserved
2. Inventory confirmed → payment must be initiated
3. Payment completed → order fulfilled → stock deducted, cart cleared, notification sent, search index updated

## Decision

Use **Kafka-based event choreography** where each service reacts to events independently. No central orchestrator service. The flow is:

```
OrderService → OrderCreatedEvent → ProductService (reserve inventory)
ProductService → InventoryReserveEvent → OrderService (update reservation status)
OrderService → OrderReservedEvent → PaymentService (initiate payment)
PaymentService → PaymentStatusEvent → OrderService (confirm/fail payment)
OrderService → OrderFulfilledEvent → ProductService (deduct stock)
                                   → CartService (clear items)
                                   → NotificationService (send email)
                                   → SearchService (update index)
```

Topics are defined as constants in `com.e_commerce.common.utils.Constants.java`. Event classes live in `com.e_commerce.common.model.event.*`. Consumer groups follow the pattern `[service-name]-service-group`.

## Consequences

### Positive
- **Loose coupling:** Services don't know about each other, only about events
- **Independent deployability:** Each service can be updated without affecting others
- **Fan-out:** OrderFulfilledEvent naturally fans out to 4 consumers without complex routing
- **Resilience:** If notification service is down, order still completes; notification retries via Kafka offset

### Negative
- **Debugging complexity:** Tracing an order through 5 Kafka hops requires Zipkin correlation
- **Eventual consistency:** Brief windows where order status and inventory are inconsistent
- **No central workflow visibility:** Must aggregate state from multiple services to see full order status
- **Compensation complexity:** If payment fails after inventory reserved, must publish compensating events

## Alternatives Considered

### Saga Orchestrator Pattern
- **Pros:** Central visibility of workflow state, easier compensation logic, clear step ordering
- **Cons:** Single point of failure (orchestrator service), tighter coupling, orchestrator becomes a god service
- **Rejected because:** Adds operational complexity for a team of one; choreography is simpler to maintain with fewer services to deploy

### Synchronous Feign-Only Flow
- **Pros:** Simplest to implement, immediate consistency, easy to debug
- **Cons:** Tight coupling, cascading failures (if payment service is slow, order service blocks), no fan-out for post-fulfillment actions
- **Rejected because:** Order fulfillment touching 6 services synchronously creates unacceptable latency and fragility
