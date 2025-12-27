/**
 * MOCK DB - System Logs
 * System activity logs for SuperAdmin
 */

export enum SystemLogStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}

export interface SystemLog {
    id: number;
    action: string;
    user_email: string;
    created_at: string;
    status: SystemLogStatus;
    details?: string;
}

export const SYSTEM_LOGS: SystemLog[] = [
    {
        id: 1,
        action: 'User login',
        user_email: 'admin@milearn.com',
        created_at: '2024-12-14T10:30:00.000Z',
        status: SystemLogStatus.SUCCESS
    },
    {
        id: 2,
        action: 'Course created',
        user_email: 'instructor@milearn.com',
        created_at: '2024-12-14T09:15:00.000Z',
        status: SystemLogStatus.SUCCESS,
        details: 'Course: React Mastery'
    },
    {
        id: 3,
        action: 'Payment processed',
        user_email: 'student@milearn.com',
        created_at: '2024-12-14T08:45:00.000Z',
        status: SystemLogStatus.SUCCESS,
        details: 'Amount: $99.00'
    },
    {
        id: 4,
        action: 'Login attempt failed',
        user_email: 'unknown@test.com',
        created_at: '2024-12-14T07:30:00.000Z',
        status: SystemLogStatus.WARNING,
        details: 'Invalid password - 3 attempts'
    },
    {
        id: 5,
        action: 'Course updated',
        user_email: 'instructor2@milearn.com',
        created_at: '2024-12-13T16:20:00.000Z',
        status: SystemLogStatus.SUCCESS
    },
    {
        id: 6,
        action: 'System backup completed',
        user_email: 'system@milearn.com',
        created_at: '2024-12-13T03:00:00.000Z',
        status: SystemLogStatus.SUCCESS
    },
    {
        id: 7,
        action: 'API rate limit exceeded',
        user_email: 'api-user@external.com',
        created_at: '2024-12-12T14:50:00.000Z',
        status: SystemLogStatus.ERROR,
        details: 'Rate limit: 1000 requests/hour'
    },
];
