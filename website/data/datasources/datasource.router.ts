/**
 * DATASOURCE ROUTER
 * Routes data access to either Mock or DB datasource based on API_MODE
 * 
 * Phase 8: Centralized routing logic
 * All API files should import from here, NOT directly from mock/db datasources
 */

import { API_MODE, IS_MOCK_MODE } from '../config/apiMode';
import { mockDataSource } from './mock.datasource';
import { dbDataSource } from './db.datasource';
import { IDataSource } from './IDataSource';

/**
 * Unified datasource type
 * Represents the contract that both mock and db datasources must implement
 */
type DataSource = IDataSource;

/**
 * Current active datasource based on API_MODE
 */
export const dataSource: DataSource = IS_MOCK_MODE ? mockDataSource : dbDataSource;

/**
 * Explicit mode check utilities (for conditional logic in APIs if needed)
 */
export { IS_MOCK_MODE, API_MODE };

/**
 * Default export for convenience
 */
export default dataSource;
