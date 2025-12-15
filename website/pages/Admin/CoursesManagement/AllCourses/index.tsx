import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAllCourses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const courses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp 2024',
            instructor: 'Dr. Angela Yu',
            category: 'Web Development',
            students: 1250,
            rating: 4.8,
            reviews: 450,
            price: 299000,
            status: 'published',
            thumbnail: 'https://picsum.photos/seed/course1/400/225',
        },
        {
            id: 2,
            title: 'React - The Complete Guide',
            instructor: 'Maximilian Schwarzmüller',
            category: 'Web Development',
            students: 980,
            rating: 4.9,
            reviews: 380,
            price: 349000,
            status: 'published',
            thumbnail: 'https://picsum.photos/seed/course2/400/225',
        },
        {
            id: 3,
            title: 'Python for Data Science',
            instructor: 'Jose Portilla',
            category: 'Data Science',
            students: 850,
            rating: 4.7,
            reviews: 320,
            price: 399000,
            status: 'published',
            thumbnail: 'https://picsum.photos/seed/course3/400/225',
        },
        {
            id: 4,
            title: 'UI/UX Design Masterclass',
            instructor: 'Daniel Schifano',
            category: 'Design',
            students: 720,
            rating: 4.6,
            reviews: 280,
            price: 349000,
            status: 'draft',
            thumbnail: 'https://picsum.photos/seed/course4/400/225',
        },
    ];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Tất cả khóa học</h1>
                <Link
                    to="/admin/courses/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Thêm khóa học
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng khóa học</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{courses.length}</p>
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
                                {courses.filter(c => c.status === 'published').length}
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
                                {courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
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
                                {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
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
                        <option value="published">Đã xuất bản</option>
                        <option value="draft">Bản nháp</option>
                    </select>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{course.title}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${course.status === 'published'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {course.status === 'published' ? 'Xuất bản' : 'Nháp'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{course.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{course.rating}</span>
                                    <span className="text-gray-400">({course.reviews})</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <span className="text-lg font-bold text-blue-600">{formatCurrency(course.price)}</span>
                                <div className="flex gap-2">
                                    <Link
                                        to={`/admin/courses/${course.id}`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        title="Xem chi tiết"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    <button
                                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
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