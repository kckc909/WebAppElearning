/**
 * MOCK DB - course_categories
 */

export interface CourseCategory {
    id: number;
    name: string;
    slug: string | null;
    icon: string | null;
    description: string | null;
    parent_id: number | null;
}

export const COURSE_CATEGORIES: CourseCategory[] = [
    { id: 1, name: 'Lập trình & CNTT', slug: 'programming', icon: 'code', description: 'Học lập trình, phát triển web, mobile, AI/ML', parent_id: null },
    { id: 2, name: 'Ngoại ngữ', slug: 'languages', icon: 'globe', description: 'Tiếng Anh, IELTS, TOEIC, tiếng Nhật, Hàn, Trung', parent_id: null },
    { id: 3, name: 'Kinh doanh', slug: 'business', icon: 'briefcase', description: 'Marketing, quản lý, khởi nghiệp, tài chính', parent_id: null },
    { id: 4, name: 'Thiết kế', slug: 'design', icon: 'palette', description: 'UI/UX, Graphic Design, Video Editing', parent_id: null },
    { id: 5, name: 'Phát triển bản thân', slug: 'personal-dev', icon: 'user', description: 'Kỹ năng mềm, quản lý thời gian, giao tiếp', parent_id: null },
    { id: 6, name: 'Sức khỏe & Đời sống', slug: 'lifestyle', icon: 'heart', description: 'Yoga, nấu ăn, làm đẹp, sức khỏe tinh thần', parent_id: null },
    { id: 7, name: 'Web Development', slug: 'web-dev', icon: 'globe', description: 'Phát triển web frontend và backend', parent_id: 1 },
    { id: 8, name: 'Mobile Development', slug: 'mobile-dev', icon: 'smartphone', description: 'Lập trình ứng dụng mobile', parent_id: 1 },
    { id: 9, name: 'IELTS', slug: 'ielts', icon: 'award', description: 'Luyện thi IELTS các band điểm', parent_id: 2 },
    { id: 10, name: 'TOEIC', slug: 'toeic', icon: 'award', description: 'Luyện thi TOEIC mục tiêu cao', parent_id: 2 },
];
