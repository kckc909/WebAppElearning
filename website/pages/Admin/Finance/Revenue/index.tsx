import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRevenue, useCategoryRevenue } from '../../../../hooks/useRevenue';

const AdminRevenue: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

    const { data: revenueData, loading: loadingRevenue, error: revenueError } = useRevenue(timeRange);
    const { data: categoryRevenue, loading: loadingCategory, error: categoryError } = useCategoryRevenue(timeRange === 'year' ? 'year' : 'month');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const loading = loadingRevenue || loadingCategory;
    const error = revenueError || categoryError;

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    // Calculate totals from data
    const totalRevenue = revenueData.reduce((sum, d) => sum + (d.revenue || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Doanh thu</h1>
                <div className="flex gap-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month' | 'year')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="week">7 ngày qua</option>
                        <option value="month">30 ngày qua</option>
                        <option value="day">1 ngày qua</option>
                        <option value="year">1 năm qua</option>
                    </select>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Xuất báo cáo
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
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
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu khóa học</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(54000000)}</p>
                    <p className="text-sm opacity-90 mt-2">80% tổng doanh thu</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu lớp học</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(13000000)}</p>
                    <p className="text-sm opacity-90 mt-2">20% tổng doanh thu</p>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Calendar className="w-8 h-8 opacity-80" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-sm opacity-90">Doanh thu trung bình/ngày</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(2230000)}</p>
                    <p className="text-sm opacity-90 mt-2">Trong 30 ngày qua</p>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Biểu đồ doanh thu</h2>
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

            {/* Revenue by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Doanh thu theo danh mục</h2>
                <div className="space-y-4">
                    {categoryRevenue.map((cat, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{cat.category_name}</span>
                                <span className="text-sm text-gray-600">{formatCurrency(cat.revenue)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${cat.percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{cat.percentage}% tổng doanh thu</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Revenue Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">So sánh doanh thu khóa học vs lớp học</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Bar dataKey="courses" fill="#10b981" name="Khóa học" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="classes" fill="#8b5cf6" name="Lớp học" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminRevenue;