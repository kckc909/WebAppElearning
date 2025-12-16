/**
 * DATASOURCE: Mock
 * Provides raw data from mock-db
 * NO business logic, NO joins here
 */

import * as mockDb from '../../mock-db';

export class MockDataSource {
    // Accounts
    getAllAccounts() {
        return mockDb.ACCOUNTS;
    }

    getAccountById(id: number) {
        return mockDb.ACCOUNTS.find(a => a.id === id);
    }

    getAccountsByRole(role: mockDb.UserRole) {
        return mockDb.ACCOUNTS.filter(a => a.role === role);
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
        return mockDb.COURSE_SECTIONS.filter(s => s.course_id === courseId);
    }

    getLessonsBySection(sectionId: number) {
        return mockDb.COURSE_LESSONS.filter(l => l.section_id === sectionId);
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

    // Auth
    validateLogin(emailOrUsername: string, password: string) {
        return mockDb.validateLogin(emailOrUsername, password);
    }
}

// Singleton instance
export const mockDataSource = new MockDataSource();
