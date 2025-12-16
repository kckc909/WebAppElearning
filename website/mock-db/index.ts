/**
 * MOCK-DB INDEX
 * Central export - all raw DB tables
 * Seedable directly to Prisma DB
 */

// Enums
export * from './enums.mock';

// Core tables (completed)
export * from './accounts.mock';
export * from './user-profiles.mock';
export * from './course-categories.mock';
export * from './courses.mock';
export * from './course-sections.mock';
export * from './course-lessons.mock';
export * from './course-enrollments.mock';
export * from './course-reviews.mock';
export * from './classes.mock';
export * from './class-students.mock';
export * from './class-calendar.mock';
export * from './notifications.mock';

// New tables (Phase 1 requirement)
export interface AdminLog {
    id: number;
    admin_id: number;
    action: string | null;
    target_table: string | null;
    target_id: number | null;
    created_at: string;
}

export const ADMIN_LOGS: AdminLog[] = [
    { id: 1, admin_id: 2, action: 'COURSE_APPROVED', target_table: 'courses', target_id: 1, created_at: '2024-11-15T00:00:00.000Z' },
    { id: 2, admin_id: 2, action: 'USER_SUSPENDED', target_table: 'accounts', target_id: 10, created_at: '2024-11-16T00:00:00.000Z' },
    { id: 3, admin_id: 2, action: 'COURSE_ARCHIVED', target_table: 'courses', target_id: 5, created_at: '2024-11-17T00:00:00.000Z' },
];

export interface InstructorVerification {
    id: number;
    user_id: number;
    experience: string | null;
    education: string | null;
    documents_url: string | null;
    status: number;
    created_at: string;
}

export const INSTRUCTOR_VERIFICATIONS: InstructorVerification[] = [
    { id: 1, user_id: 3, experience: '10+ years Full-stack Development at FPT, VNG', education: 'Computer Science, HCMUT', documents_url: '/verifications/tqmd-cv.pdf', status: 1, created_at: '2024-01-08T00:00:00.000Z' },
    { id: 2, user_id: 4, experience: '8 years English Teaching, IELTS 9.0', education: 'English Literature, HCMUS', documents_url: '/verifications/ntd-certificates.pdf', status: 1, created_at: '2024-01-10T00:00:00.000Z' },
];

export interface Payout {
    id: number;
    instructor_id: number;
    amount: number;
    status: number;
    paid_at: string | null;
}

export const PAYOUTS: Payout[] = [
    { id: 1, instructor_id: 3, amount: 5000000, status: 1, paid_at: '2024-11-01T00:00:00.000Z' },
    { id: 2, instructor_id: 4, amount: 3500000, status: 1, paid_at: '2024-11-01T00:00:00.000Z' },
    { id: 3, instructor_id: 6, amount: 4200000, status: 0, paid_at: null },
];

export interface PaymentMethod {
    id: number;
    method_name: string | null;
    provider: string | null;
    is_active: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 1, method_name: 'Chuyển khoản ngân hàng', provider: 'VietQR', is_active: true },
    { id: 2, method_name: 'MoMo', provider: 'MoMo', is_active: true },
    { id: 3, method_name: 'ZaloPay', provider: 'ZaloPay', is_active: true },
    { id: 4, method_name: 'Thẻ tín dụng/ghi nợ', provider: 'VNPay', is_active: false },
];

export interface Transaction {
    id: number;
    user_id: number;
    course_id: number | null;
    amount: number;
    method_id: number | null;
    transaction_code: string | null;
    status: number;
    created_at: string;
}

export const TRANSACTIONS: Transaction[] = [
    { id: 1, user_id: 7, course_id: 1, amount: 599000, method_id: 1, transaction_code: 'TXN20240801001', status: 1, created_at: '2024-08-01T00:00:00.000Z' },
    { id: 2, user_id: 7, course_id: 2, amount: 799000, method_id: 2, transaction_code: 'TXN20240915001', status: 1, created_at: '2024-09-15T00:00:00.000Z' },
    { id: 3, user_id: 7, course_id: 6, amount: 650000, method_id: 1, transaction_code: 'TXN20241001001', status: 1, created_at: '2024-10-01T00:00:00.000Z' },
    { id: 4, user_id: 8, course_id: 1, amount: 599000, method_id: 3, transaction_code: 'TXN20240815001', status: 1, created_at: '2024-08-15T00:00:00.000Z' },
    { id: 5, user_id: 8, course_id: 9, amount: 699000, method_id: 1, transaction_code: 'TXN20240901001', status: 1, created_at: '2024-09-01T00:00:00.000Z' },
];

export interface Certificate {
    id: number;
    student_id: number;
    course_id: number;
    certificate_code: string | null;
    issued_at: string;
    pdf_url: string | null;
}

export const CERTIFICATES: Certificate[] = [
    { id: 1, student_id: 7, course_id: 6, certificate_code: 'CERT-2024-IELTS-001', issued_at: '2024-11-01T00:00:00.000Z', pdf_url: '/certificates/cert-ielts-001.pdf' },
    { id: 2, student_id: 9, course_id: 7, certificate_code: 'CERT-2024-TOEIC-001', issued_at: '2024-10-15T00:00:00.000Z', pdf_url: '/certificates/cert-toeic-001.pdf' },
];

// Helper to validate login (for mock auth)
import { ACCOUNTS } from './accounts.mock';

export const validateLogin = (emailOrUsername: string, password: string) => {
    const user = ACCOUNTS.find(a =>
        (a.email === emailOrUsername || a.username === emailOrUsername) &&
        a.password_hash === password
    );

    if (user) {
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};
