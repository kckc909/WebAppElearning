/**
 * MOCK DB - System Backups
 * Backup files for SuperAdmin backup/restore page
 */

export enum BackupStatus {
    COMPLETED = 'completed',
    IN_PROGRESS = 'in_progress',
    FAILED = 'failed'
}

export interface SystemBackup {
    id: number;
    filename: string;
    size_gb: number;
    created_at: string;
    status: BackupStatus;
    created_by: string;
}

export const SYSTEM_BACKUPS: SystemBackup[] = [
    {
        id: 1,
        filename: 'backup_2024_12_14.sql',
        size_gb: 2.5,
        created_at: '2024-12-14T02:00:00.000Z',
        status: BackupStatus.COMPLETED,
        created_by: 'system'
    },
    {
        id: 2,
        filename: 'backup_2024_12_13.sql',
        size_gb: 2.4,
        created_at: '2024-12-13T02:00:00.000Z',
        status: BackupStatus.COMPLETED,
        created_by: 'system'
    },
    {
        id: 3,
        filename: 'backup_2024_12_12.sql',
        size_gb: 2.3,
        created_at: '2024-12-12T02:00:00.000Z',
        status: BackupStatus.COMPLETED,
        created_by: 'system'
    },
    {
        id: 4,
        filename: 'backup_2024_12_11.sql',
        size_gb: 2.3,
        created_at: '2024-12-11T02:00:00.000Z',
        status: BackupStatus.COMPLETED,
        created_by: 'system'
    },
    {
        id: 5,
        filename: 'manual_backup_2024_12_10.sql',
        size_gb: 2.2,
        created_at: '2024-12-10T14:30:00.000Z',
        status: BackupStatus.COMPLETED,
        created_by: 'superadmin@milearn.com'
    },
];
