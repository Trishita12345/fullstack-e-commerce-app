---
name: postgres-liquibase-conventions
description: PostgreSQL and Liquibase patterns for Loom & Lume — changelog format, naming conventions, audit columns, database-per-service ports, and migration workflow
invokedBy: claude
---

# PostgreSQL & Liquibase Conventions — Loom & Lume

## Database-Per-Service

Each service has its own PostgreSQL instance:

| Service | DB Port | Docker Compose Location |
|---------|---------|------------------------|
| productService | 5431 | `backend/productService/compose.yaml` |
| cartService | 5433 | `backend/cartService/compose.yaml` |
| profileService | 5434 | `backend/profileService/compose.yaml` |
| orderService | 5435 | `backend/orderService/compose.yaml` |
| offerService | 5436 | `backend/offerService/compose.yaml` |
| paymentService | 5437 | `backend/paymentService/compose.yaml` |
| authService | 5438 | `backend/authService/compose.yaml` |
| Frontend (Prisma) | 5432 | `frontend/ecommerce/compose.yaml` |

SearchService uses Elasticsearch (port 9200), not PostgreSQL.

## Liquibase Format

**Always YAML** (not XML, not SQL). Located at:
```
backend/[service]/src/main/resources/db/changelog/
├── db-changelog-master.yaml     — Master file with includes
├── 001-create-table.yaml        — Sequential changelogs
├── 002-add-audit-columns.yaml
├── ...
└── NNN-description.yaml
```

## Master Changelog

```yaml
databaseChangeLog:
  - include:
      file: classpath:/db/changelog/001-create-table.yaml
  - include:
      file: classpath:/db/changelog/002-add-audit-columns.yaml
  # Add new entries at the end
```

Always use `classpath:` prefix in include paths.

## Changelog File Naming

Format: `NNN-kebab-case-description.yaml`
- Three-digit prefix, sequential (001, 002, ..., 012)
- **Before creating a new changelog:** Read `db-changelog-master.yaml` to find the next available number

## ChangeSet Format

```yaml
databaseChangeLog:
  - changeSet:
      id: NNN-description  # Must be unique across ALL changelogs
      author: [name]
      changes:
        - createTable:
            tableName: table_name
            columns:
              - column:
                  name: id
                  type: uuid
                  constraints:
                    primaryKey: true
                    nullable: false
              - column:
                  name: column_name
                  type: varchar(255)
                  constraints:
                    nullable: false
```

## Column Type Conventions

| Java Type | Liquibase Type | Notes |
|-----------|---------------|-------|
| UUID | `uuid` | Always for primary keys |
| String | `varchar(N)` | Specify length |
| LocalDateTime | `timestamp` | For dates/times |
| BigDecimal | `decimal(10,2)` | For money/prices |
| Boolean | `boolean` | |
| Integer | `int` | |
| Long | `bigint` | |
| Enum | `varchar(50)` | Stored as string |
| Text/CLOB | `text` | For long content |

## Audit Columns

Every table must include audit columns (managed by `AuditEntity` JPA lifecycle hooks):

```yaml
- column:
    name: created_at
    type: timestamp
    defaultValueComputed: CURRENT_TIMESTAMP
    constraints:
      nullable: false
- column:
    name: updated_at
    type: timestamp
    defaultValueComputed: CURRENT_TIMESTAMP
    constraints:
      nullable: false
```

## Constraints and Indexes

```yaml
# Foreign key
- addForeignKeyConstraint:
    baseTableName: child_table
    baseColumnNames: parent_id
    referencedTableName: parent_table
    referencedColumnNames: id
    constraintName: fk_child_parent  # Format: fk_[table]_[referenced]

# Unique constraint
- addUniqueConstraint:
    tableName: table_name
    columnNames: col1, col2
    constraintName: uq_table_col1_col2

# Index
- createIndex:
    tableName: table_name
    indexName: idx_table_column
    columns:
      - column:
          name: column_name
```

## JPA Configuration

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: none          # ALWAYS 'none' — Liquibase manages schema
    show-sql: false
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db-changelog-master.yaml
```

Never set `ddl-auto` to `update` or `create` — Liquibase is the sole schema manager.

## Adding a New Table Workflow

1. Read `db-changelog-master.yaml` → determine next changelog number
2. Create `NNN-description.yaml` with createTable changeSet
3. Add audit columns (created_at, updated_at) in the same changeSet
4. Add indexes and foreign keys as separate changeSets in the same file
5. Add `include` entry to `db-changelog-master.yaml`
6. Verify: `cd backend/[service] && mvn compile`
