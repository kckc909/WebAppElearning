const tmp_on_navigate = '/#/'

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
    course_lesson: (courseId: string | number, lessonId: string | number) => `courses/${courseId}/lessons/${lessonId}`,

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
    lesson: (courseId: string | number, lessonId: string | number) => `courses/${courseId}/${lessonId}`,

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

export { tmp_on_navigate, superadmin_routes, admin_routes, instructor_routes, student_routes };
