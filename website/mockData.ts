/**
 * MOCK DATA - Dữ liệu giả để phát triển và test UI
 * File này chứa tất cả dữ liệu mock cho toàn bộ ứng dụng
 */

import type {
	Instructor,
	Review,
	CourseWithRelations,
	Lesson,
	LessonComment,
	LessonQA,
	EnrolledCourse,
	StudentClass,
	ClassAssignmentUI,
	AccountUI
} from './types/types';

// ============================================
// INSTRUCTORS - Giảng viên
// ============================================
export const INSTRUCTORS: Instructor[] = [
	{
		id: 1,
		name: 'An Tuan',
		avatar: 'https://picsum.photos/seed/instructor1/100/100',
		title: 'Data Scientist & AI Engineer',
		bio: 'With over 10 years of experience in AI, An Tuan has helped thousands of students master machine learning and data science.',
		rating: 4.9,
		reviews: 1250,
		students: 15000,
		courses: 8,
	},
	{
		id: 2,
		name: 'Bao Chau',
		avatar: 'https://picsum.photos/seed/instructor2/100/100',
		title: 'IELTS 9.0 & English Communication Expert',
		bio: 'Bao Chau is a certified English teacher with a passion for helping students achieve their language goals.',
		rating: 4.8,
		reviews: 980,
		students: 22000,
		courses: 12,
	},
	{
		id: 3,
		name: 'Minh Hieu',
		avatar: 'https://picsum.photos/seed/instructor3/100/100',
		title: 'Full-Stack Web Developer & UI/UX Designer',
		bio: 'Hieu is a passionate developer who loves building beautiful and functional websites.',
		rating: 4.9,
		reviews: 1500,
		students: 18000,
		courses: 10,
	}
];

// ============================================
// REVIEWS - Đánh giá
// ============================================
export const REVIEWS: Review[] = [
	{
		id: 1,
		author: 'Minh Quan',
		avatar: 'https://picsum.photos/seed/user1/100/100',
		rating: 5,
		comment: 'Khóa học rất tuyệt vời! Giảng viên dạy dễ hiểu và nội dung rất thực tế.',
		date: '2 weeks ago',
	},
	{
		id: 2,
		author: 'Lan Anh',
		avatar: 'https://picsum.photos/seed/user2/100/100',
		rating: 4,
		comment: 'Nội dung hay nhưng một vài video âm thanh hơi nhỏ. Nhìn chung vẫn là một khóa học đáng tiền.',
		date: '1 month ago',
	}
];

// ============================================
// COURSES - Khóa học
// ============================================
export const COURSES: CourseWithRelations[] = [
	{
		id: 1,
		instructor_id: 1,
		title: 'ReactJS cho Người Mới Bắt Đầu - Xây Dựng Web App 2024',
		subtitle: 'Học ReactJS từ cơ bản đến nâng cao qua các dự án thực tế.',
		category: 'Digital Skills',
		instructor: INSTRUCTORS[0],
		thumbnail: 'https://picsum.photos/seed/react/600/400',
		price: 599000,
		originalPrice: 1200000,
		rating: 4.8,
		reviewsCount: 1254,
		level: 'Beginner',
		language: 'Vietnamese',
		duration: '25 giờ',
		lectures: 150,
		description: 'Khóa học ReactJS toàn diện nhất, giúp bạn trở thành lập trình viên React tự tin.',
		whatYouWillLearn: [
			'Nắm vững các khái niệm cốt lõi của React: Components, Props, State.',
			'Sử dụng thành thạo React Hooks (useState, useEffect, useContext).',
			'Xây dựng ứng dụng trang đơn (SPA) với React Router.',
			'Quản lý trạng thái ứng dụng phức tạp với Redux Toolkit.',
		],
		curriculum: [
			{ section: 'Giới thiệu & Cài đặt', lectures: [{ title: 'Tổng quan khóa học', duration: '5:30' }, { title: 'Cài đặt môi trường', duration: '12:15' }] },
			{ section: 'ReactJS Cơ Bản', lectures: [{ title: 'Components và Props', duration: '25:00' }, { title: 'State và Lifecycle', duration: '30:45' }] },
		],
		reviews: REVIEWS,
	},
	{
		id: 2,
		instructor_id: 2,
		title: 'Giao Tiếp Tiếng Anh Tự Tin trong Môi Trường Công Sở',
		subtitle: 'Cải thiện kỹ năng nghe, nói, viết email và thuyết trình chuyên nghiệp.',
		category: 'Applied Language',
		instructor: INSTRUCTORS[1],
		thumbnail: 'https://picsum.photos/seed/english/600/400',
		price: 499000,
		rating: 4.9,
		reviewsCount: 2341,
		level: 'Intermediate',
		language: 'Vietnamese',
		duration: '15 giờ',
		lectures: 80,
		description: 'Khóa học tập trung vào các tình huống giao tiếp thực tế trong môi trường làm việc quốc tế.',
		whatYouWillLearn: [
			'Tham gia các cuộc họp và thảo luận bằng tiếng Anh.',
			'Viết email công việc chuyên nghiệp và hiệu quả.',
			'Thực hiện các bài thuyết trình ấn tượng.',
		],
		curriculum: [
			{ section: 'Kỹ năng Viết Email', lectures: [{ title: 'Cấu trúc một email chuyên nghiệp', duration: '15:10' }, { title: 'Các mẫu câu thường dùng', duration: '20:00' }] },
		],
		reviews: REVIEWS,
	},
	{
		id: 3,
		instructor_id: 1,
		title: 'Python Masterclass: From Zero to Hero',
		subtitle: 'Comprehensive Python course for beginners.',
		category: 'Digital Skills',
		instructor: INSTRUCTORS[0],
		thumbnail: 'https://picsum.photos/seed/python/600/400',
		price: 799000,
		originalPrice: 1500000,
		rating: 4.7,
		reviewsCount: 3102,
		level: 'All Levels',
		language: 'English',
		duration: '40 giờ',
		lectures: 250,
		description: 'The complete Python bootcamp. Learn everything from Python basics to advanced topics.',
		whatYouWillLearn: [
			'Master Python 3 fundamentals.',
			'Build web applications with Flask and Django.',
			'Perform data analysis with Pandas and NumPy.',
		],
		curriculum: [
			{ section: 'Python Basics', lectures: [{ title: 'Variables and Data Types', duration: '15:00' }, { title: 'Control Flow', duration: '25:30' }] },
		],
		reviews: REVIEWS,
	},
	{
		id: 4,
		instructor_id: 2,
		title: 'Luyện Thi IELTS Speaking Band 7.0+',
		subtitle: 'Chiến lược, từ vựng và bài mẫu chi tiết giúp bạn chinh phục band điểm 7.0+.',
		category: 'Applied Language',
		instructor: INSTRUCTORS[1],
		thumbnail: 'https://picsum.photos/seed/ielts/600/400',
		price: 650000,
		rating: 4.9,
		reviewsCount: 1890,
		level: 'Advanced',
		language: 'Vietnamese',
		duration: '20 giờ',
		lectures: 100,
		description: 'Lộ trình học tập bài bản cho IELTS Speaking.',
		whatYouWillLearn: [
			'Hiểu rõ các tiêu chí chấm điểm của IELTS Speaking.',
			'Phát triển ý tưởng và trả lời câu hỏi một cách logic.',
		],
		curriculum: [
			{ section: 'Part 1: Introduction', lectures: [{ title: 'Answering Common Topics', duration: '18:00' }] },
		],
		reviews: REVIEWS,
	},
	{
		id: 5,
		instructor_id: 3,
		title: 'UI/UX Design Toàn Tập',
		subtitle: 'Học quy trình thiết kế UI/UX hoàn chỉnh từ nghiên cứu đến handover.',
		category: 'Digital Skills',
		instructor: INSTRUCTORS[2],
		thumbnail: 'https://picsum.photos/seed/uiux/600/400',
		price: 899000,
		rating: 4.9,
		reviewsCount: 2150,
		level: 'All Levels',
		language: 'Vietnamese',
		duration: '30 giờ',
		lectures: 120,
		description: 'Trở thành một nhà thiết kế UI/UX chuyên nghiệp.',
		whatYouWillLearn: [
			'Hiểu rõ các nguyên tắc cơ bản của UI và UX.',
			'Thiết kế wireframe, mockup và prototype tương tác.',
		],
		curriculum: [
			{ section: 'Introduction to UI/UX', lectures: [{ title: 'What is UI/UX?', duration: '10:00' }] },
		],
		reviews: REVIEWS,
	},
	{
		id: 6,
		instructor_id: 2,
		title: 'Luyện Thi TOEIC Listening & Reading Mục Tiêu 900+',
		subtitle: 'Tổng hợp chiến lược làm bài giúp bạn đạt điểm tối đa TOEIC.',
		category: 'Applied Language',
		instructor: INSTRUCTORS[1],
		thumbnail: 'https://picsum.photos/seed/toeic/600/400',
		price: 750000,
		originalPrice: 1300000,
		rating: 4.8,
		reviewsCount: 3421,
		level: 'Intermediate',
		language: 'Vietnamese',
		duration: '35 giờ',
		lectures: 200,
		description: 'Chinh phục TOEIC với lộ trình học tập hiệu quả.',
		whatYouWillLearn: [
			'Nắm vững các bẫy thường gặp trong đề thi TOEIC.',
			'Cải thiện tốc độ làm bài và kỹ năng quản lý thời gian.',
		],
		curriculum: [
			{ section: 'Listening Comprehension', lectures: [{ title: 'Part 1: Photographs', duration: '12:00' }] },
		],
		reviews: REVIEWS,
	},
];

// ============================================
// CATEGORIES - Danh mục
// ============================================
export const CATEGORIES = [
	{ name: 'Kỹ năng số', icon: 'desktop-outline' },
	{ name: 'Ngoại ngữ ứng dụng', icon: 'language-outline' },
	{ name: 'Phát triển bản thân', icon: 'sparkles-outline' },
	{ name: 'Kinh doanh & Marketing', icon: 'business-outline' },
	{ name: 'Thiết kế & Sáng tạo', icon: 'color-palette-outline' },
	{ name: 'Sức khỏe & Đời sống', icon: 'heart-outline' },
];

// ============================================
// TEAM MEMBERS - Thành viên nhóm
// ============================================
export const TEAM_MEMBERS = [
	{ name: 'Nguyen Van A', title: 'CEO & Founder', avatar: 'https://picsum.photos/seed/team1/200/200' },
	{ name: 'Tran Thi B', title: 'CTO', avatar: 'https://picsum.photos/seed/team2/200/200' },
	{ name: 'Le Van C', title: 'Head of Content', avatar: 'https://picsum.photos/seed/team3/200/200' },
	{ name: 'Pham Thi D', title: 'Marketing Director', avatar: 'https://picsum.photos/seed/team4/200/200' },
];

// ============================================
// LESSONS - Bài học
// ============================================
export const LESSONS: Lesson[] = [
	{
		id: 1,
		courseId: 1,
		title: 'Giới thiệu về JSX',
		type: 'coding',
		content: `## JSX là gì?

JSX là viết tắt của JavaScript XML. Nó cho phép chúng ta viết HTML trong React.

### Ví dụ
\`\`\`jsx
const myelement = <h1>Tôi yêu JSX!</h1>;
\`\`\`

### Thử thách
Hãy tạo một phần tử \`<h2>\` chứa dòng chữ "Xin chào, SkillUp!".`,
		starterCode: `import React from 'react';

// Viết code của bạn ở đây

`,
		hints: [
			'Sử dụng cú pháp `const element = <h2>...</h2>;`',
			'Đừng quên gọi `root.render(element);`'
		]
	}
];

// ============================================
// LESSON COMMENTS - Bình luận bài học
// ============================================
export const LESSON_COMMENTS: LessonComment[] = [
	{
		id: 1,
		lessonId: 1,
		author: 'Minh Quan',
		avatar: 'https://picsum.photos/seed/user1/100/100',
		comment: 'Bài giảng hay quá, phần thử thách giúp mình hiểu rõ hơn về JSX!',
		date: '1 day ago',
		replies: [
			{
				id: 3,
				lessonId: 1,
				author: 'An Tuan',
				avatar: 'https://picsum.photos/seed/instructor1/100/100',
				comment: 'Cảm ơn bạn, rất vui vì bạn thấy hữu ích!',
				date: '1 day ago',
			}
		]
	},
	{
		id: 2,
		lessonId: 1,
		author: 'Lan Anh',
		avatar: 'https://picsum.photos/seed/user2/100/100',
		comment: 'Mình vẫn chưa hiểu rõ lắm về sự khác biệt giữa `render` của React DOM và component.',
		date: '2 days ago',
	}
];

// ============================================
// LESSON Q&A - Hỏi đáp bài học
// ============================================
export const LESSON_QA: LessonQA[] = [
	{
		id: 1,
		lessonId: 1,
		question: {
			author: 'Hieu Nguyen',
			avatar: 'https://picsum.photos/seed/user3/100/100',
			text: 'Tại sao chúng ta cần `import React from \'react\'` ngay cả khi không sử dụng trực tiếp biến React?',
			date: '3 days ago'
		},
		answer: {
			author: 'An Tuan',
			avatar: 'https://picsum.photos/seed/instructor1/100/100',
			text: 'Khi viết JSX, trình biên dịch sẽ chuyển nó thành `React.createElement()`. Vì vậy React phải được import.',
			date: '2 days ago'
		}
	}
];

// ============================================
// STUDENT COURSES - Khóa học đã đăng ký của học viên
// ============================================
export const STUDENT_COURSES: EnrolledCourse[] = [
	{
		...COURSES[0],
		progress: 35,
		lastAccessed: '2 hours ago',
		completed: false
	},
	{
		...COURSES[1],
		progress: 80,
		lastAccessed: '1 day ago',
		completed: false
	},
	{
		...COURSES[5],
		progress: 100,
		lastAccessed: '1 month ago',
		completed: true,
		certificateUrl: '#'
	}
];

// ============================================
// STUDENT CLASSES - Lớp học của học viên
// ============================================
export const STUDENT_CLASSES: StudentClass[] = [
	{
		id: 101,
		name: 'Lớp Luyện Thi IELTS Advanced K15',
		instructor: 'Ms. Bao Chau',
		schedule: 'T2, T4, T6 - 19:30',
		progress: 40,
		nextSession: {
			id: 991,
			title: 'Mock Speaking Test',
			instructor: 'Ms. Bao Chau',
			startTime: new Date(Date.now() + 3600 * 1000).toISOString(),
			endTime: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
			meetingLink: 'https://meet.google.com/abc-xyz',
			isLive: true
		}
	}
];

// ============================================
// PENDING ASSIGNMENTS - Bài tập chờ nộp
// ============================================
export const PENDING_ASSIGNMENTS: ClassAssignmentUI[] = [
	{
		id: 1,
		class_id: 101,
		title: 'Writing Task 1: Bar Chart Analysis',
		classId: 101,
		deadline: 'Today, 23:59',
		status: 2
	},
	{
		id: 2,
		class_id: 0,
		title: 'React Component Lifecycle Quiz',
		classId: 0,
		deadline: 'Tomorrow, 12:00',
		status: 2
	}
];

// ============================================
// MOCK USER - User đang đăng nhập hiện tại (demo)
// ============================================
export const MOCK_USER = {
	id: 4,
	name: 'Chu Đức Minh',
	email: 'student@milearn.com',
	avatar: 'https://picsum.photos/seed/current_student/200/200',
	role: 0 // Student
};

// ============================================
// MOCK USERS - Danh sách users (Admin panel)
// ============================================
export const MOCK_USERS: AccountUI[] = [
	{ id: 1, full_name: 'Alice Johnson', email: 'alice@example.com', password_hash: '', role: -1, status: 0, lastLogin: '2023-10-25 10:30 AM', avatar: 'https://picsum.photos/seed/alice/40/40' },
	{ id: 2, full_name: 'Bob Smith', email: 'bob@example.com', password_hash: '', role: 0, status: 0, lastLogin: '2023-10-24 02:15 PM', avatar: 'https://picsum.photos/seed/bob/40/40' },
	{ id: 3, full_name: 'Charlie Brown', email: 'charlie@example.com', password_hash: '', role: 1, status: 1, lastLogin: '2023-10-20 09:00 AM', avatar: 'https://picsum.photos/seed/charlie/40/40' },
	{ id: 4, full_name: 'Diana Prince', email: 'diana@example.com', password_hash: '', role: 2, status: 2, lastLogin: 'Never', avatar: 'https://picsum.photos/seed/diana/40/40' },
	{ id: 5, full_name: 'Evan Wright', email: 'evan@example.com', password_hash: '', role: 1, status: 0, lastLogin: '2023-10-25 08:45 AM', avatar: 'https://picsum.photos/seed/evan/40/40' },
];

// ============================================
// DEMO USERS - Users để test đăng nhập
// ============================================
export const DEMO_USERS = {
	superadmin: {
		id: 1,
		full_name: 'Super Admin',
		email: 'superadmin@milearn.com',
		password: 'admin123',
		avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin',
		role: -1,
		status: 1,
	},
	admin: {
		id: 2,
		full_name: 'Admin User',
		email: 'admin@milearn.com',
		password: 'admin123',
		avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
		role: 2,
		status: 1,
	},
	instructor: {
		id: 3,
		full_name: 'Instructor User',
		email: 'instructor@milearn.com',
		password: 'instructor123',
		avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Instructor',
		role: 1,
		status: 1,
	},
	student: {
		id: 4,
		full_name: 'Student User',
		email: 'student@milearn.com',
		password: 'student123',
		avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student',
		role: 0,
		status: 1,
	},
};

// ============================================
// VALIDATE LOGIN - Hàm validate đăng nhập
// ============================================
export const validateLogin = (email: string, password: string) => {
	const users = Object.values(DEMO_USERS);
	const user = users.find(u => u.email === email && u.password === password);

	if (user) {
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	return null;
};

// ============================================
// MOCK DATA JSON - Cấu trúc JSON cho testing
// ============================================
export const mockDataJson = {
	users: [
		{ id: 1, full_name: 'Nguyễn Văn A', email: 'a@student.com', role: 2 },
		{ id: 2, full_name: 'Trần Thị B', email: 'b@student.com', role: 2 },
		{ id: 3, full_name: 'Lê Minh C', email: 'c@instructor.com', role: 1 }
	],
	courses: [
		{
			id: 1,
			title: 'ReactJS từ A-Z',
			instructor_id: 3,
			sections: [
				{
					id: 1,
					title: 'Giới thiệu React',
					lessons: [
						{
							id: 1,
							title: 'React là gì?',
							contents: [
								{ id: 1, type: 'text', html: '<h1>React là thư viện...</h1>' }
							]
						}
					]
				}
			]
		}
	],
	classes: [
		{
			id: 1,
			course_id: 1,
			students: [1, 2],
			calendar: [
				{ title: 'Buổi 1: Giới thiệu React', time: '2025-11-20 19:00:00' }
			]
		}
	]
};