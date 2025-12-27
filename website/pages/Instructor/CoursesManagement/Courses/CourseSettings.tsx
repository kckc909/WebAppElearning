import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Save, Trash2, Eye, EyeOff, Globe, Lock,
    DollarSign, Settings2, Tag, AlertCircle, CheckCircle2, Loader2
} from 'lucide-react';
import { instructor_routes } from '../../../page_routes';
import { useQuery, useMutation } from '@tanstack/react-query';
import { coursesApi } from '../../../../API';
import { Course } from '../../../../API/interfaces/ICoursesApi';
import toast from 'react-hot-toast';

const CourseSettingsPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Fetch course data
    const { data: courseData, isLoading } = useQuery({
        queryKey: ['course-detail', courseId],
        queryFn: async () => {
            const response = await coursesApi.getById(parseInt(courseId!));
            return response.data;
        },
        enabled: !!courseId
    });

    const course: Course | null | undefined = courseData;

    // Form state
    const [formData, setFormData] = useState({
        is_published: false,    
        is_free: false,
        price: 0,
        discount_price: null as number | null,
        category: '',
        level: 'beginner',
        language: 'vi',
        allow_trial: false,
        certificate_enabled: true,
        auto_enroll: false,
    });

    // Initialize form data when course loads
    useEffect(() => {
        if (course) {
            setFormData({
                is_published: course.status === 'published',
                is_free: course.price === 0,
                price: course.price || 0,
                discount_price: course.discount_price || null,
                category: course.category || '',
                level: course.level || 'beginner',
                language: course.language || 'vi',
                allow_trial: false, // Note: Not in Course type, may need backend update
                certificate_enabled: true, // Note: Not in Course type, may need backend update
                auto_enroll: false, // Note: Not in Course type, may need backend update
            });
        }
    }, [course]);

    const [hasChanges, setHasChanges] = useState(false);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (data: any) => {
            // TODO: Call actual API
            await new Promise(resolve => setTimeout(resolve, 1000));
            return data;
        },
        onSuccess: () => {
            toast.success('Cập nhật cài đặt thành công!');
            setHasChanges(false);
        },
        onError: () => {
            toast.error('Có lỗi xảy ra khi cập nhật');
        }
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleSave = () => {
        updateMutation.mutate(formData);
    };

    const handleBack = () => {
        if (hasChanges) {
            if (window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn thoát?')) {
                navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`);
            }
        } else {
            navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`);
        }
    };

    const handleDelete = () => {
        if (window.confirm('⚠️ Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác!')) {
            if (window.confirm('Lần xác nhận cuối: Xóa vĩnh viễn khóa học?')) {
                // TODO: Implement delete
                toast.success('Đã xóa khóa học');
                navigate(`/${instructor_routes.base}${instructor_routes.courses_list}`);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-secondary">Cài đặt khóa học</h1>
                                <p className="text-sm text-slate-500 mt-1">Quản lý thông tin và cấu hình</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {hasChanges && (
                                <div className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                                    Có thay đổi chưa lưu
                                </div>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={!hasChanges || updateMutation.isPending}
                                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updateMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="space-y-6">
                    {/* Publishing Settings */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary">Cài đặt xuất bản</h3>
                                <p className="text-sm text-slate-500">Quản lý trạng thái hiển thị khóa học</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {formData.is_published ? (
                                        <Eye className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <EyeOff className="w-5 h-5 text-slate-400" />
                                    )}
                                    <div>
                                        <p className="font-medium text-secondary">Xuất bản khóa học</p>
                                        <p className="text-sm text-slate-500">
                                            {formData.is_published
                                                ? 'Khóa học đang hiển thị công khai'
                                                : 'Khóa học đang ở chế độ nháp'}
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.is_published}
                                        onChange={(e) => handleInputChange('is_published', e.target.checked)}
                                    />
                                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-secondary">Cho phép học thử</p>
                                        <p className="text-sm text-slate-500">Học viên có thể học thử một số bài miễn phí</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.allow_trial}
                                        onChange={(e) => handleInputChange('allow_trial', e.target.checked)}
                                    />
                                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Settings */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary">Giá và thanh toán</h3>
                                <p className="text-sm text-slate-500">Cấu hình giá khóa học</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Tag className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-secondary">Khóa học miễn phí</p>
                                        <p className="text-sm text-slate-500">Học viên có thể đăng ký mà không cần thanh toán</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.is_free}
                                        onChange={(e) => handleInputChange('is_free', e.target.checked)}
                                    />
                                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            {!formData.is_free && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Giá gốc (VNĐ)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Giá khuyến mãi (VNĐ)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.discount_price || ''}
                                            onChange={(e) => handleInputChange('discount_price', e.target.value ? parseInt(e.target.value) : null)}
                                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            placeholder="Không có"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Information */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Settings2 className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-secondary">Thông tin khóa học</h3>
                                <p className="text-sm text-slate-500">Cấu hình chi tiết</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Mức độ
                                </label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => handleInputChange('level', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="beginner">Cơ bản</option>
                                    <option value="intermediate">Trung cấp</option>
                                    <option value="advanced">Nâng cao</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Ngôn ngữ
                                </label>
                                <select
                                    value={formData.language}
                                    onChange={(e) => handleInputChange('language', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-secondary">Cấp chứng chỉ</p>
                                        <p className="text-sm text-slate-500">Cấp chứng chỉ cho học viên hoàn thành</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.certificate_enabled}
                                        onChange={(e) => handleInputChange('certificate_enabled', e.target.checked)}
                                    />
                                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-xl border-2 border-red-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-600">Vùng nguy hiểm</h3>
                                <p className="text-sm text-slate-500">Các thao tác không thể hoàn tác</p>
                            </div>
                        </div>

                        <button
                            onClick={handleDelete}
                            className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-red-200"
                        >
                            <Trash2 className="w-5 h-5" />
                            Xóa khóa học vĩnh viễn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSettingsPage;
