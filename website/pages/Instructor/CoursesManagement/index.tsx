import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Users,
    Star,
    TrendingUp,
    DollarSign,
    Clock,
    Award,
    ArrowRight,
    Plus,
    BarChart3,
    MessageSquare,
    Settings
} from 'lucide-react';

// Mock statistics
const STATS = {
    totalCourses: 5,
    publishedCourses: 3,
    draftCourses: 2,
    totalStudents: 2340,
    activeStudents: 1856,
    newStudentsThisMonth: 124,
    totalRevenue: 234500000,
    revenueThisMonth: 45000000,
    averageRating: 4.7,
    totalReviews: 567,
    completionRate: 68,
    totalWatchTime: 15680 // minutes
};

const CoursesOverviewPage: React.FC = () => {
    const navigate = useNavigate();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatWatchTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours.toLocaleString()}h`;
    };

    // Quick links
    const quickLinks = [
        { label: 'Tất cả khóa học', icon: <BookOpen className="w-5 h-5" />, path: '/instructor/courses/all', color: 'bg-blue-500' },
        { label: 'Tạo khóa học mới', icon: <Plus className="w-5 h-5" />, path: '/instructor/courses/create', color: 'bg-green-500' },
        { label: 'Đánh giá', icon: <Star className="w-5 h-5" />, path: '/instructor/reviews', color: 'bg-purple-500' },
        { label: 'Thống kê chi tiết', icon: <BarChart3 className="w-5 h-5" />, path: '/instructor/analytics', color: 'bg-indigo-500' },
        { label: 'Cài đặt', icon: <Settings className="w-5 h-5" />, path: '/instructor/settings', color: 'bg-slate-500' },
    ];

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-secondary mb-2">Tổng quan khóa học</h1>
                    <p className="text-slate-600">Thống kê và quản lý các khóa học của bạn</p>
                </div>
                <button
                    onClick={() => navigate('/instructor/courses/create')}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                    <Plus className="w-5 h-5" />
                    Tạo khóa học mới
                </button>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Courses Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            +2 tháng này
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Tổng khóa học</p>
                    <p className="text-3xl font-bold text-secondary">{STATS.totalCourses}</p>
                    <div className="mt-3 flex gap-4 text-sm">
                        <span className="text-green-600">{STATS.publishedCourses} đã xuất bản</span>
                        <span className="text-yellow-600">{STATS.draftCourses} bản nháp</span>
                    </div>
                </div>

                {/* Students Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            +{STATS.newStudentsThisMonth} mới
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Tổng học viên</p>
                    <p className="text-3xl font-bold text-secondary">{STATS.totalStudents.toLocaleString()}</p>
                    <div className="mt-3 text-sm text-slate-500">
                        {STATS.activeStudents.toLocaleString()} đang học tích cực
                    </div>
                </div>

                {/* Revenue Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            +12%
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Tổng doanh thu</p>
                    <p className="text-2xl font-bold text-secondary">{formatCurrency(STATS.totalRevenue)}</p>
                    <div className="mt-3 text-sm text-slate-500">
                        {formatCurrency(STATS.revenueThisMonth)} tháng này
                    </div>
                </div>

                {/* Rating Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Đánh giá trung bình</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-secondary">{STATS.averageRating}</p>
                        <p className="text-slate-500">/5.0</p>
                    </div>
                    <div className="mt-3 text-sm text-slate-500">
                        {STATS.totalReviews.toLocaleString()} đánh giá
                    </div>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-8 h-8 opacity-80" />
                        <div>
                            <p className="text-sm opacity-80">Tỷ lệ hoàn thành</p>
                            <p className="text-3xl font-bold">{STATS.completionRate}%</p>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">Học viên hoàn thành khóa học</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-8 h-8 opacity-80" />
                        <div>
                            <p className="text-sm opacity-80">Thời gian học</p>
                            <p className="text-3xl font-bold">{formatWatchTime(STATS.totalWatchTime)}</p>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">Tổng thời gian học viên xem</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 opacity-80" />
                        <div>
                            <p className="text-sm opacity-80">Chứng chỉ đã cấp</p>
                            <p className="text-3xl font-bold">892</p>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">Học viên nhận chứng chỉ</p>
                </div>
            </div>

            {/* Quick Links */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary mb-4">Truy cập nhanh</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickLinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(link.path)}
                            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group text-left"
                        >
                            <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                                {link.icon}
                            </div>
                            <p className="font-medium text-secondary group-hover:text-primary transition-colors text-sm">
                                {link.label}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-secondary">Hoạt động gần đây</h2>
                    <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                        Xem tất cả
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    {[
                        { icon: <Users className="w-5 h-5" />, text: 'Nguyễn Văn A đã đăng ký khóa học "Web Development"', time: '2 giờ trước', color: 'bg-green-100 text-green-600' },
                        { icon: <Star className="w-5 h-5" />, text: 'Trần Thị B đánh giá 5 sao cho "React Mastery"', time: '5 giờ trước', color: 'bg-yellow-100 text-yellow-600' },
                        { icon: <MessageSquare className="w-5 h-5" />, text: 'Có 3 câu hỏi mới trong mục thảo luận', time: '1 ngày trước', color: 'bg-blue-100 text-blue-600' },
                        { icon: <Award className="w-5 h-5" />, text: 'Lê Văn C đã hoàn thành khóa học và nhận chứng chỉ', time: '2 ngày trước', color: 'bg-purple-100 text-purple-600' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                            <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-slate-700">{activity.text}</p>
                                <p className="text-sm text-slate-500">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesOverviewPage;
