/**
 * MOCK DB - accounts (users)
 * Maps 1:1 to Prisma schema
 * Seedable directly to database
 */

// Enum mapping (must match Prisma)
export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',  // -1 in old system
    ADMIN = 'ADMIN',               // 0
    INSTRUCTOR = 'INSTRUCTOR',     // 1
    STUDENT = 'STUDENT'            // 2
}

export interface Account {
    id: number;
    full_name: string;
    email: string;
    password_hash: string;
    avatar_url: string | null;
    role: UserRole;
    status: number;
    created_at: string;
    updated_at: string;
    username: string | null;
}

export const ACCOUNTS: Account[] = [
    // Super Admin
    {
        id: 1,
        full_name: 'Super Admin',
        email: 'superadmin@milearn.com',
        password_hash: '000000',
        role: UserRole.SUPER_ADMIN,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin',
        username: 'superadmin',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
    },

    // Admins
    {
        id: 2,
        full_name: 'Nguyễn Quản Trị',
        email: 'admin@milearn.com',
        password_hash: '000000',
        role: UserRole.ADMIN,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        username: 'admin',
        created_at: '2024-01-05T00:00:00.000Z',
        updated_at: '2024-01-05T00:00:00.000Z'
    },

    // Instructors
    {
        id: 3,
        full_name: 'Trần Quang Minh Đức',
        email: 'tqmd@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung',
        username: 'tqmd',
        created_at: '2024-01-10T00:00:00.000Z',
        updated_at: '2024-01-10T00:00:00.000Z'
    },
    {
        id: 4,
        full_name: 'Nguyễn Thị Duyên',
        email: 'duyennguyen@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan',
        username: 'ntd',
        created_at: '2024-01-12T00:00:00.000Z',
        updated_at: '2024-01-12T00:00:00.000Z'
    },
    {
        id: 5,
        full_name: 'Nguyễn Giảng Viên',
        email: 'duc.le@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
        username: 'instructor',
        created_at: '2024-01-15T00:00:00.000Z',
        updated_at: '2024-01-15T00:00:00.000Z'
    },
    {
        id: 6,
        full_name: 'Phạm Hoàng Nam',
        email: 'nam.pham@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
        username: 'nam.pham',
        created_at: '2024-02-01T00:00:00.000Z',
        updated_at: '2024-02-01T00:00:00.000Z'
    },

    // Students
    {
        id: 7,
        full_name: 'Chu Đức Minh',
        email: 'student@milearn.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh',
        username: 'student',
        created_at: '2024-02-10T00:00:00.000Z',
        updated_at: '2024-02-10T00:00:00.000Z'
    },
    {
        id: 8,
        full_name: 'Võ Thị Hương',
        email: 'huong.vo@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huong',
        username: 'huong.vo',
        created_at: '2024-02-15T00:00:00.000Z',
        updated_at: '2024-02-15T00:00:00.000Z'
    },
    {
        id: 9,
        full_name: 'Đặng Văn Tùng',
        email: 'tung.dang@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tung',
        username: 'tung.dang',
        created_at: '2024-02-20T00:00:00.000Z',
        updated_at: '2024-02-20T00:00:00.000Z'
    },
    {
        id: 10,
        full_name: 'Bùi Thị Mai',
        email: 'mai.bui@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
        username: 'mai.bui',
        created_at: '2024-03-01T00:00:00.000Z',
        updated_at: '2024-03-01T00:00:00.000Z'
    }
];

// Helper to get account by role
export const getAccountsByRole = (role: UserRole): Account[] => {
    return ACCOUNTS.filter(acc => acc.role === role);
};

// Helper for authentication (mock)
export const validateLogin = (emailOrUsername: string, password: string): Omit<Account, 'password_hash'> | null => {
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
