/**
 * DATASOURCE: Mock
 * Provides raw data from mock-db
 * NO business logic, NO joins here
 */

import * as mockDb from '../../mock-db';
import { COURSE_PROGRESS, CLASS_ASSIGNMENTS, CLASS_MATERIALS } from '../../mock-db/supplemental.mock';
import { IDataSource } from './IDataSource';



export class MockDataSource implements IDataSource {
    // Accounts
    getAllAccounts() {
        return mockDb.ACCOUNTS;
    }

    getAccountById(id: number) {
        return mockDb.ACCOUNTS.find(a => a.id === id);
    }

    getAccountsByRole(role: mockDb.UserRole) {
        return mockDb.ACCOUNTS.filter((a: any) => a.role == role);
    }

    // Courses
    getAllCourses() {
        return mockDb.COURSES;
    }

    getCourseById(id: number) {
        return mockDb.COURSES.find(c => c.id === id);
    }

    getCoursesByInstructor(instructorId: number) {
        return mockDb.COURSES.filter(c => c.instructor_id === instructorId);
    }

    getCoursesByCategory(categoryId: number) {
        return mockDb.COURSES.filter(c => c.category_id === categoryId);
    }

    // Course Structure
    getSectionsByCourse(courseId: number) {
        return mockDb.COURSE_SECTIONS.filter((s: any) => s.course_id === courseId);
    }

    getLessonsBySection(sectionId: number) {
        return mockDb.COURSE_LESSONS.filter((l: any) => l.section_id === sectionId);
    }

    getLessonById(lessonId: number) {
        return mockDb.COURSE_LESSONS.find((l: any) => l.id === lessonId);
    }

    getAllCourseSections() {
        return mockDb.COURSE_SECTIONS;
    }

    getAllCourseLessons() {
        return mockDb.COURSE_LESSONS;
    }

    // Enrollments
    getEnrollmentsByStudent(studentId: number) {
        return mockDb.COURSE_ENROLLMENTS.filter(e => e.student_id === studentId);
    }

    getEnrollmentsByCourse(courseId: number) {
        return mockDb.COURSE_ENROLLMENTS.filter(e => e.course_id === courseId);
    }

    getEnrollment(courseId: number, studentId: number) {
        return mockDb.COURSE_ENROLLMENTS.find(
            e => e.course_id === courseId && e.student_id === studentId
        );
    }

    // Reviews
    getReviewsByCourse(courseId: number) {
        return mockDb.COURSE_REVIEWS.filter(r => r.course_id === courseId);
    }

    // Classes
    getAllClasses() {
        return mockDb.CLASSES;
    }

    getClassById(id: number) {
        return mockDb.CLASSES.find(c => c.id === id);
    }

    getClassStudents(classId: number) {
        return mockDb.CLASS_STUDENTS.filter(cs => cs.class_id === classId);
    }

    getStudentClasses(studentId: number) {
        return mockDb.CLASS_STUDENTS.filter(cs => cs.student_id === studentId);
    }

    getClassCalendar(classId: number) {
        return mockDb.CLASS_CALENDAR.filter(cal => cal.class_id === classId);
    }

    // Categories
    getAllCategories() {
        return mockDb.COURSE_CATEGORIES;
    }

    getCategoryById(id: number) {
        return mockDb.COURSE_CATEGORIES.find(c => c.id === id);
    }

    // User Profiles
    getProfileByUserId(userId: number) {
        return mockDb.USER_PROFILES.find(p => p.user_id === userId);
    }

    // Notifications
    getNotificationsByUser(userId: number) {
        return mockDb.NOTIFICATIONS.filter(n => n.user_id === userId);
    }

    // Transactions
    getTransactionsByUser(userId: number) {
        return mockDb.TRANSACTIONS.filter(t => t.user_id === userId);
    }

    // Certificates
    getCertificatesByStudent(studentId: number) {
        return mockDb.CERTIFICATES.filter(c => c.student_id === studentId);
    }

    getAllCertificates() {
        return mockDb.CERTIFICATES;
    }

    // Course Progress
    getProgressByEnrollment(enrollmentId: number) {
        return COURSE_PROGRESS.filter((p: any) => p.enrollment_id === enrollmentId);
    }

    getAllCourseProgress() {
        return COURSE_PROGRESS;
    }

    // Enrollments (additional)
    getAllEnrollments() {
        return mockDb.COURSE_ENROLLMENTS;
    }

    getEnrollmentById(id: number) {
        return mockDb.COURSE_ENROLLMENTS.find((e: any) => e.id === id);
    }

    getAllCourseEnrollments() {
        return mockDb.COURSE_ENROLLMENTS;
    }

    // Class Materials & Assignments
    getClassAssignments(classId: number) {
        return CLASS_ASSIGNMENTS.filter((a: any) => a.class_id === classId);
    }

    getClassMaterials(classId: number) {
        return CLASS_MATERIALS.filter((m: any) => m.class_id === classId);
    }

    // Transactions (additional)
    getAllTransactions() {
        return mockDb.TRANSACTIONS;
    }

    getTransactionById(id: number) {
        return mockDb.TRANSACTIONS.find(t => t.id === id);
    }

    // Payment Methods
    getAllPaymentMethods() {
        return mockDb.PAYMENT_METHODS;
    }

    getActivePaymentMethods() {
        return mockDb.PAYMENT_METHODS.filter(m => m.is_active);
    }

    // Payouts

    getPayoutsByInstructor(instructorId: number) {
        return mockDb.PAYOUTS.filter(p => p.instructor_id === instructorId);
    }

    // Admin
    getAllAdminLogs() {
        return mockDb.ADMIN_LOGS;
    }

    getInstructorVerifications() {
        return mockDb.INSTRUCTOR_VERIFICATIONS;
    }

    // ===== LESSON BUILDER (Normalized Schema) =====

    // Lesson Versions
    getLessonVersionsByLesson(lessonId: number) {
        return mockDb.LESSON_VERSIONS.filter(v => v.lesson_id === lessonId);
    }

    getPublishedLessonVersion(lessonId: number) {
        return mockDb.LESSON_VERSIONS.find(v => v.lesson_id === lessonId && v.status === 'published');
    }

    getDraftLessonVersion(lessonId: number) {
        return mockDb.LESSON_VERSIONS.find(v => v.lesson_id === lessonId && v.status === 'draft');
    }

    getLessonVersionById(versionId: number) {
        return mockDb.LESSON_VERSIONS.find(v => v.id === versionId);
    }

    getAllLessonVersions() {
        return mockDb.LESSON_VERSIONS;
    }

    // Lesson Layouts
    getLayoutByVersionId(versionId: number) {
        return mockDb.LESSON_LAYOUTS.find(l => l.lesson_version_id === versionId);
    }

    getAllLessonLayouts() {
        return mockDb.LESSON_LAYOUTS;
    }

    // Lesson Blocks
    getBlocksByVersionId(versionId: number) {
        return mockDb.LESSON_BLOCKS.filter(b => b.lesson_version_id === versionId);
    }

    getBlocksBySlot(versionId: number, slotId: string) {
        return mockDb.LESSON_BLOCKS.filter(
            b => b.lesson_version_id === versionId && b.slot_id === slotId
        ).sort((a, b) => a.order_index - b.order_index);
    }

    getBlockById(blockId: number) {
        return mockDb.LESSON_BLOCKS.find(b => b.id === blockId);
    }

    getAllLessonBlocks() {
        return mockDb.LESSON_BLOCKS;
    }

    // Lesson Assets
    getAssetsByLesson(lessonId: number) {
        return mockDb.LESSON_ASSETS.filter(a => a.lesson_id === lessonId);
    }

    getAssetsByVersion(versionId: number) {
        return mockDb.LESSON_ASSETS.filter(a => a.lesson_version_id === versionId);
    }

    getAssetById(assetId: number) {
        return mockDb.LESSON_ASSETS.find(a => a.id === assetId);
    }

    getAllLessonAssets() {
        return mockDb.LESSON_ASSETS;
    }

    // ===== LESSON BUILDER WRITE OPERATIONS (Mock Persistence) =====

    // Update lesson version metadata
    updateLessonVersionMetadata(versionId: number, metadata: any) {
        const version = mockDb.LESSON_VERSIONS.find(v => v.id === versionId);
        if (version) {
            version.metadata = { ...version.metadata, ...metadata };
            version.updated_at = new Date();
            return true;
        }
        return false;
    }

    // Update block
    updateLessonBlock(blockId: number, updates: any) {
        const blockIndex = mockDb.LESSON_BLOCKS.findIndex(b => b.id === blockId);
        if (blockIndex !== -1) {
            mockDb.LESSON_BLOCKS[blockIndex] = {
                ...mockDb.LESSON_BLOCKS[blockIndex],
                ...updates,
                updated_at: new Date()
            };
            return true;
        }
        return false;
    }

    // Add block
    addLessonBlock(block: any) {
        const newId = Math.max(...mockDb.LESSON_BLOCKS.map(b => b.id), 0) + 1;
        const newBlock = {
            id: newId,
            ...block,
            created_at: new Date(),
            updated_at: new Date()
        };
        mockDb.LESSON_BLOCKS.push(newBlock);
        return newId;
    }

    // Delete block
    deleteLessonBlock(blockId: number) {
        const index = mockDb.LESSON_BLOCKS.findIndex(b => b.id === blockId);
        if (index !== -1) {
            mockDb.LESSON_BLOCKS.splice(index, 1);
            return true;
        }
        return false;
    }

    // Reorder blocks
    reorderLessonBlocks(versionId: number, slotId: string, blockIds: number[]) {
        blockIds.forEach((blockId, index) => {
            const block = mockDb.LESSON_BLOCKS.find(b => b.id === blockId);
            if (block && block.lesson_version_id === versionId && block.slot_id === slotId) {
                block.order_index = index;
                block.updated_at = new Date();
            }
        });
        return true;
    }

    // Move block to different slot
    moveLessonBlock(blockId: number, targetSlotId: string, targetOrderIndex: number) {
        const block = mockDb.LESSON_BLOCKS.find(b => b.id === blockId);
        if (block) {
            block.slot_id = targetSlotId;
            block.order_index = targetOrderIndex;
            block.updated_at = new Date();
            return true;
        }
        return false;
    }

    // Auth
    validateLogin(emailOrUsername: string, password: string) {
        return mockDb.validateLogin(emailOrUsername, password);
    }

    // ===== NEW METHODS FOR NEW APIS =====

    // Audit Logs
    getAuditLogs() {
        return mockDb.AUDIT_LOGS || [];
    }

    getAuditLogById(id: number) {
        return (mockDb.AUDIT_LOGS || []).find((l: any) => l.id === id);
    }

    getAuditLogsByUser(userId: number) {
        return (mockDb.AUDIT_LOGS || []).filter((l: any) => l.user_id === userId);
    }

    getAuditLogsByResource(resourceType: string, resourceId: number) {
        return (mockDb.AUDIT_LOGS || []).filter((l: any) =>
            l.resource_type === resourceType && l.resource_id === resourceId
        );
    }

    // System Logs
    getSystemLogs() {
        return mockDb.SYSTEM_LOGS || [];
    }

    getSystemLogById(id: number) {
        return (mockDb.SYSTEM_LOGS || []).find((l: any) => l.id === id);
    }

    createSystemLog(log: any) {
        const logs = mockDb.SYSTEM_LOGS || [];
        const newLog = {
            id: logs.length + 1,
            ...log,
            timestamp: new Date().toISOString()
        };
        logs.push(newLog);
        return newLog;
    }

    deleteOldSystemLogs(days: number) {
        const logs = mockDb.SYSTEM_LOGS || [];
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const initialLength = logs.length;
        const filtered = logs.filter((l: any) => new Date(l.timestamp) > cutoffDate);
        return initialLength - filtered.length;
    }

    // Backups
    getBackups() {
        return mockDb.SYSTEM_BACKUPS || [];
    }

    getBackupById(id: number) {
        return (mockDb.SYSTEM_BACKUPS || []).find((b: any) => b.id === id);
    }

    createBackup(type: 'full' | 'incremental' | 'differential') {
        const backups = mockDb.SYSTEM_BACKUPS || [];
        const newBackup = {
            id: backups.length + 1,
            filename: `backup_${Date.now()}.sql`,
            size: Math.floor(Math.random() * 1000000000),
            created_at: new Date().toISOString(),
            type,
            status: 'completed' as const,
            created_by: 1
        };
        backups.push(newBackup);
        return newBackup;
    }

    restoreBackup(id: number) {
        const backup = this.getBackupById(id);
        if (!backup) {
            return { success: false, message: 'Backup not found' };
        }
        return { success: true, message: 'Backup restored successfully' };
    }

    deleteBackup(id: number) {
        const backups = mockDb.SYSTEM_BACKUPS || [];
        const index = backups.findIndex((b: any) => b.id === id);
        if (index !== -1) {
            backups.splice(index, 1);
        }
    }

    getBackupDownloadUrl(id: number) {
        const backup = this.getBackupById(id);
        return backup ? `/downloads/backups/${backup.filename}` : '';
    }

    // Admin Activities
    getAdminActivities() {
        return mockDb.ADMIN_ACTIVITIES || [];
    }

    markAdminActivityAsRead(id: number) {
        const activities = mockDb.ADMIN_ACTIVITIES || [];
        const activity = activities.find((a: any) => a.id === id);
        if (activity) {
            activity.is_read = true;
        }
    }

    markAllAdminActivitiesAsRead() {
        const activities = mockDb.ADMIN_ACTIVITIES || [];
        activities.forEach((a: any) => {
            a.is_read = true;
        });
    }

    // Revenue
    getRevenueData(timeRange: 'day' | 'week' | 'month' | 'year') {
        // Generate mock revenue data based on time range
        const data = [];
        const periods = timeRange === 'year' ? 12 : timeRange === 'month' ? 30 : timeRange === 'week' ? 7 : 24;

        for (let i = 0; i < periods; i++) {
            data.push({
                period: `Period ${i + 1}`,
                revenue: Math.floor(Math.random() * 100000),
                courses_sold: Math.floor(Math.random() * 50),
                classes_sold: Math.floor(Math.random() * 20),
                transactions: Math.floor(Math.random() * 100)
            });
        }
        return data;
    }

    getRevenueByCategoryData(timeRange: 'month' | 'year') {
        const categories = this.getAllCategories();
        return categories.map((cat: any) => ({
            category_id: cat.id,
            category_name: cat.name,
            revenue: Math.floor(Math.random() * 50000),
            percentage: Math.floor(Math.random() * 100)
        }));
    }

    getTotalRevenue(startDate?: string, endDate?: string) {
        const transactions = this.getAllTransactions();
        const total = transactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
        return total;
    }

    // Materials
    getMaterialsByClass(classId: number) {
        return CLASS_MATERIALS.filter((m: any) => m.class_id === classId);
    }

    getMaterialById(id: number) {
        return CLASS_MATERIALS.find((m: any) => m.id === id);
    }

    uploadMaterial(material: any) {
        const newMaterial = {
            id: CLASS_MATERIALS.length + 1,
            ...material,
            uploaded_at: new Date().toISOString()
        };
        CLASS_MATERIALS.push(newMaterial);
        return newMaterial;
    }

    updateMaterial(id: number, data: any) {
        const material = CLASS_MATERIALS.find((m: any) => m.id === id);
        if (material) {
            Object.assign(material, data);
            return material;
        }
        return null;
    }

    deleteMaterial(id: number) {
        const index = CLASS_MATERIALS.findIndex((m: any) => m.id === id);
        if (index !== -1) {
            CLASS_MATERIALS.splice(index, 1);
        }
    }

    getMaterialDownloadUrl(id: number) {
        const material = this.getMaterialById(id);
        return material ? material.url || `/downloads/materials/${material.name}` : '';
    }

    // Assignments
    getAssignmentsByClass(classId: number) {
        return CLASS_ASSIGNMENTS.filter((a: any) => a.class_id === classId);
    }

    getAssignmentById(id: number) {
        return CLASS_ASSIGNMENTS.find((a: any) => a.id === id);
    }

    createAssignment(assignment: any) {
        const newAssignment = {
            id: CLASS_ASSIGNMENTS.length + 1,
            ...assignment,
            created_at: new Date().toISOString()
        };
        CLASS_ASSIGNMENTS.push(newAssignment);
        return newAssignment;
    }

    updateAssignment(id: number, data: any) {
        const assignment = CLASS_ASSIGNMENTS.find((a: any) => a.id === id);
        if (assignment) {
            Object.assign(assignment, data);
            return assignment;
        }
        return null;
    }

    deleteAssignment(id: number) {
        const index = CLASS_ASSIGNMENTS.findIndex((a: any) => a.id === id);
        if (index !== -1) {
            CLASS_ASSIGNMENTS.splice(index, 1);
        }
    }

    getAssignmentSubmissions(assignmentId: number) {
        // Mock submissions data
        return [
            {
                id: 1,
                assignment_id: assignmentId,
                student_id: 1,
                student_name: 'Student 1',
                submitted_at: new Date().toISOString(),
                content: 'Submission content',
                status: 'submitted' as const
            }
        ];
    }

    gradeSubmission(submissionId: number, grade: number, feedback?: string) {
        // Mock grading
        return {
            id: submissionId,
            grade,
            feedback,
            status: 'graded' as const
        };
    }

    // Attendance
    getAttendanceSummaryByClass(classId: number) {
        const students = this.getClassStudents(classId);
        return students.map((cs: any) => {
            const student = this.getAccountById(cs.student_id);
            return {
                student_id: cs.student_id,
                student_name: student?.name || 'Unknown',
                present: Math.floor(Math.random() * 20),
                absent: Math.floor(Math.random() * 5),
                late: Math.floor(Math.random() * 3),
                excused: Math.floor(Math.random() * 2),
                total_sessions: 25,
                attendance_rate: 85 + Math.floor(Math.random() * 15)
            };
        });
    }

    getAttendanceBySession(sessionId: number) {
        // Mock attendance records for a session
        return [
            {
                id: 1,
                class_id: 1,
                session_id: sessionId,
                student_id: 1,
                student_name: 'Student 1',
                status: 'present' as const,
                date: new Date().toISOString()
            }
        ];
    }

    getAttendanceByStudent(studentId: number, classId: number) {
        // Mock student attendance records
        return [
            {
                id: 1,
                class_id: classId,
                session_id: 1,
                student_id: studentId,
                student_name: 'Student',
                status: 'present' as const,
                date: new Date().toISOString()
            }
        ];
    }

    markAttendance(records: any[]) {
        return records.map((r, i) => ({
            id: i + 1,
            ...r
        }));
    }

    updateAttendanceRecord(id: number, status: any, notes?: string) {
        return {
            id,
            status,
            notes
        };
    }
}

// Singleton instance
export const mockDataSource = new MockDataSource();
