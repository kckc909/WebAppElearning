import React, { useMemo } from 'react';
import { Award, TrendingUp, TrendingDown, BookOpen, Users, BarChart3, Loader2 } from 'lucide-react';
import { useAllCourses } from '../../../../hooks/useApi';
import { Link } from 'react-router-dom';

const AdminCourseGrades: React.FC = () => {
    // Fetch real course data from API
    const { data: courses, loading, error } = useAllCourses();

    // Calculate stats from actual course data
    const stats = useMemo(() => {
        if (!courses || courses.length === 0) {
            return {
                totalCourses: 0,
                totalStudents: 0,
                averageRating: 0,
                publishedCourses: 0
            };
        }

        const totalStudents = courses.reduce((sum: number, c: any) =>
            sum + (c.total_students || c._count?.course_enrollments || 0), 0);

        const ratingsSum = courses.reduce((sum: number, c: any) =>
            sum + (c.rating || c.average_rating || 0), 0);

        const coursesWithRating = courses.filter((c: any) => c.rating || c.average_rating).length;
        const averageRating = coursesWithRating > 0 ? ratingsSum / coursesWithRating : 0;

        const publishedCourses = courses.filter((c: any) => c.status === 'PUBLISHED').length;

        return {
            totalCourses: courses.length,
            totalStudents,
            averageRating: averageRating.toFixed(1),
            publishedCourses
        };
    }, [courses]);

    // Process courses for display
    const courseList = useMemo(() => {
        if (!courses) return [];

        return courses.map((course: any) => ({
            id: course.id,
            title: course.title,
            instructor: course.accounts?.full_name || course.instructor_name || 'Unknown',
            totalStudents: course.total_students || course._count?.course_enrollments || 0,
            rating: course.rating || course.average_rating || 0,
            reviewsCount: course.reviews_count || course._count?.course_reviews || 0,
            status: course.status,
            progress: Math.random() > 0.5 ? 'up' : 'down' // Placeholder - would need real progress API
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
                <h1 className="text-2xl font-bold text-gray-800">Điểm số & Thành tích</h1>
                <span className="text-sm text-gray-500">Dữ liệu từ {stats.totalCourses} khóa học</span>
            </div>

            {/* Stats from real data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng khóa học</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.totalCourses}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
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
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đánh giá TB</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">
                                {stats.averageRating !== '0.0' ? `${stats.averageRating} ⭐` : 'N/A'}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-yellow-600" />
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
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grade Distribution - Placeholder with notice */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Phân bố điểm</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Coming soon</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Tính năng phân bố điểm đang được phát triển.</p>
                    <p className="text-sm text-gray-400 mt-1">Cần thêm API để lấy dữ liệu điểm số từ hệ thống.</p>
                </div>
            </div>

            {/* Course Performance - Real data */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-6">Hiệu suất khóa học</h2>

                {courseList.length === 0 ? (
                    <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Chưa có khóa học nào</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giảng viên</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đánh giá</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {courseList.slice(0, 10).map((course: any) => (
                                    <tr key={course.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{course.title}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{course.totalStudents.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1 text-sm">
                                                <span className="text-yellow-500">⭐</span>
                                                {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
                                                <span className="text-gray-400 text-xs">({course.reviewsCount})</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                                                    course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                        course.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                                                            'bg-red-100 text-red-700'
                                                }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/admin/courses/${course.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {courseList.length > 10 && (
                    <div className="mt-4 text-center">
                        <Link
                            to="/admin/courses/all-courses"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Xem tất cả {courseList.length} khóa học →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCourseGrades;