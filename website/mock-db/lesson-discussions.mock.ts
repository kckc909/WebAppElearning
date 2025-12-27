/**
 * MOCK DB - Lesson Discussions
 * Discussion/Q&A data for lesson pages
 */

export interface LessonDiscussion {
    id: number;
    lesson_id: number;
    user_id: number;
    user_name: string;
    avatar: string;
    question: string;
    created_at: string;
    replies_count: number;
}

export const LESSON_DISCUSSIONS: LessonDiscussion[] = [
    {
        id: 1,
        lesson_id: 1,
        user_id: 8,
        user_name: 'Võ Thị Hương',
        avatar: 'https://ui-avatars.com/api/?name=H&background=dc2626&color=fff',
        question: 'Câu hỏi về nội dung bài học: Làm sao để hiểu rõ hơn về React hooks?',
        created_at: '2024-12-18T15:45:00.000Z',
        replies_count: 2
    },
    {
        id: 2,
        lesson_id: 1,
        user_id: 9,
        user_name: 'Đặng Văn Tùng',
        avatar: 'https://ui-avatars.com/api/?name=T&background=2563eb&color=fff',
        question: 'Tại sao nên sử dụng functional component thay vì class component?',
        created_at: '2024-12-18T14:30:00.000Z',
        replies_count: 5
    },
    {
        id: 3,
        lesson_id: 2,
        user_id: 10,
        user_name: 'Bùi Thị Mai',
        avatar: 'https://ui-avatars.com/api/?name=M&background=10b981&color=fff',
        question: 'JSX khác HTML như thế nào?',
        created_at: '2024-12-17T10:00:00.000Z',
        replies_count: 3
    },
    {
        id: 4,
        lesson_id: 3,
        user_id: 7,
        user_name: 'Chu Đức Minh',
        avatar: 'https://ui-avatars.com/api/?name=CDM&background=f59e0b&color=fff',
        question: 'Làm sao để truyền props giữa các component?',
        created_at: '2024-12-16T09:15:00.000Z',
        replies_count: 8
    },
];

// Helper to get discussions by lesson
export const getDiscussionsByLesson = (lessonId: number): LessonDiscussion[] => {
    return LESSON_DISCUSSIONS.filter(d => d.lesson_id === lessonId);
};

// Helper to format time ago
export const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Vừa xong';
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
};
