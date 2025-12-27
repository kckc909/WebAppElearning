/**
 * API MODE Configuration
 * Controls whether the application uses mock data or real database
 * 
 * Phase 8: API Mode Switch
 */

export type ApiMode = 'mock' | 'db';

/**
 * Current API mode
 * 
 * 'mock' - Use mock data (default for development)
 * 'db' - Use real database (production/backend integration)
 */
export const API_MODE: ApiMode = (process.env.REACT_APP_API_MODE as ApiMode) || 'mock';

/**
 * Flag to check if running in mock mode
 */
export const IS_MOCK_MODE = API_MODE === 'mock';

/**
 * Flag to check if running in database mode
 */
export const IS_DB_MODE = API_MODE === 'db';

/**
 * Log current API mode on startup
 */
console.log(`[API Mode] Running in ${API_MODE.toUpperCase()} mode`);
