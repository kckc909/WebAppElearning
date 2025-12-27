/**
 * MOCK DB - Student Learning Stats & Analytics
 * Stats data for student dashboard charts and analytics
 */

export interface LearningTimeData {
    month: string;
    hours: number;
}

export interface CategoryData {
    name: string;
    value: number;
    color: string;
}

export interface WeeklyActivityData {
    day: string;
    hours: number;
}

export interface Achievement {
    id: number;
    user_id: number;
    title: string;
    description: string;
    icon: string;
    earned: boolean;
    earned_at?: string;
}

export interface CourseProgress {
    course_id: number;
    course_name: string;
    progress: number;
    color: string;
}

export interface StudentStats {
    user_id: number;
    totalHours: number;
    currentStreak: number;
    bestStreak: number;
    coursesCompleted: number;
    totalCourses: number;
    averageScore: number;
    certificatesEarned: number;
}

// Learning time by month (demo data)
export const LEARNING_TIME_DATA: LearningTimeData[] = [
    { month: 'T1', hours: 12 },
    { month: 'T2', hours: 18 },
    { month: 'T3', hours: 15 },
    { month: 'T4', hours: 22 },
    { month: 'T5', hours: 28 },
    { month: 'T6', hours: 25 },
    { month: 'T7', hours: 30 },
    { month: 'T8', hours: 35 },
    { month: 'T9', hours: 32 },
    { month: 'T10', hours: 38 },
    { month: 'T11', hours: 42 },
    { month: 'T12', hours: 45 },
];

// Category distribution
export const CATEGORY_DATA: CategoryData[] = [
    { name: 'Web Development', value: 45, color: '#2563eb' },
    { name: 'Data Science', value: 25, color: '#10b981' },
    { name: 'Design', value: 15, color: '#f59e0b' },
    { name: 'Business', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' },
];

// Weekly activity
export const WEEKLY_ACTIVITY_DATA: WeeklyActivityData[] = [
    { day: 'CN', hours: 2 },
    { day: 'T2', hours: 4 },
    { day: 'T3', hours: 3 },
    { day: 'T4', hours: 5 },
    { day: 'T5', hours: 4 },
    { day: 'T6', hours: 6 },
    { day: 'T7', hours: 3 },
];

// Achievements
export const ACHIEVEMENTS: Achievement[] = [
    { id: 1, user_id: 7, title: 'Người học chăm chỉ', description: 'Học 7 ngày liên tiếp', icon: '🔥', earned: true, earned_at: '2024-12-01' },
    { id: 2, user_id: 7, title: 'Hoàn thành nhanh', description: 'Hoàn thành 5 khóa học', icon: '⚡', earned: true, earned_at: '2024-11-15' },
    { id: 3, user_id: 7, title: 'Chuyên gia', description: 'Đạt 100% trong 3 khóa học', icon: '🎯', earned: true, earned_at: '2024-10-20' },
    { id: 4, user_id: 7, title: 'Người tiên phong', description: 'Học 100 giờ', icon: '🚀', earned: false },
    { id: 5, user_id: 7, title: 'Bậc thầy', description: 'Hoàn thành 10 khóa học', icon: '👑', earned: false },
    { id: 6, user_id: 7, title: 'Siêu sao', description: 'Đạt 5 sao từ giảng viên', icon: '⭐', earned: false },
];

// Course progress
export const COURSE_PROGRESS: CourseProgress[] = [
    { course_id: 1, course_name: 'Complete Web Development', progress: 100, color: 'bg-green-500' },
    { course_id: 2, course_name: 'React - The Complete Guide', progress: 85, color: 'bg-blue-500' },
    { course_id: 3, course_name: 'Python for Data Science', progress: 65, color: 'bg-purple-500' },
    { course_id: 4, course_name: 'UI/UX Design Masterclass', progress: 45, color: 'bg-amber-500' },
    { course_id: 5, course_name: 'Advanced JavaScript', progress: 30, color: 'bg-red-500' },
];

// Student stats summary
export const STUDENT_STATS: StudentStats[] = [
    {
        user_id: 7,
        totalHours: 156,
        currentStreak: 7,
        bestStreak: 14,
        coursesCompleted: 8,
        totalCourses: 12,
        averageScore: 92,
        certificatesEarned: 5,
    },
    {
        user_id: 8,
        totalHours: 89,
        currentStreak: 3,
        bestStreak: 10,
        coursesCompleted: 4,
        totalCourses: 6,
        averageScore: 85,
        certificatesEarned: 2,
    },
];

// Helper function
export const getStudentStats = (userId: number): StudentStats | undefined => {
    return STUDENT_STATS.find(s => s.user_id === userId);
};

export const getAchievementsByUser = (userId: number): Achievement[] => {
    return ACHIEVEMENTS.filter(a => a.user_id === userId);
};
