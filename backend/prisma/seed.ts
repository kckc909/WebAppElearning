import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({});

// Import mock data (you can copy from website/mockData.ts)
const ACCOUNTS = [
    // Super Admin
    { id: 1, full_name: 'Super Admin', email: 'superadmin@milearn.com', password_hash: '000000', role: -1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin', username: 'superadmin' },
    // Admins
    { id: 2, full_name: 'Nguyễn Quản Trị', email: 'admin@milearn.com', password_hash: '000000', role: 0, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', username: 'admin' },
    // Instructors
    { id: 3, full_name: 'Trần Quang Minh Đức', email: 'tqmd@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung', username: 'tqmd' },
    { id: 4, full_name: 'Nguyễn Thị Duyên', email: 'duyennguyen@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan', username: 'ntd' },
    { id: 5, full_name: 'Lê Minh Đức', email: 'duc.le@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc', username: 'duc.le' },
    { id: 6, full_name: 'Phạm Hoàng Nam', email: 'nam.pham@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam', username: 'nam.pham' },
    // Students
    { id: 7, full_name: 'Chu Đức Minh', email: 'student@milearn.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', username: 'student' },
    { id: 8, full_name: 'Võ Thị Hương', email: 'huong.vo@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huong', username: 'huong.vo' },
    { id: 9, full_name: 'Đặng Văn Tùng', email: 'tung.dang@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tung', username: 'tung.dang' },
    { id: 10, full_name: 'Bùi Thị Mai', email: 'mai.bui@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai', username: 'mai.bui' },
];

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await prisma.accounts.deleteMany();
    console.log('🗑️  Cleared existing accounts');

    // Seed accounts
    for (const account of ACCOUNTS) {
        await prisma.accounts.create({
            data: account
        });
    }
    console.log(`✅ Seeded ${ACCOUNTS.length} accounts`);

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });