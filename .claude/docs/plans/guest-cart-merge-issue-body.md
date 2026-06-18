## FEA001 — Guest Cart Merge on Login

When a guest user adds items to their cart (persisted in `localStorage` via the Zustand `cart` store), those items must be **merged** into the user's server-side cart upon login (OTP verification), instead of being discarded.

**Requirement doc:** `.claude/docs/requirements/guest-cart-merge-requirement.md`
**Sprint plan:** `.claude/docs/plans/guest-cart-merge-sprint-plan.md`
**Confidence:** 92%

### Confirmed Decisions
- **D1 (Duplicates):** Guest cart quantity **overwrites** server quantity (latest intent wins).
- **D2 (isSelected):** New guest lines -> `true`; existing server lines retain current state.
- **D3 (Merge timing):** Merge immediately after OTP verification in `otp/page.tsx`, including first-time users routed to `/setup-account`.

### Scope
**Backend (Cart Service, :8082)** — new `POST /cart-items/merge` (controller + service interface + impl). No schema/Liquibase, no common-module, no API Gateway change.
**Frontend** — new `mergeGuestCartAction` server action, trigger in `otp/page.tsx` after login, clear localStorage guest cart after success.

### Acceptance Criteria
- [ ] AC1 — Existing server cart items preserved
- [ ] AC2 — Guest-only lines added to server cart
- [ ] AC3 — Duplicate productItemId: guest quantity overwrites server quantity
- [ ] AC4 — localStorage guest cart cleared + store refreshed from server after merge
- [ ] AC5 — Idempotent (re-run is a no-op once cleared)
- [ ] AC6 — Empty guest cart -> no-op
- [ ] AC7 — Authenticated; userId resolved from gateway `X-User-Id` (not request body)
- [ ] AC8 — Server merge is transactional (all-or-nothing)

### Pipeline Checklist
- [x] Stage 1 — REQUIREMENTS (approved)
- [ ] Stage 2 — PLANNING (sprint plan + issue)
- [ ] Stage 3 — DESIGN (backend + frontend architecture)
- [ ] Stage 4 — BUILD (BE + FE implementation)
- [ ] Stage 5 — REVIEW (score >= 8/10)
- [ ] Stage 6 — TEST (mvn test + npm lint)
- [ ] Stage 7 — PR CREATION (into develop)

### Branches
- Plan: `FEA001-guest-cart-merge/plan`
- Backend impl: `FEA001-guest-cart-merge-BE`
- Frontend impl: `FEA001-guest-cart-merge-FE`
- Base: `develop`

---

### To create this issue once `gh` is available

```bash
gh label create feature --color 0E8A16 --description "Feature pipeline work item" 2>/dev/null
gh issue create \
  --title "FEA001 — Guest Cart Merge on Login" \
  --body-file .claude/docs/plans/guest-cart-merge-issue-body.md \
  --label feature
```
