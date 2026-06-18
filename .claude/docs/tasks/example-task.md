# Task: WISH-001 Create Wishlist Database Schema

**Type:** Backend
**Assigned Agent:** backend-developer
**Status:** TODO
**Sprint:** Sprint-1 (Wishlist Feature)
**Priority:** High

## References

- **Requirement:** `.claude/docs/requirements/example-wishlist-requirement.md`
- **Architecture:** `.claude/docs/architecture/example-wishlist-architecture.md`
- **Depends on:** None (first task in sprint)
- **Blocks:** WISH-002 (Entity + Repository), WISH-003 (Service Layer)

## Description

Create the Liquibase changelog for the `wishlist_items` table in productService. This table stores which product items a user has wishlisted. It includes a unique composite index on `(user_id, product_item_id)` to prevent duplicates and a single-column index on `user_id` for listing queries.

## Acceptance Criteria

- [ ] Changelog file `012-create-wishlist-items.yaml` created in `backend/productService/src/main/resources/db/changelog/`
- [ ] Master changelog `db-changelog-master.yaml` updated with include entry
- [ ] Table has columns: id (uuid PK), user_id (varchar 255, NOT NULL), product_item_id (uuid, NOT NULL, FK), created_at, updated_at
- [ ] Unique index on (user_id, product_item_id)
- [ ] Index on user_id
- [ ] Foreign key to product_items.id

## Files to Create/Modify

| Action | File Path |
|--------|-----------|
| Create | `backend/productService/src/main/resources/db/changelog/012-create-wishlist-items.yaml` |
| Modify | `backend/productService/src/main/resources/db/changelog/db-changelog-master.yaml` |

## Implementation Notes

- Follow the existing Liquibase YAML format from `001-create-table.yaml` and `011-create-inventory-reservation.yaml`
- Check the current highest changelog number: read `db-changelog-master.yaml` to confirm 012 is the next available
- Use `type: uuid` for id and product_item_id, `type: varchar(255)` for user_id
- Audit columns (`created_at`, `updated_at`) are managed by JPA `AuditEntity` but must exist in the schema
- Foreign key constraint name: `fk_wishlist_items_product_item`

## Verification

```bash
cd backend/productService && mvn compile -q
# Verify changelog is valid YAML
# If DB is running: mvn liquibase:updateSQL to preview generated SQL
```
