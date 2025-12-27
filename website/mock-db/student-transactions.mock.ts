/**
 * MOCK DB - Student Payment Transactions
 * Payment transactions for student payment history page
 */

export type StudentTransactionStatus = 'completed' | 'pending' | 'failed';

export interface StudentTransaction {
    id: number;
    user_id: number;
    date: string;
    courseTitle: string;
    amount: number;
    paymentMethod: string;
    status: StudentTransactionStatus;
    invoiceUrl: string;
}

export const STUDENT_TRANSACTIONS: StudentTransaction[] = [
    {
        id: 1,
        user_id: 7,
        date: '2024-12-10',
        courseTitle: 'Complete Web Development Bootcamp 2024',
        amount: 299000,
        paymentMethod: 'Thẻ tín dụng',
        status: 'completed',
        invoiceUrl: '/invoices/inv-001.pdf',
    },
    {
        id: 2,
        user_id: 7,
        date: '2024-12-08',
        courseTitle: 'React - The Complete Guide',
        amount: 349000,
        paymentMethod: 'MoMo',
        status: 'completed',
        invoiceUrl: '/invoices/inv-002.pdf',
    },
    {
        id: 3,
        user_id: 7,
        date: '2024-12-05',
        courseTitle: 'Python for Data Science',
        amount: 399000,
        paymentMethod: 'ZaloPay',
        status: 'pending',
        invoiceUrl: '#',
    },
    {
        id: 4,
        user_id: 7,
        date: '2024-11-28',
        courseTitle: 'UI/UX Design Masterclass',
        amount: 279000,
        paymentMethod: 'Chuyển khoản',
        status: 'failed',
        invoiceUrl: '#',
    },
    {
        id: 5,
        user_id: 7,
        date: '2024-11-20',
        courseTitle: 'Advanced JavaScript Course',
        amount: 329000,
        paymentMethod: 'Thẻ tín dụng',
        status: 'completed',
        invoiceUrl: '/invoices/inv-005.pdf',
    },
    {
        id: 6,
        user_id: 8,
        date: '2024-12-01',
        courseTitle: 'IELTS Complete Guide',
        amount: 599000,
        paymentMethod: 'MoMo',
        status: 'completed',
        invoiceUrl: '/invoices/inv-006.pdf',
    },
    {
        id: 7,
        user_id: 8,
        date: '2024-11-15',
        courseTitle: 'NodeJS Backend Development',
        amount: 449000,
        paymentMethod: 'Thẻ tín dụng',
        status: 'completed',
        invoiceUrl: '/invoices/inv-007.pdf',
    },
];

// Helper to get transactions by user
export const getTransactionsByUser = (userId: number): StudentTransaction[] => {
    return STUDENT_TRANSACTIONS.filter(t => t.user_id === userId);
};
