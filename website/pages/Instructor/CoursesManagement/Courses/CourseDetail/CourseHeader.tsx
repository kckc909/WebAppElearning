import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Users, Star, Edit2 } from 'lucide-react';
import { CourseStatusBadge } from '../../../../../components/CourseStatusBadge';
import { SubmitCourseButton } from '../../../../../components/SubmitCourseButton';
import { CourseState } from './types';
import { instructor_routes } from '../../../../page_routes';

interface CourseHeaderProps {
    course: CourseState;
    courseId: string;
    isSaving: boolean;
    isDisabled: boolean;
    curriculumData: any[] | null;
    onSave: () => void;
    onPreview: () => void;
    onRefetch: () => void;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({
    course,
    courseId,
    isSaving,
    isDisabled,
    curriculumData,
    onSave,
    onPreview,
    onRefetch
}) => {
    const navigate = useNavigate();

    const handleEditContent = () => {
        // Find the first lesson from the curriculum
        const firstSection = curriculumData?.[0];
        const firstLesson = (firstSection?.course_lessons || firstSection?.lessons)?.[0];

        if (firstLesson) {
            // Navigate to lesson builder with first lesson
            navigate(`/${instructor_routes.base}${instructor_routes.lesson_builder(courseId, firstLesson.id, { action: 'edit-lesson' })}`);
        } else {
            // If no lessons, navigate to curriculum to create one
            navigate(`/${instructor_routes.base}${instructor_routes.course_curriculum(courseId)}`);
        }
    };

    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/instructor/courses/all')}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-secondary">{course.title || 'Khóa học mới'}</h1>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <CourseStatusBadge status={course.status || 'DRAFT'} />
                        <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {(course.total_students || 0).toLocaleString()} học viên
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {Number(course.average_rating || 0).toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                {(course.status === 'DRAFT' || course.status === 'REJECTED') && (
                    <SubmitCourseButton
                        courseId={Number(courseId)}
                        courseStatus={course.status}
                        instructorId={course.instructor_id}
                        onSuccess={onRefetch}
                    />
                )}
                <button
                    onClick={handleEditContent}
                    className="px-4 py-2 text-primary border border-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
                >
                    <Edit2 className="w-4 h-4" />
                    Chỉnh sửa nội dung
                </button>
                <button
                    onClick={onPreview}
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
                >
                    <Eye className="w-4 h-4" />
                    Xem trước
                </button>
                <button
                    onClick={onSave}
                    disabled={isSaving || isDisabled}
                    className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
            </div>
        </div>
    );
};
