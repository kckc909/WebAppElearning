import React from 'react';
import {
    ChevronLeft, Save, Clock, Eye, Send, AlertCircle, CheckCircle2,
    Loader2
} from 'lucide-react';

interface LessonBuilderHeaderProps {
    courseTitle: string;
    lessonTitle: string;
    isDraft: boolean;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    isPreviewMode: boolean;
    onBack: () => void;
    onSave: () => void;
    onPublish: () => void;
    onTogglePreview: () => void;
}

export const LessonBuilderHeader: React.FC<LessonBuilderHeaderProps> = ({
    courseTitle,
    lessonTitle,
    isDraft,
    isSaving,
    hasUnsavedChanges,
    isPreviewMode,
    onBack,
    onSave,
    onPublish,
    onTogglePreview,
}) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-50">
            <div className="flex items-center gap-4">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="font-medium">Quay lại khóa học</span>
                </button>

                {/* Course Title */}
                <div className="border-l border-slate-300 pl-4">
                    <h1 className="text-lg font-bold text-slate-800">
                        {courseTitle || 'Khóa học'}
                    </h1>
                    <p className="text-xs text-slate-500">
                        Trình soạn bài • {lessonTitle || '(Chưa chọn bài học)'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                    {isDraft ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-200">
                            <AlertCircle size={14} />
                            Bản nháp
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                            <CheckCircle2 size={14} />
                            Đã xuất bản
                        </span>
                    )}
                </div>

                {/* Auto-save Indicator */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    {isSaving ? (
                        <>
                            <Loader2 size={12} className="animate-spin" />
                            <span>Đang lưu...</span>
                        </>
                    ) : hasUnsavedChanges ? (
                        <>
                            <Clock size={12} />
                            <span>Chưa lưu thay đổi</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 size={12} className="text-green-600" />
                            <span>Đã lưu tất cả</span>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 border-l border-slate-300 pl-4">
                    <button
                        onClick={onTogglePreview}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isPreviewMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        <Eye size={16} />
                        {isPreviewMode ? 'Chỉnh sửa' : 'Xem trước'}
                    </button>

                    {!isPreviewMode && isDraft && (
                        <>
                            <button
                                onClick={onSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 disabled:opacity-50 transition-colors"
                            >
                                <Save size={16} />
                                Lưu nháp
                            </button>

                            <button
                                onClick={onPublish}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all"
                            >
                                <Send size={16} />
                                Xuất bản
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
