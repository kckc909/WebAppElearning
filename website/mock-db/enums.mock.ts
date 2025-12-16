/**
 * MOCK DB - Enums
 * Must match Prisma schema exactly
 */

export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    STUDENT = 'STUDENT'
}

export enum CourseStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export enum CourseLevel {
    ALL_LEVELS = 'ALL_LEVELS',
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}

export enum NotificationType {
    SYSTEM = 'SYSTEM',
    COURSE = 'COURSE',
    REMINDER = 'REMINDER'
}

export enum ClassCalendarType {
    CLASS = 'CLASS',
    EXAM = 'EXAM',
    ASSIGNMENT = 'ASSIGNMENT'
}

export enum ExamType {
    QUIZ = 'QUIZ',
    WRITTEN = 'WRITTEN',
    ORAL = 'ORAL'
}
