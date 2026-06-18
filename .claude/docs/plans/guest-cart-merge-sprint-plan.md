# Sprint Plan: Guest Cart Merge on Login

**Feature ID:** FEA001
**Classification:** FEATURE
**Stage:** 2 (PLANNING)
**Author:** scrum-master (orchestrator pipeline)
**Date:** 2026-06-18
**Base Branch:** `develop`
**Plan Branch:** `FEA001-guest-cart-merge/plan`
**Requirement:** `.claude/docs/requirements/guest-cart-merge-requirement.md`
**GitHub Issue:** _pending — `gh` CLI not available in this environment (see Blockers)_

---

## 1. Goal

Merge a guest user's `localStorage` cart into their server-side Cart Service cart immediately after OTP login, honoring the three confirmed decisions:

- **D1 (Duplicates):** Guest quantity **overwrites** server quantity.
- **D2 (isSelected):** New guest lines -> `true`; existing server lines retain current state.
- **D3 (Merge timing):** Trigger **immediately after OTP verification** in `otp/page.tsx`, including first-time users routed to `/setup-account`.

Acceptance criteria AC1-AC8 are defined in the requirement doc and mapped to tasks in section 5.

---

## 2. Scope Summary

| Layer | In Scope | Out of Scope |
|-------|----------|--------------|
| Backend (Cart Service :8082) | New `POST /cart-items/merge` endpoint: controller, service interface, service impl, merge logic | Schema/Liquibase, common-module, API Gateway, inventory re-validation |
| Frontend (Next.js) | `mergeGuestCartAction` server action, trigger in `otp/page.tsx`, clear localStorage guest cart, refresh store from server | Wishlist merge, coupon/donation/giftWrap merge |

No changes to: `common/`, `apiGatewayService/`, Liquibase changelogs, Kafka events, Feign clients.

---

## 3. Branch Strategy

| Branch | Purpose | Created By | Stage |
|--------|---------|------------|-------|
| `FEA001-guest-cart-merge/plan` | Docs (sprint, architecture, reviews) — never deleted | github-manager | 2 |
| `FEA001-guest-cart-merge-BE` | Backend implementation | github-manager | 4 |
| `FEA001-guest-cart-merge-FE` | Frontend implementation | github-manager | 4 |

No `-SCHEMA` branch (no DB changes). All branches based off `develop`.

---

## 4. Task Breakdown

Complexity scale: **S** (~1-2 h), **M** (~half day), **L** (~1+ day).

### Backend Tasks — branch `FEA001-guest-cart-merge-BE` (agent: backend-developer)

#### BE-1 — Add `mergeGuestCart` to service interface
- **File:** `backend/cartService/src/main/java/com/e_commerce/cartService/service/ICartItemService.java`
- **Change:** Declare `void mergeGuestCart(List<CartItemRequestDTO> guestItems, String userId);`
- **Reuse:** `CartItemRequestDTO` already carries `productItemId`, `quantity`, `priceSnapshot`, `isSelected` — no new DTO needed.
- **Depends on:** none
- **Complexity:** S
- **AC:** enables AC2, AC3, AC7

#### BE-2 — Implement merge logic in service impl
- **File:** `backend/cartService/src/main/java/com/e_commerce/cartService/service/impl/CartItemServiceImpl.java`
- **Change:** Implement `mergeGuestCart` under `@Transactional` (use `jakarta.transaction.Transactional`, consistent with existing methods):
  1. Load the user's cart via `cartRepository.findByUserId(userId)`; if absent, create an `ACTIVE` cart with an empty item list (mirror `addItemInCart`'s `orElseGet`).
  2. Load existing items via `cartItemRepository.getAllCartItemsByCartId(cart.getId())` and build a `Map<UUID, CartItem>` keyed by `productItemId`. To guard against pre-existing duplicate rows (R2), group with a merge function that keeps the first / most-recent item rather than `Collectors.toMap` throwing on duplicate keys.
  3. For each guest item:
     - **If `productItemId` exists in map (duplicate):** overwrite `quantity` and `updatedQuantity` with guest quantity (**D1**); retain existing `isSelected` and existing `priceSnapshot` (**D2 / AC3**).
     - **If new:** build a new `CartItem` (mirror `addItemInCart`) with guest `quantity`, `updatedQuantity = quantity`, guest `priceSnapshot`, `isSelected = true` (**D2**); attach to cart.
  4. `cartRepository.save(cart)` (cascade) and/or `cartItemRepository.saveAll(...)` to persist within the single transaction (**AC8**).
  5. Empty `guestItems` -> early return (**AC6**).
- **Depends on:** BE-1
- **Complexity:** M
- **AC:** AC1, AC2, AC3, AC6, AC8; mitigates R2

#### BE-3 — Expose `POST /cart-items/merge` endpoint
- **File:** `backend/cartService/src/main/java/com/e_commerce/cartService/controller/CartItemController.java`
- **Change:** Add `@PostMapping("/merge")` accepting `@Valid @RequestBody List<CartItemRequestDTO>` and `Authentication authentication`; call `cartItemService.mergeGuestCart(body, authentication.getName())`; return `ResponseEntity.noContent().build()`. userId comes only from `authentication.getName()` (gateway `X-User-Id`), never from the body (**AC7**).
- **Depends on:** BE-1, BE-2
- **Complexity:** S
- **AC:** AC7

#### BE-4 — Backend unit/integration test for merge
- **File:** new test under `backend/cartService/src/test/java/.../service/` (and/or controller slice test)
- **Change:** Cover: empty guest cart no-op (AC6), new-item add (AC2), duplicate overwrite quantity + retain isSelected/priceSnapshot (AC3/D1/D2), existing server items preserved (AC1), idempotency when guest items already present (AC5).
- **Depends on:** BE-2, BE-3
- **Complexity:** M
- **AC:** AC1, AC2, AC3, AC5, AC6 — verification for Stage 6 (TEST)

### Frontend Tasks — branch `FEA001-guest-cart-merge-FE` (agent: frontend-developer)

#### FE-1 — Add `mergeGuestCartAction` server action
- **File:** `frontend/ecommerce/src/app/(customer-checkout)/checkout/cartActions.ts`
- **Change:** Add `export async function mergeGuestCartAction(items: CartItemDTO[])` that calls `serverApiFetch<void>("/cart-service/cart-items/merge", { method: "POST", body: items })`. Map the Zustand `CartItemDTO[]` to the backend request shape (`productItemId`, `quantity`, `priceSnapshot`, `isSelected`) — confirm field parity against `CartItemRequestDTO`.
- **Depends on:** BE-3 (endpoint contract); can be coded in parallel against the agreed contract.
- **Complexity:** S
- **AC:** AC2, AC3, AC7

#### FE-2 — Trigger merge after OTP verification
- **File:** `frontend/ecommerce/src/app/(authentication)/otp/page.tsx`
- **Change:** In `handleOtpScreenClick`, after `setAccess`/`setUserInfo` succeed and **before/parallel to** the redirect: read persisted guest `cartItems`; if non-empty, `await mergeGuestCartAction(cartItems)`. Must fire for **both** the `firstTimeLogin` (`/setup-account`) and normal-redirect paths (**D3**). Wrap in try/catch so a merge failure does not block login; surface a non-blocking notification on failure.
- **Depends on:** FE-1, FE-3
- **Complexity:** M
- **AC:** AC4 (trigger), AC6 (skip when empty), D3

#### FE-3 — Refresh store from server + clear localStorage guest cart
- **Files:** `frontend/ecommerce/src/app/(authentication)/otp/page.tsx`; possibly a small helper in `frontend/ecommerce/src/utils/store/cart.ts`
- **Change:** After a successful merge: call `getCartItemsAction()` and `setCartItems(...)` to refresh from the authoritative server cart, then clear the persisted guest cart via `clearCartData()` (already resets `cartItems`). This clearing is the primary idempotency guard (**AC5**); optionally add a one-shot in-memory flag to prevent re-entry on double-submit.
- **Depends on:** FE-1
- **Complexity:** S
- **AC:** AC4, AC5

#### FE-4 — Verify lint/build
- **Files:** n/a (verification)
- **Change:** `npm run lint` and `npm run build` clean for changed files. (Stage 6 gate.)
- **Depends on:** FE-1, FE-2, FE-3
- **Complexity:** S

---

## 5. Acceptance-Criteria -> Task Traceability

| AC | Description | Covered by |
|----|-------------|-----------|
| AC1 | Preserve server cart | BE-2, BE-4 |
| AC2 | Add guest-only items | BE-1, BE-2, BE-3, FE-1, BE-4 |
| AC3 | Duplicate -> guest qty overwrites; priceSnapshot from server | BE-2, FE-1, BE-4 |
| AC4 | Clear guest cart + refresh store | FE-2, FE-3 |
| AC5 | Idempotency | BE-4, FE-3 |
| AC6 | Empty guest cart no-op | BE-2, FE-2, BE-4 |
| AC7 | Auth via gateway header; no userId in body | BE-3, FE-1 |
| AC8 | Transactional merge | BE-2 |

All eight ACs are covered.

---

## 6. Dependency Graph & Execution Order

```
BE-1  ->  BE-2  ->  BE-3  ->  BE-4
                      |
                      v  (contract)
                    FE-1  ->  FE-3
                      |         |
                      +----> FE-2  ->  FE-4
```

Recommended order:
1. **BE-1 -> BE-2 -> BE-3** (define and implement the endpoint contract first).
2. **FE-1** (server action) once the request/response contract is fixed by BE-3.
3. **FE-3** (store refresh + clear), then **FE-2** (OTP trigger wiring).
4. **BE-4** and **FE-4** (tests / lint-build) before Stage 5 REVIEW and Stage 6 TEST.

Backend and frontend tracks can proceed in parallel after the contract (BE-3 shape) is agreed in DESIGN.

---

## 7. Effort Summary

| Track | Tasks | Net Complexity |
|-------|-------|----------------|
| Backend | BE-1 (S), BE-2 (M), BE-3 (S), BE-4 (M) | ~1.5 days |
| Frontend | FE-1 (S), FE-2 (M), FE-3 (S), FE-4 (S) | ~1 day |
| **Total** | 8 tasks | **~2.5 days** |

---

## 8. Risks & Mitigations (from requirement)

| Risk | Mitigation | Owner Task |
|------|------------|-----------|
| R1 — network retry double-applies merge | Clear localStorage after success; D1 uses overwrite (not sum) so re-apply is idempotent; optional one-shot flag | FE-3, BE-2 |
| R2 — pre-existing duplicate `productItemId` rows | Group existing items with a merge-function instead of `toMap` (which throws); operate on grouped representative | BE-2 |
| R3 — first-time-login `/setup-account` redirect interrupts merge | Fire merge for both redirect paths; `await` before navigation or fire-and-forget with guard (D3) | FE-2 |

---

## 9. Definition of Done (Stage 2 exit)

- [x] Sprint plan written to `.claude/docs/plans/guest-cart-merge-sprint-plan.md`
- [x] Tasks broken down with owners, dependencies, complexity, AC traceability
- [ ] GitHub Issue created with feature label + pipeline checklist (**BLOCKED** — `gh` CLI / token unavailable; issue body prepared at `/tmp/fea001-issue.md`)
- [ ] Plan branch committed and pushed
- [ ] Human approval to proceed to Stage 3 (DESIGN)
