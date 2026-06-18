# Feature Requirement: [Feature Name]

**Author:** [Agent/User]
**Date:** [YYYY-MM-DD]
**Status:** Draft | In Review | Approved
**Confidence Score:** [0-100]%

---

## Business Context

[Why is this feature needed? What business problem does it solve?]

## Services Affected

| Service | Type of Change | Port |
|---------|---------------|------|
| [e.g., productService] | [New API / DB migration / Kafka event] | [8081] |

## User Stories

### US-1: [Title]
**As a** [role]
**I want** [capability]
**So that** [benefit]

### US-2: [Title]
**As a** [role]
**I want** [capability]
**So that** [benefit]

## Acceptance Criteria

### AC-1: [Title]
- **Given** [precondition]
- **When** [action]
- **Then** [expected result]

### AC-2: [Title]
- **Given** [precondition]
- **When** [action]
- **Then** [expected result]

## API Expectations

### Endpoint 1: [METHOD /path]
- **Auth:** [Public / Authenticated / Admin]
- **Request Body:**
```json
{}
```
- **Response (200):**
```json
{}
```
- **Error Cases:** [400, 404, 409, etc.]

## Non-Functional Requirements

- **Performance:** [e.g., Response time < 200ms for listing endpoints]
- **Security:** [e.g., Admin-only access for management endpoints]
- **Scalability:** [e.g., Support up to N items per user]
- **Data Retention:** [e.g., Soft delete vs hard delete]

## Edge Cases

1. [Edge case description]
2. [Edge case description]

## Dependencies

- [ ] Requires common module changes? (triggers full rebuild)
- [ ] Requires new Kafka topic?
- [ ] Requires new Feign client?
- [ ] Requires new database table?
- [ ] Requires frontend route changes?

## Open Questions

1. [Question that needs clarification]

---

## Confidence Scoring Rubric

| Criteria | Weight | Score (0-10) | Weighted |
|----------|--------|-------------|----------|
| User story coverage | 30% | | |
| API clarity | 25% | | |
| Acceptance criteria specificity | 25% | | |
| Edge case handling | 20% | | |
| **Total** | **100%** | | **[X]%** |

> Pipeline gate: Confidence must be ≥ 90% before proceeding to design.
