# Pipeline State

**Feature:** Guest Cart Merge on Login
**Classification:** FEATURE
**ID:** FEA001
**GitHub Issue:** #24 (OPEN, label: feature)
**Plan Branch:** FEA001-guest-cart-merge/plan
**Implementation Branches:** FEA001-guest-cart-merge-BE, FEA001-guest-cart-merge-FE
**Base Branch:** develop
**Current Stage:** DESIGN (gate PASS — architecture doc complete; awaiting human approval to proceed to BUILD)
**Last Updated:** 2026-06-18

---

## Stage History

| # | Stage | Started | Completed | Status | Gate Result | Human Approval |
|---|-------|---------|-----------|--------|-------------|----------------|
| 1 | REQUIREMENTS | 2026-06-18 | 2026-06-18 | DONE | PASS (92%) | APPROVED |
| 2 | PLANNING | 2026-06-18 | 2026-06-18 | DONE | PASS (plan + Issue #24) | APPROVED |
| 3 | DESIGN | 2026-06-18 | 2026-06-18 | DONE | PASS (doc covers all tasks + ACs) | PENDING |
| 4 | BUILD | | | — | — | — |
| 5 | REVIEW | | | — | — | — |
| 6 | TEST | | | — | — | — |
| 7 | PR CREATION | | | — | — | — |

> For BUGFIX: mark PLANNING and DESIGN as `SKIPPED` in Status and Human Approval columns.

## Branches

| Branch | Type | Status | PR |
|--------|------|--------|----|
| develop | base | exists (remote) | — |
| FEA001-guest-cart-merge/plan | plan | active (architecture committed) | — |

## Artifacts

| Type | Path | Stage |
|------|------|-------|
| Requirement | .claude/docs/requirements/guest-cart-merge-requirement.md | 1 |
| Sprint Plan | .claude/docs/plans/guest-cart-merge-sprint-plan.md | 2 |
| Issue Body (prepared) | .claude/docs/plans/guest-cart-merge-issue-body.md | 2 |
| Architecture | .claude/docs/architecture/guest-cart-merge-architecture.md | 3 |

## Active Blockers

- None. (GitHub Issue #24 created; `gh` CLI + token now available.)

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

## Review-Fix Cycle

- **Iteration:** 0 / 3 max
- **Last Review Score (Backend):** —
- **Last Review Score (Frontend):** —
