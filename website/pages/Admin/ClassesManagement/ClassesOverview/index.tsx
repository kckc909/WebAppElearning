import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminClassesOverview: React.FC = () => {
    const data = [
        { month: 'T1', classes: 12 },
        { month: 'T2', classes: 15 },
        { month: 'T3', classes: 14 },
        { month: 'T4', classes: 18 },
        { month: 'T5', classes: 16 },
        { month: 'T6', classes: 20 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tổng quan lớp học</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <BookOpen className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Tổng lớp học</p>
                    <p className="text-3xl font-bold mt-1">95</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <Users className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Tổng học viên</p>
                    <p className="text-3xl font-bold mt-1">1,850</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <Calendar className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Đang hoạt động</p>
                    <p className="text-3xl font-bold mt-1">68</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <TrendingUp className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Tăng trưởng</p>
                    <p className="text-3xl font-bold mt-1">+15%</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Số lượng lớp học theo tháng</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="classes" fill="#2563eb" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminClassesOverview;