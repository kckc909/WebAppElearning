/**
 * Backup & Restore API Interface
 */

import { ApiResponse } from '../config';

export interface Backup {
    id: number;
    filename: string;
    size: number;
    created_at: string;
    type: 'full' | 'incremental' | 'differential';
    status: 'completed' | 'in_progress' | 'failed';
    created_by: number;
}

export interface IBackupRestoreApi {
    getAll(): Promise<ApiResponse<Backup[]>>;
    getById(id: number): Promise<ApiResponse<Backup>>;
    create(type: 'full' | 'incremental' | 'differential'): Promise<ApiResponse<Backup>>;
    restore(id: number): Promise<ApiResponse<{ success: boolean; message: string }>>;
    delete(id: number): Promise<ApiResponse<void>>;
    download(id: number): Promise<ApiResponse<{ url: string }>>;
}
