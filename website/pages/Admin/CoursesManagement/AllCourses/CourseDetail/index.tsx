import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Star, Clock, BookOpen, DollarSign, TrendingUp, Edit } from 'lucide-react';

const AdminCourseDetail: React.FC = () => {
    const { id } = useParams();

    const course = {
        id: parseInt(id || '1'),
        title: 'Complete Web Development Bootcamp 2024',
        instructor: 'Dr. Angela Yu',
        category: 'Web Development',
        students: 1250,
        rating: 4.8,
        reviews: 450,
        price: 299000,
        revenue: 373750000,
        status: 'published',
        thumbnail: 'https://picsum.photos/seed/course1/800/400',
        description: 'Khóa học web development toàn diện từ cơ bản đến nâng cao...',
        createdAt: '2024-01-15',
        lastUpdated: '2024-12-10',
        totalLessons: 86,
        totalDuration: '52h 30m',
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Link to="/admin/courses" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                        ← Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa
                </button>
            </div>

            {/* Course Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                        <span className="text-sm text-gray-600">Danh mục: {course.category}</span>
                    </div>
                    <p className="text-gray-700">{course.description}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Học viên</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{course.students.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đánh giá</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">{course.rating} ⭐</p>
                            <p className="text-xs text-gray-500 mt-1">{course.reviews} reviews</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Doanh thu</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(course.revenue)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Bài học</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">{course.totalLessons}</p>
                            <p className="text-xs text-gray-500 mt-1">{course.totalDuration}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin khóa học</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Giảng viên:</span>
                            <span className="font-medium text-gray-900">{course.instructor}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Giá:</span>
                            <span className="font-medium text-gray-900">{formatCurrency(course.price)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Ngày tạo:</span>
                            <span className="font-medium text-gray-900">{new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Cập nhật:</span>
                            <span className="font-medium text-gray-900">{new Date(course.lastUpdated).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Hiệu suất</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
                                <span className="text-sm font-medium text-gray-900">68%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">Tỷ lệ hài lòng</span>
                                <span className="text-sm font-medium text-gray-900">96%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
                <div className="space-y-3">
                    {[
                        { action: 'Học viên mới đăng ký', user: 'Nguyễn Văn A', time: '2 giờ trước' },
                        { action: 'Đánh giá 5 sao', user: 'Trần Thị B', time: '5 giờ trước' },
                        { action: 'Hoàn thành khóa học', user: 'Lê Văn C', time: '1 ngày trước' },
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-600">{activity.user}</p>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminCourseDetail;