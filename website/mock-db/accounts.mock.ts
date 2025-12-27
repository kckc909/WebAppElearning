/**
 * MOCK DB - accounts (users)
 * Maps 1:1 to Prisma schema
 * Seedable directly to database
 */

import { UserRole } from './enums.mock';

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
    },

    // === MORE INSTRUCTORS (Programming) ===
    {
        id: 11,
        full_name: 'Lê Văn Hùng',
        email: 'hung.le@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HungLe',
        username: 'hung.le',
        created_at: '2024-03-05T00:00:00.000Z',
        updated_at: '2024-03-05T00:00:00.000Z'
    },
    {
        id: 12,
        full_name: 'Trần Thị Hoa',
        email: 'hoa.tran@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoaTran',
        username: 'hoa.tran',
        created_at: '2024-03-10T00:00:00.000Z',
        updated_at: '2024-03-10T00:00:00.000Z'
    },
    {
        id: 13,
        full_name: 'Nguyễn Đức Anh',
        email: 'anh.nguyen@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnhNguyen',
        username: 'anh.nguyen',
        created_at: '2024-03-15T00:00:00.000Z',
        updated_at: '2024-03-15T00:00:00.000Z'
    },

    // === MORE INSTRUCTORS (Language) ===
    {
        id: 14,
        full_name: 'Phạm Thị Lan Anh',
        email: 'lananh.pham@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LanAnh',
        username: 'lananh.pham',
        created_at: '2024-03-20T00:00:00.000Z',
        updated_at: '2024-03-20T00:00:00.000Z'
    },
    {
        id: 15,
        full_name: 'Võ Minh Tuấn',
        email: 'tuan.vo@milearn.com',
        password_hash: '000000',
        role: UserRole.INSTRUCTOR,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TuanVo',
        username: 'tuan.vo',
        created_at: '2024-03-25T00:00:00.000Z',
        updated_at: '2024-03-25T00:00:00.000Z'
    },

    // === MORE STUDENTS (20 more) ===
    {
        id: 16,
        full_name: 'Lê Thị Thu',
        email: 'thu.le@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuLe',
        username: 'thu.le',
        created_at: '2024-04-01T00:00:00.000Z',
        updated_at: '2024-04-01T00:00:00.000Z'
    },
    {
        id: 17,
        full_name: 'Trần Văn Nam',
        email: 'nam.tran@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NamTran',
        username: 'nam.tran',
        created_at: '2024-04-05T00:00:00.000Z',
        updated_at: '2024-04-05T00:00:00.000Z'
    },
    {
        id: 18,
        full_name: 'Nguyễn Thị Hằng',
        email: 'hang.nguyen@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HangNguyen',
        username: 'hang.nguyen',
        created_at: '2024-04-10T00:00:00.000Z',
        updated_at: '2024-04-10T00:00:00.000Z'
    },
    {
        id: 19,
        full_name: 'Phạm Văn Đức',
        email: 'duc.pham@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucPham',
        username: 'duc.pham',
        created_at: '2024-04-15T00:00:00.000Z',
        updated_at: '2024-04-15T00:00:00.000Z'
    },
    {
        id: 20,
        full_name: 'Võ Thị Linh',
        email: 'linh.vo@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LinhVo',
        username: 'linh.vo',
        created_at: '2024-04-20T00:00:00.000Z',
        updated_at: '2024-04-20T00:00:00.000Z'
    },
    {
        id: 21,
        full_name: 'Đặng Văn Hải',
        email: 'hai.dang@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HaiDang',
        username: 'hai.dang',
        created_at: '2024-04-25T00:00:00.000Z',
        updated_at: '2024-04-25T00:00:00.000Z'
    },
    {
        id: 22,
        full_name: 'Bùi Thị Nga',
        email: 'nga.bui@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NgaBui',
        username: 'nga.bui',
        created_at: '2024-05-01T00:00:00.000Z',
        updated_at: '2024-05-01T00:00:00.000Z'
    },
    {
        id: 23,
        full_name: 'Lê Văn Tú',
        email: 'tu.le@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TuLe',
        username: 'tu.le',
        created_at: '2024-05-05T00:00:00.000Z',
        updated_at: '2024-05-05T00:00:00.000Z'
    },
    {
        id: 24,
        full_name: 'Trần Thị Phương',
        email: 'phuong.tran@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhuongTran',
        username: 'phuong.tran',
        created_at: '2024-05-10T00:00:00.000Z',
        updated_at: '2024-05-10T00:00:00.000Z'
    },
    {
        id: 25,
        full_name: 'Nguyễn Văn Quân',
        email: 'quan.nguyen@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=QuanNguyen',
        username: 'quan.nguyen',
        created_at: '2024-05-15T00:00:00.000Z',
        updated_at: '2024-05-15T00:00:00.000Z'
    },
    {
        id: 26,
        full_name: 'Phạm Thị Hồng',
        email: 'hong.pham@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HongPham',
        username: 'hong.pham',
        created_at: '2024-05-20T00:00:00.000Z',
        updated_at: '2024-05-20T00:00:00.000Z'
    },
    {
        id: 27,
        full_name: 'Võ Văn Thắng',
        email: 'thang.vo@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThangVo',
        username: 'thang.vo',
        created_at: '2024-05-25T00:00:00.000Z',
        updated_at: '2024-05-25T00:00:00.000Z'
    },
    {
        id: 28,
        full_name: 'Đặng Thị Lan',
        email: 'lan.dang@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LanDang',
        username: 'lan.dang',
        created_at: '2024-06-01T00:00:00.000Z',
        updated_at: '2024-06-01T00:00:00.000Z'
    },
    {
        id: 29,
        full_name: 'Bùi Văn Hùng',
        email: 'hung.bui@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HungBui',
        username: 'hung.bui',
        created_at: '2024-06-05T00:00:00.000Z',
        updated_at: '2024-06-05T00:00:00.000Z'
    },
    {
        id: 30,
        full_name: 'Lê Thị Tâm',
        email: 'tam.le@gmail.com',
        password_hash: '000000',
        role: UserRole.STUDENT,
        status: 1,
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TamLe',
        username: 'tam.le',
        created_at: '2024-06-10T00:00:00.000Z',
        updated_at: '2024-06-10T00:00:00.000Z'
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
