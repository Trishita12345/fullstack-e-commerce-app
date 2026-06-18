# Requirement: Guest Cart Merge on Login

**ID:** FEA001
**Classification:** FEATURE
**Author:** product-owner (orchestrator pipeline)
**Date:** 2026-06-18
**Confidence Score:** 92%

---

## 1. Summary

When an unauthenticated (guest) user adds items to their cart, those items are persisted client-side in `localStorage` via the Zustand `cart` store (persist key `"cart"`). When the user logs in (OTP verification in `/otp`), the guest cart must be **merged** into the user's existing server-side cart held by the Cart Service, rather than being discarded or overwriting the server cart.

## 2. Background / Current State

### Frontend
- Cart state lives in `frontend/ecommerce/src/utils/store/cart.ts` — a Zustand store using `persist` middleware with name `"cart"`. The persisted slice includes `cartItems`, `donation`, `selectedCouponCode`, `giftWrap`.
- `cartItems` are of type `CartItemDTO` and contain `productItemId`, `quantity`, `updatedQuantity`, `priceSnapshot`, `isSelected`.
- Login completes in `frontend/ecommerce/src/app/(authentication)/otp/page.tsx` via `apiFetch("/auth-service/public/verify-otp")`. After success it sets auth state and redirects. **No cart sync happens today.**
- Server-side cart actions live in `frontend/ecommerce/src/app/(customer-checkout)/checkout/cartActions.ts` (`getCartItemsAction`, `updateCartAction`, `updateOverallCartAction`, etc.), all going through the gateway path `/cart-service/cart-items/...`.

### Backend (Cart Service, port 8082)
- `CartItemController` exposes `POST /cart-items/add`, `PUT /cart-items/update`, `PUT /cart-items/update-all`, `DELETE /cart-items/delete/{id}`, `GET /cart-items`, etc. All resolve the user via `authentication.getName()` (the `X-User-Id` injected by the API Gateway).
- `CartItemServiceImpl.addItemInCart` creates a cart on demand and **always appends** a new `CartItem` — it does NOT de-duplicate by `productItemId`. So calling `add` repeatedly for the same product creates duplicate rows.
- `CartItem` entity uniquely identifies a line by `productItemId` (there is currently NO separate size/variant column — the variant is encoded in `productItemId`, which already represents a specific product item / SKU).
- `findByCartIdAndProductItemId` exists, enabling lookup of an existing line by product item.

### Key observation on "size/variant"
The requirement mentions "same productId + same size/variant". In this codebase the cart line is keyed by `productItemId`, which is the SKU-level identifier (product + variant). Therefore duplicate detection is by `productItemId` alone. No schema change for a variant column is needed.

## 3. Goals (Acceptance Criteria)

1. **AC1 — Preserve server cart:** Existing server-side cart items for the user remain after merge. None are deleted by the merge operation.
2. **AC2 — Add guest items:** Every guest-cart line in `localStorage` that does NOT already exist in the server cart is added to the server cart.
3. **AC3 — Duplicate handling:** When a `productItemId` exists in both guest and server cart, the **guest cart quantity overwrites** the server quantity (the guest cart reflects the user's latest intent). `priceSnapshot` is taken from the server item when present; for newly added lines the guest `priceSnapshot` is used.
4. **AC4 — Clear guest cart:** After a successful merge, the `localStorage` guest cart (`cart` persist slice `cartItems`) is cleared and the store is refreshed from the server cart.
5. **AC5 — Idempotency:** Re-running the merge (e.g., double login or refresh) must not duplicate lines or repeatedly sum quantities. Once merged and localStorage is cleared, a second invocation is a no-op.
6. **AC6 — Empty guest cart:** If the guest cart is empty at login, the merge is a no-op and the user simply sees their existing server cart.
7. **AC7 — Auth context:** The merge endpoint is authenticated; the user is resolved from the gateway-injected `X-User-Id` header (same as all other cart endpoints). No userId is trusted from the request body.
8. **AC8 — Atomicity:** The server-side merge is transactional — either the whole guest cart merges or nothing changes.

## 4. Out of Scope

- Merging wishlist items (only cart items).
- Merging coupon/donation/giftWrap selections (only `cartItems`). These may be addressed later.
- Inventory/stock re-validation at merge time (existing cart behavior does not re-validate; merge keeps parity).
- Variant/size schema changes (variant already encoded in `productItemId`).

## 5. Proposed Solution (high level — to be detailed by architects)

### Backend (Cart Service)
- Add a new endpoint `POST /cart-items/merge` accepting `List<CartItemRequestDTO>` (the guest cart). Implemented in `CartItemController` + `ICartItemService` + `CartItemServiceImpl`.
- `mergeGuestCart(List<CartItemRequestDTO>, userId)`:
  - Load or create the user's ACTIVE cart.
  - Build a map of existing `CartItem` by `productItemId`.
  - For each guest item: if present, **overwrite** `quantity` with the guest item's quantity (the guest cart reflects the user's latest intent); else create a new `CartItem` attached to the cart.
  - Save within a single `@Transactional` boundary.
- Reuse existing `findByCartIdAndProductItemId` / `getAllCartItemsByCartId`.
- No Liquibase/schema change required.

### Frontend
- Add `mergeGuestCartAction(items)` server action calling `POST /cart-service/cart-items/merge`.
- After successful OTP verification in `otp/page.tsx`, if the persisted guest `cartItems` is non-empty: call merge, then call `getCartItemsAction()` and `setCartItems(...)`, then clear the persisted guest cart (`clearCartData()` / reset cartItems).
- Guard against double-merge using a one-shot flag (AC5) — clearing localStorage cartItems after merge is the primary guard.

## 6. Affected Services / Files

| Layer | File(s) | Change |
|-------|---------|--------|
| Backend | `cartService/.../controller/CartItemController.java` | new `merge` endpoint |
| Backend | `cartService/.../service/ICartItemService.java` | new method |
| Backend | `cartService/.../service/impl/CartItemServiceImpl.java` | merge logic |
| Backend (maybe) | `cartService/.../model/dto/` | reuse `CartItemRequestDTO` |
| Frontend | `app/(customer-checkout)/checkout/cartActions.ts` | new merge action |
| Frontend | `app/(authentication)/otp/page.tsx` | trigger merge post-login |
| Frontend (maybe) | `utils/store/cart.ts` | helper to reset guest cart |

No API Gateway change needed (route `/api/cart-service/**` already proxies all cart endpoints). No common-module change needed.

## 7. Decisions (Confirmed)

- **D1 — Duplicate quantity strategy:** Guest cart quantity **overwrites** server quantity. The guest cart reflects the user's latest ordering intent.
- **D2 — `isSelected` on merged items:** Newly added guest lines default `isSelected = true`; existing server lines retain their selection state.
- **D3 — Where to trigger merge:** Merge immediately after OTP verification in `otp/page.tsx`, even for first-time users redirected to `/setup-account`. The merge fires in parallel with the redirect — first-time users won't have an existing server cart anyway, so it's safe.

## 7.5 Manual Testing

### Services Required

| Service | Port | Why Needed |
|---------|------|------------|
| frontend | 3000 | Guest cart UI + OTP login flow |
| api-gateway | 8080 | Routes requests to cart/auth services |
| cart-service | 8082 | Merge endpoint (POST /cart-items/merge) |
| auth-service | 8088 | OTP verification |
| profile-service | 8083 | User profile (called by auth on login) |

### Infrastructure Required
- [ ] Cart Service DB (`cd backend/cartService && docker compose up -d`)
- [ ] Auth Service DB (`cd backend/authService && docker compose up -d`)
- [ ] Profile Service DB (`cd backend/profileService && docker compose up -d`)
- [ ] Frontend DB (`cd frontend/ecommerce && docker compose up -d`)
- [ ] Kafka (`cd backend/kafka-setup && docker compose up -d`)

### Test Steps
1. Checkout integration branch `FEA001-guest-cart-merge-test`
2. Start/restart: cart-service, auth-service, profile-service, api-gateway, frontend
3. Open browser (incognito) → browse products → add 2 items to cart as guest
4. Go to checkout → click "Login to Proceed" → enter phone → verify OTP
5. Verify: cart now shows merged items (guest + any pre-existing server items)
6. Check: no "Cart sync failed" error notification
7. Test duplicate: log out → add same item with different qty → log in → qty should be guest's qty
8. Test empty guest cart: clear localStorage → log in → existing server cart loads normally

### Expected Evidence
- [ ] Screenshot: Guest cart before login (showing items + "Login to Proceed")
- [ ] Screenshot: Cart after login (showing merged items + delivery address)

## 8. Confidence Justification (92%)

- Cart Service structure, DTOs, repository, and auth model are fully understood and verified by reading source. (+)
- Frontend store and login flow are understood; insertion point identified. (+)
- No schema change required; low blast radius (single service + two frontend files). (+)
- All three open decisions (D1–D3) have been confirmed by the user — uncertainty resolved.

## 9. Risks

- **R1:** Without idempotency guard, network retry could double-sum quantities. Mitigated by clearing localStorage after success and a one-shot flag.
- **R2:** `addItemInCart` already allows duplicate productItemId rows; if pre-existing duplicate rows exist in a user's cart, `findByCartIdAndProductItemId` could behave unexpectedly. Merge should use `getAllCartItemsByCartId` + grouping to be safe.
- **R3:** First-time-login redirect to `/setup-account` could interrupt the merge if not handled (D3).
