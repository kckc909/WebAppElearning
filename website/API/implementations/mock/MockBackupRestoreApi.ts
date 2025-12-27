/**
 * Mock Backup & Restore API Implementation
 */

import { IBackupRestoreApi, Backup } from '../../interfaces/IBackupRestoreApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockBackupRestoreApi implements IBackupRestoreApi {
    async getAll(): Promise<ApiResponse<Backup[]>> {
        await simulateDelay();
        try {
            const backups = dataSource.getBackups();
            return successResponse(backups);
        } catch (error) {
            return errorResponse('Failed to fetch backups');
        }
    }

    async getById(id: number): Promise<ApiResponse<Backup>> {
        await simulateDelay();
        try {
            const backup = dataSource.getBackupById(id);
            if (!backup) {
                return errorResponse('Backup not found');
            }
            return successResponse(backup);
        } catch (error) {
            return errorResponse('Failed to fetch backup');
        }
    }

    async create(type: 'full' | 'incremental' | 'differential'): Promise<ApiResponse<Backup>> {
        await simulateDelay();
        try {
            const backup = dataSource.createBackup(type);
            return successResponse(backup);
        } catch (error) {
            return errorResponse('Failed to create backup');
        }
    }

    async restore(id: number): Promise<ApiResponse<{ success: boolean; message: string }>> {
        await simulateDelay();
        try {
            const result = dataSource.restoreBackup(id);
            return successResponse(result);
        } catch (error) {
            return errorResponse('Failed to restore backup');
        }
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        await simulateDelay();
        try {
            dataSource.deleteBackup(id);
            return successResponse(undefined);
        } catch (error) {
            return errorResponse('Failed to delete backup');
        }
    }

    async download(id: number): Promise<ApiResponse<{ url: string }>> {
        await simulateDelay();
        try {
            const url = dataSource.getBackupDownloadUrl(id);
            return successResponse({ url });
        } catch (error) {
            return errorResponse('Failed to get download URL');
        }
    }
}
