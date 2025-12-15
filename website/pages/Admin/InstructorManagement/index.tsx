import React, { useState } from 'react';
import { Search, Users, CheckCircle, XCircle, Eye, Mail } from 'lucide-react';

const AdminInstructorManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const instructors = [
        {
            id: 1,
            name: 'Dr. Angela Yu',
            email: 'angela@email.com',
            courses: 5,
            students: 1250,
            rating: 4.8,
            revenue: 37500000,
            status: 'active',
            joinedDate: '2024-01-15',
        },
        {
            id: 2,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            courses: 3,
            students: 850,
            rating: 4.6,
            revenue: 25500000,
            status: 'active',
            joinedDate: '2024-02-20',
        },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý giảng viên</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng giảng viên</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{instructors.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {instructors.filter(i => i.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng khóa học</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                        {instructors.reduce((sum, i) => sum + i.courses, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng doanh thu</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {formatCurrency(instructors.reduce((sum, i) => sum + i.revenue, 0))}
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm giảng viên..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            {/* Instructors Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giảng viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đánh giá</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doanh thu</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {instructors.map((instructor) => (
                            <tr key={instructor.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{instructor.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{instructor.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{instructor.courses}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{instructor.students.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{instructor.rating} ⭐</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(instructor.revenue)}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Hoạt động
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminInstructorManagement;