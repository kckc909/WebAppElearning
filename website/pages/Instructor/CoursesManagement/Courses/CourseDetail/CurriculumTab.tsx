import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, FileText, Video, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { instructor_routes } from '../../../../page_routes';

interface CurriculumTabProps {
    courseId: string;
    curriculumData: any[] | null;
    curriculumLoading: boolean;
    curriculumError: string | null;
    expandedSections: number[];
    setExpandedSections: React.Dispatch<React.SetStateAction<number[]>>;
    refetchCurriculum: () => void;
}

export const CurriculumTab: React.FC<CurriculumTabProps> = ({
    courseId,
    curriculumData,
    curriculumLoading,
    curriculumError,
    expandedSections,
    setExpandedSections,
    refetchCurriculum
}) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            {/* Curriculum Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-slate-600">
                        {curriculumData?.length || 0} chương • {curriculumData?.reduce((acc: number, s: any) => acc + ((s.course_lessons || s.lessons)?.length || 0), 0) || 0} bài học
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/${instructor_routes.base}${instructor_routes.course_curriculum(courseId!)}`)}
                    className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa mục lục
                </button>
            </div>

            {/* Loading State */}
            {curriculumLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}

            {/* Error State */}
            {curriculumError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-600">{curriculumError}</p>
                    <button
                        onClick={() => refetchCurriculum()}
                        className="mt-2 text-sm text-red-700 underline"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!curriculumLoading && !curriculumError && (!curriculumData || curriculumData.length === 0) && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-secondary mb-2">Chưa có nội dung</h3>
                    <p className="text-slate-500 mb-4">Bắt đầu tạo mục lục cho khóa học của bạn</p>
                    <button
                        onClick={() => navigate(`/${instructor_routes.base}${instructor_routes.course_curriculum(courseId!)}`)}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm chương đầu tiên
                    </button>
                </div>
            )}

            {/* Sections List */}
            {!curriculumLoading && !curriculumError && curriculumData && curriculumData.length > 0 && (
                <div className="space-y-3">
                    {curriculumData.map((section: any, sectionIndex: number) => (
                        <div
                            key={section.id}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => {
                                    setExpandedSections((prev: number[]) =>
                                        prev.includes(section.id)
                                            ? prev.filter((id: number) => id !== section.id)
                                            : [...prev, section.id]
                                    );
                                }}
                                className="w-full flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-200 hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    {sectionIndex + 1}
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="font-semibold text-secondary">{section.title}</h3>
                                    <p className="text-sm text-slate-500">
                                        {(section.course_lessons || section.lessons)?.length || 0} bài học
                                    </p>
                                </div>
                                {expandedSections.includes(section.id) ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </button>

                            {/* Lessons List */}
                            {expandedSections.includes(section.id) && (
                                <div className="p-2">
                                    {(section.course_lessons || section.lessons) && (section.course_lessons || section.lessons).length > 0 ? (
                                        (section.course_lessons || section.lessons).map((lesson: any, lessonIndex: number) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group"
                                            >
                                                <span className="w-6 text-center text-sm text-slate-400">
                                                    {lessonIndex + 1}
                                                </span>
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                                                    {lesson.type === 'video' ? (
                                                        <Video className="w-4 h-4" />
                                                    ) : (
                                                        <FileText className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-secondary truncate">{lesson.title}</p>
                                                    <p className="text-sm text-slate-500">
                                                        {lesson.duration ? `${lesson.duration} phút` : 'Chưa có thời lượng'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/${instructor_routes.base}${instructor_routes.lesson_builder(courseId!, lesson.id, { action: 'edit-lesson', focusLesson: lesson.id })}`);
                                                    }}
                                                    className="p-2 hover:bg-slate-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Chỉnh sửa bài học"
                                                >
                                                    <Edit className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-400 text-sm">
                                            Chưa có bài học nào trong chương này
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
