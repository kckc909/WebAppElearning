import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    GripVertical,
    ChevronDown,
    ChevronUp,
    Video,
    FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCurriculum } from '../../../../../hooks/useApi';
import { Loader2 } from 'lucide-react';
import { ErrorState, EmptyState } from '../../../../../components/DataStates';
import { instructor_routes } from '../../../../page_routes';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CurriculumPage = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    // Fetch curriculum data via hook -> API -> datasource
    const { data: sections, loading, error, refetch } = useCurriculum(courseId!);

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [localSections, setLocalSections] = useState<any[]>([]);

    // Sync local sections with fetched data
    useEffect(() => {
        if (sections && sections.length > 0) {
            setLocalSections(sections);
            setExpandedSections(sections.map((s: any) => s.id));
        }
    }, [sections]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = localSections.findIndex(s => s.id === active.id);
        const newIndex = localSections.findIndex(s => s.id === over.id);

        const newSections = arrayMove(localSections, oldIndex, newIndex);
        setLocalSections(newSections);

        // Update order_index in backend
        try {
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

            // Update all sections with new order
            const updatePromises = newSections.map((section, index) =>
                fetch(`${API_BASE_URL}/course-sections/${section.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_index: index,
                    }),
                })
            );

            await Promise.all(updatePromises);
            toast.success('Đã cập nhật thứ tự chương');
            refetch(); // Reload to sync with backend
        } catch (error) {
            console.error('Update section order error:', error);
            toast.error('Không thể cập nhật thứ tự');
            setLocalSections(sections || []); // Revert on error
        }
    };

    const handleAddSection = async () => {
        try {
            // Call API to create new section in DB
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/course-sections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: parseInt(courseId!),
                    title: 'Chương mới',
                    order_index: sections?.length || 0,
                }),
            });

            if (response.ok) {
                const newSection = await response.json();
                console.log('Created section:', newSection);
                toast.success('Đã tạo chương mới');

                // Create a default lesson in the new section
                const lessonResponse = await fetch(`${API_BASE_URL}/lessons`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        course_id: parseInt(courseId!),
                        section_id: newSection.id,
                        title: 'Bài học đầu tiên',
                        order_index: 0,
                    }),
                });

                if (lessonResponse.ok) {
                    const lessonData = await lessonResponse.json();
                    // Lessons endpoint returns { success: true, data: {...} }
                    const newLesson = lessonData.data || lessonData;
                    console.log('Created lesson:', newLesson);

                    // Navigate to lesson builder with the new lesson, focusing on section
                    const url = `/instructor/courses/${courseId}/lesson-builder/${newLesson.id}?action=edit-lesson&focusSection=${newSection.id}`;
                    console.log('Navigating to:', url);
                    navigate(url);
                } else {
                    const errorText = await lessonResponse.text();
                    console.error('Lesson creation failed:', errorText);
                    toast.error('Không thể tạo bài học mặc định');
                }
            } else {
                const errorText = await response.text();
                console.error('Section creation failed:', errorText);
                toast.error('Không thể tạo chương mới');
            }
        } catch (error) {
            console.error('Create section error:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleAddLesson = async (sectionId: number) => {
        try {
            // Call API to create new lesson in DB
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const section = sections?.find(s => s.id === sectionId);
            const response = await fetch(`${API_BASE_URL}/lessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: parseInt(courseId!),
                    section_id: sectionId,
                    title: 'Bài học mới',
                    order_index: (section.course_lessons || section.lessons)?.length || 0,
                }),
            });

            if (response.ok) {
                const lessonData = await response.json();
                // Lessons endpoint returns { success: true, data: {...} }
                const newLesson = lessonData.data || lessonData;
                console.log('Created lesson:', newLesson);

                // Refetch curriculum to sync course structure
                await refetch();

                toast.success('Đã tạo bài học mới');

                // Navigate to lesson builder with the new lesson ID, focusing on the lesson
                const url = `/instructor/courses/${courseId}/lesson-builder/${newLesson.id}?action=edit-lesson&focusLesson=${newLesson.id}`;
                console.log('Navigating to:', url);
                navigate(url);
            } else {
                const errorText = await response.text();
                console.error('Lesson creation failed:', errorText);
                toast.error('Không thể tạo bài học mới');
            }
        } catch (error) {
            console.error('Create lesson error:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleEditSection = async (sectionId: number) => {
        // Find the first lesson in this section to navigate to
        const section = localSections?.find(s => s.id === sectionId);

        if (section && (section.course_lessons || section.lessons) && (section.course_lessons || section.lessons).length > 0) {
            // Section has lessons, navigate to first lesson with section focus
            const firstLesson = (section.course_lessons || section.lessons)[0];
            const url = `/instructor/courses/${courseId}/lesson-builder/${firstLesson.id}?action=edit-lesson&focusSection=${sectionId}`;
            console.log('Navigating to edit section:', url);
            navigate(url);
        } else {
            // Section has no lessons, create a temporary lesson first
            try {
                const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
                const response = await fetch(`${API_BASE_URL}/lessons`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        course_id: parseInt(courseId!),
                        section_id: sectionId,
                        title: 'Bài học đầu tiên',
                        order_index: 0,
                    }),
                });

                if (response.ok) {
                    const lessonData = await response.json();
                    const newLesson = lessonData.data || lessonData;
                    console.log('Created temporary lesson:', newLesson);

                    // Navigate to lesson builder with the new lesson, focusing on section
                    const url = `/instructor/courses/${courseId}/lesson-builder/${newLesson.id}?action=edit-lesson&focusSection=${sectionId}`;
                    console.log('Navigating to edit section:', url);
                    navigate(url);
                } else {
                    const errorText = await response.text();
                    console.error('Lesson creation failed:', errorText);
                    toast.error('Không thể tạo bài học tạm thời');
                }
            } catch (error) {
                console.error('Create lesson error:', error);
                toast.error('Có lỗi xảy ra');
            }
        }
    };

    const handleEditLesson = (lessonId: number) => {
        // Navigate to lesson builder and focus on the lesson
        const url = `/instructor/courses/${courseId}/lesson-builder/${lessonId}?action=edit-lesson&focusLesson=${lessonId}`;
        console.log('Navigating to edit lesson:', url);
        navigate(url);
    };

    const handleDeleteSection = async (sectionId: number) => {
        // Show confirmation dialog
        if (!window.confirm('Bạn có chắc muốn xóa chương này? Tất cả bài học trong chương sẽ bị xóa.')) {
            return;
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/course-sections/${sectionId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Đã xóa chương');
                refetch(); // Reload curriculum
            } else {
                const errorText = await response.text();
                console.error('Delete section failed:', errorText);
                toast.error('Không thể xóa chương');
            }
        } catch (error) {
            console.error('Delete section error:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleDeleteLesson = async (sectionId: number, lessonId: number) => {
        // Show confirmation dialog
        if (!window.confirm('Bạn có chắc muốn xóa bài học này?')) {
            return;
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Đã xóa bài học');
                refetch(); // Reload curriculum
            } else {
                const errorText = await response.text();
                console.error('Delete lesson failed:', errorText);
                toast.error('Không thể xóa bài học');
            }
        } catch (error) {
            console.error('Delete lesson error:', error);
            toast.error('Có lỗi xảy ra');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-slate-600">Đang tải mục lục...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-6 lg:p-8">
                <ErrorState
                    error={error}
                    onRetry={refetch}
                />
            </div>
        );
    }

    // Empty state
    if (!sections || sections.length === 0) {
        return (
            <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/instructor/courses/${courseId}`)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-secondary">Mục lục khóa học</h1>
                            <p className="text-slate-600 mt-1">Chưa có chương nào</p>
                        </div>
                    </div>
                    <button
                        onClick={handleAddSection}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm chương đầu tiên
                    </button>
                </div>
                <EmptyState
                    icon={<FileText className="w-12 h-12" />}
                    message="Chưa có nội dung khóa học"
                    suggestion="Bắt đầu bằng cách thêm chương đầu tiên"
                />
            </div>
        );
    }

    const totalLessons = localSections.reduce((acc, s) => acc + ((s.course_lessons || s.lessons)?.length || 0), 0);
    const totalDuration = localSections.reduce((acc, s) =>
        acc + ((s.course_lessons || s.lessons) || []).reduce((a: number, l: any) => a + (l.duration || 0), 0), 0
    );

    return (
        <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-secondary">Mục lục khóa học</h1>
                        <p className="text-slate-600 mt-1">
                            {localSections.length} chương • {totalLessons} bài học • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleAddSection}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Thêm chương
                </button>
            </div>

            {/* Sections List with Drag & Drop */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localSections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {localSections.map((section: any, sectionIndex: number) => (
                            <SortableSection
                                key={section.id}
                                section={section}
                                sectionIndex={sectionIndex}
                                isExpanded={expandedSections.includes(section.id)}
                                onToggle={() => toggleSection(section.id)}
                                onEdit={() => handleEditSection(section.id)}
                                onDelete={() => handleDeleteSection(section.id)}
                                onEditLesson={handleEditLesson}
                                onDeleteLesson={handleDeleteLesson}
                                onAddLesson={() => handleAddLesson(section.id)}
                            />
                        ))}

                        {/* Add Section Button */}
                        <button
                            onClick={handleAddSection}
                            className="w-full p-6 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Thêm chương mới
                        </button>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

// Sortable Section Component
interface SortableSectionProps {
    section: any;
    sectionIndex: number;
    isExpanded: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onEditLesson: (lessonId: number) => void;
    onDeleteLesson: (sectionId: number, lessonId: number) => void;
    onAddLesson: () => void;
}

const SortableSection: React.FC<SortableSectionProps> = ({
    section,
    sectionIndex,
    isExpanded,
    onToggle,
    onEdit,
    onDelete,
    onEditLesson,
    onDeleteLesson,
    onAddLesson,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        >
            {/* Section Header */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-200">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5 text-slate-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {sectionIndex + 1}
                </div>
                <button
                    onClick={onToggle}
                    className="flex-1 flex items-center justify-between text-left"
                >
                    <div>
                        <h3 className="font-semibold text-secondary">{section.title}</h3>
                        <p className="text-sm text-slate-500">{(section.course_lessons || section.lessons)?.length || 0} bài học</p>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                </button>
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        title="Chỉnh sửa chương"
                    >
                        <Edit className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa chương"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Lessons */}
            {isExpanded && (
                <div className="p-2">
                    {((section.course_lessons || section.lessons) || []).map((lesson: any, lessonIndex: number) => (
                        <div
                            key={lesson.id}
                            onClick={() => onEditLesson(lesson.id)}
                            className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer"
                        >
                            <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100" />
                            <span className="w-6 text-center text-sm text-slate-400">{lessonIndex + 1}</span>
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                {lesson.type === 'video' ? (
                                    <Video className="w-4 h-4" />
                                ) : (
                                    <FileText className="w-4 h-4" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-secondary">{lesson.title}</p>
                                <p className="text-sm text-slate-500">{lesson.duration} phút</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onEditLesson(lesson.id); }}
                                    className="p-2 hover:bg-slate-200 rounded-lg"
                                    title="Chỉnh sửa bài học"
                                >
                                    <Edit className="w-4 h-4 text-slate-600" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteLesson(section.id, lesson.id); }}
                                    className="p-2 hover:bg-red-50 rounded-lg"
                                    title="Xóa bài học"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={onAddLesson}
                        className="w-full p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 border-2 border-dashed border-slate-200"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm bài học
                    </button>
                </div>
            )}
        </div>
    );
};

export default CurriculumPage;
