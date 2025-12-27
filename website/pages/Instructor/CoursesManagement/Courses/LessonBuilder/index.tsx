/**
 * LESSON BUILDER - Production Editor
 * Slot-based, version-controlled lesson editing interface
 * 
 * Architecture:
 * - Uses useLessonBuilder hook (NO direct mockData)
 * - Slot-based drag & drop (maps 1:1 to LESSON_BLOCKS)
 * - Hides menu sidebar
 * - Custom header with back, status, auto-save
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useLessonBuilder, useCourseSections, useCourse } from '../../../../../hooks/useApi';
import { useCourseDataManager } from '../../../../../hooks/useCourseDataManager'; // STAGE 1: Add new hook in parallel
import { DndContext, DragEndEvent, DragStartEvent, DragOverEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import toast from 'react-hot-toast';
import {
    ChevronLeft, Save, Clock, Eye, Send, AlertCircle, CheckCircle2,
    Loader2
} from 'lucide-react';
import type { LessonBlock } from '../../../../../mock-db';

// Subcomponents
import { SlotBasedCanvas } from './components/SlotBasedCanvas';
import { MenuSidebar } from './components/MenuSidebar';
import { PropertyPanel } from './components/PropertyPanel';
import { ConfirmationModal } from './components/ConfirmationModal';
import { LessonSettingsPanel } from './components/LessonSettingsPanel';
import { SectionSettingsPanel } from './components/SectionSettingsPanel';

// Helper function to generate layout object from layout type
function getLayoutFromType(layoutType: string) {
    const layouts: Record<string, any> = {
        'single': {
            node_type: 'single',
            slots: [{ id: 'main', region: 'main', order_index: 0 }]
        },
        'split': {
            node_type: 'split',
            slots: [
                { id: 'left', region: 'left', order_index: 0 },
                { id: 'right', region: 'right', order_index: 1 }
            ]
        },
        'sidebar-left': {
            node_type: 'sidebar-left',
            slots: [
                { id: 'nav', region: 'sidebar', order_index: 0 },
                { id: 'main', region: 'main', order_index: 1 }
            ]
        },
        'sidebar-right': {
            node_type: 'sidebar-right',
            slots: [
                { id: 'main', region: 'main', order_index: 0 },
                { id: 'sidebar', region: 'sidebar', order_index: 1 }
            ]
        },
        'grid': {
            node_type: 'grid',
            slots: [
                { id: 'grid-1', region: 'grid-1', order_index: 0 },
                { id: 'grid-2', region: 'grid-2', order_index: 1 },
                { id: 'grid-3', region: 'grid-3', order_index: 2 },
                { id: 'grid-4', region: 'grid-4', order_index: 3 }
            ]
        },
        'stacked': {
            node_type: 'stacked',
            slots: [
                { id: 'hero', region: 'hero', order_index: 0 },
                { id: 'content', region: 'content', order_index: 1 }
            ]
        },
        'focus': {
            node_type: 'focus',
            slots: [{ id: 'center', region: 'center', order_index: 0 }]
        }
    };

    return layouts[layoutType] || layouts['single'];
}

export default function LessonBuilderPage() {
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get action and focus params from query params (lessonId is now in path)
    const action = searchParams.get('action'); // 'edit-lesson'
    const sectionIdParam = searchParams.get('sectionId');
    const focusSection = searchParams.get('focusSection'); // Section to focus on
    const focusLesson = searchParams.get('focusLesson'); // Lesson to focus on

    // CRITICAL: Use ONLY unified hook - this is the single source of truth for ALL course data
    // NO separate fetches, NO refetchSections, NO local state copies
    const unifiedCourseData = useCourseDataManager(parseInt(courseId || '0'));

    // TEMPORARY: Keep old hook ONLY for block operations (addBlock, updateBlock, deleteBlock, moveBlock)
    // TODO: Migrate block operations to unified hook
    // This hook should NOT be used for course structure (sections/lessons)
    const {
        data,
        updateMetadata,
        updateBlock,
        addBlock,
        deleteBlock,
        moveBlock,
        updateLayout,
        publishDraft,
        isDraft,
        hasUnsavedChanges,
        markAsChanged,
        markAsSaved
    } = useLessonBuilder({
        lessonId: parseInt(lessonId || '0'),
        autoLoad: !!lessonId // Only auto-load if lessonId is provided in path
    });

    const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
    const [isLessonSettingsOpen, setIsLessonSettingsOpen] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeDragBlock, setActiveDragBlock] = useState<LessonBlock | null>(null);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { }
    });

    // Templates state - persist to localStorage
    const getDefaultTemplates = () => ({
        'basic-video': {
            title: 'Video Lesson',
            layout: 'single',
            content: { main: [{ type: 'video' }, { type: 'text' }] }
        },
        'quiz-practice': {
            title: 'Quiz + Practice',
            layout: 'split',
            content: { left: [{ type: 'text' }], right: [{ type: 'quiz' }, { type: 'practice' }] }
        }
    });

    const [templates, setTemplates] = useState<Record<string, any>>(() => {
        try {
            const saved = localStorage.getItem(`lesson-templates-${courseId}`);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch {
            // Ignore parse errors
        }
        return getDefaultTemplates();
    });

    // Persist templates to localStorage when they change
    useEffect(() => {
        if (courseId) {
            localStorage.setItem(`lesson-templates-${courseId}`, JSON.stringify(templates));
        }
    }, [templates, courseId]);

    // EDITABLE Course Structure State - DEPRECATED, will be removed
    // TODO: Remove this state, use unifiedCourseData.courseData instead
    const [courseData, setCourseData] = useState<{
        id: string;
        title: string;
        sections: Array<{
            id: string;
            title: string;
            lessons: Array<{
                id: string;
                title: string;
                layout: string;
            }>;
        }>;
    } | null>(null);

    // DEPRECATED: Initialize courseData from unified hook instead of separate fetch
    // This is kept temporarily for backward compatibility with old code
    useEffect(() => {
        if (unifiedCourseData.courseData.sections.length > 0) {
            setCourseData({
                id: courseId || '',
                title: unifiedCourseData.courseData.courseInfo.title || 'Course',
                sections: unifiedCourseData.courseData.sections.map(section => ({
                    id: section.id,
                    title: section.title,
                    lessons: section.lessons.map(lesson => ({
                        id: lesson.id,
                        title: lesson.title,
                        layout: lesson.layout
                    }))
                }))
            });
        }
    }, [unifiedCourseData.courseData.sections, unifiedCourseData.courseData.courseInfo, courseId]);

    // CRITICAL FIX: Route → Lesson Synchronization (ONE WAY FLOW)
    // Route param is the SINGLE SOURCE OF TRUTH for active lesson
    // This ensures activeLessonId is ALWAYS driven by route param
    // Fixes: double-click issue, reload issue, focus issue
    useEffect(() => {
        // Wait for unified hook to finish loading
        if (unifiedCourseData.isLoading) {
            console.log('[LessonBuilder] Waiting for unified hook to load...');
            return;
        }

        // If lessonId in route, sync to unified hook (ONE WAY: route → state)
        if (lessonId && unifiedCourseData.courseData.activeLessonId !== lessonId) {
            console.log('[LessonBuilder] Route changed, selecting lesson:', lessonId);

            // Call async selectLesson (this is the ONLY way to change activeLessonId)
            unifiedCourseData.selectLesson(lessonId).then(() => {
                console.log('[LessonBuilder] Lesson selected successfully');
                // Auto-open lesson settings panel when lesson changes
                setIsLessonSettingsOpen(true);
                setSelectedSectionId(null);
                setSelectedBlockId(null);
            }).catch(err => {
                console.error('[LessonBuilder] Failed to select lesson:', err);
            });
        }
    }, [lessonId, unifiedCourseData.isLoading, unifiedCourseData.courseData.activeLessonId, unifiedCourseData.selectLesson]);

    // Debug logging to verify canonical architecture
    useEffect(() => {
        const lessonTitle = unifiedCourseData.courseData.activeLessonId
            ? unifiedCourseData.courseData.sections
                .flatMap(s => s.lessons)
                .find(l => l.id === unifiedCourseData.courseData.activeLessonId)?.title || ''
            : '';

        console.log('[LessonBuilder] State verification:', {
            routeParam: lessonId,
            activeLessonId: unifiedCourseData.courseData.activeLessonId,
            activeLessonContent: unifiedCourseData.activeLessonContent ? 'loaded' : 'null',
            sectionsCount: unifiedCourseData.courseData.sections.length,
            lessonTitle: lessonTitle,
            lessonTitleLength: lessonTitle.length,
            isDirty: unifiedCourseData.isDirty,
            isSaving: unifiedCourseData.isSaving,
            isLoading: unifiedCourseData.isLoading,
        });
    }, [lessonId, unifiedCourseData.courseData.activeLessonId, unifiedCourseData.activeLessonContent, unifiedCourseData.courseData.sections, unifiedCourseData.isDirty, unifiedCourseData.isSaving, unifiedCourseData.isLoading]);

    // Track if focus toast has been shown (prevent duplicate toasts)
    const focusToastShownRef = useRef<string | null>(null);

    // Focus on section or lesson when specified in query params (only for newly created items)
    useEffect(() => {
        // Only show toast if focusSection/focusLesson is in URL (meaning user just created new item)
        // AND we haven't shown toast for this specific focus target yet
        if (focusSection && focusToastShownRef.current !== focusSection) {
            // Focus on section - open section settings
            setSelectedSectionId(focusSection);
            setSelectedLessonId(null);
            setSelectedBlockId(null);
            setIsLessonSettingsOpen(false);
            focusToastShownRef.current = focusSection;
            toast('Đã tạo chương mới. Bạn có thể chỉnh sửa thông tin chương.', {
                icon: '📝',
                duration: 3000
            });
        } else if (focusLesson && courseData && focusToastShownRef.current !== focusLesson) {
            // Validate that focusLesson exists in courseData
            const lessonExists = courseData.sections.some(section =>
                section.lessons.some(lesson => lesson.id === focusLesson)
            );

            if (lessonExists) {
                // Focus on lesson - open lesson settings
                setSelectedLessonId(focusLesson);
                setSelectedSectionId(null);
                setSelectedBlockId(null);
                setIsLessonSettingsOpen(true);
                focusToastShownRef.current = focusLesson;
                toast('Đã tạo bài học mới. Bạn có thể chỉnh sửa nội dung bài học.', {
                    icon: '📝',
                    duration: 3000
                });
            } else {
                // Lesson doesn't exist in courseData yet, just open lesson settings for current lesson
                setSelectedLessonId(lessonId || null);
                setSelectedSectionId(null);
                setSelectedBlockId(null);
                setIsLessonSettingsOpen(true);
            }
        }
    }, [focusSection, focusLesson, courseData, lessonId]);

    // Keyboard Delete Handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isPreviewMode || !selectedBlockId) return;

            // IMPORTANT: Ignore if user is typing in an input, textarea, or contenteditable
            const activeElement = document.activeElement;
            const isEditing =
                activeElement?.tagName === 'INPUT' ||
                activeElement?.tagName === 'TEXTAREA' ||
                activeElement?.getAttribute('contenteditable') === 'true' ||
                activeElement?.closest('[contenteditable="true"]');

            if (isEditing) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                // Prevent backspace from navigating back
                e.preventDefault();

                // Show confirmation modal
                setConfirmModal({
                    isOpen: true,
                    title: 'Xóa Block',
                    message: 'Bạn có chắc muốn xóa block này? Thao tác này không thể hoàn tác.',
                    onConfirm: () => handleBlockDelete(selectedBlockId)
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedBlockId, isPreviewMode]);

    // Hide sidebar when LessonBuilder is active
    useEffect(() => {
        // Hide the menu sidebar by adding a class to body
        document.body.classList.add('lesson-builder-active');

        // Add CSS to hide sidebar
        const style = document.createElement('style');
        style.id = 'lesson-builder-style';
        style.textContent = `
            body.lesson-builder-active .instructor-sidebar {
                display: none !important;
            }
            body.lesson-builder-active .instructor-main-content {
                margin-left: 0 !important;
            }
        `;
        document.head.appendChild(style);

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('lesson-builder-active');
            const styleEl = document.getElementById('lesson-builder-style');
            if (styleEl) styleEl.remove();
        };
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        })
    );

    // Auto-save debounced (60 seconds)
    useEffect(() => {
        if (!hasUnsavedChanges) return;

        const timer = setTimeout(() => {
            handleAutoSave();
        }, 60000); // 60 seconds debounce

        return () => clearTimeout(timer);
    }, [hasUnsavedChanges]);

    const handleAutoSave = async () => {
        if (!hasUnsavedChanges && !unifiedCourseData.isDirty) return;

        setIsSaving(true);
        const toastId = toast.loading('Đang tự động lưu...', { id: 'auto-save' });

        try {
            let savedItems: string[] = [];

            // Save course structure changes (sections, lessons)
            if (unifiedCourseData.isDirty) {
                await unifiedCourseData.handleManualSave();
                savedItems.push('cấu trúc khóa học');
            }

            // Save lesson content changes (blocks, metadata)
            if (hasUnsavedChanges) {
                // Hook methods (updateBlock, addBlock, etc.) already persist via repository
                markAsSaved();
                savedItems.push('nội dung bài học');
            }

            toast.success(
                savedItems.length > 0
                    ? `Đã tự động lưu: ${savedItems.join(', ')}`
                    : 'Đã tự động lưu',
                { id: toastId, duration: 2000, icon: '💾' }
            );
        } catch (err) {
            console.error('Auto-save failed:', err);
            toast.error('Tự động lưu thất bại', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const handleManualSave = async () => {
        // CRITICAL: Save ALL pending changes (course-level, not lesson-level)
        // This includes: sections, lessons, lesson content

        const hasCourseChanges = unifiedCourseData.isDirty;
        const hasLessonContentChanges = hasUnsavedChanges;

        if (!hasCourseChanges && !hasLessonContentChanges) {
            toast('Không có thay đổi nào để lưu', { icon: 'ℹ️' });
            return;
        }

        setIsSaving(true);
        const toastId = toast.loading('Đang lưu...', { id: 'manual-save' });

        try {
            let savedItems: string[] = [];

            // Save course structure changes (sections, lessons)
            if (hasCourseChanges) {
                await unifiedCourseData.handleManualSave();
                savedItems.push('cấu trúc khóa học');
            }

            // Save lesson content changes (blocks, metadata)
            if (hasLessonContentChanges) {
                markAsSaved();
                savedItems.push('nội dung bài học');
            }

            toast.success(
                `Đã lưu ${savedItems.join(', ')} thành công!`,
                { id: toastId, duration: 3000 }
            );
        } catch (err) {
            console.error('Save failed:', err);
            toast.error('Lưu thất bại. Vui lòng thử lại.', { id: toastId, duration: 4000 });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        // Show confirmation modal
        setConfirmModal({
            isOpen: true,
            title: 'Xuất bản bài học',
            message: 'Xuất bản bài học này? Học viên sẽ thấy phiên bản mới.',
            onConfirm: async () => {
                try {
                    await publishDraft();
                    toast.success('Đã xuất bản bài học thành công!');
                } catch (err) {
                    toast.error('Xuất bản thất bại. Vui lòng thử lại.');
                }
            }
        });
    };

    const handlePublishDraft = async () => {
        try {
            await publishDraft();
            toast.success('Đã xuất bản bài học thành công!');
        } catch (err) {
            toast.error('Xuất bản thất bại. Vui lòng thử lại.');
        }
    };

    const handleBack = () => {
        const courseUrl = `/instructor/courses/${courseId}`;
        // CRITICAL: Check BOTH unified hook's dirty state AND lesson content changes
        if (unifiedCourseData.isDirty || hasUnsavedChanges) {
            setConfirmModal({
                isOpen: true,
                title: 'Thay đổi chưa lưu',
                message: 'Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?',
                onConfirm: () => navigate(courseUrl)
            });
            return;
        }
        navigate(courseUrl);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        // Check if dragging from sidebar (new block) or existing block
        if (active.data.current?.fromSidebar) {
            setActiveDragBlock({
                id: 0,
                type: active.data.current.type,
                lesson_version_id: unifiedCourseData.activeLessonContent?.versionId || 0,
                slot_id: '',
                order_index: 0,
                content: {},
                settings: {},
                created_at: new Date(),
                updated_at: new Date()
            } as LessonBlock);
        } else {
            // Find the block being dragged
            const block = unifiedCourseData.activeLessonContent?.blocks.find(b => b.id === active.id);
            if (block) {
                setActiveDragBlock(block);
            }
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDragBlock(null);

        if (!over || !unifiedCourseData.activeLessonContent) return;

        const blocks = unifiedCourseData.activeLessonContent.blocks;
        const isNewBlock = active.data.current?.fromSidebar;
        const activeId = active.id;
        const overId = over.id;

        try {
            if (isNewBlock) {
                // NEW BLOCK from sidebar - add to slot
                const blockType = active.data.current?.type;

                // Determine target slot - over could be a slot ID or a block ID
                let targetSlotId: string;
                const overBlock = blocks.find(b => b.id === overId);

                if (overBlock) {
                    // Dropped over an existing block - use its slot
                    targetSlotId = overBlock.slot_id;
                } else {
                    // Dropped over a slot directly
                    targetSlotId = overId as string;
                }

                const currentSlotBlocks = blocks.filter(b => b.slot_id === targetSlotId);
                await addBlock(targetSlotId, blockType, currentSlotBlocks.length);

                // CRITICAL: Reload lesson content to show new block (force refresh bypasses cache)
                if (lessonId) {
                    await unifiedCourseData.selectLesson(lessonId, true);
                }

                toast.success('Đã thêm block');
                markAsChanged();
            } else {
                // EXISTING BLOCK - reorder or move
                const blockId = activeId as number;
                const sourceBlock = blocks.find(b => b.id === blockId);

                if (!sourceBlock) return;

                // Check if dropped on another block (for reordering)
                const overBlock = blocks.find(b => b.id === overId);

                if (overBlock) {
                    // Reordering within slot or moving between slots
                    if (sourceBlock.slot_id === overBlock.slot_id) {
                        // REORDER within same slot
                        const slotBlocks = blocks
                            .filter(b => b.slot_id === sourceBlock.slot_id)
                            .sort((a, b) => a.order_index - b.order_index);

                        const oldIndex = slotBlocks.findIndex(b => b.id === blockId);
                        const newIndex = slotBlocks.findIndex(b => b.id === overId);

                        if (oldIndex !== newIndex) {
                            // Update order for all blocks in slot
                            const newOrder = arrayMove(slotBlocks, oldIndex, newIndex);
                            for (let i = 0; i < newOrder.length; i++) {
                                if (newOrder[i].order_index !== i) {
                                    await updateBlock(newOrder[i].id, { order_index: i });
                                }
                            }

                            // Reload lesson content (force refresh bypasses cache)
                            if (lessonId) {
                                await unifiedCourseData.selectLesson(lessonId, true);
                            }

                            markAsChanged();
                            toast.success('Đã sắp xếp lại block');
                        }
                    } else {
                        // Move to different slot at specific position
                        await moveBlock(blockId, overBlock.slot_id, overBlock.order_index);

                        // Reload lesson content (force refresh bypasses cache)
                        if (lessonId) {
                            await unifiedCourseData.selectLesson(lessonId, true);
                        }

                        markAsChanged();
                    }
                } else {
                    // Dropped on a slot (not on a block)
                    const targetSlotId = overId as string;
                    if (sourceBlock.slot_id !== targetSlotId) {
                        const targetSlotBlocks = blocks.filter(b => b.slot_id === targetSlotId);
                        await moveBlock(blockId, targetSlotId, targetSlotBlocks.length);

                        // Reload lesson content (force refresh bypasses cache)
                        if (lessonId) {
                            await unifiedCourseData.selectLesson(lessonId, true);
                        }

                        markAsChanged();
                    }
                }
            }
        } catch (err) {
            console.error('Drag end error:', err);
            toast.error('Cập nhật block thất bại');
        }
    };

    const handleBlockUpdate = async (blockId: number, updates: Partial<LessonBlock>) => {
        try {
            await updateBlock(blockId, updates);

            // Reload lesson content to show updated block (force refresh bypasses cache)
            if (lessonId) {
                await unifiedCourseData.selectLesson(lessonId, true);
            }

            markAsChanged();
        } catch (err) {
            toast.error('Cập nhật block thất bại');
        }
    };

    const handleBlockDelete = async (blockId: number) => {
        // Note: Modal handled by keyboard handler or direct call with modal already shown
        // Remove the window.confirm check since modal handles it
        try {
            await deleteBlock(blockId);

            // Reload lesson content to remove deleted block (force refresh bypasses cache)
            if (lessonId) {
                await unifiedCourseData.selectLesson(lessonId, true);
            }

            if (selectedBlockId === blockId) {
                setSelectedBlockId(null);
            }
            markAsChanged();
        } catch (err) {
            toast.error('Xóa block thất bại');
        }
    };

    // Loading state - use unified hook's loading state
    if (unifiedCourseData.isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-100">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Đang tải khóa học...</p>
                </div>
            </div>
        );
    }

    // Error state - use unified hook's error state
    if (unifiedCourseData.error) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-100">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Không thể tải khóa học</h2>
                    <p className="text-slate-600 mb-6">{unifiedCourseData.error || 'Không tìm thấy khóa học'}</p>
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-slate-100">
            {/* Custom Header - NO MenuSidebar */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-50">
                <div className="flex items-center gap-4">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Quay lại khóa học</span>
                    </button>

                    {/* Course Title */}
                    <div className="border-l border-slate-300 pl-4">
                        <h1 className="text-lg font-bold text-slate-800">
                            {unifiedCourseData.courseData.courseInfo.title || 'Course'}
                        </h1>
                        <p className="text-xs text-slate-500">
                            Lesson Builder • {
                                unifiedCourseData.courseData.activeLessonId
                                    ? (() => {
                                        const title = unifiedCourseData.courseData.sections
                                            .flatMap(s => s.lessons)
                                            .find(l => l.id === unifiedCourseData.courseData.activeLessonId)?.title || '';
                                        return title || '(Untitled)';
                                    })()
                                    : '(No lesson selected)'
                            }
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
                        {(unifiedCourseData.isSaving || isSaving) ? (
                            <>
                                <Loader2 size={12} className="animate-spin" />
                                <span>Đang lưu...</span>
                            </>
                        ) : (unifiedCourseData.isDirty || hasUnsavedChanges) ? (
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
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
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
                                    onClick={handleManualSave}
                                    disabled={unifiedCourseData.isSaving || isSaving}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 disabled:opacity-50 transition-colors"
                                >
                                    <Save size={16} />
                                    Lưu nháp
                                </button>

                                <button
                                    onClick={handlePublish}
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

            {/* Main Editor */}
            <div className="flex-1 flex overflow-hidden">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {/* MenuSidebar (Left) - Icon Rail + Panels */}
                    {!isPreviewMode && (
                        <MenuSidebar
                            courseData={{
                                id: unifiedCourseData.courseData.courseInfo.id?.toString() || courseId || '0',
                                title: unifiedCourseData.courseData.courseInfo.title || 'Course',
                                sections: unifiedCourseData.courseData.sections
                            }}
                            activeLessonId={unifiedCourseData.courseData.activeLessonId || ''}
                            currentLayoutType={unifiedCourseData.activeLessonContent?.layoutType || 'single'}
                            templates={templates}
                            onSelectLesson={(id) => {
                                // CRITICAL: Always navigate (route drives selection, no conditional logic)
                                // ONE WAY FLOW: UI click → route change → state update
                                console.log('[LessonBuilder] MenuSidebar: navigating to lesson', id);
                                navigate(`/instructor/courses/${courseId}/lesson-builder/${id}`);
                            }}
                            onSelectSection={(id) => {
                                // Focus on section - open section settings
                                setSelectedSectionId(id);
                                setSelectedBlockId(null);
                                setIsLessonSettingsOpen(false);
                            }}
                            onAddSection={async () => {
                                // CRITICAL: Use unified hook for CRUD operations
                                // NO direct API calls, NO refetchSections
                                unifiedCourseData.addSection();
                            }}
                            onAddLesson={async (sectionId) => {
                                // CRITICAL: Use unified hook for CRUD operations
                                // NO direct API calls, NO refetchSections
                                const newLessonId = await unifiedCourseData.addLesson(sectionId);

                                // Navigate to new lesson and open settings panel
                                if (newLessonId) {
                                    navigate(`/instructor/courses/${courseId}/lesson-builder/${newLessonId}`);
                                    // Settings panel will auto-open when lesson is selected
                                }
                            }}
                            onUpdateLesson={async (updates) => {
                                // Update layout type if changed
                                const currentLayout = unifiedCourseData.activeLessonContent?.layoutType || 'single';
                                if (updates.layout && updates.layout !== currentLayout) {
                                    try {
                                        await updateLayout(updates.layout);

                                        // Reload lesson content to show new layout (force refresh bypasses cache)
                                        if (lessonId) {
                                            await unifiedCourseData.selectLesson(lessonId, true);
                                        }

                                        toast.success(`Đã đổi layout thành "${updates.layout}"`);
                                    } catch (err) {
                                        console.error('Failed to change layout:', err);
                                        toast.error('Đổi layout thất bại');
                                    }
                                }
                            }}
                            onApplyTemplate={(templateKey) => {
                                // Get template data
                                const template = templates[templateKey];
                                if (!template || !unifiedCourseData.activeLessonContent) return;

                                // Show confirmation warning about data loss
                                setConfirmModal({
                                    isOpen: true,
                                    title: 'Áp dụng Template?',
                                    message: `Thao tác này sẽ thay thế TOÀN BỘ nội dung hiện tại bằng template "${template.title || templateKey}". Tất cả blocks và cài đặt sẽ bị xóa vĩnh viễn. Không thể hoàn tác.`,
                                    onConfirm: async () => {
                                        try {
                                            // Delete all existing blocks first
                                            for (const block of unifiedCourseData.activeLessonContent!.blocks) {
                                                await deleteBlock(block.id);
                                            }

                                            // Change layout if different
                                            const currentLayout = unifiedCourseData.activeLessonContent?.layoutType || 'single';
                                            if (template.layout && template.layout !== currentLayout) {
                                                await updateLayout(template.layout);
                                            }

                                            // Apply template content - add blocks for each slot
                                            const templateContent = template.content || {};
                                            for (const [slotId, blocks] of Object.entries(templateContent)) {
                                                const slotBlocks = blocks as any[];
                                                for (let i = 0; i < slotBlocks.length; i++) {
                                                    const blockData = slotBlocks[i];
                                                    await addBlock(slotId, blockData.type, i);
                                                }
                                            }

                                            // Reload lesson content to show template (force refresh bypasses cache)
                                            if (lessonId) {
                                                await unifiedCourseData.selectLesson(lessonId, true);
                                            }

                                            markAsChanged();
                                            toast.success(`Đã áp dụng template "${template.title || templateKey}" thành công!`);
                                        } catch (err) {
                                            console.error('Failed to apply template:', err);
                                            toast.error('Áp dụng template thất bại');
                                        }
                                    }
                                });
                            }}
                            onCreateTemplate={(name) => {
                                // Create template from current lesson
                                if (!unifiedCourseData.activeLessonContent) {
                                    toast.error('Không có nội dung bài học để lưu template');
                                    return;
                                }

                                const templateKey = `template-${Date.now()}`;

                                // Group blocks by slot
                                const content: Record<string, any[]> = {};
                                for (const block of unifiedCourseData.activeLessonContent.blocks) {
                                    if (!content[block.slot_id]) {
                                        content[block.slot_id] = [];
                                    }
                                    content[block.slot_id].push({
                                        type: block.type,
                                        content: block.content,
                                        settings: block.settings
                                    });
                                }

                                // Add to templates state
                                setTemplates(prev => ({
                                    ...prev,
                                    [templateKey]: {
                                        title: name,
                                        layout: unifiedCourseData.activeLessonContent!.layoutType,
                                        content
                                    }
                                }));

                                toast.success(`Đã lưu template "${name}" thành công!`);
                            }}
                            onDeleteTemplate={(key) => {
                                // Remove from templates
                                setTemplates(prev => {
                                    const newTemplates = { ...prev };
                                    delete newTemplates[key];
                                    return newTemplates;
                                });
                                toast.success(`Đã xóa template`);
                            }}
                            onAIGenerate={(scope, prompt, files) => {
                                toast(`AI Generate ${scope}: ${prompt} (${files.length} files)`);
                                // TODO: AI generation
                            }}
                        />
                    )}

                    {/* Canvas (Center) */}
                    <div className="flex-1 overflow-y-auto">
                        <SlotBasedCanvas
                            lessonVersion={unifiedCourseData.activeLessonContent ? {
                                id: unifiedCourseData.activeLessonContent.versionId,
                                layout_type: unifiedCourseData.activeLessonContent.layoutType,
                                metadata: unifiedCourseData.activeLessonContent.metadata,
                            } as any : undefined}
                            layout={unifiedCourseData.activeLessonContent ? getLayoutFromType(unifiedCourseData.activeLessonContent.layoutType) : null}
                            blocks={unifiedCourseData.activeLessonContent?.blocks || []}
                            selectedBlockId={selectedBlockId}
                            onSelectBlock={(id) => {
                                setSelectedBlockId(id);
                                setSelectedSectionId(null); // Clear section selection
                                setSelectedLessonId(null);  // Clear lesson selection
                                setIsLessonSettingsOpen(false);
                            }}
                            onSelectLesson={() => {
                                setSelectedBlockId(null); // Deselect block
                                setIsLessonSettingsOpen(true); // Open lesson settings
                            }}
                            onUpdateBlock={handleBlockUpdate}
                            onDeleteBlock={handleBlockDelete}
                            isPreviewMode={isPreviewMode}
                        />
                    </div>

                    {/* Property Panel (Right) */}
                    {!isPreviewMode && (selectedBlockId || isLessonSettingsOpen || selectedSectionId) && (
                        <div className="w-80 flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto">
                            {/* Section Settings */}
                            {selectedSectionId ? (
                                <SectionSettingsPanel
                                    section={{
                                        id: selectedSectionId,
                                        title: courseData?.sections.find((s: any) => s.id === selectedSectionId)?.title || 'Section',
                                        lessons: courseData?.sections.find((s: any) => s.id === selectedSectionId)?.lessons || []
                                    }}
                                    onUpdate={async (updates) => {
                                        // CRITICAL: Use unified hook for updates
                                        // NO direct API calls, NO refetchSections
                                        if (selectedSectionId) {
                                            unifiedCourseData.updateSection(selectedSectionId, updates);
                                        }
                                    }}
                                    onDelete={() => {
                                        setConfirmModal({
                                            isOpen: true,
                                            title: 'Xóa chương',
                                            message: 'Xóa chương này sẽ xóa toàn bộ bài học bên trong. Bạn có chắc chắn không?',
                                            onConfirm: async () => {
                                                // CRITICAL: Use unified hook for delete
                                                // NO direct API calls, NO refetchSections
                                                if (selectedSectionId) {
                                                    unifiedCourseData.deleteSection(selectedSectionId);
                                                    setSelectedSectionId(null);
                                                }
                                            }
                                        });
                                    }}
                                    onClose={() => setSelectedSectionId(null)}
                                />
                            ) : isLessonSettingsOpen && unifiedCourseData.activeLessonContent ? (
                                <LessonSettingsPanel
                                    lessonVersion={{
                                        id: unifiedCourseData.activeLessonContent.versionId,
                                        layout_type: unifiedCourseData.activeLessonContent.layoutType,
                                        metadata: unifiedCourseData.activeLessonContent.metadata || {},
                                    } as any}
                                    lessonTitle={
                                        unifiedCourseData.courseData.activeLessonId
                                            ? unifiedCourseData.courseData.sections
                                                .flatMap(s => s.lessons)
                                                .find(l => l.id === unifiedCourseData.courseData.activeLessonId)?.title || ''
                                            : ''
                                    }
                                    lessonDescription={
                                        unifiedCourseData.courseData.activeLessonId
                                            ? unifiedCourseData.courseData.sections
                                                .flatMap(s => s.lessons)
                                                .find(l => l.id === unifiedCourseData.courseData.activeLessonId)?.description || ''
                                            : ''
                                    }
                                    onUpdate={async (metadata: any) => {
                                        try {
                                            await updateMetadata(metadata);
                                            markAsChanged();
                                        } catch (err) {
                                            toast.error('Failed to update lesson settings');
                                        }
                                    }}
                                    onUpdateTitle={async (newTitle) => {
                                        // CRITICAL: Update lesson title via unified hook
                                        // NO normalization - empty string is valid
                                        if (unifiedCourseData.courseData.activeLessonId) {
                                            try {
                                                console.log('[LessonBuilder] Updating lesson title:', {
                                                    lessonId: unifiedCourseData.courseData.activeLessonId,
                                                    newTitle,
                                                    titleLength: newTitle.length
                                                });

                                                await unifiedCourseData.updateLesson(
                                                    unifiedCourseData.courseData.activeLessonId,
                                                    { title: newTitle }
                                                );

                                                console.log('[LessonBuilder] Lesson title updated successfully');
                                            } catch (err) {
                                                console.error('[LessonBuilder] Failed to update lesson title:', err);
                                                toast.error('Failed to update lesson title');
                                            }
                                        }
                                    }}
                                    onUpdateDescription={async (newDescription) => {
                                        // CRITICAL: Update lesson description via unified hook
                                        if (unifiedCourseData.courseData.activeLessonId) {
                                            try {
                                                console.log('[LessonBuilder] Updating lesson description:', {
                                                    lessonId: unifiedCourseData.courseData.activeLessonId,
                                                    newDescription,
                                                    descriptionLength: newDescription.length
                                                });

                                                await unifiedCourseData.updateLesson(
                                                    unifiedCourseData.courseData.activeLessonId,
                                                    { description: newDescription }
                                                );

                                                console.log('[LessonBuilder] Lesson description updated successfully');
                                            } catch (err) {
                                                console.error('[LessonBuilder] Failed to update lesson description:', err);
                                                toast.error('Failed to update lesson description');
                                            }
                                        }
                                    }}
                                    onDelete={() => {
                                        setConfirmModal({
                                            isOpen: true,
                                            title: 'Xóa bài học',
                                            message: 'Bạn có chắc chắn muốn xóa bài học này? Tất cả nội dung sẽ bị xóa.',
                                            onConfirm: () => {
                                                // CRITICAL: Use unified hook for delete
                                                if (unifiedCourseData.courseData.activeLessonId) {
                                                    const lessonId = unifiedCourseData.courseData.activeLessonId;
                                                    unifiedCourseData.deleteLesson(lessonId);
                                                    setIsLessonSettingsOpen(false);
                                                    // Don't navigate - just close panel and let user save
                                                    // Navigate back to first lesson or course overview
                                                    const firstLesson = unifiedCourseData.courseData.sections
                                                        .flatMap(s => s.lessons)
                                                        .find(l => l.id !== lessonId);

                                                    if (firstLesson) {
                                                        navigate(`/instructor/courses/${courseId}/lesson-builder/${firstLesson.id}`);
                                                    } else {
                                                        // No lessons left, go back to course page
                                                        navigate(`/instructor/courses/${courseId}`);
                                                    }
                                                }
                                            }
                                        });
                                    }}
                                    onClose={() => {
                                        setIsLessonSettingsOpen(false);
                                        setSelectedLessonId(null);
                                    }}
                                />
                            ) : selectedBlockId ? (
                                <PropertyPanel
                                    block={
                                        unifiedCourseData.activeLessonContent?.blocks.find(b => b.id === selectedBlockId) || null
                                    }
                                    onUpdate={(updates) => {
                                        if (selectedBlockId) {
                                            handleBlockUpdate(selectedBlockId, updates);
                                        }
                                    }}
                                    onClose={() => setSelectedBlockId(null)}
                                />
                            ) : null}
                        </div>
                    )}
                </DndContext>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                variant="danger"
            />
        </div>
    );
}
