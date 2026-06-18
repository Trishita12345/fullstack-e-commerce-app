# Sprint [Number]: [Goal]

**Start Date:** [YYYY-MM-DD]
**Feature:** [Feature name]
**Requirement Ref:** `.claude/docs/requirements/[feature]-requirement.md`

---

## Sprint Goal

[One sentence describing what this sprint delivers]

## Task Board

| ID | Title | Type | Agent | Status | Depends On |
|----|-------|------|-------|--------|------------|
| [ID]-001 | [Title] | Backend | backend-developer | TODO | — |
| [ID]-002 | [Title] | Backend | backend-developer | TODO | 001 |
| [ID]-003 | [Title] | Frontend | frontend-developer | TODO | — |

## Dependency Graph

```
[ID]-001 (DB Schema)
  └── [ID]-002 (Entity + Repo)
        └── [ID]-003 (Service Layer)
              └── [ID]-004 (Controller)
                    └── [ID]-006 (Frontend Integration)

[ID]-005 (Frontend Components) ──── can start in parallel
```

## Definition of Done

- [ ] All backend tasks pass `mvn compile`
- [ ] All frontend tasks pass `npm run build`
- [ ] Backend reviewer score ≥ 8/10
- [ ] Frontend reviewer score ≥ 8/10
- [ ] All tests pass
- [ ] PR created with structured description

## Sprint Review Notes

[Filled in after sprint completion — what was delivered, what was deferred, lessons learned]
