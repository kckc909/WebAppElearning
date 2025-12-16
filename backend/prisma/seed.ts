/**
 * Prisma Seed Script
 * Seeds database from mock-db (website layer)
 * Run: npx prisma db seed
 */

import { PrismaClient } from '../src/generated/prisma/client.js';
import * as mockDb from '../../website/mock-db/index.js';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data (dev only)
    console.log('🗑️  Clearing existing data...');
    await prisma.admin_logs.deleteMany();
    await prisma.course_progress.deleteMany();
    await prisma.course_reviews.deleteMany();
    await prisma.course_enrollments.deleteMany();
    await prisma.course_lessons.deleteMany();
    await prisma.course_sections.deleteMany();
    await prisma.class_calendar.deleteMany();
    await prisma.class_students.deleteMany();
    await prisma.classes.deleteMany();
    await prisma.certificates.deleteMany();
    await prisma.transactions.deleteMany();
    await prisma.courses.deleteMany();
    await prisma.payouts.deleteMany();
    await prisma.instructor_verifications.deleteMany();
    await prisma.user_profiles.deleteMany();
    await prisma.notifications.deleteMany();
    await prisma.accounts.deleteMany();
    await prisma.course_categories.deleteMany();
    await prisma.payment_methods.deleteMany();

    // Seed in dependency order
    console.log('📦 Seeding core tables...');

    // 1. Independent tables
    await prisma.payment_methods.createMany({
        data: mockDb.PAYMENT_METHODS
    });
    console.log(`✅ Payment methods: ${mockDb.PAYMENT_METHODS.length}`);

    await prisma.course_categories.createMany({
        data: mockDb.COURSE_CATEGORIES
    });
    console.log(`✅ Course categories: ${mockDb.COURSE_CATEGORIES.length}`);

    // 2. Accounts
    await prisma.accounts.createMany({
        data: mockDb.ACCOUNTS.map(acc => ({
            ...acc,
            created_at: new Date(acc.created_at),
            updated_at: new Date(acc.updated_at)
        }))
    });
    console.log(`✅ Accounts: ${mockDb.ACCOUNTS.length}`);

    // 3. User profiles
    await prisma.user_profiles.createMany({
        data: mockDb.USER_PROFILES.map(profile => ({
            ...profile,
            dob: profile.dob ? new Date(profile.dob) : null
        }))
    });
    console.log(`✅ User profiles: ${mockDb.USER_PROFILES.length}`);

    // 4. Instructor verifications
    await prisma.instructor_verifications.createMany({
        data: mockDb.INSTRUCTOR_VERIFICATIONS.map(v => ({
            ...v,
            created_at: new Date(v.created_at)
        }))
    });
    console.log(`✅ Instructor verifications: ${mockDb.INSTRUCTOR_VERIFICATIONS.length}`);

    // 5. Courses
    await prisma.courses.createMany({
        data: mockDb.COURSES.map(course => ({
            ...course,
            created_at: new Date(course.created_at),
            updated_at: new Date(course.updated_at)
        }))
    });
    console.log(`✅ Courses: ${mockDb.COURSES.length}`);

    // 6. Course structure
    await prisma.course_sections.createMany({
        data: mockDb.COURSE_SECTIONS
    });
    console.log(`✅ Course sections: ${mockDb.COURSE_SECTIONS.length}`);

    await prisma.course_lessons.createMany({
        data: mockDb.COURSE_LESSONS
    });
    console.log(`✅ Course lessons: ${mockDb.COURSE_LESSONS.length}`);

    // 7. Course engagement
    await prisma.course_enrollments.createMany({
        data: mockDb.COURSE_ENROLLMENTS.map(e => ({
            ...e,
            enrolled_at: new Date(e.enrolled_at)
        }))
    });
    console.log(`✅ Course enrollments: ${mockDb.COURSE_ENROLLMENTS.length}`);

    await prisma.course_reviews.createMany({
        data: mockDb.COURSE_REVIEWS.map(r => ({
            ...r,
            created_at: new Date(r.created_at)
        }))
    });
    console.log(`✅ Course reviews: ${mockDb.COURSE_REVIEWS.length}`);

    // 8. Classes
    await prisma.classes.createMany({
        data: mockDb.CLASSES.map(c => ({
            ...c,
            start_date: c.start_date ? new Date(c.start_date) : null,
            end_date: c.end_date ? new Date(c.end_date) : null,
            created_at: new Date(c.created_at)
        }))
    });
    console.log(`✅ Classes: ${mockDb.CLASSES.length}`);

    await prisma.class_students.createMany({
        data: mockDb.CLASS_STUDENTS.map(cs => ({
            ...cs,
            joined_at: new Date(cs.joined_at)
        }))
    });
    console.log(`✅ Class students: ${mockDb.CLASS_STUDENTS.length}`);

    await prisma.class_calendar.createMany({
        data: mockDb.CLASS_CALENDAR.map(cal => ({
            ...cal,
            event_date: cal.event_date ? new Date(cal.event_date) : null
        }))
    });
    console.log(`✅ Class calendar: ${mockDb.CLASS_CALENDAR.length}`);

    // 9. Transactions & Certificates
    await prisma.transactions.createMany({
        data: mockDb.TRANSACTIONS.map(t => ({
            ...t,
            created_at: new Date(t.created_at)
        }))
    });
    console.log(`✅ Transactions: ${mockDb.TRANSACTIONS.length}`);

    await prisma.certificates.createMany({
        data: mockDb.CERTIFICATES.map(cert => ({
            ...cert,
            issued_at: new Date(cert.issued_at)
        }))
    });
    console.log(`✅ Certificates: ${mockDb.CERTIFICATES.length}`);

    // 10. System tables
    await prisma.notifications.createMany({
        data: mockDb.NOTIFICATIONS.map(n => ({
            ...n,
            created_at: new Date(n.created_at)
        }))
    });
    console.log(`✅ Notifications: ${mockDb.NOTIFICATIONS.length}`);

    await prisma.payouts.createMany({
        data: mockDb.PAYOUTS.map(p => ({
            ...p,
            paid_at: p.paid_at ? new Date(p.paid_at) : null
        }))
    });
    console.log(`✅ Payouts: ${mockDb.PAYOUTS.length}`);

    await prisma.admin_logs.createMany({
        data: mockDb.ADMIN_LOGS.map(log => ({
            ...log,
            created_at: new Date(log.created_at)
        }))
    });
    console.log(`✅ Admin logs: ${mockDb.ADMIN_LOGS.length}`);

    console.log('');
    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });