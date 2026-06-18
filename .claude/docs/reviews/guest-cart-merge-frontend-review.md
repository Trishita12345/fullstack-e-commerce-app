# Frontend Review: Guest Cart Merge (FEA001)

**Reviewer:** frontend-reviewer (orchestrator pipeline, Stage 5)
**Date:** 2026-06-18
**Branch reviewed:** `FEA001-guest-cart-merge-FE` (commit `ba50708`)
**Diff base:** `origin/develop...FEA001-guest-cart-merge-FE`
**Architecture ref:** `.claude/docs/architecture/guest-cart-merge-architecture.md`
**Requirement ref:** `.claude/docs/requirements/guest-cart-merge-requirement.md`

## Score: 9.0 / 10 — PASS (gate >= 8.0)

---

## Files Reviewed

- `frontend/ecommerce/src/app/(customer-checkout)/checkout/cartActions.ts` — `mergeGuestCartAction`
- `frontend/ecommerce/src/app/(authentication)/otp/page.tsx` — `mergeGuestCartOnLogin` helper + trigger
- `frontend/ecommerce/src/utils/store/cart.ts` — `export { useCartStore }`

## Build & Lint

- `npm run build` → **exit 0** (success); `/otp` route compiled.
- `npm run lint` on changed files: **no errors and no new warnings** introduced by FEA001 code. The 2 warnings under `otp/page.tsx` (`ErrorResponse` unused at line 11, `useEffect` deps at line 41) are pre-existing and unrelated to the merge code.

## Acceptance Criteria Verification

| AC / Decision | Verdict | Evidence |
|---|---|---|
| AC4 — clear guest cart + refresh from server | PASS | `setCartItems(serverItems ?? [])` after merge replaces the persisted guest cart with the authoritative server cart (canonical order from architecture B.3). |
| AC5 — idempotency | PASS | After merge the store holds the server list; module-level `mergeInFlight` one-shot guard prevents re-entrant double submit. |
| AC6 — empty guest cart no-op | PASS | Early return when `guestItems` is empty/undefined. |
| AC7 — no userId in body | PASS | Payload maps only `productItemId`, `quantity`, `priceSnapshot`, `isSelected`; auth carried by cookie → gateway. |
| D2 — isSelected default | PASS | `isSelected: ci.isSelected ?? true`. |
| D3 — both paths, before navigation | PASS | `await mergeGuestCartOnLogin()` runs after auth state is set and before BOTH redirects (`/setup-account` and normal). |
| R1 — double-merge | PASS | `mergeInFlight` flag reset in `finally`. |
| R3 — login not blocked by merge failure | PASS | try/catch inside helper; failure shows a non-fatal `notify` error and does not rethrow. |

## Code Quality

- Follows existing `cartActions.ts` conventions (`serverApiFetch` with `body`, `void` return).
- Correct typing throughout: `getCartItemsAction(): CartItemDTO[]` feeds `setCartItems(CartItemDTO[])`.
- `useCartStore.getState().cartItems` correctly snapshots the latest persisted guest cart at call time (outside React render), avoiding stale render coupling — matches architecture rationale.
- `export { useCartStore }` is minimal and additive; no breaking change to the store API.
- `notify` already imported; error UX is clear and non-blocking.

## Findings

### Minor / non-blocking
1. **Uncommitted lint fixes belong here.** Two edits (`checkout/[step]/page.tsx` let→const, `constants/types.ts` String→string) currently exist only in the working tree and are **not committed** to the FE branch (they were observed leaking via working-tree carry-over from the BE branch). They are legitimate frontend lint improvements; **commit them to the FE branch** before PR so they are properly tracked. Do not leave them on the BE branch.

2. **Repo-wide lint gate.** `npm run lint` exits 1 due to 17 pre-existing errors in files untouched by FEA001 (`lib/apiFetch.ts`, `lib/refreshToken.ts`, etc.). These are existing tech debt on `develop`. Stage 6's lint check should be scoped to changed files, or these pre-existing failures explicitly acknowledged as out of scope for this feature.

## Conclusion

Clean, spec-faithful implementation. All ACs and decisions (D2/D3) satisfied, with defense-in-depth guards (one-shot flag, swallowed merge errors) for R1/R3. Build succeeds; no new lint issues from the feature code. **Score 9.0/10 — PASS.**
