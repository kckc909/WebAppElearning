import React from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Star } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminCoursesOverview: React.FC = () => {
    const enrollmentData = [
        { month: 'T1', enrollments: 120 },
        { month: 'T2', enrollments: 145 },
        { month: 'T3', enrollments: 130 },
        { month: 'T4', enrollments: 165 },
        { month: 'T5', enrollments: 150 },
        { month: 'T6', enrollments: 180 },
    ];

    const topCourses = [
        { name: 'Web Development', students: 1250, revenue: 37500000 },
        { name: 'React Guide', students: 980, revenue: 29400000 },
        { name: 'Python Data Science', students: 850, revenue: 25500000 },
        { name: 'UI/UX Design', students: 720, revenue: 21600000 },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tổng quan khóa học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <BookOpen className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Tổng khóa học</p>
                    <p className="text-3xl font-bold mt-1">234</p>
                    <p className="text-sm opacity-90 mt-2">+15 khóa học mới</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Tổng học viên</p>
                    <p className="text-3xl font-bold mt-1">3,800</p>
                    <p className="text-sm opacity-90 mt-2">+12% so với tháng trước</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(114000000)}</p>
                    <p className="text-sm opacity-90 mt-2">Tháng này</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Star className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Đánh giá TB</p>
                    <p className="text-3xl font-bold mt-1">4.7 ⭐</p>
                    <p className="text-sm opacity-90 mt-2">Từ 1,430 đánh giá</p>
                </div>
            </div>

            {/* Enrollment Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Xu hướng đăng ký</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="enrollments" stroke="#2563eb" strokeWidth={3} name="Đăng ký" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Top Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Top khóa học</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topCourses}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Bar dataKey="students" fill="#10b981" name="Học viên" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminCoursesOverview;