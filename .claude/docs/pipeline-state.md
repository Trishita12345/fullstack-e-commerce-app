# Pipeline State

**Feature:** Guest Cart Merge on Login
**Classification:** FEATURE
**ID:** FEA001
**GitHub Issue:** (not yet created — blocked, see Active Blockers)
**Plan Branch:** FEA001-guest-cart-merge/plan
**Implementation Branches:** FEA001-guest-cart-merge-BE, FEA001-guest-cart-merge-FE
**Base Branch:** develop
**Current Stage:** PLANNING (gate PARTIAL — sprint plan done; issue blocked; awaiting human approval)
**Last Updated:** 2026-06-18

---

## Stage History

| # | Stage | Started | Completed | Status | Gate Result | Human Approval |
|---|-------|---------|-----------|--------|-------------|----------------|
| 1 | REQUIREMENTS | 2026-06-18 | 2026-06-18 | DONE | PASS (92%) | APPROVED |
| 2 | PLANNING | 2026-06-18 | 2026-06-18 | DONE | PARTIAL (plan PASS; issue blocked) | PENDING |
| 3 | DESIGN | | | — | — | — |
| 4 | BUILD | | | — | — | — |
| 5 | REVIEW | | | — | — | — |
| 6 | TEST | | | — | — | — |
| 7 | PR CREATION | | | — | — | — |

> For BUGFIX: mark PLANNING and DESIGN as `SKIPPED` in Status and Human Approval columns.

## Branches

| Branch | Type | Status | PR |
|--------|------|--------|----|
| develop | base | exists (remote) | — |
| FEA001-guest-cart-merge/plan | plan | created (push pending) | — |

## Artifacts

| Type | Path | Stage |
|------|------|-------|
| Requirement | .claude/docs/requirements/guest-cart-merge-requirement.md | 1 |
| Sprint Plan | .claude/docs/plans/guest-cart-merge-sprint-plan.md | 2 |
| Issue Body (prepared) | .claude/docs/plans/guest-cart-merge-issue-body.md | 2 |

## Active Blockers

- **GitHub Issue not created:** The `gh` CLI is not installed and no `GH_TOKEN`/`GITHUB_TOKEN`
  is set in this environment. Issue body is prepared at
  `.claude/docs/plans/guest-cart-merge-issue-body.md` with the exact `gh issue create`
  command to run once the CLI/token is available.

## Open Decisions (from requirement) — ALL CONFIRMED

- D1: Duplicate quantity strategy — **OVERWRITE** (guest qty wins). CONFIRMED.
- D2: isSelected — new=true, existing=retain. CONFIRMED.
- D3: Merge trigger — immediately after OTP, incl. first-time -> /setup-account. CONFIRMED.

## Review-Fix Cycle

- **Iteration:** 0 / 3 max
- **Last Review Score (Backend):** —
- **Last Review Score (Frontend):** —
