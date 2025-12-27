import React, { useState } from 'react';
import { TrendingUp, Users, BookOpen, DollarSign, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalyticsReports: React.FC = () => {
    const [dateRange, setDateRange] = useState('30days');

    // Mock data
    const revenueData = [
        { month: 'T1', revenue: 45000000, courses: 120 },
        { month: 'T2', revenue: 52000000, courses: 145 },
        { month: 'T3', revenue: 48000000, courses: 130 },
        { month: 'T4', revenue: 61000000, courses: 165 },
        { month: 'T5', revenue: 55000000, courses: 150 },
        { month: 'T6', revenue: 67000000, courses: 180 },
    ];

    const userGrowthData = [
        { month: 'T1', students: 1200, instructors: 45 },
        { month: 'T2', students: 1450, instructors: 52 },
        { month: 'T3', students: 1680, instructors: 58 },
        { month: 'T4', students: 1920, instructors: 65 },
        { month: 'T5', students: 2150, instructors: 71 },
        { month: 'T6', students: 2450, instructors: 78 },
    ];

    const categoryData = [
        { name: 'Web Development', value: 35, color: '#2563eb' },
        { name: 'Data Science', value: 25, color: '#10b981' },
        { name: 'Design', value: 20, color: '#f59e0b' },
        { name: 'Business', value: 15, color: '#8b5cf6' },
        { name: 'Other', value: 5, color: '#6b7280' },
    ];

    const topCourses = [
        { title: 'Complete Web Development Bootcamp', students: 1250, revenue: 37500000, rating: 4.8 },
        { title: 'React - The Complete Guide', students: 980, revenue: 29400000, rating: 4.9 },
        { title: 'Python for Data Science', students: 850, revenue: 25500000, rating: 4.7 },
        { title: 'UI/UX Design Masterclass', students: 720, revenue: 21600000, rating: 4.6 },
        { title: 'Advanced JavaScript', students: 650, revenue: 19500000, rating: 4.8 },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Báo cáo & Phân tích</h1>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="7days">7 ngày qua</option>
                    <option value="30days">30 ngày qua</option>
                    <option value="90days">90 ngày qua</option>
                    <option value="1year">1 năm qua</option>
                </select>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu tháng này</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(67000000)}</p>
                    <p className="text-sm opacity-90 mt-2">+12% so với tháng trước</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Học viên mới</p>
                    <p className="text-3xl font-bold mt-1">2,450</p>
                    <p className="text-sm opacity-90 mt-2">+8% so với tháng trước</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <BookOpen className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Khóa học hoạt động</p>
                    <p className="text-3xl font-bold mt-1">234</p>
                    <p className="text-sm opacity-90 mt-2">+15 khóa học mới</p>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Giảng viên</p>
                    <p className="text-3xl font-bold mt-1">78</p>
                    <p className="text-sm opacity-90 mt-2">+7 giảng viên mới</p>
                </div>
            </div>

            {/* Revenue Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Doanh thu theo tháng</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                            formatter={(value: any) => formatCurrency(value)}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} name="Doanh thu" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6">Tăng trưởng người dùng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Bar dataKey="students" fill="#10b981" name="Học viên" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="instructors" fill="#8b5cf6" name="Giảng viên" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold mb-6">Phân bố danh mục</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Top khóa học</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doanh thu</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đánh giá</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {topCourses.map((course, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-900">{course.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{course.students.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">{formatCurrency(course.revenue)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium text-gray-900">{course.rating}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Người dùng hoạt động hàng ngày</h3>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                    <p className="text-sm text-gray-600 mt-2">+5.2% so với hôm qua</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Thời gian học trung bình</h3>
                    <p className="text-3xl font-bold text-green-600">2.5h</p>
                    <p className="text-sm text-gray-600 mt-2">Mỗi người dùng/ngày</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Tỷ lệ hoàn thành</h3>
                    <p className="text-3xl font-bold text-purple-600">68%</p>
                    <p className="text-sm text-gray-600 mt-2">Trung bình các khóa học</p>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsReports;