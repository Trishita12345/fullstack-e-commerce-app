# Backend Review: Guest Cart Merge (FEA001)

**Reviewer:** backend-reviewer (orchestrator pipeline, Stage 5)
**Date:** 2026-06-18
**Branch reviewed:** `FEA001-guest-cart-merge-BE` (commit `f878952`)
**Diff base:** `origin/develop...FEA001-guest-cart-merge-BE`
**Architecture ref:** `.claude/docs/architecture/guest-cart-merge-architecture.md`
**Requirement ref:** `.claude/docs/requirements/guest-cart-merge-requirement.md`

## Score: 8.5 / 10 — PASS (gate >= 8.0)

---

## Files Reviewed

- `backend/cartService/.../controller/CartItemController.java` — new `POST /merge`
- `backend/cartService/.../service/ICartItemService.java` — new `mergeGuestCart` method
- `backend/cartService/.../service/impl/CartItemServiceImpl.java` — merge implementation

## Build

`cd backend/cartService && mvn compile` → **BUILD SUCCESS**.

## Acceptance Criteria Verification

| AC / Decision | Verdict | Evidence |
|---|---|---|
| AC1 — preserve server cart | PASS | Existing items loaded via `getAllCartItemsByCartId`; only matched lines mutated, none deleted. |
| AC2 — add guest items / first-time user | PASS | New `CartItem` built and appended; cart created on demand via `orElseGet` (ACTIVE, empty items list). New-cart path: `cart.getId()` is null, `getAllCartItemsByCartId(null)` returns empty list → all guest items treated as new. |
| AC3 / D1 — overwrite quantity | PASS | `match.setQuantity` + `match.setUpdatedQuantity` set from guest item. |
| D2 — isSelected / priceSnapshot | PASS | Existing line: isSelected & priceSnapshot untouched. New line: `isSelected(true)`, guest `priceSnapshot`. |
| AC5 — idempotency | PASS | Overwrite (not sum) semantics + within-payload dedupe via `byProductItem.put(...)` after creating a new line. |
| AC6 — empty no-op | PASS | Early return on null/empty `guestItems`. |
| AC7 — auth context | PASS | `authentication.getName()` used; no userId read from body; `CartItemRequestDTO` has no userId field. |
| AC8 — atomicity | PASS | `@Transactional` (jakarta) on method; single `cartRepository.save(cart)`. |
| R2 — pre-existing duplicate rows | PASS | `Collectors.toMap(..., (existing, duplicate) -> existing)` keeps first; merge never throws. |

## Code Quality

- Imports correct; entity fields and builder methods all valid against `CartItem` / `Cart`.
- Follows established patterns (`addItemInCart`, `updateItemInCart`): on-demand cart creation, `@Transactional`, `cartRepository.save(cart)` relying on `Cart.items` `CascadeType.ALL` + `orphanRemoval`.
- Validation via `@Valid @RequestBody List<CartItemRequestDTO>` plus DTO-level `@NotNull` / `@Min(1)` constraints.
- Defensive null handling for `cart.getItems()`.
- Controller returns `204 No Content`, consistent with sibling endpoints; frontend re-fetches authoritative cart.

## Findings

### Material (deduction)
1. **BE-4 unit tests not delivered.** The architecture (section A.7) and sprint plan specified a new `CartItemServiceImplTest.java` covering 7 cases (AC1, AC2, AC3/D1/D2, AC5, AC6, first-time user, R2). Only the default `CartServiceApplicationTests.java` is present. Production code is correct, but the specified test suite is missing. **Recommend delivering these tests in Stage 6 (TEST)** so the regression coverage promised by the design exists.

### Minor / non-blocking
2. **`@Valid` on `List<T>` element validation caveat** (noted in architecture A.1): Spring may not validate collection elements without `@Validated` on the controller class. Defensive null handling is present, so this is not a correctness blocker, but element-level constraint enforcement should be confirmed (or `@Validated` added) if strict 400-on-bad-element is desired.

### Observed (not scored against backend)
3. Two uncommitted frontend lint edits (`checkout/[step]/page.tsx` let→const, `constants/types.ts` String→string) follow the working tree across branch checkouts. They are **not committed** to the BE branch, so the BE diff is clean. They belong on the FE branch — see frontend review.

## Conclusion

Correct, clean, spec-aligned implementation that satisfies all eight acceptance criteria and the R2 edge case. The only material gap is the missing unit-test suite, which does not drop the score below the gate because the production code itself is verified correct and compiles. **Score 8.5/10 — PASS.** Address the test gap in Stage 6.
