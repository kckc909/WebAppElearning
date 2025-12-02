const tmp_on_navigate = '/#/'

// ------------------- Super Admin -------------------
const superadmin_routes = {
    base: 'superadmin/',
    dashboard: 'dashboard',
    audit_logs: 'audit-logs',
    system_settings: 'settings',
    users_management: 'users-management',
    login: "login"
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
    base: 'instructor/',
    // Classes Management
    classes_overview: 'classes/overview',
    class_list: 'classes/all',
    class_detail: (classId: string | number) => `classes/${classId}`,
    activity: 'classes/activity',
    assignments: 'classes/assignments',
    attendance: 'classes/attendance',
    grades: 'classes/grades',
    members: 'classes/members',
    schedule: 'classes/schedule',

    // Courses Management
    courses_overview: 'courses/overview',
    courses_list: 'courses/all',
    course_detail: (courseId: string | number) => `courses/${courseId}`,
    course_content: (courseId: string | number) => `courses/${courseId}/content`,
    course_lesson: (courseId: string | number, lessonId: string | number) => `courses/${courseId}/${lessonId}`,
    course_certificates: 'courses-management/certificates',

    // 
    dashboard: 'dashboard',
    document_library: 'document-library',
    notification: 'notification',
    settings: 'settings',
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
