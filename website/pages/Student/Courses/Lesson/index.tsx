import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    BookOpen,
    MessageSquare,
    Star,
    List,
    ChevronLeft,
    ChevronRight,
    X,
    Menu,
    Loader2,
    AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { student_routes } from '../../../page_routes';
import ContentTab from './Tabs/ContentTab';
import CurriculumTab from './Tabs/CurriculumTab';
import ReviewsTab from './Tabs/ReviewsTab';
import DiscussionsTab from './Tabs/DiscussionsTab';
import CertificateDialog from '../../../../components/CertificateDialog';
import { useCourseSections, useCourse, useCourseReviews } from '../../../../hooks/useApi';
import { useLessonContent } from '../../../../hooks/useLessonContent';
import { useCourseQA } from '../../../../hooks/useCourseQA';
import { ErrorState, LoadingState } from '../../../../components/DataStates';

type Tab = 'content' | 'curriculum' | 'reviews' | 'discussions';

interface TabConfig {
    id: Tab;
    label: string;
    icon: React.ReactNode;
}

interface FlatLesson {
    id: number;
    title: string;
    duration: number;
    isCompleted: boolean;
    isLocked: boolean;
    sectionId: number;
    sectionTitle: string;
    orderIndex: number;
    globalIndex: number;
}

const LessonPage: React.FC = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('content');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMarkingComplete, setIsMarkingComplete] = useState(false);
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [showCertificateDialog, setShowCertificateDialog] = useState(false);
    const [earnedCertificate, setEarnedCertificate] = useState<any>(null);

    // Authorization states
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [accessDeniedReason, setAccessDeniedReason] = useState<string>('');
    const [isTrialAccess, setIsTrialAccess] = useState(false);

    // Fetch real data using hooks
    const { data: sectionsData, loading: sectionsLoading, error: sectionsError } = useCourseSections(parseInt(courseId || '0'));
    const { data: courseData, loading: courseLoading } = useCourse(parseInt(courseId || '0'));
    const { data: reviewsData, loading: reviewsLoading } = useCourseReviews(parseInt(courseId || '0'));

    // Get discussions from useCourseQA hook
    const { data: qaData, isLoading: qaLoading } = useCourseQA(parseInt(courseId || '0'), lessonId ? parseInt(lessonId) : undefined);

    // Fetch actual lesson content with blocks
    const { data: lessonContentData, isLoading: lessonContentLoading } = useLessonContent(parseInt(lessonId || '0'));

    // Find current lesson from sections
    const currentLesson = useMemo(() => {
        if (!sectionsData || !lessonId) return null;

        for (const section of sectionsData) {
            // Backend có thể trả về lessons hoặc course_lessons
            const lessons = section.lessons || section.course_lessons || [];
            const lesson = lessons.find((l: any) => l.id === parseInt(lessonId));
            if (lesson) {
                return {
                    ...lesson,
                    section_id: section.id,
                    section_title: section.title
                };
            }
        }
        return null;
    }, [sectionsData, lessonId]);

    // Check access authorization
    React.useEffect(() => {
        const checkAccess = async () => {
            if (!courseData || !currentLesson) {
                return; // Wait for data to load
            }

            setIsCheckingAccess(true);

            // 1. Check if user is logged in
            const accountData = sessionStorage.getItem('Account');
            const account = accountData ? JSON.parse(accountData) : null;

            // 2. If logged in, check enrollment
            if (account) {
                try {
                    const API_BASE_URL = (import.meta as any).env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

                    const enrollmentResponse = await fetch(
                        `${API_BASE_URL}/enrollments/check?course_id=${courseId}&user_id=${account.id}`,
                        {
                            headers: {
                                'x-user-id': account.id.toString()
                            }
                        }
                    );

                    if (enrollmentResponse.ok) {
                        const enrollmentData = await enrollmentResponse.json();

                        if (enrollmentData.is_enrolled) {
                            // User is enrolled - full access
                            setHasAccess(true);
                            setIsTrialAccess(false);
                            setIsCheckingAccess(false);
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Error checking enrollment:', error);
                }
            }

            // 3. Check for preview access (works for both logged in and guest users)
            // Course must allow_preview AND lesson must be is_preview
            if (courseData.allow_preview && currentLesson.is_preview) {
                // Allow preview access
                setHasAccess(true);
                setIsTrialAccess(true);
                setAccessDeniedReason('');
                setIsCheckingAccess(false);
                return;
            }

            // 4. Access denied - need login or enrollment
            setHasAccess(false);
            setAccessDeniedReason(account ? 'enrollment_required' : 'login_required');
            setIsCheckingAccess(false);
        };

        checkAccess();
    }, [courseData, currentLesson, courseId]);

    // Fallback content if no blocks
    const fallbackContent = currentLesson ? `
# ${currentLesson.title}

## Nội dung bài học

Đây là nội dung của bài học **${currentLesson.title}** trong khóa học ${courseData?.title || ''}.

### Mục tiêu học tập

1. Hiểu được khái niệm cơ bản
2. Áp dụng vào thực tế
3. Thực hành với các ví dụ

---

**Lưu ý**: Nội dung chi tiết sẽ được cập nhật từ hệ thống quản lý nội dung.
    ` : '';

    // Format discussions from API data
    const discussions = useMemo(() => {
        if (!qaData) return [];
        return (qaData || []).map((d: any) => ({
            id: d.id,
            user: d.author_name || d.asked_by || 'Anonymous',
            avatar: d.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.id}`,
            question: d.question || d.title,
            time: d.created_at,
            replies: d.answers_count || 0
        }));
    }, [qaData]);

    // Create flat list of all lessons for navigation
    const flatLessons = useMemo((): FlatLesson[] => {
        if (!sectionsData) return [];

        let globalIndex = 0;
        const lessons: FlatLesson[] = [];

        for (const section of sectionsData) {
            // Backend có thể trả về lessons hoặc course_lessons
            const sectionLessons = section.lessons || section.course_lessons || [];

            for (const lesson of sectionLessons) {
                // Check if lesson is completed (from API or local state)
                const isLessonCompleted = lesson.isCompleted || completedLessons.has(lesson.id);

                // First lesson is always unlocked, others are locked if previous is not completed
                const previousLessons = lessons.filter(l => l.globalIndex < globalIndex);
                const isLocked = globalIndex > 0 && previousLessons.some(l => !l.isCompleted);

                lessons.push({
                    id: lesson.id,
                    title: lesson.title,
                    duration: lesson.duration || 0,
                    isCompleted: isLessonCompleted,
                    isLocked: lesson.isLocked !== undefined ? lesson.isLocked : isLocked,
                    sectionId: section.id,
                    sectionTitle: section.title,
                    orderIndex: lesson.order_index,
                    globalIndex
                });
                globalIndex++;
            }
        }
        return lessons;
    }, [sectionsData, completedLessons]);

    // Create enriched sections with isCompleted and isLocked for CurriculumTab
    const enrichedSections = useMemo(() => {
        if (!sectionsData || flatLessons.length === 0) return sectionsData || [];

        return sectionsData.map((section: any) => {
            // Backend có thể trả về lessons hoặc course_lessons
            const sectionLessons = section.lessons || section.course_lessons || [];

            return {
                ...section,
                lessons: sectionLessons.map((lesson: any) => {
                    const flatLesson = flatLessons.find(l => l.id === lesson.id);
                    return {
                        ...lesson,
                        isCompleted: flatLesson?.isCompleted || false,
                        isLocked: flatLesson?.isLocked || false,
                        isCurrent: lesson.id === parseInt(lessonId || '0')
                    };
                })
            };
        });
    }, [sectionsData, flatLessons, lessonId]);

    // Find current lesson index in flat list
    const currentLessonIndex = useMemo(() => {
        return flatLessons.findIndex(l => l.id === parseInt(lessonId || '0'));
    }, [flatLessons, lessonId]);

    // Get previous and next lessons
    const previousLesson = currentLessonIndex > 0 ? flatLessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < flatLessons.length - 1 ? flatLessons[currentLessonIndex + 1] : null;
    const currentFlatLesson = flatLessons[currentLessonIndex];

    // Navigate to previous lesson
    const handlePreviousLesson = useCallback(() => {
        if (!previousLesson) {
            toast.error('Đây là bài học đầu tiên của khóa học');
            return;
        }
        navigate('/' + student_routes.lesson(courseId!, previousLesson.id));
    }, [previousLesson, courseId, navigate]);

    // Navigate to next lesson with completion check
    const handleNextLesson = useCallback(() => {
        if (!nextLesson) {
            toast.success('🎉 Chúc mừng! Bạn đã hoàn thành tất cả bài học của khóa học!');
            return;
        }

        // Check if current lesson is completed
        if (currentFlatLesson && !currentFlatLesson.isCompleted) {
            toast.error(
                <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Chưa hoàn thành bài học</p>
                        <p className="text-sm text-gray-600">Vui lòng hoàn thành bài học hiện tại trước khi chuyển sang bài tiếp theo.</p>
                    </div>
                </div>,
                { duration: 4000 }
            );
            return;
        }

        // If on preview access, check if next lesson is also a preview lesson
        if (isTrialAccess) {
            // Find next lesson data from sectionsData
            const nextLessonData = sectionsData?.flatMap((s: any) => {
                const lessons = s.lessons || s.course_lessons || [];
                return lessons;
            }).find((l: any) => l.id === nextLesson.id);

            if (nextLessonData && !nextLessonData.is_preview) {
                // Next lesson is not preview, show enrollment prompt
                toast.error(
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold">Cần đăng ký để học tiếp</p>
                            <p className="text-sm text-gray-600">Bài học tiếp theo không phải bài học xem trước. Vui lòng đăng ký khóa học để tiếp tục.</p>
                        </div>
                    </div>,
                    { duration: 5000 }
                );

                // Navigate to course detail for enrollment
                setTimeout(() => {
                    navigate('/' + student_routes.course_detail(courseId!));
                }, 2000);
                return;
            }
        }

        navigate('/' + student_routes.lesson(courseId!, nextLesson.id));
    }, [nextLesson, currentFlatLesson, courseId, navigate, isTrialAccess, sectionsData]);

    // Handle lesson click from curriculum
    const handleLessonClick = useCallback((targetLessonId: number) => {
        const targetLesson = flatLessons.find(l => l.id === targetLessonId);
        if (!targetLesson) return;

        // If lesson is locked, show notification
        if (targetLesson.isLocked) {
            // Find the previous lesson that needs to be completed
            const targetIndex = flatLessons.findIndex(l => l.id === targetLessonId);
            const previousUncompletedLesson = flatLessons.slice(0, targetIndex).reverse().find(l => !l.isCompleted);

            const message = previousUncompletedLesson
                ? `Vui lòng hoàn thành bài "${previousUncompletedLesson.title}" trước khi học bài này.`
                : 'Vui lòng hoàn thành các bài học trước đó.';

            toast.error(
                <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Bài học chưa được mở khóa</p>
                        <p className="text-sm text-gray-600">{message}</p>
                    </div>
                </div>,
                { duration: 4000 }
            );
            return;
        }

        // Navigate to the lesson
        navigate('/' + student_routes.lesson(courseId!, targetLessonId));
    }, [flatLessons, courseId, navigate]);

    // Handle marking lesson as complete
    const handleMarkComplete = useCallback(async () => {
        const currentLessonId = parseInt(lessonId || '0');
        if (!currentLessonId || currentFlatLesson?.isCompleted) return;

        setIsMarkingComplete(true);

        try {
            // Get user info
            const accountData = sessionStorage.getItem('Account');
            const account = accountData ? JSON.parse(accountData) : null;

            if (!account) {
                toast.error('Vui lòng đăng nhập lại');
                setIsMarkingComplete(false);
                return;
            }

            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

            // Call API to mark lesson complete
            const response = await fetch(`${API_BASE_URL}/enrollments/lessons/${currentLessonId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': account.id.toString()
                },
                body: JSON.stringify({ is_completed: true })
            });

            if (!response.ok) {
                throw new Error('Failed to mark lesson complete');
            }

            const result = await response.json();

            // Update local state
            setCompletedLessons(prev => new Set([...prev, currentLessonId]));
            setIsMarkingComplete(false);

            // Check if course is completed and certificate was issued
            if (result.course_completed && result.certificate) {
                // Store certificate data
                setEarnedCertificate(result.certificate);

                // Show certificate earned toast 🎓
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 shadow-2xl rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                                        <span className="text-4xl">🎓</span>
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <p className="text-lg font-bold text-white">
                                        Chúc mừng! Bạn đã hoàn thành khóa học!
                                    </p>
                                    <p className="mt-1 text-sm text-white/90">
                                        Chứng chỉ đã được cấp với mã: <span className="font-mono font-bold">{result.certificate.certificate_code}</span>
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                setShowCertificateDialog(true);
                                            }}
                                            className="px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-md"
                                        >
                                            🏆 Xem chứng chỉ
                                        </button>
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ), { duration: 10000, position: 'top-center' });
            } else {
                // Show regular success toast
                toast.success(
                    <div className="flex items-start gap-2">
                        <div>
                            <p className="font-semibold">🎉 Hoàn thành bài học!</p>
                            <p className="text-sm text-gray-600">
                                {nextLesson
                                    ? `Bài tiếp theo: "${nextLesson.title}"`
                                    : 'Bạn đã hoàn thành tất cả bài học!'}
                            </p>
                            {result.progress !== undefined && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Tiến độ: {result.progress}% ({result.completed_lessons}/{result.total_lessons} bài)
                                </p>
                            )}
                        </div>
                    </div>,
                    { duration: 3000 }
                );

                // Auto navigate to next lesson after a short delay if there is one
                if (nextLesson) {
                    setTimeout(() => {
                        navigate('/' + student_routes.lesson(courseId!, nextLesson.id));
                    }, 1500);
                }
            }
        } catch (error) {
            console.error('Error marking lesson complete:', error);
            toast.error('Có lỗi xảy ra khi đánh dấu hoàn thành bài học');
            setIsMarkingComplete(false);
        }
    }, [lessonId, currentFlatLesson, nextLesson, courseId, navigate]);

    const tabs: TabConfig[] = [
        { id: 'content', label: 'Nội dung', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'curriculum', label: 'Mục lục', icon: <List className="w-5 h-5" /> },
        { id: 'reviews', label: 'Đánh giá', icon: <Star className="w-5 h-5" /> },
        { id: 'discussions', label: 'Thảo luận', icon: <MessageSquare className="w-5 h-5" /> },
    ];

    const handleBackToCourse = () => {
        navigate('/' + student_routes.course_detail(courseId!));
    };

    // Checking access state
    if (isCheckingAccess) {
        return <LoadingState message="Đang kiểm tra quyền truy cập..." />;
    }

    // Access denied - Login required
    if (!hasAccess && accessDeniedReason === 'login_required') {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Yêu cầu đăng nhập</h2>
                        <p className="text-slate-600 mb-6">
                            Bạn cần đăng nhập để xem nội dung bài học này.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/' + student_routes.auth)}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors shadow-lg shadow-primary/30"
                            >
                                Đăng nhập ngay
                            </button>
                            <button
                                onClick={handleBackToCourse}
                                className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                            >
                                Quay lại khóa học
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Access denied - Enrollment required
    if (!hasAccess && accessDeniedReason === 'enrollment_required') {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-3">Cần đăng ký khóa học</h2>
                        <p className="text-slate-600 mb-2">
                            Bạn cần đăng ký khóa học này để xem nội dung bài học.
                        </p>
                        {courseData?.allow_preview && (
                            <p className="text-sm text-slate-500 mb-6">
                                💡 Khóa học này có các bài học xem trước miễn phí. Vui lòng quay lại để chọn bài học xem trước.
                            </p>
                        )}
                        <div className="flex flex-col gap-3 mt-6">
                            <button
                                onClick={handleBackToCourse}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors shadow-lg shadow-primary/30"
                            >
                                Xem thông tin khóa học & Đăng ký
                            </button>
                            <button
                                onClick={() => navigate('/' + student_routes.courses)}
                                className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                            >
                                Khám phá khóa học khác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (sectionsLoading || courseLoading || reviewsLoading || lessonContentLoading) {
        return <LoadingState message="Đang tải bài học..." />;
    }

    // Error state
    if (sectionsError) {
        return <ErrorState error={sectionsError} onRetry={() => window.location.reload()} />;
    }

    // Lesson not found
    if (!currentLesson) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4">Không tìm thấy bài học</h2>
                    <button
                        onClick={handleBackToCourse}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
                    >
                        Quay lại khóa học
                    </button>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'content':
                return (
                    <ContentTab
                        content={fallbackContent}
                        blocks={lessonContentData?.blocks || []}
                        layoutType={lessonContentData?.layout_type || 'single'}
                        isCompleted={currentFlatLesson?.isCompleted}
                        isMarkingComplete={isMarkingComplete}
                        onMarkComplete={handleMarkComplete}
                    />
                );
            case 'curriculum':
                return (
                    <CurriculumTab
                        sections={enrichedSections}
                        courseId={courseId!}
                        currentLessonId={parseInt(lessonId || '0')}
                        onLessonClick={handleLessonClick}
                    />
                );
            case 'reviews':
                return <ReviewsTab reviews={reviewsData || []} />;
            case 'discussions':
                return <DiscussionsTab discussions={discussions} />;
            default:
                return null;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm z-20 flex-shrink-0">
                <div className="h-16 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <button
                            onClick={handleBackToCourse}
                            className="text-slate-600 hover:text-primary transition-colors p-2 hover:bg-slate-100 rounded-lg"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500 truncate">{courseData?.title || 'Đang tải...'}</p>
                            <h1 className="text-sm font-bold text-secondary truncate">{currentLesson?.title || 'Bài học'}</h1>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreviousLesson}
                            disabled={!previousLesson}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors hidden md:flex items-center gap-2 ${previousLesson
                                ? 'text-slate-600 hover:bg-slate-100'
                                : 'text-slate-300 cursor-not-allowed'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Trước
                        </button>
                        <button
                            onClick={handleNextLesson}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${nextLesson
                                ? 'bg-primary hover:bg-primary-hover text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                        >
                            <span className="hidden md:inline">
                                {nextLesson ? 'Tiếp theo' : 'Hoàn thành'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Trial Access Warning Banner */}
            {isTrialAccess && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 flex-shrink-0">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-amber-900">
                                    🎓 Bạn đang học thử miễn phí
                                </p>
                                <p className="text-xs text-amber-700">
                                    Đăng ký khóa học để truy cập tất cả bài học và nhận chứng chỉ hoàn thành
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleBackToCourse}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ml-4"
                        >
                            Đăng ký ngay
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex min-h-0 relative">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:flex w-20 bg-white border-r border-slate-200 flex-col items-center py-4 gap-2 flex-shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex flex-col items-center gap-1 px-2 py-3 rounded-lg transition-all ${activeTab === tab.id
                                ? 'text-primary bg-primary/10'
                                : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                                }`}
                        >
                            {tab.icon}
                            <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Sidebar - Mobile Overlay */}
                {isSidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
                        <div
                            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b flex items-center justify-between">
                                <h3 className="font-bold text-secondary">Menu</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                            ? 'text-primary bg-primary/10'
                                            : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                                            }`}
                                    >
                                        {tab.icon}
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-20">
                <div className="grid grid-cols-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center justify-center py-2 gap-1 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-500'
                                }`}
                        >
                            {tab.icon}
                            <span className="text-xs">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Certificate Dialog */}
            {earnedCertificate && (
                <CertificateDialog
                    isOpen={showCertificateDialog}
                    onClose={() => setShowCertificateDialog(false)}
                    certificate={{
                        id: earnedCertificate.id,
                        course_id: parseInt(courseId || '0'),
                        course_title: earnedCertificate.course_title || courseData?.title || '',
                        student_name: earnedCertificate.student_name || '',
                        instructor_name: earnedCertificate.instructor_name || '',
                        certificate_url: earnedCertificate.certificate_url || '',
                        issued_at: earnedCertificate.issued_at,
                        certificate_code: earnedCertificate.certificate_code || ''
                    }}
                />
            )}
        </div>
    );
};

export default LessonPage;
