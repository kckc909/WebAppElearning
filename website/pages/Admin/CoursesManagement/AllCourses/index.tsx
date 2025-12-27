import React, { useState, useEffect } from 'react';
import { Search, Eye, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminCourses } from '../../../../hooks/useApi';
import { CourseStatusBadge } from '../../../../components/CourseStatusBadge';

const AdminAllCourses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Use useAdminCourses to get courses (excludes DRAFT - admin shouldn't see instructor's drafts)
    const { data: courses, loading, error, refetch } = useAdminCourses();

    useEffect(() => {
        refetch();
    }, []);

    const courseList = courses || [];

    const filteredCourses = courseList.filter((course: any) => {
        const matchesSearch = (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.accounts?.full_name || course.instructor_name || course.instructor || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || course.course_categories?.name === categoryFilter;
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Tất cả khóa học</h1>
                <p className="text-gray-500">Tổng cộng: {courseList.length} khóa học</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng khóa học</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{courseList.length}</p>
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
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {courseList.filter((c: any) => c.status === 'PUBLISHED').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng học viên</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">
                                {courseList.reduce((sum: number, c: any) => sum + (c.students_count || c.students || 0), 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đánh giá TB</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">
                                {courseList.length > 0
                                    ? (courseList.reduce((sum: number, c: any) => sum + (c.rating || 0), 0) / courseList.length).toFixed(1)
                                    : '-'
                                }
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm khóa học, giảng viên..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">Tất cả danh mục</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="PUBLISHED">Đã xuất bản</option>
                        <option value="PENDING">Chờ duyệt</option>
                        <option value="REJECTED">Từ chối</option>
                    </select>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course: any) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <img
                            src={course.thumbnail_url || course.thumbnail || `https://picsum.photos/seed/course${course.id}/400/225`}
                            alt={course.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{course.title}</h3>
                                <div className="ml-2">
                                    <CourseStatusBadge status={course.status} />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{course.accounts?.full_name || course.instructor_name || course.instructor}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{(course.students_count || course.students || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{course.rating || '-'}</span>
                                    <span className="text-gray-400">({course.reviews_count || course.reviews || 0})</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-lg font-bold text-blue-600">{formatCurrency(course.price)}</span>
                                <Link
                                    to={`/admin/courses/${course.id}`}
                                    className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                                    title="Xem chi tiết"
                                >
                                    <Eye className="w-4 h-4" />
                                    Xem
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
                    <p className="text-gray-600">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
                </div>
            )}
        </div>
    );
};

export default AdminAllCourses;