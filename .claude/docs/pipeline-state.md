# Pipeline State

**Feature:** Guest Cart Merge on Login
**Classification:** FEATURE
**ID:** FEA001
**GitHub Issue:** #24 (OPEN, label: feature)
**Plan Branch:** FEA001-guest-cart-merge/plan
**Implementation Branches:** FEA001-guest-cart-merge-BE, FEA001-guest-cart-merge-FE
**Base Branch:** develop
**Current Stage:** REVIEW (gate PASS — backend 8.5/10, frontend 9.0/10, both >= 8.0; awaiting human approval to proceed to TEST)
**Last Updated:** 2026-06-18

---

## Stage History

| # | Stage | Started | Completed | Status | Gate Result | Human Approval |
|---|-------|---------|-----------|--------|-------------|----------------|
| 1 | REQUIREMENTS | 2026-06-18 | 2026-06-18 | DONE | PASS (92%) | APPROVED |
| 2 | PLANNING | 2026-06-18 | 2026-06-18 | DONE | PASS (plan + Issue #24) | APPROVED |
| 3 | DESIGN | 2026-06-18 | 2026-06-18 | DONE | PASS (doc covers all tasks + ACs) | APPROVED |
| 4 | BUILD | 2026-06-18 | 2026-06-18 | DONE | PASS (BE compile + FE build succeed) | APPROVED |
| 5 | REVIEW | 2026-06-18 | 2026-06-18 | DONE | PASS (BE 8.5/10, FE 9.0/10) | PENDING |
| 6 | TEST | | | — | — | — |
| 7 | PR CREATION | | | — | — | — |

> For BUGFIX: mark PLANNING and DESIGN as `SKIPPED` in Status and Human Approval columns.

## Branches

| Branch | Type | Status | PR |
|--------|------|--------|----|
| develop | base | exists (remote) | — |
| FEA001-guest-cart-merge/plan | plan | active (architecture + reviews committed) | — |
| FEA001-guest-cart-merge-BE | impl (backend) | pushed (commit f878952) | — |
| FEA001-guest-cart-merge-FE | impl (frontend) | pushed (commit ba50708) | — |

## Artifacts

| Type | Path | Stage |
|------|------|-------|
| Requirement | .claude/docs/requirements/guest-cart-merge-requirement.md | 1 |
| Sprint Plan | .claude/docs/plans/guest-cart-merge-sprint-plan.md | 2 |
| Issue Body (prepared) | .claude/docs/plans/guest-cart-merge-issue-body.md | 2 |
| Architecture | .claude/docs/architecture/guest-cart-merge-architecture.md | 3 |
| Backend Review | .claude/docs/reviews/guest-cart-merge-backend-review.md | 5 |
| Frontend Review | .claude/docs/reviews/guest-cart-merge-frontend-review.md | 5 |

## Active Blockers

- None.

## Open Decisions (from requirement) — ALL CONFIRMED

- D1: Duplicate quantity strategy — **OVERWRITE** (guest qty wins). CONFIRMED.
- D2: isSelected — new=true, existing=retain (also retain existing priceSnapshot). CONFIRMED.
- D3: Merge trigger — immediately after OTP, incl. first-time -> /setup-account. CONFIRMED.

## Design Summary (Stage 3)

- **Backend:** `POST /cart-items/merge` accepting `List<CartItemRequestDTO>`, returns 204.
  `mergeGuestCart(items, userId)` in `CartItemServiceImpl`, `@Transactional`, dup-safe
  map (keep-first), overwrite qty for dups (D1), add new with isSelected=true (D2).
  No schema/common/gateway change.
- **Frontend:** `mergeGuestCartAction` server action -> POST /merge; trigger in
  `otp/page.tsx` after OTP (both redirect paths, D3); refresh store via
  `getCartItemsAction` + `setCartItems` (AC4); export `useCartStore` from cart.ts.
- Contract agreed -> BE and FE tracks can build in parallel.

## Build Summary (Stage 4)

- **Branches created** from `origin/develop` and pushed: `FEA001-guest-cart-merge-BE`, `FEA001-guest-cart-merge-FE`.
- **Backend (commit f878952):** BE-1 interface method, BE-2 `mergeGuestCart` impl
  (`@Transactional`, dup-safe keep-first map, D1 overwrite qty, D2 isSelected/priceSnapshot,
  AC1 preserve, AC6 no-op, AC8 atomic), BE-3 `POST /cart-items/merge` controller
  (userId from `authentication.getName()` only, AC7). BE-4 tests deferred to Stage 6.
  Gate: `cd backend/cartService && mvn compile -q` -> EXIT 0.
- **Frontend (commit ba50708):** FE-1 `mergeGuestCartAction` server action, FE-2 OTP trigger
  for both redirect paths (D3) awaited before navigation (R3), FE-3 store refresh via
  `getCartItemsAction`+`setCartItems` (AC4) + `useCartStore` export + one-shot in-flight guard (R1).
  Merge failure is non-blocking (D3/R3). Gate: `cd frontend/ecommerce && npm run build` -> EXIT 0;
  no new lint findings on changed files (only pre-existing warnings).

## Review Summary (Stage 5)

- **Backend review: 8.5/10 — PASS.** All ACs (AC1-AC8) + R2 verified; `mvn compile` SUCCESS.
  Material finding: BE-4 unit suite (`CartItemServiceImplTest`, 7 cases) not delivered — deliver in Stage 6 TEST.
  Minor: `@Valid` on `List` element-validation caveat. Report:
  `.claude/docs/reviews/guest-cart-merge-backend-review.md`.
- **Frontend review: 9.0/10 — PASS.** All ACs + D2/D3 + R1/R3 verified; `npm run build` EXIT 0;
  no new lint issues on changed files. Report:
  `.claude/docs/reviews/guest-cart-merge-frontend-review.md`.
- **Carry-forward for Stage 6 / PR:**
  1. Deliver BE-4 tests on `-BE` branch (TEST stage runs `mvn test`).
  2. Commit the 2 stray FE lint fixes (`checkout/[step]/page.tsx` let->const,
     `constants/types.ts` String->string) to the **FE** branch — currently only in working tree, not committed.
  3. Repo-wide `npm run lint` exits 1 due to 17 PRE-EXISTING errors in untouched files
     (`lib/apiFetch.ts`, `lib/refreshToken.ts`, etc.); scope the Stage 6 lint gate to changed files
     or acknowledge as out-of-scope tech debt on develop.

## Review-Fix Cycle

- **Iteration:** 0 / 3 max (no remediation needed; both scores passed on first review)
- **Last Review Score (Backend):** 8.5 / 10
- **Last Review Score (Frontend):** 9.0 / 10
