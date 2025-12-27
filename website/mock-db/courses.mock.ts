/**
 * MOCK DB - courses
 * Maps 1:1 to Prisma schema
 * Seedable directly to database
 */

import { CourseStatus, CourseLevel } from './enums.mock';

export interface Course {
    id: number;
    instructor_id: number;
    category_id: number | null;
    title: string;
    short_description: string | null;
    description: string | null;
    level: CourseLevel;
    language: string | null;
    price: number;
    discount_price: number;
    thumbnail: string | null;
    status: CourseStatus;
    created_at: string;
    updated_at: string;
}

export const COURSES: Course[] = [
    // === LẬP TRÌNH ===
    {
        id: 1,
        instructor_id: 3,
        category_id: 1,
        title: 'ReactJS cho Người Mới Bắt Đầu - Xây Dựng Web App 2024',
        short_description: 'Học ReactJS từ cơ bản đến nâng cao qua các dự án thực tế.',
        description: '<h3>Về khóa học</h3><p>Khóa học ReactJS toàn diện nhất dành cho người mới. Bạn sẽ học Components, Hooks, Redux và xây dựng 5+ dự án thực tế.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
        price: 1200000,
        discount_price: 599000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-01-20T00:00:00.000Z',
        updated_at: '2024-11-15T00:00:00.000Z'
    },
    {
        id: 2,
        instructor_id: 3,
        category_id: 1,
        title: 'Python Masterclass: Từ Zero đến Hero',
        short_description: 'Khóa học Python toàn diện cho mọi cấp độ.',
        description: '<h3>Về khóa học</h3><p>Học Python từ cơ bản đến nâng cao. Bao gồm Data Analysis, Web Scraping, Automation.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600',
        price: 1500000,
        discount_price: 799000,
        level: CourseLevel.ALL_LEVELS,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-02-01T00:00:00.000Z',
        updated_at: '2024-11-10T00:00:00.000Z'
    },
    {
        id: 3,
        instructor_id: 3,
        category_id: 1,
        title: 'NodeJS & Express - Xây Dựng RESTful API',
        short_description: 'Học backend development với Node.js và Express framework.',
        description: '<h3>Về khóa học</h3><p>Xây dựng API chuyên nghiệp với NodeJS, Express, MongoDB.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600',
        price: 1300000,
        discount_price: 699000,
        level: CourseLevel.INTERMEDIATE,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-02-15T00:00:00.000Z',
        updated_at: '2024-10-20T00:00:00.000Z'
    },
    {
        id: 4,
        instructor_id: 6,
        category_id: 1,
        title: 'Machine Learning với Python - Từ Cơ Bản đến Nâng Cao',
        short_description: 'Khóa học AI/ML toàn diện với các dự án thực tế.',
        description: '<h3>Về khóa học</h3><p>Học Machine Learning, Deep Learning với Python.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600',
        price: 2000000,
        discount_price: 1199000,
        level: CourseLevel.INTERMEDIATE,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-03-01T00:00:00.000Z',
        updated_at: '2024-11-01T00:00:00.000Z'
    },
    {
        id: 5,
        instructor_id: 3,
        category_id: 1,
        title: 'Flutter & Dart - Lập Trình Mobile Cross-Platform',
        short_description: 'Xây dựng ứng dụng iOS và Android với một codebase duy nhất.',
        description: '<h3>Về khóa học</h3><p>Học Flutter từ cơ bản. Xây dựng 3 ứng dụng hoàn chỉnh.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
        price: 1400000,
        discount_price: 749000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-03-15T00:00:00.000Z',
        updated_at: '2024-10-15T00:00:00.000Z'
    },

    // === NGOẠI NGỮ ===
    {
        id: 6,
        instructor_id: 4,
        category_id: 2,
        title: 'IELTS Speaking Band 7.0+ - Chiến Lược & Luyện Tập',
        short_description: 'Lộ trình học Speaking IELTS bài bản để đạt band 7.0+.',
        description: '<h3>Về khóa học</h3><p>Học chiến lược trả lời, từ vựng nâng cao, 100+ bài mẫu Speaking.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
        price: 1000000,
        discount_price: 650000,
        level: CourseLevel.INTERMEDIATE,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-01-25T00:00:00.000Z',
        updated_at: '2024-11-12T00:00:00.000Z'
    },
    {
        id: 7,
        instructor_id: 4,
        category_id: 2,
        title: 'TOEIC 900+ Listening & Reading',
        short_description: 'Chiến lược làm bài và luyện đề TOEIC mục tiêu 900+.',
        description: '<h3>Về khóa học</h3><p>Phân tích từng part, bẫy thường gặp, 20 bộ đề thực chiến.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
        price: 1300000,
        discount_price: 750000,
        level: CourseLevel.INTERMEDIATE,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-02-10T00:00:00.000Z',
        updated_at: '2024-11-08T00:00:00.000Z'
    },
    {
        id: 8,
        instructor_id: 4,
        category_id: 2,
        title: 'Tiếng Anh Giao Tiếp Công Sở',
        short_description: 'Cải thiện kỹ năng giao tiếp tiếng Anh trong môi trường làm việc.',
        description: '<h3>Về khóa học</h3><p>Email, meeting, presentation, negotiation bằng tiếng Anh.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
        price: 800000,
        discount_price: 499000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-02-20T00:00:00.000Z',
        updated_at: '2024-10-25T00:00:00.000Z'
    },

    // === THIẾT KẾ ===
    {
        id: 9,
        instructor_id: 5,
        category_id: 4,
        title: 'UI/UX Design Toàn Tập với Figma',
        short_description: 'Quy trình thiết kế UI/UX hoàn chỉnh từ research đến handoff.',
        description: '<h3>Về khóa học</h3><p>Học Design Thinking, Wireframe, Prototype, Design System với Figma.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
        price: 1100000,
        discount_price: 699000,
        level: CourseLevel.ALL_LEVELS,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-03-01T00:00:00.000Z',
        updated_at: '2024-11-05T00:00:00.000Z'
    },
    {
        id: 10,
        instructor_id: 5,
        category_id: 4,
        title: 'Adobe Photoshop - Từ Cơ Bản đến Chuyên Nghiệp',
        short_description: 'Thành thạo Photoshop cho thiết kế đồ họa và chỉnh sửa ảnh.',
        description: '<h3>Về khóa học</h3><p>Công cụ, layer, mask, retouching, compositing, color grading.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600',
        price: 900000,
        discount_price: 549000,
        level: CourseLevel.ALL_LEVELS,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-03-10T00:00:00.000Z',
        updated_at: '2024-10-20T00:00:00.000Z'
    },
    {
        id: 11,
        instructor_id: 5,
        category_id: 4,
        title: 'Video Editing với Adobe Premiere Pro',
        short_description: 'Học dựng video chuyên nghiệp cho YouTube, TikTok, quảng cáo.',
        description: '<h3>Về khóa học</h3><p>Cắt ghép, hiệu ứng, color grading, audio mixing, export tối ưu.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
        price: 1000000,
        discount_price: 599000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-03-20T00:00:00.000Z',
        updated_at: '2024-10-15T00:00:00.000Z'
    },

    // === KINH DOANH ===
    {
        id: 12,
        instructor_id: 6,
        category_id: 3,
        title: 'Digital Marketing A-Z 2024',
        short_description: 'Học marketing online toàn diện: SEO, Ads, Social, Content.',
        description: '<h3>Về khóa học</h3><p>Google Ads, Facebook Ads, SEO, Content Marketing, Email Marketing.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
        price: 1200000,
        discount_price: 699000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-04-01T00:00:00.000Z',
        updated_at: '2024-11-01T00:00:00.000Z'
    },
    {
        id: 13,
        instructor_id: 6,
        category_id: 3,
        title: 'Excel Nâng Cao cho Dân Văn Phòng',
        short_description: 'Thành thạo Excel: hàm, pivot table, dashboard, VBA cơ bản.',
        description: '<h3>Về khóa học</h3><p>VLOOKUP, INDEX-MATCH, Pivot Table, Chart, Dashboard, Macro.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
        price: 600000,
        discount_price: 349000,
        level: CourseLevel.BEGINNER,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-04-10T00:00:00.000Z',
        updated_at: '2024-10-25T00:00:00.000Z'
    },

    // === PHÁT TRIỂN BẢN THÂN ===
    {
        id: 14,
        instructor_id: 4,
        category_id: 5,
        title: 'Kỹ Năng Thuyết Trình Chuyên Nghiệp',
        short_description: 'Chinh phục mọi buổi thuyết trình với sự tự tin.',
        description: '<h3>Về khóa học</h3><p>Cấu trúc bài, thiết kế slide, ngôn ngữ cơ thể, xử lý Q&A.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
        price: 500000,
        discount_price: 299000,
        level: CourseLevel.ALL_LEVELS,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-04-15T00:00:00.000Z',
        updated_at: '2024-10-10T00:00:00.000Z'
    },
    {
        id: 15,
        instructor_id: 6,
        category_id: 5,
        title: 'Quản Lý Thời Gian & Năng Suất Cá Nhân',
        short_description: 'Phương pháp làm việc hiệu quả, cân bằng cuộc sống.',
        description: '<h3>Về khóa học</h3><p>Pomodoro, Time Blocking, GTD, Notion, quản lý email hiệu quả.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600',
        price: 400000,
        discount_price: 249000,
        level: CourseLevel.ALL_LEVELS,
        language: 'vi',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-04-20T00:00:00.000Z',
        updated_at: '2024-10-05T00:00:00.000Z'
    },

    // === TEST COURSE - All Layout Types & Block Types ===
    {
        id: 16,
        instructor_id: 3,
        category_id: 1,
        title: 'Complete Lesson Builder Demo - All Features',
        short_description: 'Demo course showcasing all layout types and block types in the lesson builder.',
        description: '<h3>About this course</h3><p>This is a comprehensive demo course designed to test all features of the lesson builder system. Each lesson uses a different layout type and contains various block types.</p>',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
        price: 0,
        discount_price: 0,
        level: CourseLevel.ALL_LEVELS,
        language: 'en',
        status: CourseStatus.PUBLISHED,
        created_at: '2024-12-18T00:00:00.000Z',
        updated_at: '2024-12-18T00:00:00.000Z'
    }
];

// Helpers
export const getCourseById = (id: number): Course | undefined => {
    return COURSES.find(c => c.id === id);
};

export const getCoursesByInstructor = (instructorId: number): Course[] => {
    return COURSES.filter(c => c.instructor_id === instructorId);
};

export const getCoursesByCategory = (categoryId: number): Course[] => {
    return COURSES.filter(c => c.category_id === categoryId);
};

export const getCoursesByStatus = (status: CourseStatus): Course[] => {
    return COURSES.filter(c => c.status === status);
};
