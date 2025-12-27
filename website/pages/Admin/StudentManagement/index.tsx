import React, { useState } from 'react';
import { Search, Users, BookOpen, Award } from 'lucide-react';
import { useAccounts } from '../../../hooks/useAccounts';

const AdminStudentManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Use accounts hook with role filter (3 = Student)
    const { accounts: students, loading, error } = useAccounts({ role: 3 });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    const filteredStudents = students.filter(s =>
        s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý học viên</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Tổng học viên</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">3,800</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <BookOpen className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Đang học</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2,450</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Award className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Hoàn thành</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1,350</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng doanh thu</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {formatCurrency(0)} {/* TODO: Get from transactions */}
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
                        placeholder="Tìm kiếm học viên..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tham gia</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.full_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{student.username}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {student.status === 1 ? 'Hoạt động' : 'Tạm khóa'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {student.created_at ? new Date(student.created_at).toLocaleDateString('vi-VN') : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudentManagement;