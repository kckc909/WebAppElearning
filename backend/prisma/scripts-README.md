# Prisma Database Scripts

Utility scripts for database management and migrations.

## Files

### `check-database.cjs`
Check database structure and verify tables exist.

**Usage:**
```bash
node prisma/check-database.cjs
```

**Output:**
- List all tables in database
- Check if specific tables exist
- Show table structure

### `rename-transactions-migration.cjs`
Migration script to rename `transactions` table to `invoice_details`.

**Usage:**
```bash
node prisma/rename-transactions-migration.cjs
```

**What it does:**
1. Rename `transactions` → `invoice_details`
2. Add `invoice_id` column
3. Update foreign keys
4. Update indexes
5. Remove old columns from `invoices`

**⚠️ Warning:** This is a one-time migration script. Only run if needed.

## Database Management

### Generate Prisma Client
```bash
npx prisma generate
```

### Push Schema to Database
```bash
npx prisma db push
```

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```

### Run Migrations
```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

### Seed Database
```bash
npx prisma db seed
```

## Schema Files

- `schema.prisma` - Main schema file
- `schema-parts/` - Modular schema parts
- `schema-merged.prisma` - Merged schema (generated)

## Migrations

All migrations are stored in `prisma/migrations/` folder.

Each migration has:
- Timestamp folder name
- `migration.sql` - SQL commands
- `migration_lock.toml` - Lock file
