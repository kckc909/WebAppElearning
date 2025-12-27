import { PrismaClient, accounts_role, courses_level, courses_status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create Accounts
    console.log('👤 Creating accounts...');
    
    const superAdmin = await prisma.accounts.upsert({
        where: { username: 'superadmin' },
        update: {},
        create: {
            username: 'superadmin',
            full_name: 'Super Administrator',
            email: 'superadmin@milearn.com',
            password_hash: await bcrypt.hash('123456', 10),
            role: accounts_role.SUPER_ADMIN,
            status: 1,
            email_verified: true,
        },
    });

    const admin = await prisma.accounts.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            full_name: 'Admin User',
            email: 'admin@milearn.com',
            password_hash: await bcrypt.hash('123456', 10),
            role: accounts_role.ADMIN,
            status: 1,
            email_verified: true,
        },
    });

    const instructor1 = await prisma.accounts.upsert({
        where: { username: 'instructor1' },
        update: {},
        create: {
            username: 'instructor1',
            full_name: 'Nguyễn Văn A',
            email: 'instructor1@milearn.com',
            password_hash: await bcrypt.hash('123456', 10),
            role: accounts_role.INSTRUCTOR,
            status: 1,
            email_verified: true,
        },
    });

    const instructor2 = await prisma.accounts.upsert({
        where: { username: 'instructor2' },
        update: {},
        create: {
            username: 'instructor2',
            full_name: 'Trần Thị B',
            email: 'instructor2@milearn.com',
            password_hash: await bcrypt.hash('123456', 10),
            role: accounts_role.INSTRUCTOR,
            status: 1,
            email_verified: true,
        },
    });

    const students: any[] = [];
    for (let i = 1; i <= 5; i++) {
        const student = await prisma.accounts.upsert({
            where: { username: `student${i}` },
            update: {},
            create: {
                username: `student${i}`,
                full_name: `Học viên ${i}`,
                email: `student${i}@milearn.com`,
                password_hash: await bcrypt.hash('123456', 10),
                role: accounts_role.STUDENT,
                status: 1,
                email_verified: true,
            },
        });
        students.push(student);
    }

    console.log(`✅ Created ${students.length + 4} accounts`);

    // 2. Create Course Categories
    console.log('📚 Creating course categories...');
    
    const categories = await Promise.all([
        prisma.course_categories.upsert({
            where: { slug: 'web-development' },
            update: {},
            create: {
                name: 'Lập trình Web',
                slug: 'web-development',
                description: 'Các khóa học về phát triển web',
                is_active: true,
                order_index: 1,
            },
        }),
        prisma.course_categories.upsert({
            where: { slug: 'mobile-development' },
            update: {},
            create: {
                name: 'Lập trình Mobile',
                slug: 'mobile-development',
                description: 'Các khóa học về phát triển ứng dụng di động',
                is_active: true,
                order_index: 2,
            },
        }),
        prisma.course_categories.upsert({
            where: { slug: 'data-science' },
            update: {},
            create: {
                name: 'Khoa học Dữ liệu',
                slug: 'data-science',
                description: 'Các khóa học về AI, ML, Data Science',
                is_active: true,
                order_index: 3,
            },
        }),
        prisma.course_categories.upsert({
            where: { slug: 'design' },
            update: {},
            create: {
                name: 'Thiết kế',
                slug: 'design',
                description: 'Các khóa học về UI/UX, Graphic Design',
                is_active: true,
                order_index: 4,
            },
        }),
        prisma.course_categories.upsert({
            where: { slug: 'language' },
            update: {},
            create: {
                name: 'Ngoại ngữ',
                slug: 'language',
                description: 'Các khóa học về ngoại ngữ',
                is_active: true,
                order_index: 5,
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // 3. Create Courses
    console.log('📖 Creating courses...');
    
    const course1 = await prisma.courses.upsert({
        where: { slug: 'react-fundamentals' },
        update: {},
        create: {
            instructor_id: instructor1.id,
            category_id: categories[0].id,
            title: 'React Fundamentals - Từ cơ bản đến nâng cao',
            slug: 'react-fundamentals',
            short_description: 'Học React từ đầu với các ví dụ thực tế',
            description: 'Khóa học React toàn diện cho người mới bắt đầu. Bạn sẽ học về Components, Hooks, State Management và nhiều hơn nữa.',
            level: courses_level.BEGINNER,
            language: 'vi',
            price: 499000,
            discount_price: 299000,
            status: courses_status.PUBLISHED,
            is_featured: true,
            published_at: new Date(),
            thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
            total_duration: 1200,
            total_lessons: 30,
            what_you_will_learn: ['React Components', 'React Hooks', 'State Management', 'React Router'],
            requirements: ['Kiến thức HTML, CSS, JavaScript cơ bản'],
            target_audience: ['Người mới bắt đầu học React', 'Developer muốn nâng cao kỹ năng'],
        },
    });

    const course2 = await prisma.courses.upsert({
        where: { slug: 'nodejs-backend' },
        update: {},
        create: {
            instructor_id: instructor1.id,
            category_id: categories[0].id,
            title: 'Node.js Backend Development',
            slug: 'nodejs-backend',
            short_description: 'Xây dựng RESTful API với Node.js và Express',
            description: 'Học cách xây dựng backend mạnh mẽ với Node.js, Express, MongoDB và các công nghệ hiện đại.',
            level: courses_level.INTERMEDIATE,
            language: 'vi',
            price: 599000,
            discount_price: 399000,
            status: courses_status.PUBLISHED,
            is_featured: true,
            published_at: new Date(),
            thumbnail_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
            total_duration: 1500,
            total_lessons: 40,
            what_you_will_learn: ['Node.js & Express', 'RESTful API', 'MongoDB', 'Authentication & Authorization'],
            requirements: ['JavaScript cơ bản', 'Hiểu về HTTP'],
            target_audience: ['Backend developers', 'Full-stack developers'],
        },
    });

    const course3 = await prisma.courses.upsert({
        where: { slug: 'python-data-science' },
        update: {},
        create: {
            instructor_id: instructor2.id,
            category_id: categories[2].id,
            title: 'Python cho Data Science',
            slug: 'python-data-science',
            short_description: 'Phân tích dữ liệu với Python, Pandas, NumPy',
            description: 'Khóa học toàn diện về Data Science với Python. Học cách phân tích, visualize và xử lý dữ liệu.',
            level: courses_level.BEGINNER,
            language: 'vi',
            price: 699000,
            discount_price: 499000,
            status: courses_status.PUBLISHED,
            is_featured: true,
            published_at: new Date(),
            thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
            total_duration: 1800,
            total_lessons: 50,
            what_you_will_learn: ['Python basics', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning basics'],
            requirements: ['Không cần kiến thức lập trình trước'],
            target_audience: ['Data analysts', 'Người muốn chuyển sang Data Science'],
        },
    });

    const course4 = await prisma.courses.upsert({
        where: { slug: 'english-communication' },
        update: {},
        create: {
            instructor_id: instructor2.id,
            category_id: categories[4].id,
            title: 'Tiếng Anh Giao Tiếp Cơ Bản',
            slug: 'english-communication',
            short_description: 'Học tiếng Anh giao tiếp hàng ngày hiệu quả',
            description: 'Khóa học tiếng Anh giao tiếp cho người mới bắt đầu. Tập trung vào các tình huống thực tế trong cuộc sống.',
            level: courses_level.BEGINNER,
            language: 'vi',
            price: 399000,
            discount_price: 249000,
            status: courses_status.PUBLISHED,
            is_featured: true,
            published_at: new Date(),
            thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop',
            total_duration: 1000,
            total_lessons: 25,
            what_you_will_learn: ['Phát âm chuẩn', 'Giao tiếp hàng ngày', 'Ngữ pháp cơ bản', 'Từ vựng thông dụng'],
            requirements: ['Không cần kiến thức tiếng Anh trước'],
            target_audience: ['Người mới bắt đầu học tiếng Anh', 'Người muốn cải thiện giao tiếp'],
        },
    });

    const course5 = await prisma.courses.upsert({
        where: { slug: 'business-english' },
        update: {},
        create: {
            instructor_id: instructor1.id,
            category_id: categories[4].id,
            title: 'Tiếng Anh Thương Mại',
            slug: 'business-english',
            short_description: 'Tiếng Anh chuyên ngành cho môi trường công sở',
            description: 'Nâng cao kỹ năng tiếng Anh trong môi trường làm việc chuyên nghiệp. Email, meeting, presentation.',
            level: courses_level.INTERMEDIATE,
            language: 'vi',
            price: 599000,
            discount_price: 399000,
            status: courses_status.PUBLISHED,
            is_featured: true,
            published_at: new Date(),
            thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
            total_duration: 1200,
            total_lessons: 30,
            what_you_will_learn: ['Business vocabulary', 'Email writing', 'Meeting skills', 'Presentation skills'],
            requirements: ['Tiếng Anh cơ bản'],
            target_audience: ['Nhân viên văn phòng', 'Người làm việc môi trường quốc tế'],
        },
    });

    console.log(`✅ Created 5 courses`);

    // 4. Create Course Sections & Lessons
    console.log('📝 Creating sections and lessons...');
    
    const section1 = await prisma.course_sections.create({
        data: {
            course_id: course1.id,
            title: 'Giới thiệu về React',
            order_index: 1,
            description: 'Tìm hiểu cơ bản về React',
        },
    });

    await prisma.course_lessons.createMany({
        data: [
            {
                section_id: section1.id,
                course_id: course1.id,
                title: 'React là gì?',
                order_index: 1,
                duration: 600,
                status: 'published',
                is_preview: true,
                published_at: new Date(),
            },
            {
                section_id: section1.id,
                course_id: course1.id,
                title: 'Cài đặt môi trường',
                order_index: 2,
                duration: 900,
                status: 'published',
                published_at: new Date(),
            },
            {
                section_id: section1.id,
                course_id: course1.id,
                title: 'Component đầu tiên',
                order_index: 3,
                duration: 1200,
                status: 'published',
                published_at: new Date(),
            },
        ],
    });

    console.log(`✅ Created sections and lessons`);

    // 5. Create Enrollments
    console.log('🎓 Creating enrollments...');
    
    await Promise.all([
        prisma.course_enrollments.upsert({
            where: {
                student_id_course_id: {
                    student_id: students[0].id,
                    course_id: course1.id,
                }
            },
            update: {},
            create: {
                course_id: course1.id,
                student_id: students[0].id,
                progress: 30,
                status: 'active',
            },
        }),
        prisma.course_enrollments.upsert({
            where: {
                student_id_course_id: {
                    student_id: students[1].id,
                    course_id: course1.id,
                }
            },
            update: {},
            create: {
                course_id: course1.id,
                student_id: students[1].id,
                progress: 60,
                status: 'active',
            },
        }),
        prisma.course_enrollments.upsert({
            where: {
                student_id_course_id: {
                    student_id: students[0].id,
                    course_id: course2.id,
                }
            },
            update: {},
            create: {
                course_id: course2.id,
                student_id: students[0].id,
                progress: 10,
                status: 'active',
            },
        }),
        prisma.course_enrollments.upsert({
            where: {
                student_id_course_id: {
                    student_id: students[2].id,
                    course_id: course3.id,
                }
            },
            update: {},
            create: {
                course_id: course3.id,
                student_id: students[2].id,
                progress: 80,
                status: 'active',
            },
        }),
    ]);

    console.log(`✅ Created enrollments`);

    // 6. Create Reviews
    console.log('⭐ Creating reviews...');
    
    await Promise.all([
        prisma.course_reviews.upsert({
            where: {
                course_id_student_id: {
                    course_id: course1.id,
                    student_id: students[0].id,
                }
            },
            update: {},
            create: {
                course_id: course1.id,
                student_id: students[0].id,
                rating: 5,
                comment: 'Khóa học rất hay, giảng viên nhiệt tình!',
                is_public: true,
            },
        }),
        prisma.course_reviews.upsert({
            where: {
                course_id_student_id: {
                    course_id: course1.id,
                    student_id: students[1].id,
                }
            },
            update: {},
            create: {
                course_id: course1.id,
                student_id: students[1].id,
                rating: 4,
                comment: 'Nội dung dễ hiểu, phù hợp người mới bắt đầu',
                is_public: true,
            },
        }),
        prisma.course_reviews.upsert({
            where: {
                course_id_student_id: {
                    course_id: course2.id,
                    student_id: students[0].id,
                }
            },
            update: {},
            create: {
                course_id: course2.id,
                student_id: students[0].id,
                rating: 5,
                comment: 'Khóa học backend tuyệt vời!',
                is_public: true,
            },
        }),
    ]);

    console.log(`✅ Created reviews`);

    // 7. Create Payment Methods
    console.log('💳 Creating payment methods...');
    
    await prisma.payment_methods.createMany({
        data: [
            {
                method_name: 'VNPay',
                provider: 'vnpay',
                is_active: true,
            },
            {
                method_name: 'MoMo',
                provider: 'momo',
                is_active: true,
            },
            {
                method_name: 'ZaloPay',
                provider: 'zalopay',
                is_active: true,
            },
        ],
    });

    console.log(`✅ Created payment methods`);

    // 8. Create System Settings
    console.log('⚙️ Creating system settings...');
    
    await Promise.all([
        prisma.system_settings.upsert({
            where: { key: 'site_name' },
            update: {},
            create: {
                key: 'site_name',
                value: 'MiLearn',
                type: 'string',
                description: 'Tên website',
            },
        }),
        prisma.system_settings.upsert({
            where: { key: 'platform_fee' },
            update: {},
            create: {
                key: 'platform_fee',
                value: '10',
                type: 'number',
                description: 'Phí nền tảng (%)',
            },
        }),
        prisma.system_settings.upsert({
            where: { key: 'maintenance_mode' },
            update: {},
            create: {
                key: 'maintenance_mode',
                value: 'false',
                type: 'boolean',
                description: 'Chế độ bảo trì',
            },
        }),
        prisma.system_settings.upsert({
            where: { key: 'max_upload_size' },
            update: {},
            create: {
                key: 'max_upload_size',
                value: '100',
                type: 'number',
                description: 'Kích thước upload tối đa (MB)',
            },
        }),
    ]);

    console.log(`✅ Created system settings`);

    // 9. Create Classes
    console.log('🏫 Creating classes...');
    
    const class1 = await prisma.classes.create({
        data: {
            course_id: course1.id,
            instructor_id: instructor1.id,
            name: 'React Fundamentals - Lớp K01',
            description: 'Lớp học React cơ bản khai giảng tháng 1/2025',
            start_date: new Date('2025-01-15'),
            end_date: new Date('2025-03-15'),
            max_students: 30,
            current_students: 2,
            status: 'active',
        },
    });

    await prisma.class_students.createMany({
        data: [
            {
                class_id: class1.id,
                student_id: students[0].id,
                status: 'active',
            },
            {
                class_id: class1.id,
                student_id: students[1].id,
                status: 'active',
            },
        ],
    });

    console.log(`✅ Created classes`);

    // 10. Create Notifications
    console.log('🔔 Creating notifications...');
    
    await prisma.notifications.createMany({
        data: [
            {
                user_id: students[0].id,
                title: 'Chào mừng đến với MiLearn!',
                message: 'Cảm ơn bạn đã đăng ký tài khoản. Chúc bạn học tập vui vẻ!',
                type: 'welcome',
                is_read: false,
            },
            {
                user_id: students[0].id,
                title: 'Khóa học mới được thêm vào',
                message: 'Bạn đã đăng ký thành công khóa học React Fundamentals',
                type: 'enrollment',
                is_read: false,
            },
        ],
    });

    console.log(`✅ Created notifications`);

    console.log('');
    console.log('🎉 Seed completed successfully!');
    console.log('');
    console.log('📋 Test Accounts:');
    console.log('   SuperAdmin: superadmin@milearn.com / 123456');
    console.log('   Admin: admin@milearn.com / 123456');
    console.log('   Instructor 1: instructor1@milearn.com / 123456');
    console.log('   Instructor 2: instructor2@milearn.com / 123456');
    console.log('   Student 1-5: student1@milearn.com / 123456');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
