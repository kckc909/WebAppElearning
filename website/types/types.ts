// ============================================
// PRIMITIVE HELPERS
// ============================================
export type ID = number;
export type DateTimeString = string;

// ============================================
// ENUMS
// ============================================
export enum ClassExamsExamType {
    quiz = "quiz",
    written = "written",
    oral = "oral",
}

// ============================================
// PRISMA-BASED TYPES (from database schema)
// ============================================

/* Accounts */
export interface Account {
    id: ID;
    full_name: string;
    username?: string | null;
    email: string;
    password_hash: string;
    avatar_url?: string | null;
    role?: number | null;
    status?: number | null;
    created_at?: DateTimeString | null;
    updated_at?: DateTimeString | null;
}

/* Admin logs */
export interface AdminLog {
    id: ID;
    admin_id: ID;
    action?: string | null;
    target_table?: string | null;
    target_id?: number | null;
    created_at?: DateTimeString | null;
}

/* Certificates */
export interface Certificate {
    id: ID;
    student_id: ID;
    course_id: ID;
    certificate_code?: string | null;
    issued_at?: DateTimeString | null;
    pdf_url?: string | null;
}

/* Class assignments */
export interface ClassAssignment {
    id: ID;
    class_id: ID;
    title?: string | null;
    description?: string | null;
    file_url?: string | null;
    due_date?: DateTimeString | null;
    created_at?: DateTimeString | null;
}

/* Class calendar */
export interface ClassCalendar {
    id: ID;
    class_id: ID;
    title?: string | null;
    description?: string | null;
    event_date?: DateTimeString | null;
    duration_minutes?: number | null;
    lesson?: number | null;
}

/* Class exam results */
export interface ClassExamResult {
    id: ID;
    exam_id: ID;
    student_id: ID;
    score?: number | null; // decimal
    feedback?: string | null;
    graded_at?: DateTimeString | null;
}

/* Class exams */
export interface ClassExam {
    id: ID;
    class_id: ID;
    title?: string | null;
    exam_type?: ClassExamsExamType | null;
    total_score?: number | null; // decimal
    created_at?: DateTimeString | null;
}

/* Class materials */
export interface ClassMaterial {
    id: ID;
    class_id: ID;
    title?: string | null;
    description?: string | null;
    file_url?: string | null;
    uploaded_at?: DateTimeString | null;
}

/* Class students */
export interface ClassStudent {
    id: ID;
    class_id: ID;
    student_id: ID;
    joined_at?: DateTimeString | null;
    status?: number | null;
}

/* Class submissions */
export interface ClassSubmission {
    id: ID;
    assignment_id: ID;
    student_id: ID;
    submission_url?: string | null;
    submitted_at?: DateTimeString | null;
    grade?: number | null; // decimal
    feedback?: string | null;
}

/* Classes (class sessions) */
export interface Class {
    id: ID;
    course_id: ID;
    instructor_id: ID;
    title: string;
    description?: string | null;
    start_date?: DateTimeString | null;
    end_date?: DateTimeString | null;
    meeting_link?: string | null;
    status?: number | null;
    created_at?: DateTimeString | null;
}

/* Content ides */
export interface ContentIde {
    id: ID;
    user_id: ID;
    content_id: ID;
    language: string;
    content?: string | null;
    test_results?: any | null; // JSON
    status?: number | null;
    editor_config?: any | null; // JSON
}

/* Content ides starter */
export interface ContentIdeStarter {
    id: ID;
    content_id: ID;
    language: string;
    content?: string | null;
}

/* Course categories */
export interface CourseCategory {
    id: ID;
    name: string;
    parent_id?: number | null;
}

/* Course enrollments */
export interface CourseEnrollment {
    id: ID;
    course_id: ID;
    student_id: ID;
    enrolled_at?: DateTimeString | null;
    progress?: number | null; // decimal
    certificate_url?: string | null;
    status?: number | null;
}

/* Course lessons */
export interface CourseLesson {
    id: ID;
    section_id: ID;
    title: string;
    order_index?: number | null;
    layout?: number | null;
}

/* Course progress */
export interface CourseProgress {
    id: ID;
    enrollment_id: ID;
    lesson_id: ID;
    is_completed?: boolean | null;
    completed_at?: DateTimeString | null;
}

/* Course reviews */
export interface CourseReview {
    id: ID;
    course_id: ID;
    student_id: ID;
    rating?: number | null;
    comment?: string | null;
    created_at?: DateTimeString | null;
}

/* Course sections */
export interface CourseSection {
    id: ID;
    course_id: ID;
    title: string;
    order_index?: number | null;
}

/* Courses */
export interface Course {
    id: ID;
    instructor_id: ID;
    category_id?: number | null;
    title: string;
    short_description?: string | null;
    description?: string | null;
    level?: number | null;
    language?: string | null;
    price?: number | null;
    discount_price?: number | null;
    thumbnail?: string | null;
    complete_at?: number | null;
    status?: number | null;
    created_at?: DateTimeString | null;
}

/* Instructor verifications */
export interface InstructorVerification {
    id: ID;
    user_id: ID;
    experience?: string | null;
    education?: string | null;
    documents_url?: string | null;
    status?: number | null;
    created_at?: DateTimeString | null;
}

/* Lesson contents */
export interface LessonContent {
    id: ID;
    lesson_id: ID;
    position: number;
    order_index: number;
    type: number;
    content_data?: any | null; // JSON
}

/* Messages */
export interface Message {
    id: ID;
    conversation_id?: number | null;
    sender_id: ID;
    receiver_id: ID;
    message: string;
    status?: number | null;
    created_at?: DateTimeString | null;
}

/* Notifications */
export interface Notification {
    id: ID;
    user_id: ID;
    title?: string | null;
    message?: string | null;
    type?: number | null;
    is_read?: boolean | null;
    created_at?: DateTimeString | null;
}

/* Payment methods */
export interface PaymentMethod {
    id: ID;
    method_name?: string | null;
    provider?: string | null;
    is_active?: boolean | null;
}

/* Payouts */
export interface Payout {
    id: ID;
    instructor_id: ID;
    amount?: number | null; // decimal
    status?: number | null;
    paid_at?: DateTimeString | null;
}

/* Transactions */
export interface Transaction {
    id: ID;
    user_id: ID;
    course_id?: number | null;
    amount?: number | null; // decimal
    method_id?: number | null;
    transaction_code?: string | null;
    status?: number | null;
    created_at?: DateTimeString | null;
}

/* User profiles */
export interface UserProfile {
    id: ID;
    user_id: ID;
    bio?: string | null;
    phone?: string | null;
    gender?: number | null;
    dob?: DateTimeString | null;
    job_title?: string | null;
    social_links?: any | null; // JSON
    country?: string | null;
    language?: string | null;
}

// ============================================
// CUSTOM FRONTEND TYPES (extended/composite types)
// ============================================

/* Custom User (simplified for UI) */
export interface Cus_User {
    id: string;
    name: string;
    avatar: string;
}

/* Instructor (extended from Account) */
export interface Instructor {
    id: number;
    name: string;
    avatar: string;
    title: string;
    bio: string;
    rating: number;
    reviews: number;
    students: number;
    courses: number;
}

/* Review (for UI display) */
export interface Review {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

/* Course (extended for UI with relations) */
export interface CourseWithRelations extends Course {
    subtitle?: string;
    category?: string;
    instructor?: Instructor;
    rating?: number;
    reviewsCount?: number;
    level?: string | number; // 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | number
    duration?: string;
    lectures?: number;
    whatYouWillLearn?: string[];
    curriculum?: {
        section: string;
        lectures: { title: string; duration: string }[];
    }[];
    reviews?: Review[];
    originalPrice?: number;
}

/* Lesson (for UI) */
export interface Lesson {
    id: number;
    courseId: number;
    title: string;
    type: 'video' | 'reading' | 'quiz' | 'coding';
    content: string; // Markdown content for instructions
    starterCode?: string;
    hints?: string[];
}

/* Lesson Comment */
export interface LessonComment {
    id: number;
    lessonId: number;
    author: string;
    avatar: string;
    comment: string;
    date: string;
    replies?: LessonComment[];
}

/* Lesson QA */
export interface LessonQA {
    id: number;
    lessonId: number;
    question: {
        author: string;
        avatar: string;
        text: string;
        date: string;
    };
    answer?: {
        author: string; // instructor
        avatar: string;
        text: string;
        date: string;
    };
}

/* Lecture */
export interface Lecture {
    id: number;
    title: string;
    duration: string;
    type: 'video' | 'reading' | 'quiz' | 'coding';
}

/* Sidebar Types */
export type SidebarTab = 'content' | 'curriculum' | 'comments' | 'help';

export interface SidebarItem {
    id: SidebarTab;
    icon: string;
    label: string;
    notification?: number;
}

/* Enrolled Course (Course with enrollment data) */
export interface EnrolledCourse extends CourseWithRelations {
    progress: number; // 0 to 100
    lastAccessed: string;
    completed: boolean;
    certificateUrl?: string;
}

/* Class Session */
export interface ClassSession {
    id: number;
    title: string;
    instructor: string;
    startTime: string; // ISO string
    endTime: string;
    meetingLink: string;
    isLive: boolean;
}

/* Class Assignment (for UI, extends Prisma type) */
export interface ClassAssignmentUI extends ClassAssignment {
    classId?: number;
    deadline?: string;
    status?: number; // 'pending' | 'submitted' | 'graded' | 'late'
    grade?: number;
}

/* Student Class */
export interface StudentClass {
    id: number;
    name: string;
    instructor: string;
    schedule: string; // e.g., "Mon, Wed 19:00"
    nextSession?: ClassSession;
    progress: number;
}

/* Audit Log (for UI, extends Prisma AdminLog) */
export interface AuditLog extends AdminLog {
    user?: string;
    target?: string;
    timestamp?: string;
    details?: string;
    status?: string | number | null; // For UI: 'Success' | 'Failure' | 'Warning' | number
}

/* Account (for UI, extends Prisma Account) */
export interface AccountUI extends Account {
    lastLogin?: string;
    avatar?: string;
}

/* DTOs */
export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: Account['role'];
    status?: Account['status'];
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    role?: Account['role'];
}

