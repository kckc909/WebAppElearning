import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    BookOpen,
    Users,
    Star,
    Clock,
    MoreVertical,
    Edit,
    Eye,
    TrendingUp
} from 'lucide-react';
import { useInstructorCourses } from '../../../../hooks/useApi';
import { useAuth } from '../../../../contexts/AuthContext';

type StatusFilter = 'all' | 'published' | 'draft' | 'pending' | 'rejected';

const CoursesListPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    // Get instructor ID from auth context
    const instructorId = user?.id || 0;

    // Use instructor-specific hook to get ALL courses (not just published)
    const { data: courses, loading, error, refetch } = useInstructorCourses(instructorId);

    useEffect(() => {
        if (instructorId) {
            refetch();
        }
    }, [instructorId]);

    const courseList = courses || [];

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
        const normalizedStatus = (status || '').toLowerCase();
        switch (normalizedStatus) {
            case 'published':
                return 'bg-green-100 text-green-700';
            case 'draft':
                return 'bg-yellow-100 text-yellow-700';
            case 'pending':
                return 'bg-blue-100 text-blue-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        const normalizedStatus = (status || '').toLowerCase();
        switch (normalizedStatus) {
            case 'published':
                return 'Đã xuất bản';
            case 'draft':
                return 'Bản nháp';
            case 'pending':
                return 'Chờ duyệt';
            case 'rejected':
                return 'Bị từ chối';
            default:
                return status;
        }
    };

    const filteredCourses = courseList.filter((course: any) => {
        // Normalize status to lowercase for comparison (backend may return UPPERCASE)
        const courseStatus = (course.status || '').toLowerCase();
        if (statusFilter !== 'all' && courseStatus !== statusFilter) return false;
        if (searchQuery && !(course.title || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-secondary mb-2">Tất cả khóa học</h1>
                    <p className="text-slate-600">Quản lý {courseList.length} khóa học của bạn</p>
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
                    <div className="flex gap-2 flex-wrap">
                        {(['all', 'published', 'draft', 'pending', 'rejected'] as StatusFilter[]).map((status) => (
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
                {filteredCourses.map((course: any) => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/instructor/courses/${course.id}`)}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group"
                    >
                        {/* Thumbnail */}
                        <div className="relative">
                            <img
                                src={course.thumbnail_url || `https://via.placeholder.com/400x225?text=${encodeURIComponent(course.title || 'Course')}`}
                                alt={course.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x225?text=${encodeURIComponent(course.title || 'Course')}`;
                                }}
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

                            {/* Stats - sử dụng đúng field từ database */}
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.total_lessons || 0} bài</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDuration(course.total_duration || 0)}</span>
                                </div>
                                {(course.status === 'published' || course.status === 'PUBLISHED') && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{(course.total_students || 0).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating & Revenue for published */}
                            {(course.status === 'published' || course.status === 'PUBLISHED') && (
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">{Number(course.average_rating || 0).toFixed(1)}</span>
                                        <span className="text-slate-400">({course.total_reviews || 0})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-semibold text-sm">{formatCurrency(course.revenue || 0)}</span>
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
                                    {(course.status === 'draft' || course.status === 'DRAFT') ? 'Tiếp tục' : 'Chỉnh sửa'}
                                </button>
                                {(course.status === 'published' || course.status === 'PUBLISHED') && (
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
