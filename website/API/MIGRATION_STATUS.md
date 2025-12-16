/**
 * PHASE 6 - MIGRATION TRACKING
 * API Layer Migration Status
 */

## API FILES TO MIGRATE:

✅ courses.api.ts - MIGRATED
  - Uses courseRepository
  - Uses mockDataSource
  - NO old mockData

⏳ accounts.api.ts - PENDING
  - Import: ACCOUNTS, USER_PROFILES, ROLES from old mockData
  - Action: Use mockDataSource.getAll Accounts(), mockDataSource.getProfileByUserId()

⏳ classes.api.ts - PENDING
  - Import: Multiple from old mockData
  - Action: Create classRepository (if not exists) or use mockDataSource

⏳ enrollments.api.ts - PENDING
  - Import: COURSE_ENROLLMENTS, etc from old mockData
  - Action: Use mockDataSource methods

⏳ notifications.api.ts - PENDING
  - Import: NOTIFICATIONS from old mockData
  - Action: Use mockDataSource.getNotificationsByUser()

⏳ transactions.api.ts - PENDING
  - Import: TRANSACTIONS, etc from old mockData
  - Action: Use mockDataSource.getTransactionsByUser()

## STRATEGY:
All API files should use:
1. mockDataSource for raw data access
2. Repositories for enriched/joined data
3. NO direct import from old mockData

## DEPRECATE OLD mockData.ts:
After migration, add deprecation warning to mockData.ts top
