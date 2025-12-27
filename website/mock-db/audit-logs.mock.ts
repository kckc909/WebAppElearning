/**
 * MOCK DB - Audit Logs
 * Detailed audit logs for SuperAdmin security monitoring
 */

export enum AuditLogStatus {
    SUCCESS = 'Success',
    FAILURE = 'Failure',
    WARNING = 'Warning'
}

export interface AuditLogEntry {
    id: number;
    admin_id: number;
    action: string;
    target_table: string;
    target_id: number | null;
    created_at: string;
    user: string;
    target: string;
    timestamp: string;
    details: string;
    status: AuditLogStatus;
}

export const AUDIT_LOGS: AuditLogEntry[] = [
    {
        id: 1,
        admin_id: 1,
        action: 'User Created',
        target_table: 'accounts',
        target_id: 10,
        created_at: '2023-10-25 10:30:45',
        user: 'admin@system.com',
        target: 'new_user@test.com',
        timestamp: '2023-10-25 10:30:45',
        details: 'Account created with standard permissions.',
        status: AuditLogStatus.SUCCESS
    },
    {
        id: 2,
        admin_id: 1,
        action: 'Login Failed',
        target_table: 'accounts',
        target_id: null,
        created_at: '2023-10-25 09:12:11',
        user: 'unknown',
        target: 'System',
        timestamp: '2023-10-25 09:12:11',
        details: 'Invalid password attempt from IP 192.168.1.1',
        status: AuditLogStatus.FAILURE
    },
    {
        id: 3,
        admin_id: 1,
        action: 'Settings Updated',
        target_table: 'settings',
        target_id: null,
        created_at: '2023-10-24 16:45:00',
        user: 'admin@system.com',
        target: 'Global Config',
        timestamp: '2023-10-24 16:45:00',
        details: 'Security policy updated: Password strength increased.',
        status: AuditLogStatus.SUCCESS
    },
    {
        id: 4,
        admin_id: 2,
        action: 'Data Export',
        target_table: 'accounts',
        target_id: null,
        created_at: '2023-10-24 14:20:33',
        user: 'manager@system.com',
        target: 'User Table',
        timestamp: '2023-10-24 14:20:33',
        details: 'Exported 500 records to CSV.',
        status: AuditLogStatus.WARNING
    },
    {
        id: 5,
        admin_id: 0,
        action: 'API Key Revoked',
        target_table: 'api_keys',
        target_id: 5,
        created_at: '2023-10-23 11:05:22',
        user: 'superadmin@system.com',
        target: 'Service A',
        timestamp: '2023-10-23 11:05:22',
        details: 'Key ID: sk_live_... revoked manually.',
        status: AuditLogStatus.SUCCESS
    },
    {
        id: 6,
        admin_id: 1,
        action: 'Permission Changed',
        target_table: 'accounts',
        target_id: 15,
        created_at: '2023-10-23 09:15:00',
        user: 'admin@system.com',
        target: 'instructor@milearn.com',
        timestamp: '2023-10-23 09:15:00',
        details: 'Role upgraded from STUDENT to INSTRUCTOR.',
        status: AuditLogStatus.SUCCESS
    },
    {
        id: 7,
        admin_id: 2,
        action: 'Course Approved',
        target_table: 'courses',
        target_id: 12,
        created_at: '2023-10-22 14:30:00',
        user: 'admin@milearn.com',
        target: 'React Mastery 2024',
        timestamp: '2023-10-22 14:30:00',
        details: 'Course approved and published.',
        status: AuditLogStatus.SUCCESS
    },
];
