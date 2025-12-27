/**
 * API Services Index
 * Factory pattern - exports correct implementation based on API mode
 * 
 * Usage:
 * import { coursesApi, classesApi, enrollmentsApi } from '../API';
 * 
 * Để chuyển từ Mock sang Real API:
 * 1. Toggle ApiModeSwitch component
 * 2. Hoặc set localStorage.setItem('USE_MOCK_API', 'false')
 */

import { USE_MOCK_API } from './config';

// Log API mode on startup
console.log('[API] USE_MOCK_API:', USE_MOCK_API);

// NEW: Class-based implementations
import { MockCoursesApi } from './implementations/mock/MockCoursesApi';
import { DbCoursesApi } from './implementations/db/DbCoursesApi';
import { MockAccountsApi } from './implementations/mock/MockAccountsApi';
import { DbAccountsApi } from './implementations/db/DbAccountsApi';
import { MockClassesApi } from './implementations/mock/MockClassesApi';
import { DbClassesApi } from './implementations/db/DbClassesApi';
import { MockEnrollmentsApi } from './implementations/mock/MockEnrollmentsApi';
import { DbEnrollmentsApi } from './implementations/db/DbEnrollmentsApi';
import { MockTransactionsApi } from './implementations/mock/MockTransactionsApi';
import { DbTransactionsApi } from './implementations/db/DbTransactionsApi';
import { MockNotificationsApi } from './implementations/mock/MockNotificationsApi';
import { DbNotificationsApi } from './implementations/db/DbNotificationsApi';
import { MockAuditLogsApi } from './implementations/mock/MockAuditLogsApi';
import { DbAuditLogsApi } from './implementations/db/DbAuditLogsApi';
import { MockSystemLogsApi } from './implementations/mock/MockSystemLogsApi';
import { DbSystemLogsApi } from './implementations/db/DbSystemLogsApi';
import { MockBackupRestoreApi } from './implementations/mock/MockBackupRestoreApi';
import { DbBackupRestoreApi } from './implementations/db/DbBackupRestoreApi';
import { MockAdminActivitiesApi } from './implementations/mock/MockAdminActivitiesApi';
import { DbAdminActivitiesApi } from './implementations/db/DbAdminActivitiesApi';
import { MockRevenueApi } from './implementations/mock/MockRevenueApi';
import { DbRevenueApi } from './implementations/db/DbRevenueApi';
import { MockMaterialsApi } from './implementations/mock/MockMaterialsApi';
import { DbMaterialsApi } from './implementations/db/DbMaterialsApi';
import { MockAssignmentsApi } from './implementations/mock/MockAssignmentsApi';
import { DbAssignmentsApi } from './implementations/db/DbAssignmentsApi';
import { MockAttendanceApi } from './implementations/mock/MockAttendanceApi';
import { DbAttendanceApi } from './implementations/db/DbAttendanceApi';

// ============================================
// FACTORY EXPORTS - Only 1 if-else per API!
// ============================================

// Core APIs ✅
export const coursesApi = USE_MOCK_API ? new MockCoursesApi() : new DbCoursesApi();
export const accService = USE_MOCK_API ? new MockAccountsApi() : new DbAccountsApi();
export const classesApi = USE_MOCK_API ? new MockClassesApi() : new DbClassesApi();
export const enrollmentsApi = USE_MOCK_API ? new MockEnrollmentsApi() : new DbEnrollmentsApi();
export const transactionsApi = USE_MOCK_API ? new MockTransactionsApi() : new DbTransactionsApi();
export const notificationsApi = USE_MOCK_API ? new MockNotificationsApi() : new DbNotificationsApi();

// New APIs ✅
export const auditLogsApi = USE_MOCK_API ? new MockAuditLogsApi() : new DbAuditLogsApi();
export const systemLogsApi = USE_MOCK_API ? new MockSystemLogsApi() : new DbSystemLogsApi();
export const backupRestoreApi = USE_MOCK_API ? new MockBackupRestoreApi() : new DbBackupRestoreApi();
export const adminActivitiesApi = USE_MOCK_API ? new MockAdminActivitiesApi() : new DbAdminActivitiesApi();
export const revenueApi = USE_MOCK_API ? new MockRevenueApi() : new DbRevenueApi();
export const materialsApi = USE_MOCK_API ? new MockMaterialsApi() : new DbMaterialsApi();
export const assignmentsApi = USE_MOCK_API ? new MockAssignmentsApi() : new DbAssignmentsApi();
export const attendanceApi = USE_MOCK_API ? new MockAttendanceApi() : new DbAttendanceApi();

// ============================================
// UNIFIED API INSTANCE for react-query hooks
// ============================================
export function getApiInstance() {
    return {
        courses: coursesApi,
        accounts: accService,
        classes: classesApi,
        enrollments: {
            ...enrollmentsApi,
            getEnrollments: (params?: { student_id?: number }) =>
                enrollmentsApi.getMyEnrollments(params?.student_id || 0)
        },
        transactions: transactionsApi,
        notifications: {
            ...notificationsApi,
            getNotifications: (params?: any) => notificationsApi.getAll(params?.user_id || 0)
        },
        auditLogs: auditLogsApi,
        systemLogs: systemLogsApi,
        backups: backupRestoreApi,
        adminActivities: adminActivitiesApi,
        revenue: revenueApi,
        materials: materialsApi,
        assignments: assignmentsApi,
        attendance: attendanceApi,
        // Placeholder APIs for hooks that need them
        certificates: {
            getCertificates: async (params?: { student_id?: number }) => {
                // Get from enrollments with certificates
                const enrollments = await enrollmentsApi.getMyEnrollments(params?.student_id || 0);
                if (enrollments.success) {
                    return enrollments.data.filter((e: any) => e.certificate).map((e: any) => e.certificate);
                }
                return [];
            }
        },
        lessons: {
            getLessonById: async (lessonId: number) => {
                // Import dataSource here to avoid circular imports
                const { dataSource } = await import('../data/datasources/datasource.router');

                // Get lesson basic info
                const lesson = dataSource.getLessonById(lessonId);
                if (!lesson) {
                    return { id: lessonId, title: 'Lesson not found', blocks: [] };
                }

                // Get published version of this lesson
                const version = dataSource.getPublishedLessonVersion(lessonId);
                if (!version) {
                    return {
                        id: lesson.id,
                        title: lesson.title,
                        layout_type: 'single',
                        blocks: [],
                        metadata: {}
                    };
                }

                // Get blocks for this version
                const blocks = dataSource.getBlocksByVersionId(version.id) || [];

                // Get layout if exists
                const layout = dataSource.getLayoutByVersionId(version.id);

                return {
                    id: lesson.id,
                    title: lesson.title,
                    section_id: lesson.section_id,
                    duration: (lesson as any).duration || 0,
                    is_preview: (lesson as any).is_preview || false,
                    layout_type: version.layout_type,
                    layout: layout || null,
                    metadata: version.metadata,
                    blocks: blocks.map((b: any) => ({
                        id: b.id,
                        slot_id: b.slot_id,
                        type: b.type,
                        order_index: b.order_index,
                        content: b.content,
                        settings: b.settings
                    })).sort((a: any, b: any) => a.order_index - b.order_index)
                };
            },
            trackLessonView: async (lessonId: number, studentId: number) => {
                // Placeholder - will track lesson progress
                console.log(`Tracking view: lesson ${lessonId} by student ${studentId}`);
                return { success: true };
            }
        }
    };
}

// Re-export types
export type { ApiResponse } from './config';
export { USE_MOCK_API } from './config';

