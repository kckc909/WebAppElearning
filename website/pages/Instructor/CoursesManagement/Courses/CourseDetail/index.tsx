import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Eye,
    Users,
    Star,
    DollarSign,
    Clock,
    BookOpen,
    Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data
const MOCK_COURSE = {
    id: 1,
    title: 'Complete Web Development Bootcamp 2024',
    description: 'Học lập trình web từ cơ bản đến nâng cao với HTML, CSS, JavaScript, React và Node.js. Khóa học này sẽ giúp bạn trở thành một Full-stack Developer chuyên nghiệp.',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800',
    status: 'published',
    students: 1250,
    rating: 4.8,
    reviews: 324,
    revenue: 125000000,
    price: 990000,
    originalPrice: 1200000,
    category: 'Lập trình Web',
    level: 'Trung cấp',
    duration: 1200,
    totalLessons: 45,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-10',
};

const CourseOverviewPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(MOCK_COURSE);
    const [isSaving, setIsSaving] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success('Đã lưu thay đổi!');
    };

    const handlePreview = () => {
        window.open(`/courses/${courseId}`, '_blank');
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/instructor/courses/all')}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-secondary">{course.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Đã xuất bản
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {course.students.toLocaleString()} học viên
                            </span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {course.rating}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePreview}
                        className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        Xem trước
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Course Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail & Basic Info */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-secondary mb-4">Thông tin khóa học</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Tiêu đề</label>
                                    <input
                                        type="text"
                                        value={course.title}
                                        onChange={(e) => setCourse({ ...course, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Mô tả</label>
                                    <textarea
                                        value={course.description}
                                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Danh mục</label>
                                        <select
                                            value={course.category}
                                            onChange={(e) => setCourse({ ...course, category: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                        >
                                            <option>Lập trình Web</option>
                                            <option>Mobile</option>
                                            <option>Data Science</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Trình độ</label>
                                        <select
                                            value={course.level}
                                            onChange={(e) => setCourse({ ...course, level: e.target.value })}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                        >
                                            <option>Cơ bản</option>
                                            <option>Trung cấp</option>
                                            <option>Nâng cao</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="text-xl font-bold text-secondary mb-4">Giá khóa học</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Giá bán</label>
                                <input
                                    type="number"
                                    value={course.price}
                                    onChange={(e) => setCourse({ ...course, price: Number(e.target.value) })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Giá gốc</label>
                                <input
                                    type="number"
                                    value={course.originalPrice}
                                    onChange={(e) => setCourse({ ...course, originalPrice: Number(e.target.value) })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Stats Cards */}
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">Doanh thu</p>
                                <p className="text-2xl font-bold text-secondary">{formatCurrency(course.revenue)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">Học viên</p>
                                <p className="text-2xl font-bold text-secondary">{course.students.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">Đánh giá</p>
                                <p className="text-2xl font-bold text-secondary">{course.rating} <span className="text-sm text-slate-500">({course.reviews})</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h4 className="font-semibold text-secondary mb-4">Thông tin chi tiết</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Bài học</span>
                                <span className="font-semibold">{course.totalLessons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 flex items-center gap-2"><Clock className="w-4 h-4" /> Thời lượng</span>
                                <span className="font-semibold">{formatDuration(course.duration)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 flex items-center gap-2"><Calendar className="w-4 h-4" /> Tạo ngày</span>
                                <span className="font-semibold">{new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 flex items-center gap-2"><Clock className="w-4 h-4" /> Cập nhật</span>
                                <span className="font-semibold">{new Date(course.updatedAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseOverviewPage;