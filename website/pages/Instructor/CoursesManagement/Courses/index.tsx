import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    BookOpen,
    Users,
    Star,
    Clock,
    MoreVertical,
    Edit,
    Eye,
    Trash2,
    TrendingUp
} from 'lucide-react';

// Mock courses
const MOCK_COURSES = [
    {
        id: 1,
        title: 'Complete Web Development Bootcamp 2024',
        thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
        status: 'published',
        students: 1250,
        rating: 4.8,
        reviews: 324,
        revenue: 125000000,
        lessons: 45,
        duration: 1200,
        lastUpdated: '2024-12-10'
    },
    {
        id: 2,
        title: 'React & TypeScript Advanced Patterns',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        status: 'draft',
        students: 0,
        rating: 0,
        reviews: 0,
        revenue: 0,
        lessons: 12,
        duration: 360,
        lastUpdated: '2024-12-15'
    },
    {
        id: 3,
        title: 'Node.js Backend Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        status: 'published',
        students: 890,
        rating: 4.6,
        reviews: 156,
        revenue: 89000000,
        lessons: 38,
        duration: 980,
        lastUpdated: '2024-11-20'
    },
    {
        id: 4,
        title: 'Python for Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
        status: 'pending',
        students: 0,
        rating: 0,
        reviews: 0,
        revenue: 0,
        lessons: 28,
        duration: 720,
        lastUpdated: '2024-12-12'
    }
];

type StatusFilter = 'all' | 'published' | 'draft' | 'pending';

const CoursesListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700';
            case 'draft':
                return 'bg-yellow-100 text-yellow-700';
            case 'pending':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'published':
                return 'Đã xuất bản';
            case 'draft':
                return 'Bản nháp';
            case 'pending':
                return 'Chờ duyệt';
            default:
                return status;
        }
    };

    const filteredCourses = MOCK_COURSES.filter(course => {
        if (statusFilter !== 'all' && course.status !== statusFilter) return false;
        if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-secondary mb-2">Tất cả khóa học</h1>
                    <p className="text-slate-600">Quản lý {MOCK_COURSES.length} khóa học của bạn</p>
                </div>
                <button
                    onClick={() => navigate('/instructor/courses/create')}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                    <Plus className="w-5 h-5" />
                    Tạo khóa học mới
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="search"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'published', 'draft', 'pending'] as StatusFilter[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === status
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {status === 'all' ? 'Tất cả' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/instructor/courses/${course.id}`)}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group"
                    >
                        {/* Thumbnail */}
                        <div className="relative">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(course.status)}`}>
                                    {getStatusLabel(course.status)}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Show menu
                                    }}
                                    className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {course.title}
                            </h3>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.lessons} bài</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDuration(course.duration)}</span>
                                </div>
                                {course.status === 'published' && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{course.students.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating & Revenue for published */}
                            {course.status === 'published' && (
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">{course.rating}</span>
                                        <span className="text-slate-400">({course.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-semibold text-sm">{formatCurrency(course.revenue)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/instructor/courses/${course.id}`);
                                    }}
                                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Edit className="w-4 h-4" />
                                    {course.status === 'draft' ? 'Tiếp tục' : 'Chỉnh sửa'}
                                </button>
                                {course.status === 'published' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`/courses/${course.id}`, '_blank');
                                        }}
                                        className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                    <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-secondary mb-2">Không tìm thấy khóa học</h3>
                    <p className="text-slate-600 mb-6">Thử thay đổi bộ lọc hoặc tạo khóa học mới</p>
                    <button
                        onClick={() => navigate('/instructor/courses/create')}
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Tạo khóa học mới
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoursesListPage;
