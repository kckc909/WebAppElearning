/**
 * ⚠️ ⚠️ ⚠️ DEPRECATED - DO NOT USE ⚠️ ⚠️ ⚠️
 * 
 * This file is LEGACY and will be removed.
 * 
 * NEW ARCHITECTURE (Phase 4-6):
 * ✅ Use: mock-db/ - Raw DB data (seedable)
 * ✅ Use: data/repositories/ - Business logic + JOINs
 * ✅ Use: data/datasources/ - Data access layer
 * 
 * MIGRATION PATH:
 * - API layer: Import from mock-db + repositories
 * - UI layer: Use repositories (NOT this file)
 * 
 * This file contains:
 * ❌ Computed fields (instructor object, rating)
 * ❌ Joins done in advance
 * ❌ Mixed concerns (raw + enriched)
 * 
 * KEPT FOR: Temporary backward compatibility only
 * WILL BE DELETED: After full migration complete
 * 
 * @deprecated Use mock-db + repository layer instead
 */

/**
 * MOCK DATA - Dữ liệu giả khớp với Prisma Database Schema
 * Khi chuyển sang DB thật, chỉ cần thay đổi data source
 */

// ============================================
// ENUMS & CONSTANTS (khớp với DB)
// ============================================
export const ROLES = {
	SUPER_ADMIN: -1,
	ADMIN: 0,
	INSTRUCTOR: 1,
	STUDENT: 2,
} as const;

export const COURSE_LEVELS = {
	ALL: 0,
	BEGINNER: 1,
	INTERMEDIATE: 2,
	ADVANCED: 3,
} as const;

export const COURSE_STATUS = {
	DRAFT: 0,
	PENDING: 1,
	PUBLISHED: 2,
	ARCHIVED: 3,
} as const;

// ============================================
// ACCOUNTS - Tài khoản (khớp với bảng accounts)
// ============================================
export const ACCOUNTS = [
	// Super Admin
	{ id: 1, full_name: 'Super Admin', email: 'superadmin@milearn.com', password_hash: '000000', role: -1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin', username: 'superadmin', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
	// Admins
	{ id: 2, full_name: 'Nguyễn Quản Trị', email: 'admin@milearn.com', password_hash: '000000', role: 0, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', username: 'admin', created_at: '2024-01-05T00:00:00.000Z', updated_at: '2024-01-05T00:00:00.000Z' },
	// Instructors
	{ id: 5, full_name: 'Nguyễn Giảng Viên', email: 'duc.le@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc', username: 'instructor', created_at: '2024-01-15T00:00:00.000Z', updated_at: '2024-01-15T00:00:00.000Z' },
	{ id: 3, full_name: 'Trần Quang Minh Đức', email: 'tqmd@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung', username: 'tqmd', created_at: '2024-01-10T00:00:00.000Z', updated_at: '2024-01-10T00:00:00.000Z' },
	{ id: 4, full_name: 'Nguyễn Thị Duyên', email: 'duyennguyen@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan', username: 'ntd', created_at: '2024-01-12T00:00:00.000Z', updated_at: '2024-01-12T00:00:00.000Z' },
	{ id: 6, full_name: 'Phạm Hoàng Nam', email: 'nam.pham@milearn.com', password_hash: '000000', role: 1, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam', username: 'nam.pham', created_at: '2024-02-01T00:00:00.000Z', updated_at: '2024-02-01T00:00:00.000Z' },
	// Students
	{ id: 7, full_name: 'Chu Đức Minh', email: 'student@milearn.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', username: 'student', created_at: '2024-02-10T00:00:00.000Z', updated_at: '2024-02-10T00:00:00.000Z' },
	{ id: 8, full_name: 'Võ Thị Hương', email: 'huong.vo@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Huong', username: 'huong.vo', created_at: '2024-02-15T00:00:00.000Z', updated_at: '2024-02-15T00:00:00.000Z' },
	{ id: 9, full_name: 'Đặng Văn Tùng', email: 'tung.dang@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tung', username: 'tung.dang', created_at: '2024-02-20T00:00:00.000Z', updated_at: '2024-02-20T00:00:00.000Z' },
	{ id: 10, full_name: 'Bùi Thị Mai', email: 'mai.bui@gmail.com', password_hash: '000000', role: 2, status: 1, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai', username: 'mai.bui', created_at: '2024-03-01T00:00:00.000Z', updated_at: '2024-03-01T00:00:00.000Z' },
];

// ============================================
// USER_PROFILES - Thông tin mở rộng (khớp với bảng user_profiles)
// ============================================
export const USER_PROFILES = [
	{ id: 1, user_id: 3, bio: 'Senior Full-stack Developer với 10+ năm kinh nghiệm. Từng làm việc tại FPT, VNG.', phone: '0912345678', gender: 1, dob: '1990-05-15', job_title: 'Senior Developer', social_links: { linkedin: 'https://linkedin.com/in/hungtran', github: 'https://github.com/hungtran' }, country: 'Vietnam', language: 'vi' },
	{ id: 2, user_id: 4, bio: 'IELTS 9.0, giảng viên tiếng Anh với 8 năm kinh nghiệm.', phone: '0912345679', gender: 2, dob: '1992-08-20', job_title: 'English Teacher', social_links: { linkedin: 'https://linkedin.com/in/lannguyen' }, country: 'Vietnam', language: 'vi' },
	{ id: 3, user_id: 5, bio: 'UI/UX Designer tại Grab. 6 năm kinh nghiệm thiết kế sản phẩm.', phone: '0912345680', gender: 1, dob: '1994-03-10', job_title: 'UI/UX Designer', social_links: { dribbble: 'https://dribbble.com/ducle' }, country: 'Vietnam', language: 'vi' },
	{ id: 4, user_id: 6, bio: 'Data Scientist, AI Engineer tại VinAI. Chuyên gia về Machine Learning.', phone: '0912345681', gender: 1, dob: '1991-11-25', job_title: 'Data Scientist', social_links: { linkedin: 'https://linkedin.com/in/nampham' }, country: 'Vietnam', language: 'vi' },
	{ id: 5, user_id: 7, bio: 'Sinh viên CNTT đam mê công nghệ.', phone: '0987654321', gender: 1, dob: '2000-06-12', job_title: 'Student', social_links: {}, country: 'Vietnam', language: 'vi' },
];

// ============================================
// COURSE_CATEGORIES - Danh mục (khớp với bảng course_categories)
// ============================================
export const COURSE_CATEGORIES = [
	{ id: 1, name: 'Lập trình & CNTT', slug: 'programming', icon: 'code', description: 'Học lập trình, phát triển web, mobile, AI/ML', parent_id: null },
	{ id: 2, name: 'Ngoại ngữ', slug: 'languages', icon: 'globe', description: 'Tiếng Anh, IELTS, TOEIC, tiếng Nhật, Hàn, Trung', parent_id: null },
	{ id: 3, name: 'Kinh doanh', slug: 'business', icon: 'briefcase', description: 'Marketing, quản lý, khởi nghiệp, tài chính', parent_id: null },
	{ id: 4, name: 'Thiết kế', slug: 'design', icon: 'palette', description: 'UI/UX, Graphic Design, Video Editing', parent_id: null },
	{ id: 5, name: 'Phát triển bản thân', slug: 'personal-dev', icon: 'user', description: 'Kỹ năng mềm, quản lý thời gian, giao tiếp', parent_id: null },
	{ id: 6, name: 'Sức khỏe & Đời sống', slug: 'lifestyle', icon: 'heart', description: 'Yoga, nấu ăn, làm đẹp, sức khỏe tinh thần', parent_id: null },
	// Sub-categories
	{ id: 7, name: 'Web Development', slug: 'web-dev', icon: 'globe', description: 'Phát triển web frontend và backend', parent_id: 1 },
	{ id: 8, name: 'Mobile Development', slug: 'mobile-dev', icon: 'smartphone', description: 'Lập trình ứng dụng mobile', parent_id: 1 },
	{ id: 9, name: 'IELTS', slug: 'ielts', icon: 'award', description: 'Luyện thi IELTS các band điểm', parent_id: 2 },
	{ id: 10, name: 'TOEIC', slug: 'toeic', icon: 'award', description: 'Luyện thi TOEIC mục tiêu cao', parent_id: 2 },
];

// Alias for backward compatibility
export const CATEGORIES = COURSE_CATEGORIES;

// ============================================
// COURSES - Khóa học (khớp với bảng courses)
// ============================================
export const COURSES = [
	// === LẬP TRÌNH ===
	{
		id: 1, instructor_id: 3, category_id: 1,
		title: 'ReactJS cho Người Mới Bắt Đầu - Xây Dựng Web App 2024',
		short_description: 'Học ReactJS từ cơ bản đến nâng cao qua các dự án thực tế.',
		description: '<h3>Về khóa học</h3><p>Khóa học ReactJS toàn diện nhất dành cho người mới. Bạn sẽ học Components, Hooks, Redux và xây dựng 5+ dự án thực tế.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
		price: 1200000, discount_price: 599000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-01-20', updated_at: '2024-11-15',
	},
	{
		id: 2, instructor_id: 3, category_id: 1,
		title: 'Python Masterclass: Từ Zero đến Hero',
		short_description: 'Khóa học Python toàn diện cho mọi cấp độ.',
		description: '<h3>Về khóa học</h3><p>Học Python từ cơ bản đến nâng cao. Bao gồm Data Analysis, Web Scraping, Automation.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600',
		price: 1500000, discount_price: 799000,
		level: 0, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-02-01', updated_at: '2024-11-10',
	},
	{
		id: 3, instructor_id: 3, category_id: 1,
		title: 'NodeJS & Express - Xây Dựng RESTful API',
		short_description: 'Học backend development với Node.js và Express framework.',
		description: '<h3>Về khóa học</h3><p>Xây dựng API chuyên nghiệp với NodeJS, Express, MongoDB.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600',
		price: 1300000, discount_price: 699000,
		level: 2, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-02-15', updated_at: '2024-10-20',
	},
	{
		id: 4, instructor_id: 6, category_id: 1,
		title: 'Machine Learning với Python - Từ Cơ Bản đến Nâng Cao',
		short_description: 'Khóa học AI/ML toàn diện với các dự án thực tế.',
		description: '<h3>Về khóa học</h3><p>Học Machine Learning, Deep Learning với Python.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600',
		price: 2000000, discount_price: 1199000,
		level: 2, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-03-01', updated_at: '2024-11-01',
	},
	{
		id: 5, instructor_id: 3, category_id: 1,
		title: 'Flutter & Dart - Lập Trình Mobile Cross-Platform',
		short_description: 'Xây dựng ứng dụng iOS và Android với một codebase duy nhất.',
		description: '<h3>Về khóa học</h3><p>Học Flutter từ cơ bản. Xây dựng 3 ứng dụng hoàn chỉnh.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
		price: 1400000, discount_price: 749000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-03-15', updated_at: '2024-10-15',
	},
	// === NGOẠI NGỮ ===
	{
		id: 6, instructor_id: 4, category_id: 2,
		title: 'IELTS Speaking Band 7.0+ - Chiến Lược & Luyện Tập',
		short_description: 'Lộ trình học Speaking IELTS bài bản để đạt band 7.0+.',
		description: '<h3>Về khóa học</h3><p>Học chiến lược trả lời, từ vựng nâng cao, 100+ bài mẫu Speaking.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
		price: 1000000, discount_price: 650000,
		level: 2, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-01-25', updated_at: '2024-11-12',
	},
	{
		id: 7, instructor_id: 4, category_id: 2,
		title: 'TOEIC 900+ Listening & Reading',
		short_description: 'Chiến lược làm bài và luyện đề TOEIC mục tiêu 900+.',
		description: '<h3>Về khóa học</h3><p>Phân tích từng part, bẫy thường gặp, 20 bộ đề thực chiến.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
		price: 1300000, discount_price: 750000,
		level: 2, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-02-10', updated_at: '2024-11-08',
	},
	{
		id: 8, instructor_id: 4, category_id: 2,
		title: 'Tiếng Anh Giao Tiếp Công Sở',
		short_description: 'Cải thiện kỹ năng giao tiếp tiếng Anh trong môi trường làm việc.',
		description: '<h3>Về khóa học</h3><p>Email, meeting, presentation, negotiation bằng tiếng Anh.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
		price: 800000, discount_price: 499000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-02-20', updated_at: '2024-10-25',
	},
	// === THIẾT KẾ ===
	{
		id: 9, instructor_id: 5, category_id: 4,
		title: 'UI/UX Design Toàn Tập với Figma',
		short_description: 'Quy trình thiết kế UI/UX hoàn chỉnh từ research đến handoff.',
		description: '<h3>Về khóa học</h3><p>Học Design Thinking, Wireframe, Prototype, Design System với Figma.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
		price: 1100000, discount_price: 699000,
		level: 0, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-03-01', updated_at: '2024-11-05',
	},
	{
		id: 10, instructor_id: 5, category_id: 4,
		title: 'Adobe Photoshop - Từ Cơ Bản đến Chuyên Nghiệp',
		short_description: 'Thành thạo Photoshop cho thiết kế đồ họa và chỉnh sửa ảnh.',
		description: '<h3>Về khóa học</h3><p>Công cụ, layer, mask, retouching, compositing, color grading.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600',
		price: 900000, discount_price: 549000,
		level: 0, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-03-10', updated_at: '2024-10-20',
	},
	{
		id: 11, instructor_id: 5, category_id: 4,
		title: 'Video Editing với Adobe Premiere Pro',
		short_description: 'Học dựng video chuyên nghiệp cho YouTube, TikTok, quảng cáo.',
		description: '<h3>Về khóa học</h3><p>Cắt ghép, hiệu ứng, color grading, audio mixing, export tối ưu.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
		price: 1000000, discount_price: 599000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-03-20', updated_at: '2024-10-15',
	},
	// === KINH DOANH ===
	{
		id: 12, instructor_id: 6, category_id: 3,
		title: 'Digital Marketing A-Z 2024',
		short_description: 'Học marketing online toàn diện: SEO, Ads, Social, Content.',
		description: '<h3>Về khóa học</h3><p>Google Ads, Facebook Ads, SEO, Content Marketing, Email Marketing.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
		price: 1200000, discount_price: 699000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-04-01', updated_at: '2024-11-01',
	},
	{
		id: 13, instructor_id: 6, category_id: 3,
		title: 'Excel Nâng Cao cho Dân Văn Phòng',
		short_description: 'Thành thạo Excel: hàm, pivot table, dashboard, VBA cơ bản.',
		description: '<h3>Về khóa học</h3><p>VLOOKUP, INDEX-MATCH, Pivot Table, Chart, Dashboard, Macro.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
		price: 600000, discount_price: 349000,
		level: 1, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-04-10', updated_at: '2024-10-25',
	},
	// === PHÁT TRIỂN BẢN THÂN ===
	{
		id: 14, instructor_id: 4, category_id: 5,
		title: 'Kỹ Năng Thuyết Trình Chuyên Nghiệp',
		short_description: 'Chinh phục mọi buổi thuyết trình với sự tự tin.',
		description: '<h3>Về khóa học</h3><p>Cấu trúc bài, thiết kế slide, ngôn ngữ cơ thể, xử lý Q&A.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
		price: 500000, discount_price: 299000,
		level: 0, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-04-15', updated_at: '2024-10-10',
	},
	{
		id: 15, instructor_id: 6, category_id: 5,
		title: 'Quản Lý Thời Gian & Năng Suất Cá Nhân',
		short_description: 'Phương pháp làm việc hiệu quả, cân bằng cuộc sống.',
		description: '<h3>Về khóa học</h3><p>Pomodoro, Time Blocking, GTD, Notion, quản lý email hiệu quả.</p>',
		thumbnail: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600',
		price: 400000, discount_price: 249000,
		level: 0, language: 'vi', status: 2, complete_at: null,
		created_at: '2024-04-20', updated_at: '2024-10-05',
	},
];

// ============================================
// COURSE_SECTIONS - Phần học (khớp với bảng course_sections)
// ============================================
export const COURSE_SECTIONS = [
	// Course 1 - ReactJS
	{ id: 1, course_id: 1, title: 'Giới thiệu & Cài đặt', order_index: 1 },
	{ id: 2, course_id: 1, title: 'React Cơ Bản - JSX & Components', order_index: 2 },
	{ id: 3, course_id: 1, title: 'State & Props', order_index: 3 },
	{ id: 4, course_id: 1, title: 'React Hooks', order_index: 4 },
	{ id: 5, course_id: 1, title: 'React Router', order_index: 5 },
	// Course 2 - Python
	{ id: 6, course_id: 2, title: 'Python Basics', order_index: 1 },
	{ id: 7, course_id: 2, title: 'Data Structures', order_index: 2 },
	{ id: 8, course_id: 2, title: 'Functions & OOP', order_index: 3 },
];

// ============================================
// COURSE_LESSONS - Bài học (khớp với bảng course_lessons)
// ============================================
export const COURSE_LESSONS = [
	// Section 1 - Giới thiệu ReactJS
	{ id: 1, section_id: 1, title: 'Chào mừng đến với khóa học', order_index: 1, layout: 1 },
	{ id: 2, section_id: 1, title: 'ReactJS là gì? Tại sao nên học?', order_index: 2, layout: 1 },
	{ id: 3, section_id: 1, title: 'Cài đặt Node.js và VS Code', order_index: 3, layout: 1 },
	{ id: 4, section_id: 1, title: 'Tạo dự án React đầu tiên', order_index: 4, layout: 1 },
	// Section 2 - JSX & Components
	{ id: 5, section_id: 2, title: 'JSX là gì?', order_index: 1, layout: 1 },
	{ id: 6, section_id: 2, title: 'Functional Components', order_index: 2, layout: 1 },
	{ id: 7, section_id: 2, title: 'Class Components (Legacy)', order_index: 3, layout: 1 },
	{ id: 8, section_id: 2, title: 'Bài tập thực hành', order_index: 4, layout: 2 },
];

// ============================================
// LESSON_CONTENTS - Nội dung bài học (khớp với bảng lesson_contents)
// ============================================
export const LESSON_CONTENTS = [
	{ id: 1, lesson_id: 1, position: 0, order_index: 0, type: 1, content_data: { video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 300 } },
	{ id: 2, lesson_id: 1, position: 1, order_index: 1, type: 2, content_data: { html: '<p>Chào mừng bạn đến với khóa học ReactJS!</p>' } },
	{ id: 3, lesson_id: 2, position: 0, order_index: 0, type: 1, content_data: { video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 600 } },
	{ id: 4, lesson_id: 2, position: 1, order_index: 1, type: 2, content_data: { html: '<h2>React là gì?</h2><p>React là một thư viện JavaScript...</p>' } },
];

// ============================================
// COURSE_REVIEWS - Đánh giá (khớp với bảng course_reviews)
// ============================================
export const COURSE_REVIEWS = [
	{ id: 1, course_id: 1, student_id: 7, rating: 5, comment: 'Khóa học rất chi tiết, giảng viên nhiệt tình. Mình đã có thể tự làm được project sau khi học xong!', created_at: '2024-10-15' },
	{ id: 2, course_id: 1, student_id: 8, rating: 5, comment: 'Nội dung cập nhật, thực tế. Recommend cho những bạn muốn học React.', created_at: '2024-10-20' },
	{ id: 3, course_id: 1, student_id: 9, rating: 4, comment: 'Khóa học hay nhưng mong thầy bổ sung thêm phần TypeScript.', created_at: '2024-11-01' },
	{ id: 4, course_id: 2, student_id: 7, rating: 5, comment: 'Python từ basic đến advanced, rất đầy đủ!', created_at: '2024-10-25' },
	{ id: 5, course_id: 6, student_id: 8, rating: 5, comment: 'Cô Lan dạy Speaking rất hay, mình tăng được 1 band sau 2 tháng học.', created_at: '2024-11-05' },
	{ id: 6, course_id: 9, student_id: 10, rating: 5, comment: 'Khóa UI/UX tuyệt vời! Đã xin được việc sau khi hoàn thành khóa học.', created_at: '2024-11-10' },
];

// ============================================
// COURSE_ENROLLMENTS - Đăng ký khóa học (khớp với bảng course_enrollments)
// ============================================
export const COURSE_ENROLLMENTS = [
	{ id: 1, course_id: 1, student_id: 7, enrolled_at: '2024-08-01', progress: 65, certificate_url: null, status: 1, last_lesson_id: 5 },
	{ id: 2, course_id: 2, student_id: 7, enrolled_at: '2024-09-15', progress: 30, certificate_url: null, status: 1, last_lesson_id: 2 },
	{ id: 3, course_id: 6, student_id: 7, enrolled_at: '2024-10-01', progress: 100, certificate_url: '/certificates/cert-001.pdf', status: 1, last_lesson_id: null },
	{ id: 4, course_id: 1, student_id: 8, enrolled_at: '2024-08-15', progress: 80, certificate_url: null, status: 1, last_lesson_id: 7 },
	{ id: 5, course_id: 9, student_id: 8, enrolled_at: '2024-09-01', progress: 45, certificate_url: null, status: 1, last_lesson_id: 3 },
	{ id: 6, course_id: 7, student_id: 9, enrolled_at: '2024-07-01', progress: 100, certificate_url: '/certificates/cert-002.pdf', status: 1, last_lesson_id: null },
	{ id: 7, course_id: 12, student_id: 10, enrolled_at: '2024-10-15', progress: 20, certificate_url: null, status: 1, last_lesson_id: 1 },
];

// ============================================
// COURSE_PROGRESS - Tiến độ từng bài (khớp với bảng course_progress)
// ============================================
export const COURSE_PROGRESS = [
	{ id: 1, enrollment_id: 1, lesson_id: 1, is_completed: true, completed_at: '2024-08-02' },
	{ id: 2, enrollment_id: 1, lesson_id: 2, is_completed: true, completed_at: '2024-08-03' },
	{ id: 3, enrollment_id: 1, lesson_id: 3, is_completed: true, completed_at: '2024-08-05' },
	{ id: 4, enrollment_id: 1, lesson_id: 4, is_completed: true, completed_at: '2024-08-07' },
	{ id: 5, enrollment_id: 1, lesson_id: 5, is_completed: false, completed_at: null },
];

// ============================================
// CLASSES - Lớp học (khớp với bảng classes)
// ============================================
export const CLASSES = [
	{ id: 1, course_id: 6, instructor_id: 4, title: 'IELTS Speaking K15', description: 'Lớp luyện Speaking IELTS khóa 15', start_date: '2024-11-01', end_date: '2025-01-31', meeting_link: 'https://meet.google.com/ielts-k15', max_students: 20, schedule: 'T2, T4, T6 - 19:30', status: 1, created_at: '2024-10-15' },
	{ id: 2, course_id: 7, instructor_id: 4, title: 'TOEIC 900+ K10', description: 'Lớp luyện thi TOEIC mục tiêu 900+', start_date: '2024-11-15', end_date: '2025-02-15', meeting_link: 'https://meet.google.com/toeic-k10', max_students: 25, schedule: 'T3, T5, T7 - 20:00', status: 1, created_at: '2024-10-20' },
	{ id: 3, course_id: 1, instructor_id: 3, title: 'ReactJS Bootcamp K5', description: 'Bootcamp ReactJS 3 tháng', start_date: '2024-12-01', end_date: '2025-02-28', meeting_link: 'https://meet.google.com/react-k5', max_students: 30, schedule: 'T2, T4 - 20:00; T7 - 09:00', status: 1, created_at: '2024-11-01' },
];

// ============================================
// CLASS_STUDENTS - Học viên lớp (khớp với bảng class_students)
// ============================================
export const CLASS_STUDENTS = [
	{ id: 1, class_id: 1, student_id: 7, joined_at: '2024-10-20', status: 1 },
	{ id: 2, class_id: 1, student_id: 8, joined_at: '2024-10-22', status: 1 },
	{ id: 3, class_id: 2, student_id: 9, joined_at: '2024-10-25', status: 1 },
	{ id: 4, class_id: 3, student_id: 7, joined_at: '2024-11-05', status: 1 },
	{ id: 5, class_id: 3, student_id: 10, joined_at: '2024-11-06', status: 1 },
];

// ============================================
// CLASS_CALENDAR - Lịch lớp học (khớp với bảng class_calendar)
// ============================================
export const CLASS_CALENDAR = [
	// IELTS Class (id: 1) - December schedule
	{ id: 1, class_id: 1, title: 'Buổi 1: Giới thiệu IELTS', description: 'Tổng quan về format', event_date: '2024-12-02T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 1 },
	{ id: 2, class_id: 1, title: 'Buổi 2: Part 1 Strategies', description: 'Chiến lược Part 1', event_date: '2024-12-04T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 2 },
	{ id: 3, class_id: 1, title: 'Buổi 3: Part 2 Topics', description: 'Các chủ đề Part 2', event_date: '2024-12-06T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 3 },
	{ id: 4, class_id: 1, title: 'Buổi 4: Part 3 Discussion', description: 'Kỹ năng Part 3', event_date: '2024-12-09T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 4 },
	{ id: 5, class_id: 1, title: 'Test 2 bắt đầu', description: 'Bài kiểm tra 2', event_date: '2024-12-03T09:00:00', start_time: '09:00', end_time: '10:30', type: 'exam', lesson: null },
	{ id: 6, class_id: 1, title: 'Test 3 bắt đầu', description: 'Bài kiểm tra 3', event_date: '2024-12-03T14:00:00', start_time: '14:00', end_time: '15:30', type: 'exam', lesson: null },
	{ id: 7, class_id: 1, title: 'Test 4 bắt đầu', description: 'Bài kiểm tra 4', event_date: '2024-12-03T16:00:00', start_time: '16:00', end_time: '17:30', type: 'exam', lesson: null },
	{ id: 8, class_id: 1, title: 'Test 1 bắt đầu', description: 'Bài kiểm tra 1', event_date: '2024-12-03T19:00:00', start_time: '19:00', end_time: '20:30', type: 'exam', lesson: null },

	// TOEIC Class (id: 2) - December schedule
	{ id: 9, class_id: 2, title: 'Test 1 bắt đầu', description: 'TOEIC Test 1', event_date: '2024-12-04T20:00:00', start_time: '20:00', end_time: '22:00', type: 'exam', lesson: null },
	{ id: 10, class_id: 2, title: 'KTHP_10 buổi 1', description: 'Listening Part 1-2', event_date: '2024-12-04T14:00:00', start_time: '14:00', end_time: '16:00', type: 'class', lesson: 1 },
	{ id: 11, class_id: 2, title: 'Test 1 kết thúc', description: 'TOEIC Test 1 End', event_date: '2024-12-05T20:00:00', start_time: '20:00', end_time: '22:00', type: 'exam', lesson: null },
	{ id: 12, class_id: 2, title: 'KTHP_10 buổi 2', description: 'Listening Part 3-4', event_date: '2024-12-05T14:00:00', start_time: '14:00', end_time: '16:00', type: 'class', lesson: 2 },

	// ReactJS Class (id: 3) - December schedule
	{ id: 13, class_id: 3, title: 'KTHP_10 React', description: 'Kiểm tra thực hành', event_date: '2024-12-06T09:00:00', start_time: '09:00', end_time: '11:00', type: 'exam', lesson: null },
	{ id: 14, class_id: 3, title: 'KTHP_10 Lab 1', description: 'Lab thực hành 1', event_date: '2024-12-07T09:00:00', start_time: '09:00', end_time: '12:00', type: 'class', lesson: 1 },
	{ id: 15, class_id: 3, title: 'KTHP_10 Lab 2', description: 'Lab thực hành 2', event_date: '2024-12-07T14:00:00', start_time: '14:00', end_time: '17:00', type: 'class', lesson: 2 },

	// More events for this month
	{ id: 16, class_id: 1, title: 'Buổi 5: Mock Test', description: 'Thi thử IELTS', event_date: '2024-12-11T19:30:00', start_time: '19:30', end_time: '21:00', type: 'exam', lesson: 5 },
	{ id: 17, class_id: 1, title: 'Buổi 6: Feedback', description: 'Chữa bài thi thử', event_date: '2024-12-13T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 6 },
	{ id: 18, class_id: 2, title: 'KTHP_10 Review', description: 'Ôn tập cuối kỳ', event_date: '2024-12-12T20:00:00', start_time: '20:00', end_time: '22:00', type: 'class', lesson: 3 },
	{ id: 19, class_id: 3, title: 'Final Project', description: 'Nộp đồ án cuối kỳ', event_date: '2024-12-14T23:59:00', start_time: '23:59', end_time: '23:59', type: 'assignment', lesson: null },
	{ id: 20, class_id: 1, title: 'Buổi 7: Review', description: 'Ôn lại kiến thức', event_date: '2024-12-16T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 7 },
	{ id: 21, class_id: 1, title: 'Buổi 8: Tips', description: 'Mẹo thi IELTS', event_date: '2024-12-18T19:30:00', start_time: '19:30', end_time: '21:00', type: 'class', lesson: 8 },
];

// ============================================
// CLASS_ASSIGNMENTS - Bài tập lớp (khớp với bảng class_assignments)
// ============================================
export const CLASS_ASSIGNMENTS = [
	{ id: 1, class_id: 1, title: 'Writing Task 1: Bar Chart Analysis', description: 'Phân tích biểu đồ cột về doanh số theo quý', file_url: '/assignments/ielts-writing-task1.pdf', due_date: '2024-11-10T23:59:00', created_at: '2024-11-01' },
	{ id: 2, class_id: 1, title: 'Speaking Practice: Part 2 Cue Card', description: 'Record bài nói về chủ đề Describe a place', file_url: null, due_date: '2024-11-15T23:59:00', created_at: '2024-11-05' },
	{ id: 3, class_id: 3, title: 'React Component Lifecycle Quiz', description: 'Quiz về lifecycle methods và hooks', file_url: null, due_date: '2024-12-10T12:00:00', created_at: '2024-12-01' },
];

// ============================================
// CLASS_MATERIALS - Tài liệu lớp (khớp với bảng class_materials)
// ============================================
export const CLASS_MATERIALS = [
	{ id: 1, class_id: 1, title: 'IELTS Speaking Band Descriptors', description: 'Tiêu chí chấm điểm Speaking chính thức từ British Council', file_url: '/materials/ielts-band-descriptors.pdf', uploaded_at: '2024-10-28' },
	{ id: 2, class_id: 1, title: 'Top 50 Part 1 Topics', description: '50 chủ đề Part 1 thường gặp nhất', file_url: '/materials/part1-topics.pdf', uploaded_at: '2024-10-28' },
	{ id: 3, class_id: 3, title: 'React Cheat Sheet', description: 'Tổng hợp syntax và patterns React', file_url: '/materials/react-cheatsheet.pdf', uploaded_at: '2024-11-25' },
];

// ============================================
// PAYMENT_METHODS - Phương thức thanh toán (khớp với bảng payment_methods)
// ============================================
export const PAYMENT_METHODS = [
	{ id: 1, method_name: 'Chuyển khoản ngân hàng', provider: 'VietQR', is_active: true },
	{ id: 2, method_name: 'MoMo', provider: 'MoMo', is_active: true },
	{ id: 3, method_name: 'ZaloPay', provider: 'ZaloPay', is_active: true },
	{ id: 4, method_name: 'Thẻ tín dụng/ghi nợ', provider: 'VNPay', is_active: false },
];

// ============================================
// TRANSACTIONS - Giao dịch (khớp với bảng transactions)
// ============================================
export const TRANSACTIONS = [
	{ id: 1, user_id: 7, course_id: 1, amount: 599000, method_id: 1, transaction_code: 'TXN20240801001', status: 1, created_at: '2024-08-01' },
	{ id: 2, user_id: 7, course_id: 2, amount: 799000, method_id: 2, transaction_code: 'TXN20240915001', status: 1, created_at: '2024-09-15' },
	{ id: 3, user_id: 7, course_id: 6, amount: 650000, method_id: 1, transaction_code: 'TXN20241001001', status: 1, created_at: '2024-10-01' },
	{ id: 4, user_id: 8, course_id: 1, amount: 599000, method_id: 3, transaction_code: 'TXN20240815001', status: 1, created_at: '2024-08-15' },
	{ id: 5, user_id: 8, course_id: 9, amount: 699000, method_id: 1, transaction_code: 'TXN20240901001', status: 1, created_at: '2024-09-01' },
];

// ============================================
// CERTIFICATES - Chứng chỉ (khớp với bảng certificates)
// ============================================
export const CERTIFICATES = [
	{ id: 1, student_id: 7, course_id: 6, certificate_code: 'CERT-2024-IELTS-001', issued_at: '2024-11-01', pdf_url: '/certificates/cert-ielts-001.pdf' },
	{ id: 2, student_id: 9, course_id: 7, certificate_code: 'CERT-2024-TOEIC-001', issued_at: '2024-10-15', pdf_url: '/certificates/cert-toeic-001.pdf' },
];

// ============================================
// NOTIFICATIONS - Thông báo (khớp với bảng notifications)
// ============================================
export const NOTIFICATIONS = [
	{ id: 1, user_id: 7, title: 'Chào mừng đến MiLearn!', message: 'Cảm ơn bạn đã đăng ký tài khoản. Hãy bắt đầu hành trình học tập!', type: 0, is_read: true, created_at: '2024-02-10' },
	{ id: 2, user_id: 7, title: 'Khóa học mới: ReactJS 2024', message: 'Khóa học ReactJS đã được cập nhật với nội dung mới nhất!', type: 1, is_read: true, created_at: '2024-08-01' },
	{ id: 3, user_id: 7, title: 'Deadline sắp đến!', message: 'Bài tập "Bar Chart Analysis" sẽ hết hạn vào ngày mai.', type: 2, is_read: false, created_at: '2024-11-09' },
];

// ============================================
// TEAM MEMBERS - Không có trong DB nhưng cần cho UI
// ============================================
export const TEAM_MEMBERS = [
	{ id: 1, name: 'Chu Đức Minh', title: 'CEO & Founder', avatar: 'https://picsum.photos/seed/team1/200/200', bio: 'Founder MiLearn, 10+ năm kinh nghiệm EdTech' },
	{ id: 2, name: 'Trần Quang Minh Đức', title: 'CTO', avatar: 'https://picsum.photos/seed/team2/200/200', bio: 'Technical Lead, Full-stack Developer' },
	{ id: 3, name: 'Nguyễn Thị Duyên', title: 'Head of Content', avatar: 'https://picsum.photos/seed/team3/200/200', bio: 'Quản lý nội dung và chất lượng khóa học' },
	{ id: 4, name: 'Nguyễn Hùng Anh', title: 'Marketing Director', avatar: 'https://picsum.photos/seed/team4/200/200', bio: 'Growth Marketing, Performance Ads' },
];

// ============================================
// DEMO USERS - Users để test đăng nhập
// ============================================
export const DEMO_USERS = {
	superadmin: { ...ACCOUNTS[0], password: '000000' },
	admin: { ...ACCOUNTS[1], password: '000000' },
	instructor: { ...ACCOUNTS[2], password: '000000' },
	student: { ...ACCOUNTS[6], password: '000000' },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
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

export const getCourseById = (id: number) => COURSES.find(c => c.id === id);
export const getCoursesByCategory = (categoryId: number) => COURSES.filter(c => c.category_id === categoryId);
export const getCoursesByInstructor = (instructorId: number) => COURSES.filter(c => c.instructor_id === instructorId);
export const getInstructorById = (id: number) => ACCOUNTS.find(a => a.id === id && a.role === ROLES.INSTRUCTOR);
export const getStudentEnrollments = (studentId: number) => COURSE_ENROLLMENTS.filter(e => e.student_id === studentId);
export const getUserProfile = (userId: number) => USER_PROFILES.find(p => p.user_id === userId);

// ============================================
// COMPUTED DATA - Dữ liệu tính toán từ các bảng khác
// ============================================

// Category mapping for legacy compatibility
const CATEGORY_MAP: Record<number, string> = {
	1: 'Digital Skills',
	2: 'Applied Language',
	3: 'Business',
	4: 'Design',
	5: 'Personal Development',
	6: 'Lifestyle',
};

// Legacy exports for backward compatibility
export const INSTRUCTORS = ACCOUNTS.filter(a => a.role === ROLES.INSTRUCTOR).map(a => {
	const profile = USER_PROFILES.find(p => p.user_id === a.id);
	return {
		id: a.id, name: a.full_name, avatar: a.avatar_url, title: profile?.job_title || '',
		bio: profile?.bio || '', rating: 4.8, reviews: 1000, students: 10000, courses: 5
	};
});

export const MOCK_USER = {
	id: 7, name: 'Chu Đức Minh', email: 'student@milearn.com',
	avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', role: 2
};

export const REVIEWS = COURSE_REVIEWS.slice(0, 3).map(r => {
	const student = ACCOUNTS.find(a => a.id === r.student_id);
	return { id: r.id, author: student?.full_name || '', avatar: student?.avatar_url || '', rating: r.rating, comment: r.comment, date: r.created_at };
});

// Enrich COURSES with computed fields (for UI display)
COURSES.forEach((course: any) => {
	course.category = CATEGORY_MAP[course.category_id] || 'Digital Skills';
	course.originalPrice = course.price;

	const instructor = ACCOUNTS.find(a => a.id === course.instructor_id);
	const profile = USER_PROFILES.find(p => p.user_id === course.instructor_id);
	if (instructor) {
		course.instructor = {
			id: instructor.id,
			name: instructor.full_name,
			avatar: instructor.avatar_url,
			title: profile?.job_title || '',
			full_name: instructor.full_name,
		};
	}

	// Computed from related tables
	const sections = COURSE_SECTIONS.filter(s => s.course_id === course.id);
	const lessons = COURSE_LESSONS.filter(l => sections.some(s => s.id === l.section_id));
	const reviews = COURSE_REVIEWS.filter(r => r.course_id === course.id);
	const enrollments = COURSE_ENROLLMENTS.filter(e => e.course_id === course.id);

	course.total_lessons = lessons.length || Math.floor(Math.random() * 100) + 50;
	course.total_students = enrollments.length || Math.floor(Math.random() * 10000) + 1000;
	course.total_duration = course.total_lessons * 10; // ~10 min per lesson
	course.rating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 4.5 + Math.random() * 0.5;
	course.reviews_count = reviews.length || Math.floor(Math.random() * 1000) + 100;

	// Map level to string
	const LEVEL_MAP: Record<number, string> = { 0: 'All Levels', 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced' };
	course.levelLabel = LEVEL_MAP[course.level] || 'All Levels';

	// Add duration string
	const hours = Math.floor(course.total_duration / 60);
	course.duration = `${hours} giờ`;
	course.lectures = course.total_lessons;
	course.reviewsCount = course.reviews_count;
});

// ============================================
// LEGACY EXPORTS - For backward compatibility
// ============================================

// Student courses with progress (for MyCourses page)
export const STUDENT_COURSES = COURSE_ENROLLMENTS.filter(e => e.student_id === 7).map(enrollment => {
	const course = COURSES.find((c: any) => c.id === enrollment.course_id) as any;
	return {
		...course,
		progress: enrollment.progress,
		lastAccessed: enrollment.progress === 100 ? '1 month ago' : '2 hours ago',
		completed: enrollment.progress === 100,
		certificateUrl: enrollment.certificate_url,
	};
});

// Student classes (for MyClasses page)
export const STUDENT_CLASSES = CLASS_STUDENTS.filter(cs => cs.student_id === 7).map(cs => {
	const classItem = CLASSES.find(c => c.id === cs.class_id);
	const instructor = ACCOUNTS.find(a => a.id === classItem?.instructor_id);
	return {
		id: classItem?.id || 0,
		name: classItem?.title || '',
		instructor: instructor?.full_name || '',
		schedule: classItem?.schedule || '',
		progress: 40,
		nextSession: {
			id: 991,
			title: 'Mock Session',
			instructor: instructor?.full_name || '',
			startTime: new Date(Date.now() + 3600 * 1000).toISOString(),
			endTime: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
			meetingLink: classItem?.meeting_link || 'https://meet.google.com/abc-xyz',
			isLive: true
		}
	};
});

// Pending assignments (for Dashboard)
export const PENDING_ASSIGNMENTS = CLASS_ASSIGNMENTS.filter(a => {
	const dueDate = new Date(a.due_date);
	return dueDate > new Date();
}).map(a => ({
	id: a.id,
	class_id: a.class_id,
	title: a.title,
	classId: a.class_id,
	deadline: new Date(a.due_date).toLocaleDateString('vi-VN'),
	status: 2
}));