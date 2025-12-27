import React, { useState, useEffect, useMemo } from 'react';
import { Award, Download, Eye, TrendingUp, Loader2, FileSearch, Calendar } from 'lucide-react';
import { useAllCourses } from '../../../../hooks/useApi';
import { Link } from 'react-router-dom';

const AdminCourseCertificates: React.FC = () => {
    // Fetch real course data from API
    const { data: courses, loading, error } = useAllCourses();

    // Calculate stats from actual course data
    const stats = useMemo(() => {
        if (!courses || courses.length === 0) {
            return {
                totalCourses: 0,
                publishedCourses: 0,
                totalStudents: 0,
                completedStudents: 0 // Placeholder - need certificates API
            };
        }

        const publishedCourses = courses.filter((c: any) => c.status === 'PUBLISHED').length;
        const totalStudents = courses.reduce((sum: number, c: any) =>
            sum + (c.total_students || c._count?.course_enrollments || 0), 0);

        return {
            totalCourses: courses.length,
            publishedCourses,
            totalStudents,
            completedStudents: 0 // Placeholder - need certificates API
        };
    }, [courses]);

    // Get list of published courses for display
    const publishedCourses = useMemo(() => {
        if (!courses) return [];
        return courses
            .filter((c: any) => c.status === 'PUBLISHED')
            .slice(0, 10)
            .map((c: any) => ({
                id: c.id,
                title: c.title,
                instructor: c.accounts?.full_name || 'N/A',
                students: c.total_students || c._count?.course_enrollments || 0,
                created_at: c.created_at
            }));
    }, [courses]);

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
                <h1 className="text-2xl font-bold text-gray-800">Chứng chỉ khóa học</h1>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">API đang phát triển</span>
            </div>

            {/* Stats - Real data where available */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng khóa học</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCourses}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đã xuất bản</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{stats.publishedCourses}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng học viên</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">{stats.totalStudents.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Chứng chỉ cấp</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">-</p>
                            <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificates Section - Coming Soon Notice */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tính năng đang phát triển</h3>
                    <p className="text-gray-600 mb-4 max-w-md mx-auto">
                        Tính năng quản lý chứng chỉ đang được phát triển. Cần thêm API backend để lấy danh sách chứng chỉ đã cấp.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                            <span className="font-medium">API cần thiết:</span> GET /certificates
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                            <span className="font-medium">Backend:</span> certificates.service.ts
                        </div>
                    </div>
                </div>
            </div>

            {/* Published Courses Table - Real data */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">Khóa học có thể cấp chứng chỉ</h2>
                    <p className="text-sm text-gray-500 mt-1">Các khóa học đã xuất bản và có học viên</p>
                </div>

                {publishedCourses.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Chưa có khóa học nào được xuất bản</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giảng viên</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tạo</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {publishedCourses.map((course: any) => (
                                    <tr key={course.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-sm text-gray-600">#{course.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">{course.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{course.students.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {course.created_at ? new Date(course.created_at).toLocaleDateString('vi-VN') : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/admin/courses/${course.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Xem
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {publishedCourses.length > 0 && (
                    <div className="p-4 border-t border-gray-200 text-center">
                        <Link
                            to="/admin/courses/all-courses"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Xem tất cả khóa học →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCourseCertificates;