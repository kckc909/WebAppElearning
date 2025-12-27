import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, Circle, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface PreviewSettingsProps {
    courseId: string;
    allowPreview: boolean;
    onUpdate: (allowPreview: boolean) => void;
    isDisabled: boolean;
}

interface Lesson {
    id: number;
    title: string;
    is_preview: boolean;
    order_index: number;
    section_title?: string;
}

export const PreviewSettings: React.FC<PreviewSettingsProps> = ({
    courseId,
    allowPreview,
    onUpdate,
    isDisabled
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectedLessons, setSelectedLessons] = useState<Set<number>>(new Set());

    const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

    // Fetch lessons when dialog opens
    useEffect(() => {
        if (showDialog && allowPreview) {
            fetchLessons();
        }
    }, [showDialog, allowPreview]);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}/sections`);
            if (response.ok) {
                const data = await response.json();
                const sections = Array.isArray(data) ? data : (data.data || []);
                
                // Flatten lessons from all sections
                const allLessons: Lesson[] = [];
                sections.forEach((section: any) => {
                    const sectionLessons = section.lessons || section.course_lessons || [];
                    sectionLessons.forEach((lesson: any) => {
                        allLessons.push({
                            id: lesson.id,
                            title: lesson.title,
                            is_preview: lesson.is_preview || false,
                            order_index: lesson.order_index,
                            section_title: section.title
                        });
                    });
                });

                setLessons(allLessons);

                // Set initially selected lessons
                const previewLessonIds = allLessons
                    .filter(l => l.is_preview)
                    .map(l => l.id);
                setSelectedLessons(new Set(previewLessonIds));
            } else {
                toast.error('Không thể tải danh sách bài học');
            }
        } catch (error) {
            console.error('Error fetching lessons:', error);
            toast.error('Có lỗi xảy ra khi tải bài học');
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePreview = async () => {
        if (!allowPreview) {
            // Turning ON preview mode
            onUpdate(true);
            setShowDialog(true);
        } else {
            // Turning OFF preview mode
            if (confirm('Bạn có chắc muốn tắt chế độ học thử? Tất cả bài học xem trước sẽ bị hủy.')) {
                setSaving(true);
                try {
                    // Update course
                    const courseResponse = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            id: Number(courseId),
                            allow_preview: false 
                        })
                    });

                    if (!courseResponse.ok) {
                        throw new Error('Failed to update course');
                    }

                    // Clear all preview lessons
                    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/sections`);
                    if (response.ok) {
                        const data = await response.json();
                        const sections = Array.isArray(data) ? data : (data.data || []);
                        
                        const updatePromises: Promise<any>[] = [];
                        sections.forEach((section: any) => {
                            const sectionLessons = section.lessons || section.course_lessons || [];
                            sectionLessons.forEach((lesson: any) => {
                                if (lesson.is_preview) {
                                    updatePromises.push(
                                        fetch(`${API_BASE_URL}/lessons/${lesson.id}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ 
                                                id: lesson.id,
                                                is_preview: false 
                                            })
                                        })
                                    );
                                }
                            });
                        });

                        await Promise.all(updatePromises);
                    }

                    onUpdate(false);
                    toast.success('Đã tắt chế độ học thử');
                } catch (error) {
                    console.error('Error disabling preview:', error);
                    toast.error('Có lỗi xảy ra');
                } finally {
                    setSaving(false);
                }
            }
        }
    };

    const handleToggleLesson = (lessonId: number) => {
        const newSelected = new Set(selectedLessons);
        if (newSelected.has(lessonId)) {
            newSelected.delete(lessonId);
        } else {
            newSelected.add(lessonId);
        }
        setSelectedLessons(newSelected);
    };

    const handleSavePreviewLessons = async () => {
        setSaving(true);
        try {
            // Update course allow_preview
            const courseResponse = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id: Number(courseId),
                    allow_preview: true 
                })
            });

            if (!courseResponse.ok) {
                throw new Error('Failed to update course');
            }

            // Update all lessons
            const updatePromises = lessons.map(lesson => {
                const shouldBePreview = selectedLessons.has(lesson.id);
                return fetch(`${API_BASE_URL}/lessons/${lesson.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        id: lesson.id,
                        is_preview: shouldBePreview 
                    })
                });
            });

            await Promise.all(updatePromises);

            toast.success(`Đã cập nhật ${selectedLessons.size} bài học xem trước`);
            setShowDialog(false);
        } catch (error) {
            console.error('Error saving preview lessons:', error);
            toast.error('Có lỗi xảy ra khi lưu');
        } finally {
            setSaving(false);
        }
    };

    // Group lessons by section
    const lessonsBySection = lessons.reduce((acc, lesson) => {
        const sectionTitle = lesson.section_title || 'Chưa phân loại';
        if (!acc[sectionTitle]) {
            acc[sectionTitle] = [];
        }
        acc[sectionTitle].push(lesson);
        return acc;
    }, {} as Record<string, Lesson[]>);

    return (
        <>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Eye className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-bold text-secondary">Học thử miễn phí</h2>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">
                            Cho phép học viên xem trước một số bài học miễn phí trước khi đăng ký khóa học
                        </p>

                        {allowPreview && (
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-green-700 font-medium">
                                    Đã bật - {selectedLessons.size} bài học xem trước
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {allowPreview && (
                            <button
                                onClick={() => setShowDialog(true)}
                                disabled={isDisabled}
                                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Chọn bài học
                            </button>
                        )}

                        <button
                            onClick={handleTogglePreview}
                            disabled={isDisabled || saving}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                allowPreview
                                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                                    : 'bg-primary text-white hover:bg-primary-hover'
                            }`}
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : allowPreview ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                            {allowPreview ? 'Tắt học thử' : 'Bật học thử'}
                        </button>
                    </div>
                </div>

                {allowPreview && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Lưu ý:</strong> Bài học xem trước sẽ hiển thị badge "Xem trước" và học viên chưa đăng ký có thể xem miễn phí.
                        </p>
                    </div>
                )}
            </div>

            {/* Dialog chọn bài học */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <div>
                                <h3 className="text-2xl font-bold text-secondary">Chọn bài học xem trước</h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    Chọn các bài học mà học viên có thể xem miễn phí
                                </p>
                            </div>
                            <button
                                onClick={() => setShowDialog(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    <span className="ml-3 text-slate-600">Đang tải bài học...</span>
                                </div>
                            ) : lessons.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <p>Chưa có bài học nào trong khóa học này.</p>
                                    <p className="text-sm mt-2">Vui lòng thêm bài học trước khi cấu hình học thử.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {Object.entries(lessonsBySection).map(([sectionTitle, sectionLessons]) => (
                                        <div key={sectionTitle}>
                                            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                                <div className="w-1 h-5 bg-primary rounded-full"></div>
                                                {sectionTitle}
                                            </h4>
                                            <div className="space-y-2 ml-3">
                                                {sectionLessons.map((lesson) => (
                                                    <label
                                                        key={lesson.id}
                                                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                            selectedLessons.has(lesson.id)
                                                                ? 'border-primary bg-primary/5'
                                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedLessons.has(lesson.id)}
                                                            onChange={() => handleToggleLesson(lesson.id)}
                                                            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-slate-800">
                                                                    {lesson.title}
                                                                </span>
                                                                {selectedLessons.has(lesson.id) && (
                                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                                                        Xem trước
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {selectedLessons.has(lesson.id) ? (
                                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                                        ) : (
                                                            <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                                                        )}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
                            <div className="text-sm text-slate-600">
                                Đã chọn: <strong className="text-primary">{selectedLessons.size}</strong> bài học
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowDialog(false)}
                                    disabled={saving}
                                    className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSavePreviewLessons}
                                    disabled={saving || selectedLessons.size === 0}
                                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Lưu thay đổi
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
