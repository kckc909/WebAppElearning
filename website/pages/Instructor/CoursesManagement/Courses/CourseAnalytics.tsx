import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Users, TrendingUp, DollarSign, Eye,
    Clock, Award, BarChart3, Activity, Calendar,
    Loader2
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { instructor_routes } from '../../../page_routes';
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../../../../API';

const CourseAnalyticsPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Fetch analytics data
    const { data: analyticsData, isLoading } = useQuery({
        queryKey: ['course-analytics', courseId],
        queryFn: async () => {
            // TODO: Call actual API
            // Mock data for now
            return {
                overview: {
                    totalStudents: 1245,
                    activeStudents: 892,
                    completionRate: 67,
                    avgProgress: 58,
                    totalRevenue: 124500000,
                    avgRating: 4.7
                },
                enrollmentTrend: [
                    { month: '07/2024', students: 45 },
                    { month: '08/2024', students: 78 },
                    { month: '09/2024', students: 125 },
                    { month: '10/2024', students: 198 },
                    { month: '11/2024', students: 267 },
                    { month: '12/2024', students: 312 }
                ],
                progressDistribution: [
                    { name: '0-25%', value: 230, color: '#ef4444' },
                    { name: '26-50%', value: 345, color: '#f59e0b' },
                    { name: '51-75%', value: 412, color: '#3b82f6' },
                    { name: '76-100%', value: 258, color: '#22c55e' }
                ],
                topLessons: [
                    { title: 'Giới thiệu khóa học', views: 1245, avg_time: 12 },
                    { title: 'Cài đặt môi trường', views: 1123, avg_time: 18 },
                    { title: 'Khái niệm cơ bản', views: 987, avg_time: 22 },
                    { title: 'Thực hành đầu tiên', views: 856, avg_time: 28 },
                    { title: 'Bài tập nâng cao', views: 654, avg_time: 35 }
                ],
                revenueByMonth: [
                    { month: '07/2024', revenue: 15600000 },
                    { month: '08/2024', revenue: 22400000 },
                    { month: '09/2024', revenue: 18900000 },
                    { month: '10/2024', revenue: 24500000 },
                    { month: '11/2024', revenue: 21200000 },
                    { month: '12/2024', revenue: 21900000 }
                ]
            };
        },
        enabled: !!courseId
    });

    const handleBack = () => {
        navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`);
    };

    if (isLoading || !analyticsData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    const { overview, enrollmentTrend, progressDistribution, topLessons, revenueByMonth } = analyticsData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-secondary">Phân tích khóa học</h1>
                            <p className="text-sm text-slate-500 mt-1">Thống kê chi tiết về hiệu suất và tăng trưởng</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-8 h-8 opacity-80" />
                            <TrendingUp className="w-5 h-5 opacity-60" />
                        </div>
                        <p className="text-blue-100 text-sm mb-1">Tổng học viên</p>
                        <p className="text-4xl font-bold">{overview.totalStudents.toLocaleString()}</p>
                        <p className="text-blue-100 text-sm mt-2">{overview.activeStudents} đang hoạt động</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <Award className="w-8 h-8 opacity-80" />
                            <BarChart3 className="w-5 h-5 opacity-60" />
                        </div>
                        <p className="text-green-100 text-sm mb-1">Tỷ lệ hoàn thành</p>
                        <p className="text-4xl font-bold">{overview.completionRate}%</p>
                        <p className="text-green-100 text-sm mt-2">Tiến độ TB: {overview.avgProgress}%</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="w-8 h-8 opacity-80" />
                            <Activity className="w-5 h-5 opacity-60" />
                        </div>
                        <p className="text-purple-100 text-sm mb-1">Tổng doanh thu</p>
                        <p className="text-4xl font-bold">
                            {(overview.totalRevenue / 1000000).toFixed(0)}M
                        </p>
                        <p className="text-purple-100 text-sm mt-2">⭐ {overview.avgRating} rating</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Enrollment Trend */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-secondary">Xu hướng đăng ký</h3>
                                <p className="text-sm text-slate-500">6 tháng gần nhất</p>
                            </div>
                            <Calendar className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={enrollmentTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="students"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', r: 4 }}
                                        name="Học viên"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Progress Distribution */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-secondary">Phân bố tiến độ</h3>
                                <p className="text-sm text-slate-500">Theo % hoàn thành</p>
                            </div>
                            <BarChart3 className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={progressDistribution}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {progressDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Revenue by Month */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-secondary">Doanh thu theo tháng</h3>
                            <p className="text-sm text-slate-500">Biểu đồ cột doanh thu</p>
                        </div>
                        <DollarSign className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByMonth}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                                <Tooltip formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                                <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} name="Doanh thu" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Lessons */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-secondary">Bài học phổ biến nhất</h3>
                            <p className="text-sm text-slate-500">Top 5 bài học có lượt xem cao</p>
                        </div>
                        <Eye className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                        {topLessons.map((lesson, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold">#{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-secondary">{lesson.title}</p>
                                    <div className="flex items-center gap-4 mt-1text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {lesson.views.toLocaleString()} lượt xem
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {lesson.avg_time} phút TB
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseAnalyticsPage;
