import React from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const AdminCourseStudents: React.FC = () => {
    const students = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            enrolledCourses: 5,
            completedCourses: 3,
            averageGrade: 'A',
            totalSpent: 1495000,
            joinedDate: '2024-01-15',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            enrolledCourses: 3,
            completedCourses: 2,
            averageGrade: 'A+',
            totalSpent: 897000,
            joinedDate: '2024-02-20',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            enrolledCourses: 4,
            completedCourses: 1,
            averageGrade: 'B+',
            totalSpent: 1196000,
            joinedDate: '2024-03-10',
        },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Học viên khóa học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng học viên</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">3,800</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đang học</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">2,450</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Hoàn thành</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">1,350</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tăng trưởng</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">+12%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hoàn thành</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Điểm TB</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Chi tiêu</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tham gia</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{student.enrolledCourses}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{student.completedCourses}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {student.averageGrade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {formatCurrency(student.totalSpent)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(student.joinedDate).toLocaleDateString('vi-VN')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCourseStudents;