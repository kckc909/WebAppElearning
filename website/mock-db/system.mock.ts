/**
 * System-related Mock Data
 * Audit Logs, System Logs, Backups, Admin Activities
 */

// Audit Logs
export const AUDIT_LOGS = [
    {
        id: 1,
        timestamp: '2024-12-18 10:30:00',
        user_id: 1,
        user_name: 'Admin User',
        action: 'CREATE_COURSE',
        resource_type: 'course',
        resource_id: 1,
        changes: { title: 'New Course' },
        ip_address: '192.168.1.1',
        status: 'success' as const
    },
    {
        id: 2,
        timestamp: '2024-12-18 11:00:00',
        user_id: 2,
        user_name: 'Instructor',
        action: 'UPDATE_COURSE',
        resource_type: 'course',
        resource_id: 1,
        changes: { price: 99.99 },
        ip_address: '192.168.1.2',
        status: 'success' as const
    },
    {
        id: 3,
        timestamp: '2024-12-18 12:00:00',
        user_id: 1,
        user_name: 'Admin User',
        action: 'DELETE_USER',
        resource_type: 'user',
        resource_id: 10,
        ip_address: '192.168.1.1',
        status: 'failed' as const
    }
];

// System Logs
export const SYSTEM_LOGS = [
    {
        id: 1,
        timestamp: '2024-12-18 09:00:00',
        level: 'info' as const,
        category: 'system',
        message: 'System started successfully',
        details: { version: '1.0.0' }
    },
    {
        id: 2,
        timestamp: '2024-12-18 10:15:00',
        level: 'warning' as const,
        category: 'database',
        message: 'Slow query detected',
        details: { query: 'SELECT * FROM courses', duration: 5000 }
    },
    {
        id: 3,
        timestamp: '2024-12-18 11:30:00',
        level: 'error' as const,
        category: 'api',
        message: 'API endpoint failed',
        user_id: 5,
        ip_address: '192.168.1.5',
        details: { endpoint: '/api/courses', error: 'Timeout' }
    },
    {
        id: 4,
        timestamp: '2024-12-18 14:00:00',
        level: 'critical' as const,
        category: 'security',
        message: 'Multiple failed login attempts',
        user_id: 8,
        ip_address: '192.168.1.8',
        details: { attempts: 5 }
    }
];

// System Backups
export const SYSTEM_BACKUPS = [
    {
        id: 1,
        filename: 'backup_20241218_full.sql',
        size: 1024000000, // 1GB
        created_at: '2024-12-18 00:00:00',
        type: 'full' as const,
        status: 'completed' as const,
        created_by: 1
    },
    {
        id: 2,
        filename: 'backup_20241217_incremental.sql',
        size: 256000000, // 256MB
        created_at: '2024-12-17 00:00:00',
        type: 'incremental' as const,
        status: 'completed' as const,
        created_by: 1
    },
    {
        id: 3,
        filename: 'backup_20241216_full.sql',
        size: 980000000,
        created_at: '2024-12-16 00:00:00',
        type: 'full' as const,
        status: 'completed' as const,
        created_by: 1
    }
];

// Admin Activities
export const ADMIN_ACTIVITIES = [
    {
        id: 1,
        type: 'course_submitted' as const,
        title: 'New course submitted',
        description: 'Instructor John Doe submitted "React Mastery"',
        instructor_id: 3,
        instructor_name: 'John Doe',
        course_id: 1,
        course_name: 'React Mastery',
        timestamp: '2024-12-18 10:30:00',
        is_read: false
    },
    {
        id: 2,
        type: 'course_updated' as const,
        title: 'Course updated',
        description: 'Instructor Anna Smith updated "NodeJS Zero to Hero"',
        instructor_id: 4,
        instructor_name: 'Anna Smith',
        course_id: 2,
        course_name: 'NodeJS Zero to Hero',
        timestamp: '2024-12-18 09:15:00',
        is_read: false
    },
    {
        id: 3,
        type: 'user_registered' as const,
        title: 'New user registered',
        description: 'New student registered: Michael Lee',
        timestamp: '2024-12-18 08:00:00',
        is_read: true
    },
    {
        id: 4,
        type: 'payment_received' as const,
        title: 'Payment received',
        description: 'Payment of $99.99 received for "Complete Web Development"',
        course_id: 1,
        course_name: 'Complete Web Development',
        timestamp: '2024-12-17 16:30:00',
        is_read: true
    }
];
