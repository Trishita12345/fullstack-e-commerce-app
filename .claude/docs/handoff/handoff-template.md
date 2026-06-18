# Handoff: [From Stage] → [To Stage]

**From Agent:** [agent name]
**To Agent:** [agent name]
**Feature:** [feature name]
**Classification:** FEATURE | BUGFIX
**GitHub Issue:** #{number}
**Plan Branch:** [branch name]
**Date:** [YYYY-MM-DD]
**Confidence Score:** [0-100]%
**Human Approval:** PENDING | APPROVED

---

## Stage Completed

[What was accomplished in the completed stage]

## Artifacts Produced

| Artifact | Path | Branch | Status |
|----------|------|--------|--------|
| [Doc/Code/Config] | [file path] | [branch name] | Complete / Partial |

## Context Summary

[Key decisions made, patterns followed, assumptions taken — what the next agent needs to know]

## Open Questions

1. [Any unresolved items the next agent should be aware of]

## Blockers

- [Any blockers that could prevent the next stage from proceeding]

## Gate Check

- [ ] Gate criteria met (confidence ≥ 90% / review score ≥ 8/10 / tests pass)
- [ ] Artifacts committed to plan branch
- [ ] GitHub Issue updated
- [ ] Human approval received

**Gate Result:** PASS | FAIL | BLOCKED
