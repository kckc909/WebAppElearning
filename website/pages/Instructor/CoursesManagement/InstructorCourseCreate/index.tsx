import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    X,
    Upload,
    BookOpen,
    Clock,
    Edit,
    Trash2,
    MoreVertical,
    FileText,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useInstructorCourses } from '../../../../hooks/useApi';
import { DbCoursesApi } from '../../../../API/implementations/db/DbCoursesApi';
import { useAuth } from '../../../../contexts/AuthContext';

const CreateCoursePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
    const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

    const coursesApi = new DbCoursesApi();

    // Get ALL courses for this instructor (not just PUBLISHED)
    const { data: allCourses, loading, error, refetch } = useInstructorCourses(user?.id);

    useEffect(() => {
        if (user?.id) {
            refetch();
        }
        fetchCategories();
    }, [user?.id]);

    const fetchCategories = async () => {
        try {
            const response = await coursesApi.getCategories();
            if (response.success) {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // Filter drafts from all courses
    const drafts = (allCourses || []).filter((c: any) => c.status === 'DRAFT' || c.status === 'draft');

    const [newCourse, setNewCourse] = useState({
        title: '',
        short_description: '',
        category_id: '',
        level: 'ALL_LEVELS',
        thumbnail: ''
    });

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 5MB');
            return;
        }

        setThumbnailFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to server
        await uploadThumbnail(file);
    };

    const uploadThumbnail = async (file: File) => {
        setIsUploadingThumbnail(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/upload/image`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url || data.data?.url;
                setNewCourse({ ...newCourse, thumbnail: imageUrl });
                toast.success('Upload ảnh thành công!');
            } else {
                toast.error('Upload ảnh thất bại');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Có lỗi xảy ra khi upload ảnh');
        } finally {
            setIsUploadingThumbnail(false);
        }
    };

    const handleCreateCourse = async () => {
        if (!newCourse.title.trim()) {
            toast.error('Vui lòng nhập tiêu đề khóa học');
            return;
        }

        const accountData = sessionStorage.getItem('Account');
        if (!accountData) {
            toast.error('Vui lòng đăng nhập');
            return;
        }

        const account = JSON.parse(accountData);
        setIsCreating(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    instructor_id: account.id,
                    title: newCourse.title,
                    short_description: newCourse.short_description,
                    category_id: newCourse.category_id ? Number(newCourse.category_id) : null,
                    level: newCourse.level,
                    thumbnail: newCourse.thumbnail || null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const courseId = data.data?.id || data.id;

                toast.success('Tạo khóa học thành công!');
                setShowCreateDialog(false);
                resetDialog();

                // Refetch courses list
                refetch();

                // Navigate to course detail page
                navigate(`/instructor/courses/${courseId}`);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Không thể tạo khóa học');
            }
        } catch (error: any) {
            console.error('Create course error:', error);
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteDraft = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bản nháp này?')) return;

        try {
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Đã xóa bản nháp');
                refetch();
            } else {
                toast.error('Không thể xóa bản nháp');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const resetDialog = () => {
        setNewCourse({
            title: '',
            short_description: '',
            category_id: '',
            level: 'ALL_LEVELS',
            thumbnail: ''
        });
        setThumbnailFile(null);
        setThumbnailPreview('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary mb-2">Khóa học của tôi</h1>
                <p className="text-slate-600">Quản lý và tạo khóa học mới</p>
            </div>

            {/* Drafts Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary mb-4">Bản nháp ({drafts.length})</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Create New Card */}
                    <button
                        onClick={() => setShowCreateDialog(true)}
                        className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center min-h-[280px]"
                    >
                        <div className="w-16 h-16 bg-slate-100 group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <Plus className="w-8 h-8 text-slate-400 group-hover:text-primary" />
                        </div>
                        <span className="font-semibold text-slate-600 group-hover:text-primary">Tạo khóa học mới</span>
                    </button>

                    {/* Draft Cards */}
                    {drafts.map((draft: any) => (
                        <div
                            key={draft.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            <div className="relative">
                                <img
                                    src={draft.thumbnail || `https://picsum.photos/seed/draft${draft.id}/400/200`}
                                    alt={draft.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                        Bản nháp
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-secondary mb-3 line-clamp-2">{draft.title}</h3>

                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{draft.lessons_count || 0} bài học</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{draft.updated_at ? new Date(draft.updated_at).toLocaleDateString('vi-VN') : '-'}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Tiến độ</span>
                                        <span className="font-semibold text-primary">{draft.progress || 0}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${draft.progress || 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/instructor/courses/${draft.id}`)}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Tiếp tục
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDraft(draft.id)}
                                        className="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Mẹo tạo khóa học</h3>
                        <p className="text-sm text-blue-700">
                            Hãy chuẩn bị nội dung trước khi tạo khóa học. Lập kế hoạch các chương và bài học,
                            chuẩn bị video/tài liệu, và xác định mục tiêu học tập cho từng bài.
                        </p>
                    </div>
                </div>
            </div>

            {/* Create Course Dialog */}
            {showCreateDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-secondary">Tạo khóa học mới</h2>
                            <button
                                onClick={() => {
                                    setShowCreateDialog(false);
                                    resetDialog();
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Ảnh thumbnail
                                </label>
                                {thumbnailPreview ? (
                                    <div className="relative bg-slate-100 rounded-xl overflow-hidden">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-64 object-contain rounded-xl"
                                        />
                                        <button
                                            onClick={() => {
                                                setThumbnailFile(null);
                                                setThumbnailPreview('');
                                                setNewCourse({ ...newCourse, thumbnail: '' });
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        {isUploadingThumbnail && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleThumbnailChange}
                                            className="hidden"
                                        />
                                        <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                        <p className="text-sm font-medium text-slate-600 mb-1">
                                            Click để upload ảnh thumbnail
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Khuyến nghị: 1280x720px, PNG/JPG, tối đa 5MB
                                        </p>
                                    </label>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tiêu đề khóa học <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                    placeholder="VD: Lập trình Web từ cơ bản đến nâng cao"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Danh mục
                                </label>
                                <select
                                    value={newCourse.category_id}
                                    onChange={(e) => setNewCourse({ ...newCourse, category_id: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.icon && `${cat.icon} `}{cat.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500 mt-1">
                                    Chọn danh mục phù hợp giúp học viên dễ tìm thấy khóa học
                                </p>
                            </div>

                            {/* Level */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Trình độ
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'ALL_LEVELS', label: 'Tất cả trình độ', desc: 'Phù hợp cho mọi người' },
                                        { value: 'BEGINNER', label: 'Cơ bản', desc: 'Dành cho người mới bắt đầu' },
                                        { value: 'INTERMEDIATE', label: 'Trung cấp', desc: 'Đã có kiến thức nền tảng' },
                                        { value: 'ADVANCED', label: 'Nâng cao', desc: 'Dành cho chuyên gia' },
                                    ].map((level) => (
                                        <label
                                            key={level.value}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${newCourse.level === level.value
                                                ? 'border-primary bg-primary/5'
                                                : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="level"
                                                value={level.value}
                                                checked={newCourse.level === level.value}
                                                onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                                                className="hidden"
                                            />
                                            <div className="flex items-start gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${newCourse.level === level.value
                                                    ? 'border-primary'
                                                    : 'border-slate-300'
                                                    }`}>
                                                    {newCourse.level === level.value && (
                                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-secondary text-sm">{level.label}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{level.desc}</p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Mô tả ngắn
                                </label>
                                <textarea
                                    value={newCourse.short_description}
                                    onChange={(e) => setNewCourse({ ...newCourse, short_description: e.target.value })}
                                    placeholder="Mô tả ngắn gọn về khóa học, nội dung chính và lợi ích học viên nhận được..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Mô tả hấp dẫn sẽ thu hút nhiều học viên hơn
                                </p>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateDialog(false);
                                    resetDialog();
                                }}
                                disabled={isCreating}
                                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateCourse}
                                disabled={!newCourse.title.trim() || isCreating || isUploadingThumbnail}
                                className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isCreating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Đang tạo...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Tạo khóa học
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCoursePage;