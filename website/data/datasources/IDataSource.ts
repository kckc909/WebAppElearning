/**
 * IDATASOURCE INTERFACE
 * Formal contract that all datasources must implement
 * 
 * Phase 10: Datasource Contract Enforcement
 */

export interface IDataSource {
    // Accounts
    getAllAccounts(): any;
    getAccountById(id: number): any;
    getAccountsByRole(role: any): any;

    // Courses
    getAllCourses(): any;
    getCourseById(id: number): any;
    getCoursesByInstructor(instructorId: number): any;
    getCoursesByCategory(categoryId: number): any;

    // Course Structure
    getSectionsByCourse(courseId: number): any;
    getLessonsBySection(sectionId: number): any;
    getAllCourseSections(): any;
    getAllCourseLessons(): any;

    // Enrollments
    getEnrollmentsByStudent(studentId: number): any;
    getEnrollmentsByCourse(courseId: number): any;
    getEnrollment(courseId: number, studentId: number): any;
    getAllEnrollments(): any;
    getEnrollmentById(id: number): any;
    getAllCourseEnrollments(): any;

    // Reviews
    getReviewsByCourse(courseId: number): any;

    // Classes
    getAllClasses(): any;
    getClassById(id: number): any;
    getClassStudents(classId: number): any;
    getStudentClasses(studentId: number): any;
    getClassCalendar(classId: number): any;
    getClassAssignments(classId: number): any;
    getClassMaterials(classId: number): any;

    // Categories
    getAllCategories(): any;
    getCategoryById(id: number): any;

    // User Profiles
    getProfileByUserId(userId: number): any;

    // Notifications
    getNotificationsByUser(userId: number): any;

    // Transactions
    getTransactionsByUser(userId: number): any;
    getAllTransactions(): any;
    getTransactionById(id: number): any;

    // Certificates
    getCertificatesByStudent(studentId: number): any;
    getAllCertificates(): any;

    // Course Progress
    getProgressByEnrollment(enrollmentId: number): any;
    getAllCourseProgress(): any;

    // Payment Methods
    getAllPaymentMethods(): any;
    getActivePaymentMethods(): any;

    // Payouts
    getPayoutsByInstructor(instructorId: number): any;

    // Admin
    getAllAdminLogs(): any;
    getInstructorVerifications(): any;

    // Auth
    validateLogin(emailOrUsername: string, password: string): any;

    // Lessons (for student view)
    getLessonById(lessonId: number): any;

    // Lesson Versions
    getLessonVersionsByLesson(lessonId: number): any;
    getPublishedLessonVersion(lessonId: number): any;
    getDraftLessonVersion(lessonId: number): any;
    getLessonVersionById(versionId: number): any;
    getAllLessonVersions(): any;

    // Lesson Layouts
    getLayoutByVersionId(versionId: number): any;
    getAllLessonLayouts(): any;

    // Lesson Blocks
    getBlocksByVersionId(versionId: number): any;
    getBlocksBySlot(versionId: number, slotId: string): any;
    getBlockById(blockId: number): any;
    getAllLessonBlocks(): any;

    // Lesson Assets
    getAssetsByLesson(lessonId: number): any;
    getAssetsByVersion(versionId: number): any;
    getAssetById(assetId: number): any;
    getAllLessonAssets(): any;
}
