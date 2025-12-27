import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyEnrollments, useMyCertificates } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import {
    BookOpen,
    PlayCircle,
    Award,
    Clock,
    TrendingUp,
    Target,
    Calendar,
    ChevronRight,
    Flame,
    Star,
    Loader2
} from 'lucide-react';
import { student_routes } from '../../page_routes';
import { ErrorState } from '../../../components/DataStates';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const userId = user?.id || 0;

    // Fetch real data from API
    const { data: enrollments, loading: enrollmentsLoading, error: enrollmentsError, refetch: refetchEnrollments } = useMyEnrollments(userId);
    const { data: certificates, loading: certificatesLoading } = useMyCertificates(userId);

    // Đảm bảo data luôn là array
    const enrollmentList = Array.isArray(enrollments) ? enrollments : [];
    const certificateList = Array.isArray(certificates) ? certificates : [];

    // Tính toán stats từ dữ liệu thực
    const totalCourses = enrollmentList.length;
    const completedCourses = enrollmentList.filter((e: any) => e.progress >= 100 || e.completed).length;
    const inProgressCourses = enrollmentList.filter((e: any) => e.progress > 0 && e.progress < 100 && !e.completed).length;
    const totalCertificates = certificateList.length;

    // Tính tổng thời gian học (estimate based on progress)
    const totalLearningMinutes = enrollmentList.reduce((sum: number, e: any) => {
        const courseDuration = e.course?.total_duration || e.total_duration || 60;
        const progress = e.progress || 0;
        return sum + Math.round((courseDuration * progress) / 100);
    }, 0);
    const totalLearningHours = Math.round(totalLearningMinutes / 60);

    // Tính average progress
    const averageProgress = totalCourses > 0
        ? Math.round(enrollmentList.reduce((sum: number, e: any) => sum + (e.progress || 0), 0) / totalCourses)
        : 0;

    // Recent courses (sorted by last accessed or enrollment date)
    const recentCourses = enrollmentList
        .filter((e: any) => e.progress < 100)
        .sort((a: any, b: any) => new Date(b.updated_at || b.enrolled_at).getTime() - new Date(a.updated_at || a.enrolled_at).getTime())
        .slice(0, 4);

    // Loading state
    const isLoading = enrollmentsLoading;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-slate-500">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (enrollmentsError) {
        return (
            <div className="max-w-6xl mx-auto">
                <ErrorState error={enrollmentsError} onRetry={refetchEnrollments} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header with Gradient */}
            <div className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`}
                            alt="Avatar"
                            className="w-16 h-16 rounded-full border-4 border-white/30"
                        />
                        <div>
                            <p className="text-blue-100 text-sm">Xin chào,</p>
                            <h1 className="text-3xl font-bold">{user?.full_name || 'Học viên'}</h1>
                        </div>
                    </div>
                    <p className="text-blue-100 max-w-xl">
                        {inProgressCourses > 0
                            ? `Bạn đang học ${inProgressCourses} khóa học. Tiếp tục hành trình học tập của bạn ngay!`
                            : 'Chào mừng bạn đến với MiLearn! Bắt đầu khám phá các khóa học ngay hôm nay.'}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${totalCourses > 0 ? 'bg-blue-50 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                            {totalCourses > 0 ? 'Đang học' : 'Bắt đầu'}
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{totalCourses}</p>
                    <p className="text-sm text-slate-500 mt-1">Khóa học đã đăng ký</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                            {averageProgress}%
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{completedCourses}</p>
                    <p className="text-sm text-slate-500 mt-1">Đã hoàn thành</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                            <TrendingUp className="w-3 h-3 inline mr-1" />
                            Active
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{totalLearningHours}h</p>
                    <p className="text-sm text-slate-500 mt-1">Giờ học tập</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        {totalCertificates > 0 && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600">
                                <Star className="w-3 h-3 inline mr-1" />
                                Mới
                            </span>
                        )}
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{totalCertificates}</p>
                    <p className="text-sm text-slate-500 mt-1">Chứng chỉ đạt được</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Continue Learning - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
                                    <PlayCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Tiếp tục học</h2>
                                    <p className="text-sm text-slate-500">{inProgressCourses} khóa học đang học</p>
                                </div>
                            </div>
                            <Link
                                to={`/${student_routes.my_courses}`}
                                className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1"
                            >
                                Xem tất cả
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {recentCourses.length > 0 ? (
                                recentCourses.map((enrollment: any) => {
                                    const course = enrollment.course || enrollment;
                                    const progress = enrollment.progress || 0;
                                    const nextLessonId = enrollment.next_lesson_id || enrollment.last_lesson_id;
                                    const continueUrl = nextLessonId
                                        ? `/${student_routes.lesson(course.id, nextLessonId)}`
                                        : `/${student_routes.course_detail(course.id)}`;

                                    return (
                                        <div key={enrollment.id} className="p-6 hover:bg-slate-50 transition-colors group">
                                            <div className="flex gap-4">
                                                <img
                                                    src={course.thumbnail_url || course.thumbnail || 'https://via.placeholder.com/120x80?text=Course'}
                                                    alt={course.title}
                                                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 mt-1">
                                                        {course.instructor?.full_name || course.accounts?.full_name || 'Giảng viên'}
                                                    </p>

                                                    <div className="mt-3 flex items-center gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-slate-500">Tiến độ</span>
                                                                <span className="font-semibold text-slate-700">{progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all"
                                                                    style={{ width: `${progress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Link
                                                            to={continueUrl}
                                                            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                                        >
                                                            <PlayCircle className="w-4 h-4" />
                                                            Tiếp tục
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-600 mb-2">Chưa có khóa học nào</h3>
                                    <p className="text-slate-500 mb-4">Bắt đầu hành trình học tập của bạn ngay!</p>
                                    <Link
                                        to={`/${student_routes.courses}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                                    >
                                        Khám phá khóa học
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Takes 1 column */}
                <div className="space-y-6">
                    {/* Learning Streak / Motivation */}
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Flame className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-orange-100">Chuỗi học tập</p>
                                <p className="text-2xl font-bold">7 ngày</p>
                            </div>
                        </div>
                        <p className="text-sm text-orange-100">
                            Tiếp tục học mỗi ngày để duy trì chuỗi streak!
                        </p>
                        <div className="flex gap-1 mt-4">
                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                <div
                                    key={day}
                                    className={`flex-1 h-2 rounded-full ${day <= 7 ? 'bg-white' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Certificates */}
                    {totalCertificates > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-900">Chứng chỉ gần đây</h3>
                                <Link
                                    to={`/${student_routes.certificates}`}
                                    className="text-sm text-primary hover:text-primary-hover"
                                >
                                    Xem tất cả
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {certificateList.slice(0, 2).map((cert: any) => (
                                    <div key={cert.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                            <Award className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 text-sm truncate">
                                                {cert.courseTitle || cert.course_title || 'Chứng chỉ'}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {cert.issuedDate ? new Date(cert.issuedDate).toLocaleDateString('vi-VN') : 'Đã nhận'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Truy cập nhanh</h3>
                        <div className="space-y-2">
                            <Link
                                to={`/${student_routes.my_courses}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary">Khóa học của tôi</span>
                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                            </Link>
                            <Link
                                to={`/${student_routes.certificates}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Award className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary">Chứng chỉ</span>
                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                            </Link>
                            <Link
                                to={`/${student_routes.courses}`}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary">Khám phá khóa học</span>
                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
