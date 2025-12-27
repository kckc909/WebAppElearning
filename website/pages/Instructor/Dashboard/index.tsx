import React, { useEffect } from 'react';
import { BookOpen, Users, DollarSign, Calendar, Award, BarChart3, ArrowRight, Clock } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import { Link, useNavigate } from 'react-router-dom';
import { instructor_routes } from '../../page_routes';
import { useInstructorCourses } from '../../../hooks/useApi';
import { useClasses } from '../../../hooks/useClasses';
import { useAuth } from '../../../contexts/AuthContext';

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
};

const InstructorDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Using useInstructorCourses to get ALL courses for this instructor (not just PUBLISHED)
    const { data: courses, loading: loadingCourses, refetch: refetchCourses } = useInstructorCourses(user?.id);
    const { data: classes, loading: loadingClasses, refetch: refetchClasses } = useClasses();

    useEffect(() => {
        if (user?.id) {
            refetchCourses();
        }
        refetchClasses();
    }, [user?.id]);

    const courseList = courses || [];
    const classList = classes || [];

    // Calculate stats from real data
    const stats = {
        totalCourses: courseList.length,
        totalStudents: courseList.reduce((sum: number, c: any) => sum + (c.students_count || 0), 0),
        totalRevenue: courseList.reduce((sum: number, c: any) => sum + (c.revenue || 0) * (c.students_count || 0), 0),
        averageRating: courseList.length > 0
            ? (courseList.reduce((sum: number, c: any) => sum + (c.rating || 0), 0) / courseList.length).toFixed(1)
            : 0,
        activeClasses: classList.filter((c: any) => c.status === 'active').length,
        upcomingSessions: 3, // Static for now
    };

    // Get recent courses sorted by updated_at (most recently updated first)
    const recentCourses = [...courseList]
        .sort((a: any, b: any) => {
            const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
            const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
            return dateB - dateA;
        })
        .slice(0, 3)
        .map((course: any) => ({
            id: course.id,
            title: course.title,
            students: course.students_count || course.total_students || 0,
            status: (course.status || 'DRAFT').toUpperCase(), // Normalize to uppercase
            updatedAt: course.updated_at || course.created_at,
            thumbnail: course.thumbnail_url || course.thumbnail,
            lessonsCount: course.lessons_count || course.total_lessons || 0
        }));

    // Helper function to format schedule - handle both string and object {days, time}
    const formatSchedule = (schedule: any): string => {
        if (!schedule) return 'TBD';
        if (typeof schedule === 'string') return schedule;
        if (typeof schedule === 'object') {
            const days = schedule.days || '';
            const time = schedule.time || '';
            if (days && time) return `${days} - ${time}`;
            return days || time || 'TBD';
        }
        return 'TBD';
    };

    // Get upcoming sessions from classes
    const upcomingSessions = classList.slice(0, 3).map((cls: any) => ({
        id: cls.id,
        title: cls.name,
        time: formatSchedule(cls.schedule),
        students: cls.students_count || 0
    }));

    const loading = loadingCourses || loadingClasses;

    if (loading) {
        return <div className="flex items-center justify-center h-64">Đang tải...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
                <p className="text-gray-600 mt-1">Chào mừng trở lại! Đây là tình hình các khóa học của bạn.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Tổng khóa học"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="text-blue-600"
                    trend={12}
                />
                <StatCard
                    title="Tổng học viên"
                    value={stats.totalStudents}
                    icon={Users}
                    color="text-green-600"
                    trend={8}
                />
                <StatCard
                    title="Tổng doanh thu"
                    value={`${(stats.totalRevenue / 1000000).toFixed(1)}M VNĐ`}
                    icon={DollarSign}
                    color="text-purple-600"
                    trend={15}
                />
                <StatCard
                    title="Đánh giá TB"
                    value={stats.averageRating}
                    icon={Award}
                    color="text-yellow-600"
                    trend={2}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.courses_create}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                    >
                        <div className="p-2 bg-green-100 rounded-lg">
                            <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Tạo khóa học</h3>
                            <p className="text-sm text-gray-600">Bắt đầu khóa học mới</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.class_list}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Quản lý lớp</h3>
                            <p className="text-sm text-gray-600">Xem tất cả lớp học</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.schedule}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Xem lịch</h3>
                            <p className="text-sm text-gray-600">Kiểm tra lịch học</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.courses_overview}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                    >
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Thống kê</h3>
                            <p className="text-sm text-gray-600">Xem báo cáo</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Recent Courses */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Khóa học gần đây</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_list}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentCourses.length > 0 ? recentCourses.map((course: any) => (
                            <div
                                key={course.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-all group"
                            >
                                {/* Thumbnail */}
                                <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={course.thumbnail || `https://picsum.photos/seed/course${course.id}/80/56`}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate group-hover:text-green-600 transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {course.students} học viên
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {course.lessonsCount} bài học
                                        </span>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${course.status === 'PUBLISHED'
                                                ? 'bg-green-100 text-green-700'
                                                : course.status === 'PENDING'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : course.status === 'REJECTED'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {course.status === 'PUBLISHED' ? 'Đã xuất bản' 
                                                : course.status === 'PENDING' ? 'Chờ duyệt' 
                                                : course.status === 'REJECTED' ? 'Bị từ chối'
                                                : 'Bản nháp'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        Cập nhật: {formatTimeAgo(course.updatedAt)}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => navigate(`/instructor/courses/${course.id}`)}
                                    className="flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    Truy cập
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500">Chưa có khóa học nào</div>
                        )}
                    </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Buổi học sắp tới</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.schedule}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingSessions.length > 0 ? upcomingSessions.map((session: any) => (
                            <div
                                key={session.id}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="font-medium text-gray-900 mb-2">{session.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{session.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{session.students} học viên</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500">Không có buổi học nào sắp tới</div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InstructorDashboard;
