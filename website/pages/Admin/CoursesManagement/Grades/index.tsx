import React from 'react';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';

const AdminCourseGrades: React.FC = () => {
    const gradeStats = [
        { grade: 'A+', count: 45, percentage: 15, color: 'bg-green-600' },
        { grade: 'A', count: 78, percentage: 26, color: 'bg-green-500' },
        { grade: 'B+', count: 92, percentage: 31, color: 'bg-blue-500' },
        { grade: 'B', count: 54, percentage: 18, color: 'bg-blue-400' },
        { grade: 'C+', count: 21, percentage: 7, color: 'bg-yellow-500' },
        { grade: 'C', count: 10, percentage: 3, color: 'bg-yellow-400' },
    ];

    const courseGrades = [
        {
            id: 1,
            courseName: 'Complete Web Development Bootcamp',
            totalStudents: 1250,
            averageGrade: 'A',
            passRate: 96,
            trend: 'up',
        },
        {
            id: 2,
            courseName: 'React - The Complete Guide',
            totalStudents: 980,
            averageGrade: 'A+',
            passRate: 98,
            trend: 'up',
        },
        {
            id: 3,
            courseName: 'Python for Data Science',
            totalStudents: 850,
            averageGrade: 'B+',
            passRate: 92,
            trend: 'down',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Điểm số & Thành tích</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Điểm TB</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">A</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tỷ lệ đậu</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">95%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Điểm A+</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">45</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng học viên</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3,080</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Phân bố điểm</h2>
                <div className="space-y-4">
                    {gradeStats.map((stat) => (
                        <div key={stat.grade}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">Điểm {stat.grade}</span>
                                <span className="text-sm text-gray-600">{stat.count} học viên ({stat.percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`${stat.color} h-3 rounded-full transition-all`}
                                    style={{ width: `${stat.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Hiệu suất khóa học</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Điểm TB</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tỷ lệ đậu</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Xu hướng</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {courseGrades.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.courseName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{course.totalStudents.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {course.averageGrade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{course.passRate}%</td>
                                    <td className="px-6 py-4">
                                        {course.trend === 'up' ? (
                                            <TrendingUp className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5 text-red-600" />
                                        )}
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

export default AdminCourseGrades;