// ------------------- Super Admin -------------------
const superadmin_routes = {
    base: 'superadmin/',
    dashboard: 'dashboard',
    audit_logs: 'audit-logs',
    system_settings: 'settings',
    users_management: 'users-management',
    login: `login`
};

// ------------------- Admin -------------------
const admin_routes = {
    base: 'admin/',
    // Classes Management
    all_classes: 'classes',
    classes_overview: 'classes/overview',
    documents: 'classes/documents',
    class_grades: 'classes/grades',
    schedule: 'classes/schedule',
    class_detail: (classId: string | number) => `classes/${classId}`,

    // Courses Management
    all_courses: 'courses',
    approval: 'courses-management/approval',
    certificates: 'courses-management/certificates',
    courses_overview: 'courses-overview',
    course_grades: 'courses-management/grades',
    course_detail: (courseId: string | number) => `courses/${courseId}`,
    lesson_preview: (courseId: string | number, lessonId: string | number) => `courses/${courseId}/lesson/${lessonId}`,

    // CMS
    cms: 'cms',

    // Dashboard
    dashboard: 'dashboard',

    // Student Management
    student_management: 'student-management',

    // Instructor Management
    instructor_management: 'instructor-management',
    instructor_verification: 'instructor-verification',

    // Finance
    transactions: 'finance/transactions',
    revenue: 'finance/revenue',
    payouts: 'finance/payouts',

    // Others
    document_library: 'document-library',
    notification: 'notification',
    analytics_reports: 'analytics-reports',
    settings: 'settings',
};

// ------------------- Instructor -------------------
const instructor_routes = {
    base: `instructor/`,

    // Dashboard
    dashboard: `dashboard`,

    // ---------------- COURSES MANAGEMENT ----------------
    courses_overview: `courses/overview`,
    courses_list: `courses/all`,

    // New features
    courses_create: `courses/create`,
    courses_draft: `courses/draft`,

    course_detail: (courseId: string | number) => `courses/${courseId}`,

    // LESSON BUILDER - URL pattern: /courses/:courseId/lesson-builder/:lessonId?action=edit-lesson
    lesson_builder: (courseId: string | number, lessonId?: string | number, params?: {
        action?: 'add-section' | 'add-lesson' | 'edit-lesson',
        sectionId?: string | number,
        focusSection?: string | number,
        focusLesson?: string | number
    }) => {
        // If lessonId provided, include in path
        const baseUrl = lessonId
            ? `courses/${courseId}/lesson-builder/${lessonId}`
            : `courses/${courseId}/lesson-builder`;

        if (!params) return baseUrl;

        const searchParams = new URLSearchParams();
        if (params.action) searchParams.set('action', params.action);
        if (params.sectionId) searchParams.set('sectionId', String(params.sectionId));
        if (params.focusSection) searchParams.set('focusSection', String(params.focusSection));
        if (params.focusLesson) searchParams.set('focusLesson', String(params.focusLesson));

        const query = searchParams.toString();
        return query ? `${baseUrl}?${query}` : baseUrl;
    },

    course_curriculum: (courseId: string | number) => `courses/${courseId}/curriculum`,
    course_reviews: (courseId: string | number) => `courses/${courseId}/reviews`,
    course_students: (courseId: string | number) => `courses/${courseId}/students`,
    course_certificates: (courseId: string | number) => `courses/${courseId}/certificates`,
    course_analytics: (courseId: string | number) => `courses/${courseId}/analytics`,
    course_settings: (courseId: string | number) => `courses/${courseId}/settings`,

    // ---------------- CLASSES MANAGEMENT ----------------
    classes_overview: `classes/overview`,
    class_list: `classes/all`,

    schedule: `classes/schedule`,

    class_detail: (classId: string | number) => `classes/${classId}`,
    class_live: (classId: string | number) => `classes/${classId}/live`,
    class_activity: (classId: string | number) => `classes/${classId}/activity`,
    class_attendance: (classId: string | number) => `classes/${classId}/attendance`,
    class_assignments: (classId: string | number) => `classes/${classId}/assignments`,
    class_materials: (classId: string | number) => `classes/${classId}/materials`,
    class_grades: (classId: string | number) => `classes/${classId}/grades`,
    class_members: (classId: string | number) => `classes/${classId}/members`,
    class_settings: (classId: string | number) => `classes/${classId}/settings`,

    // ---------------- OTHER ----------------
    document_library: `document-library`,
    notification: `notification`,
    settings: `settings`,

    // Revenue & Analytics
    revenue: `revenue`,
    analytics: `analytics`,
};


// ------------------- Student -------------------
const student_routes = {
    home: '/',
    dashboard: 'dashboard',

    // Classes
    my_classes: 'classes',
    class_detail: (classId: string | number) => `classes/${classId}`,

    // Courses
    courses: 'courses',
    my_courses: 'courses/my',
    course_detail: (courseId: string | number) => `courses/${courseId}`,
    lesson: (courseId: string | number, lessonId: string | number) => `courses/${courseId}/lesson/${lessonId}`,

    // Checkout & Payments
    checkout: 'checkout',
    payment_history: 'payment-history',

    certificates: 'certificates',
    schedule: 'schedule',
    profile: 'profile',
    stats: 'stats',
    settings: 'settings',

    // Info / Auth
    about: 'about',
    auth: 'auth',
    become_instructor: 'become-instructor',

    // Error Pages
    not_found: 'not-found',
    error: 'error',
};

export { superadmin_routes, admin_routes, instructor_routes, student_routes };
