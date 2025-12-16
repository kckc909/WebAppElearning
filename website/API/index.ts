/**
 * API Services Index
 * Import tất cả services từ đây
 * 
 * Usage:
 * import { coursesApi, classesApi, enrollmentsApi } from '../API';
 * 
 * Để chuyển từ Mock sang Real API:
 * 1. Mở file config.ts
 * 2. Set USE_MOCK_API = false
 */

export { USE_MOCK_API } from './config';
export { accService } from './accounts.api';
export { coursesApi } from './courses.api';
export { classesApi } from './classes.api';
export { enrollmentsApi } from './enrollments.api';
export { transactionsApi } from './transactions.api';
export { notificationsApi } from './notifications.api';

// Re-export types
export type { ApiResponse } from './config';
