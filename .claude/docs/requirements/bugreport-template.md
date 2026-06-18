# Bug Report: [Bug Name]

**Author:** product-owner agent
**Date:** [YYYY-MM-DD]
**Classification:** BUGFIX
**Severity:** Critical | High | Medium | Low
**GitHub Issue:** #{number}

---

## Bug Description

[Clear, concise description of the bug]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens — include error messages, incorrect values, etc.]

## Services Affected

| Service | How Affected | Port |
|---------|-------------|------|
| [e.g., cartService] | [Description of impact] | [8082] |

## Expected Fix Scope

| File/Area | Change Type | Confidence |
|-----------|------------|------------|
| [e.g., backend/cartService/service/impl/CartService.java] | [Logic fix] | [High/Medium/Low] |

## Environment

- **When did it start?** [Date or "always" or "after deploy X"]
- **Reproducibility:** [Always / Sometimes / Rare]
- **Recent changes in area:** [Any recent commits or deployments that might have caused this]

## Additional Context

[Screenshots, logs, stack traces, related issues]

---

## Completeness Check

- [ ] Reproduction steps are clear and complete
- [ ] Expected fix scope is identified
- [ ] Affected services are listed
- [ ] Severity is assessed

> Classification: BUGFIX. The orchestrator should skip PLANNING and DESIGN stages and delegate directly to the developer agent.
