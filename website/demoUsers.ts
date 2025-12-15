// Demo users for testing different roles
export const DEMO_USERS = {
    superadmin: {
        id: 1,
        full_name: 'Super Admin',
        email: 'superadmin@milearn.com',
        password: 'admin123',
        password_hash: '',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin',
        role: -1, // SuperAdmin
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    admin: {
        id: 2,
        full_name: 'Admin User',
        email: 'admin@milearn.com',
        password: 'admin123',
        password_hash: '',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        role: 2, // Admin
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    instructor: {
        id: 3,
        full_name: 'Instructor User',
        email: 'instructor@milearn.com',
        password: 'instructor123',
        password_hash: '',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Instructor',
        role: 1, // Instructor
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    student: {
        id: 4,
        full_name: 'Student User',
        email: 'student@milearn.com',
        password: 'student123',
        password_hash: '',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student',
        role: 0, // Student
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    // User có cả quyền Instructor và Admin
    multiRole: {
        id: 5,
        full_name: 'Multi Role User',
        email: 'multi@milearn.com',
        password: 'multi123',
        password_hash: '',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Multi',
        role: 2, // Admin (có thể điều chỉnh logic để hỗ trợ multiple roles)
        status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
};

// Helper function để validate login
export const validateLogin = (email: string, password: string) => {
    const users = Object.values(DEMO_USERS);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Không trả về password trong response
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return null;
};
