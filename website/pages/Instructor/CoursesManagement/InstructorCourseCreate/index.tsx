import React, { useState } from 'react';
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
    FileText
} from 'lucide-react';

// Mock draft courses
const MOCK_DRAFTS = [
    {
        id: 101,
        title: 'React & TypeScript Advanced Patterns',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        lessons: 12,
        lastUpdated: '2024-12-15',
        progress: 65
    },
    {
        id: 102,
        title: 'Python Machine Learning',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
        lessons: 5,
        lastUpdated: '2024-12-10',
        progress: 30
    }
];

const CreateCoursePage: React.FC = () => {
    const navigate = useNavigate();
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [drafts, setDrafts] = useState(MOCK_DRAFTS);

    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        category: '',
        level: 'beginner'
    });

    const handleCreateCourse = () => {
        if (!newCourse.title.trim()) return;

        // In real app, save to backend and navigate to edit page
        const newId = Date.now();
        navigate(`/instructor/courses/${newId}`);
    };

    const handleDeleteDraft = (id: number) => {
        setDrafts(drafts.filter(d => d.id !== id));
    };

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
                    {drafts.map((draft) => (
                        <div
                            key={draft.id}
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            <div className="relative">
                                <img
                                    src={draft.thumbnail}
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
                                        <span>{draft.lessons} bài học</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(draft.lastUpdated).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Tiến độ</span>
                                        <span className="font-semibold text-primary">{draft.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${draft.progress}%` }}
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
                    <div className="bg-white rounded-2xl max-w-lg w-full">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-secondary">Tạo khóa học mới</h2>
                            <button
                                onClick={() => setShowCreateDialog(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh thumbnail</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600">Click để upload ảnh</p>
                                    <p className="text-xs text-slate-400 mt-1">1280x720, PNG/JPG</p>
                                </div>
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
                                    placeholder="VD: Complete Web Development Bootcamp"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả ngắn</label>
                                <textarea
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                    placeholder="Mô tả ngắn về khóa học..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>

                            {/* Category & Level */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Danh mục</label>
                                    <select
                                        value={newCourse.category}
                                        onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        <option value="web">Lập trình Web</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="data">Data Science</option>
                                        <option value="design">Design</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Trình độ</label>
                                    <select
                                        value={newCourse.level}
                                        onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="beginner">Cơ bản</option>
                                        <option value="intermediate">Trung cấp</option>
                                        <option value="advanced">Nâng cao</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button
                                onClick={() => setShowCreateDialog(false)}
                                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateCourse}
                                disabled={!newCourse.title.trim()}
                                className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Tạo khóa học
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCoursePage;