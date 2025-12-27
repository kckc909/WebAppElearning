import React, { useMemo } from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Star, Loader2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAllCourses } from '../../../../hooks/useApi';

const AdminCoursesOverview: React.FC = () => {
    // Fetch real course data from API
    const { data: courses, loading, error } = useAllCourses();

    // Calculate stats from actual course data
    const stats = useMemo(() => {
        if (!courses || courses.length === 0) {
            return {
                totalCourses: 0,
                totalStudents: 0,
                totalRevenue: 0,
                averageRating: 0,
                totalReviews: 0,
                newCourses: 0
            };
        }

        const totalStudents = courses.reduce((sum: number, c: any) =>
            sum + (c.total_students || c._count?.course_enrollments || 0), 0);

        const totalRevenue = courses.reduce((sum: number, c: any) => {
            const students = c.total_students || c._count?.course_enrollments || 0;
            const price = c.price || 0;
            return sum + (students * price);
        }, 0);

        const ratingsSum = courses.reduce((sum: number, c: any) =>
            sum + (c.rating || c.average_rating || 0), 0);

        const totalReviews = courses.reduce((sum: number, c: any) =>
            sum + (c.reviews_count || c._count?.course_reviews || 0), 0);

        const coursesWithRating = courses.filter((c: any) => c.rating || c.average_rating).length;
        const averageRating = coursesWithRating > 0 ? ratingsSum / coursesWithRating : 0;

        // Count new courses (created in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newCourses = courses.filter((c: any) =>
            new Date(c.created_at) >= thirtyDaysAgo
        ).length;

        return {
            totalCourses: courses.length,
            totalStudents,
            totalRevenue,
            averageRating: averageRating.toFixed(1),
            totalReviews,
            newCourses
        };
    }, [courses]);

    // Status distribution for pie chart
    const statusData = useMemo(() => {
        if (!courses) return [];

        const statusCounts: Record<string, number> = {};
        courses.forEach((c: any) => {
            const status = c.status || 'UNKNOWN';
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        const statusLabels: Record<string, string> = {
            'PUBLISHED': 'Đã xuất bản',
            'DRAFT': 'Bản nháp',
            'PENDING': 'Chờ duyệt',
            'REJECTED': 'Từ chối'
        };

        return Object.entries(statusCounts).map(([status, count]) => ({
            name: statusLabels[status] || status,
            value: count,
            status
        }));
    }, [courses]);

    // Top courses by students
    const topCourses = useMemo(() => {
        if (!courses) return [];

        return [...courses]
            .sort((a: any, b: any) => {
                const aStudents = a.total_students || a._count?.course_enrollments || 0;
                const bStudents = b.total_students || b._count?.course_enrollments || 0;
                return bStudents - aStudents;
            })
            .slice(0, 5)
            .map((c: any) => ({
                name: c.title?.substring(0, 20) + (c.title?.length > 20 ? '...' : ''),
                students: c.total_students || c._count?.course_enrollments || 0,
                revenue: (c.total_students || c._count?.course_enrollments || 0) * (c.price || 0)
            }));
    }, [courses]);

    const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600">Lỗi: {error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Tổng quan khóa học</h1>
                <span className="text-sm text-gray-500">Dữ liệu realtime từ database</span>
            </div>

            {/* Stats - Real data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <BookOpen className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Tổng khóa học</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalCourses}</p>
                    <p className="text-sm opacity-90 mt-2">+{stats.newCourses} khóa học mới</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Tổng học viên</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalStudents.toLocaleString()}</p>
                    <p className="text-sm opacity-90 mt-2">Đang học</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu ước tính</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(stats.totalRevenue)}</p>
                    <p className="text-sm opacity-90 mt-2">Tổng cộng</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Star className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Đánh giá TB</p>
                    <p className="text-3xl font-bold mt-1">
                        {stats.averageRating !== '0.0' ? `${stats.averageRating} ⭐` : 'N/A'}
                    </p>
                    <p className="text-sm opacity-90 mt-2">Từ {stats.totalReviews.toLocaleString()} đánh giá</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Distribution - Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6">Phân bố trạng thái</h2>
                    {statusData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-400">
                            Chưa có dữ liệu
                        </div>
                    )}
                </div>

                {/* Top Courses - Bar Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6">Top khóa học (theo học viên)</h2>
                    {topCourses.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={topCourses} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis type="number" stroke="#64748b" />
                                <YAxis dataKey="name" type="category" stroke="#64748b" width={120} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    formatter={(value: number) => [value.toLocaleString(), 'Học viên']}
                                />
                                <Bar dataKey="students" fill="#10b981" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-400">
                            Chưa có dữ liệu
                        </div>
                    )}
                </div>
            </div>

            {/* Revenue by Course */}
            {topCourses.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6">Doanh thu theo khóa học (Top 5)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topCourses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
                            />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8b5cf6" name="Doanh thu" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesOverview;