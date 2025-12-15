import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, FileText } from 'lucide-react';

const AdminCourseApproval: React.FC = () => {
    const [filter, setFilter] = useState('pending');

    const courses = [
        {
            id: 1,
            title: 'Advanced Machine Learning',
            instructor: 'Nguyễn Văn A',
            submittedDate: '2024-12-14',
            category: 'Data Science',
            lessons: 45,
            duration: '30h',
            status: 'pending',
        },
        {
            id: 2,
            title: 'Flutter Mobile Development',
            instructor: 'Trần Thị B',
            submittedDate: '2024-12-13',
            category: 'Mobile Development',
            lessons: 38,
            duration: '25h',
            status: 'pending',
        },
        {
            id: 3,
            title: 'Blockchain Fundamentals',
            instructor: 'Lê Văn C',
            submittedDate: '2024-12-10',
            category: 'Blockchain',
            lessons: 32,
            duration: '20h',
            status: 'approved',
        },
    ];

    const filteredCourses = courses.filter(c => filter === 'all' || c.status === filter);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Đã duyệt
                    </span>
                );
            case 'rejected':
                return (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Từ chối
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Chờ duyệt
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Duyệt khóa học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {courses.filter(c => c.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Đã duyệt</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {courses.filter(c => c.status === 'approved').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Từ chối</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                        {courses.filter(c => c.status === 'rejected').length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex gap-2">
                    {[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'pending', label: 'Chờ duyệt' },
                        { value: 'approved', label: 'Đã duyệt' },
                        { value: 'rejected', label: 'Từ chối' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>Giảng viên: {course.instructor}</span>
                                    <span>•</span>
                                    <span>{course.category}</span>
                                    <span>•</span>
                                    <span>{course.lessons} bài học</span>
                                    <span>•</span>
                                    <span>{course.duration}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Gửi ngày: {new Date(course.submittedDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                            {getStatusBadge(course.status)}
                        </div>

                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Xem chi tiết
                            </button>
                            {course.status === 'pending' && (
                                <>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Duyệt
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                                        <XCircle className="w-4 h-4" />
                                        Từ chối
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có khóa học nào</h3>
                    <p className="text-gray-600">Chưa có khóa học nào trong danh mục này</p>
                </div>
            )}
        </div>
    );
};

export default AdminCourseApproval;