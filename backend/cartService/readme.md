# Cart Service

## Overview

Cart Service is responsible for managing **user shopping intent** before checkout.  
It allows users to add, update, and remove items from a cart, while keeping cart data **decoupled** from Order, Inventory, and Payment services.

The Cart Service is intentionally **lightweight and optimistic**:
- It does **not** reserve inventory
- It does **not** calculate final payable amounts
- It stores **price snapshots** only for user experience

---

## Responsibilities

- Manage cart lifecycle
- Store cart items and quantities
- Maintain price snapshots for UI display
- Enforce cart state rules
- Support future guest cart merge (design only)

---

## Non-Responsibilities

- Inventory validation
- Price authority
- Order creation
- Payment processing

These responsibilities belong to other services.

---

## Cart Lifecycle Rules

1. A user can have **multiple carts historically**, but **only one ACTIVE cart at a time**
2. Cart statuses:
   - `ACTIVE` – editable cart
   - `CHECKED_OUT` – cart already converted to an order
   - `EXPIRED` – cart abandoned due to inactivity
   - `MERGED` – cart merged into another cart (future use)
3. Only carts with status `ACTIVE` can be modified
4. Once a cart is `CHECKED_OUT`, it becomes **read-only**
5. Cart data is **never deleted immediately**; status is updated instead

---

## Cart & Pricing Rules

6. Cart stores **price snapshots** for each cart item
7. Cart prices are **informational only**
8. Final price is always calculated during checkout by **Order Service**
9. Cart Service does **not** validate live prices or inventory availability

---

## Guest Cart (Future Scope – Not Implemented Yet)

10. Guest users can have carts without a registered user account  
11. Upon login, a guest cart may be **merged** into the user’s active cart  
12. The merged cart will be marked with status `MERGED`  
13. Guest cart merge logic is **intentionally deferred** to a later phase to keep the initial implementation focused and stable

---

## Data Model (High Level)

- `carts`
  - id
  - user_id
  - status
  - created_at
  - updated_at

- `cart_items`
  - id
  - cart_id
  - product_id
  - quantity
  - price_snapshot
  - created_at
  - updated_at

---

## Design Notes

- Cart Service represents **user intent**, not business commitment
- Cart data is copied into Order Service during checkout
- Product and Inventory services remain the **source of truth**
- This service is designed to evolve without breaking schema contracts

---

## Future Enhancements

- Guest cart merge implementation
- Cart expiration scheduler
- Redis caching for active carts

---

## Summary

> Cart Service handles *what the user wants*.  
> Order Service decides *what the user can buy*.  
> Inventory Service controls *what is actually available*.
