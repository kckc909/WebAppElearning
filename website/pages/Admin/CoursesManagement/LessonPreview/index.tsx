import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Play, FileText, Video, Code, Image as ImageIcon,
    ChevronLeft, ChevronRight, Monitor, Type, HelpCircle, Minus,
    List, Layers, CheckCircle, AlertCircle, Loader2, BookOpen
} from 'lucide-react';
import axiosInstance from '../../../../API/api';
import { admin_routes } from '../../../page_routes';

const AdminLessonPreview: React.FC = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [lessonContent, setLessonContent] = useState<any>(null);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [loadingLesson, setLoadingLesson] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Load course and sections
    useEffect(() => {
        const loadCourseData = async () => {
            if (!courseId) return;
            setLoadingCourse(true);
            try {
                // Load course
                const courseRes = await axiosInstance.get(`/courses/${courseId}`);
                if (courseRes.data?.success) {
                    setCourse(courseRes.data.data);
                }

                // Load sections with lessons
                const sectionsRes = await axiosInstance.get(`/sections?course_id=${courseId}`);
                if (sectionsRes.data?.success) {
                    setSections(sectionsRes.data.data || []);
                }
            } catch (error) {
                console.error('Failed to load course:', error);
            } finally {
                setLoadingCourse(false);
            }
        };
        loadCourseData();
    }, [courseId]);

    // Load lesson content
    useEffect(() => {
        const loadLesson = async () => {
            if (!lessonId) return;
            setLoadingLesson(true);
            try {
                const response = await axiosInstance.get(`/lessons/${lessonId}`);
                if (response.data?.success && response.data?.data) {
                    const lessonData = response.data.data;
                    setSelectedLesson(lessonData);

                    const version = lessonData.lesson_versions?.[0];
                    if (version) {
                        setLessonContent({
                            layout_type: version.layout_type,
                            blocks: version.lesson_blocks || [],
                            status: version.status,
                            version: version.version
                        });
                    } else {
                        setLessonContent({ layout_type: 'single', blocks: [] });
                    }
                }
            } catch (error) {
                console.error('Failed to load lesson:', error);
                setLessonContent(null);
            } finally {
                setLoadingLesson(false);
            }
        };
        loadLesson();
    }, [lessonId]);

    // Get all lessons for navigation
    const allLessons = useMemo(() => {
        const lessons: any[] = [];
        sections.forEach(section => {
            section.course_lessons?.forEach((lesson: any) => {
                lessons.push({ ...lesson, sectionTitle: section.title });
            });
        });
        return lessons;
    }, [sections]);

    const currentLessonIndex = useMemo(() => {
        if (!lessonId) return -1;
        return allLessons.findIndex(l => l.id === Number(lessonId));
    }, [lessonId, allLessons]);

    const goToPreviousLesson = () => {
        if (currentLessonIndex > 0) {
            const prevLesson = allLessons[currentLessonIndex - 1];
            navigate(`/admin/${admin_routes.lesson_preview(courseId!, prevLesson.id)}`);
        }
    };

    const goToNextLesson = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentLessonIndex + 1];
            navigate(`/admin/${admin_routes.lesson_preview(courseId!, nextLesson.id)}`);
        }
    };

    const getBlockIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'video': return <Video className="w-5 h-5 text-red-500" />;
            case 'code':
            case 'ide': return <Code className="w-5 h-5 text-emerald-500" />;
            case 'image': return <ImageIcon className="w-5 h-5 text-purple-500" />;
            case 'text': return <Type className="w-5 h-5 text-blue-500" />;
            case 'quiz': return <HelpCircle className="w-5 h-5 text-amber-500" />;
            case 'heading': return <Type className="w-5 h-5 text-slate-700" />;
            case 'divider': return <Minus className="w-5 h-5 text-slate-400" />;
            default: return <Layers className="w-5 h-5 text-slate-500" />;
        }
    };

    const getBlockTypeName = (type: string) => {
        const names: Record<string, string> = {
            'video': 'Video',
            'code': 'Code Editor',
            'ide': 'IDE',
            'image': 'Hình ảnh',
            'text': 'Văn bản',
            'quiz': 'Câu hỏi',
            'heading': 'Tiêu đề',
            'divider': 'Đường kẻ'
        };
        return names[type?.toLowerCase()] || type || 'Block';
    };

    if (loadingCourse) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-600">Đang tải khóa học...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 lg:px-6 py-3 flex items-center justify-between shadow-lg z-10">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/admin/${admin_routes.course_detail(courseId!)}`}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </Link>
                    <div className="text-white">
                        <h1 className="font-bold text-lg truncate max-w-[200px] lg:max-w-md">
                            {selectedLesson?.title || 'Đang tải...'}
                        </h1>
                        <p className="text-sm text-white/80 truncate max-w-[200px] lg:max-w-md">
                            {course?.title}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2 lg:gap-3">
                    <span className="text-white/80 text-sm hidden sm:block">
                        {allLessons.length > 0 ? `${currentLessonIndex + 1} / ${allLessons.length}` : ''}
                    </span>
                    <button
                        onClick={goToPreviousLesson}
                        disabled={currentLessonIndex <= 0}
                        className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Trước</span>
                    </button>
                    <button
                        onClick={goToNextLesson}
                        disabled={currentLessonIndex >= allLessons.length - 1}
                        className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors"
                    >
                        <span className="hidden sm:inline">Tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Lesson List */}
                <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-slate-800 border-r border-slate-700 overflow-y-auto transition-all duration-300 hidden lg:block`}>
                    <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
                        <div className="flex items-center gap-2 text-slate-300">
                            <List className="w-4 h-4" />
                            <span className="font-medium">Nội dung khóa học</span>
                        </div>
                    </div>

                    <div className="p-2">
                        {sections.map((section, sIndex) => (
                            <div key={section.id} className="mb-3">
                                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Chương {sIndex + 1}: {section.title}
                                </div>
                                <div className="space-y-1">
                                    {section.course_lessons?.map((lesson: any, lIndex: number) => (
                                        <Link
                                            key={lesson.id}
                                            to={`/admin/${admin_routes.lesson_preview(courseId!, lesson.id)}`}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${Number(lessonId) === lesson.id
                                                    ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-indigo-500/50'
                                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${Number(lessonId) === lesson.id
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-slate-700 text-slate-400'
                                                }`}>
                                                {lIndex + 1}
                                            </div>
                                            <span className="flex-1 text-sm truncate">{lesson.title}</span>
                                            {Number(lessonId) === lesson.id && (
                                                <Play className="w-4 h-4 text-indigo-400" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-slate-100">
                    {loadingLesson ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-600 font-medium">Đang tải nội dung bài học...</p>
                            </div>
                        </div>
                    ) : lessonContent ? (
                        <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
                            {/* Lesson Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <Monitor className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-slate-800 text-lg">{selectedLesson?.title}</h2>
                                            <p className="text-sm text-slate-500">
                                                Layout: {lessonContent.layout_type || 'Default'} • {lessonContent.blocks?.length || 0} blocks
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {lessonContent.blocks?.slice(0, 4).map((block: any, i: number) => (
                                            <div key={i} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center" title={getBlockTypeName(block.type)}>
                                                {getBlockIcon(block.type)}
                                            </div>
                                        ))}
                                        {(lessonContent.blocks?.length || 0) > 4 && (
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-medium text-slate-500">
                                                +{lessonContent.blocks.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Render Blocks */}
                            {lessonContent.blocks && lessonContent.blocks.length > 0 ? (
                                <div className="space-y-4">
                                    {lessonContent.blocks.map((block: any, index: number) => (
                                        <div key={block.id || index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                            {/* Block Header */}
                                            <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-100">
                                                <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
                                                    {getBlockIcon(block.type)}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-700">{getBlockTypeName(block.type)}</span>
                                                    {block.content?.title && (
                                                        <span className="text-slate-400 ml-2">• {block.content.title}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Block Content */}
                                            <div className="p-5">
                                                {/* Video Block */}
                                                {block.type === 'video' && block.content?.url && (
                                                    <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
                                                        {block.content.url.includes('youtube') || block.content.url.includes('youtu.be') ? (
                                                            <iframe
                                                                src={block.content.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                                className="w-full h-full"
                                                                allowFullScreen
                                                                title={block.content.title || 'Video'}
                                                            />
                                                        ) : (
                                                            <video src={block.content.url} controls className="w-full h-full" />
                                                        )}
                                                    </div>
                                                )}

                                                {/* Text Block */}
                                                {block.type === 'text' && (
                                                    <div
                                                        className="prose prose-slate max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: block.content?.html || block.content?.text || '<p class="text-slate-400 italic">Không có nội dung</p>'
                                                        }}
                                                    />
                                                )}

                                                {/* Code/IDE Block */}
                                                {(block.type === 'code' || block.type === 'ide') && (
                                                    <div className="rounded-xl overflow-hidden">
                                                        {block.content?.language && (
                                                            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                                                                <div className="flex gap-1.5">
                                                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                                                </div>
                                                                <span className="text-sm text-slate-400 ml-2">{block.content.language}</span>
                                                            </div>
                                                        )}
                                                        <div className="bg-slate-900 p-5 overflow-x-auto">
                                                            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
                                                                {block.content?.code || block.content?.text || '// No code content'}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Image Block */}
                                                {block.type === 'image' && block.content?.url && (
                                                    <div className="text-center">
                                                        <img
                                                            src={block.content.url}
                                                            alt={block.content.alt || block.content.title || 'Image'}
                                                            className="max-w-full max-h-[500px] mx-auto rounded-xl shadow-lg object-contain"
                                                        />
                                                        {block.content.caption && (
                                                            <p className="text-sm text-slate-500 mt-3 italic">{block.content.caption}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Quiz Block */}
                                                {block.type === 'quiz' && (
                                                    <div className="space-y-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <HelpCircle className="w-5 h-5 text-amber-600" />
                                                            </div>
                                                            <p className="text-lg font-medium text-slate-800 pt-1">{block.content?.question || 'Quiz question'}</p>
                                                        </div>
                                                        {block.content?.options && (
                                                            <div className="space-y-2 pl-11">
                                                                {block.content.options.map((opt: any, i: number) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`p-4 rounded-xl border-2 transition-all ${opt.isCorrect
                                                                                ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                                                                                : 'bg-slate-50 border-slate-200'
                                                                            }`}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${opt.isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                                                                                }`}>
                                                                                {String.fromCharCode(65 + i)}
                                                                            </div>
                                                                            <span className="text-slate-700 flex-1">{opt.text || opt}</span>
                                                                            {opt.isCorrect && (
                                                                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Heading Block */}
                                                {block.type === 'heading' && (
                                                    <h2 className="text-2xl font-bold text-slate-800">
                                                        {block.content?.text || block.content?.title || 'Heading'}
                                                    </h2>
                                                )}

                                                {/* Divider Block */}
                                                {block.type === 'divider' && (
                                                    <hr className="border-slate-200" />
                                                )}

                                                {/* Fallback */}
                                                {!['video', 'text', 'code', 'ide', 'image', 'quiz', 'heading', 'divider'].includes(block.type?.toLowerCase()) && (
                                                    <div className="bg-slate-50 rounded-xl p-4">
                                                        <div className="flex items-center gap-2 mb-3 text-slate-600">
                                                            {getBlockIcon(block.type)}
                                                            <span className="font-medium">{getBlockTypeName(block.type)}</span>
                                                        </div>
                                                        {block.content && (
                                                            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg overflow-x-auto border">
                                                                {JSON.stringify(block.content, null, 2)}
                                                            </pre>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <FileText className="w-10 h-10 text-slate-400" />
                                        </div>
                                        <p className="text-slate-600 font-medium text-lg">Bài học chưa có nội dung</p>
                                        <p className="text-slate-400 text-sm mt-1">Giảng viên chưa thêm content blocks</p>
                                    </div>
                                </div>
                            )}

                            {/* Bottom Navigation */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                                <button
                                    onClick={goToPreviousLesson}
                                    disabled={currentLessonIndex <= 0}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-slate-700 font-medium transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Bài trước
                                </button>
                                <span className="text-sm text-slate-500">
                                    Bài {currentLessonIndex + 1} / {allLessons.length}
                                </span>
                                <button
                                    onClick={goToNextLesson}
                                    disabled={currentLessonIndex >= allLessons.length - 1}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all shadow-lg shadow-indigo-500/25"
                                >
                                    Bài tiếp theo
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-10 h-10 text-red-400" />
                                </div>
                                <p className="text-slate-600 font-medium text-lg">Không thể tải nội dung</p>
                                <p className="text-slate-400 text-sm mt-1 mb-4">Có lỗi xảy ra khi tải bài học</p>
                                <Link
                                    to={`/admin/${admin_routes.course_detail(courseId!)}`}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại khóa học
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminLessonPreview;
