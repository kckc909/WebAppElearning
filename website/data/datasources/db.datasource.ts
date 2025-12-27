/**
 * DATASOURCE: Database
 * Provides data from real database (Prisma/Backend API)
 * NO business logic, NO joins here
 * 
 * Phase 8: DB Datasource Skeleton
 * Phase 9: Real DB implementation
 */

import { IDataSource } from './IDataSource';

class NotImplementedError extends Error {
    constructor(method: string) {
        super(`[DB Datasource] Method '${method}' not implemented yet. Use API_MODE='mock' or implement in Phase 9.`);
        this.name = 'NotImplementedError';
    }
}

export class DbDataSource implements IDataSource {
    // Accounts
    getAllAccounts() {
        throw new NotImplementedError('getAllAccounts');
    }

    getAccountById(id: number) {
        throw new NotImplementedError('getAccountById');
    }

    getAccountsByRole(role: any) {
        throw new NotImplementedError('getAccountsByRole');
    }

    // Courses
    getAllCourses() {
        throw new NotImplementedError('getAllCourses');
    }

    getCourseById(id: number) {
        throw new NotImplementedError('getCourseById');
    }

    getCoursesByInstructor(instructorId: number) {
        throw new NotImplementedError('getCoursesByInstructor');
    }

    getCoursesByCategory(categoryId: number) {
        throw new NotImplementedError('getCoursesByCategory');
    }

    // Course Structure
    getSectionsByCourse(courseId: number) {
        throw new NotImplementedError('getSectionsByCourse');
    }

    getLessonsBySection(sectionId: number) {
        throw new NotImplementedError('getLessonsBySection');
    }

    getAllCourseSections() {
        throw new NotImplementedError('getAllCourseSections');
    }

    getAllCourseLessons() {
        throw new NotImplementedError('getAllCourseLessons');
    }

    // Enrollments
    getEnrollmentsByStudent(studentId: number) {
        throw new NotImplementedError('getEnrollmentsByStudent');
    }

    getEnrollmentsByCourse(courseId: number) {
        throw new NotImplementedError('getEnrollmentsByCourse');
    }

    getEnrollment(courseId: number, studentId: number) {
        throw new NotImplementedError('getEnrollment');
    }

    getAllEnrollments() {
        throw new NotImplementedError('getAllEnrollments');
    }

    getEnrollmentById(id: number) {
        throw new NotImplementedError('getEnrollmentById');
    }

    getAllCourseEnrollments() {
        throw new NotImplementedError('getAllCourseEnrollments');
    }

    // Reviews
    getReviewsByCourse(courseId: number) {
        throw new NotImplementedError('getReviewsByCourse');
    }

    // Classes
    getAllClasses() {
        throw new NotImplementedError('getAllClasses');
    }

    getClassById(id: number) {
        throw new NotImplementedError('getClassById');
    }

    getClassStudents(classId: number) {
        throw new NotImplementedError('getClassStudents');
    }

    getStudentClasses(studentId: number) {
        throw new NotImplementedError('getStudentClasses');
    }

    getClassCalendar(classId: number) {
        throw new NotImplementedError('getClassCalendar');
    }

    getClassAssignments(classId: number) {
        throw new NotImplementedError('getClassAssignments');
    }

    getClassMaterials(classId: number) {
        throw new NotImplementedError('getClassMaterials');
    }

    // Categories
    getAllCategories() {
        throw new NotImplementedError('getAllCategories');
    }

    getCategoryById(id: number) {
        throw new NotImplementedError('getCategoryById');
    }

    // User Profiles
    getProfileByUserId(userId: number) {
        throw new NotImplementedError('getProfileByUserId');
    }

    // Notifications
    getNotificationsByUser(userId: number) {
        throw new NotImplementedError('getNotificationsByUser');
    }

    // Transactions
    getTransactionsByUser(userId: number) {
        throw new NotImplementedError('getTransactionsByUser');
    }

    getAllTransactions() {
        throw new NotImplementedError('getAllTransactions');
    }

    getTransactionById(id: number) {
        throw new NotImplementedError('getTransactionById');
    }

    // Certificates
    getCertificatesByStudent(studentId: number) {
        throw new NotImplementedError('getCertificatesByStudent');
    }

    getAllCertificates() {
        throw new NotImplementedError('getAllCertificates');
    }

    // Course Progress
    getProgressByEnrollment(enrollmentId: number) {
        throw new NotImplementedError('getProgressByEnrollment');
    }

    getAllCourseProgress() {
        throw new NotImplementedError('getAllCourseProgress');
    }

    // Payment Methods
    getAllPaymentMethods() {
        throw new NotImplementedError('getAllPaymentMethods');
    }

    getActivePaymentMethods() {
        throw new NotImplementedError('getActivePaymentMethods');
    }

    // Payouts
    getPayoutsByInstructor(instructorId: number) {
        throw new NotImplementedError('getPayoutsByInstructor');
    }

    // Admin
    getAllAdminLogs() {
        throw new NotImplementedError('getAllAdminLogs');
    }

    getInstructorVerifications() {
        throw new NotImplementedError('getInstructorVerifications');
    }

    // Auth
    validateLogin(emailOrUsername: string, password: string) {
        throw new NotImplementedError('validateLogin');
    }
}

// Singleton instance
export const dbDataSource = new DbDataSource();
