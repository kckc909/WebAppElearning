import React from 'react';
import { Play, CheckCircle, Lock, BookOpen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useCourseLessons } from '../../../../hooks/useCourseLessons';

const StudentCourseLessons: React.FC = () => {
    // Get course ID from params
    const { courseId } = useParams<{ courseId: string }>();
    const numericCourseId = parseInt(courseId || '1');

    // TODO: Get current user ID from auth context
    const currentUserId = 7;

    // Get lessons from API hook
    const { data: lessonsData, isLoading, error } = useCourseLessons(numericCourseId, currentUserId);

    const lessons = (lessonsData || []).map((lesson: any) => ({
        id: lesson.id,
        lesson_id: lesson.lesson_id || lesson.id,
        title: lesson.title,
        duration: lesson.duration || '10:00',
        completed: lesson.completed || lesson.is_completed,
        locked: lesson.locked || false,
        progress_percent: lesson.progress_percent || lesson.progress || 0,
    }));

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Danh sách bài học</h1>

            <div className="space-y-3">
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        to={lesson.locked ? '#' : `/lesson/${lesson.lesson_id}`}
                        className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <div className="flex-shrink-0">
                            {lesson.locked ? (
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-slate-400" />
                                </div>
                            ) : lesson.completed ? (
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Play className="w-5 h-5 text-primary" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-slate-900">{lesson.title}</p>
                            <p className="text-sm text-slate-500">{lesson.duration}</p>
                        </div>
                        {!lesson.locked && !lesson.completed && lesson.progress_percent > 0 && (
                            <div className="text-xs text-blue-600 font-medium">
                                {lesson.progress_percent}%
                            </div>
                        )}
                    </Link>
                ))}
            </div>

            {lessons.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có bài học</h3>
                    <p className="text-slate-600">Bài học sẽ hiển thị ở đây khi có</p>
                </div>
            )}
        </div>
    );
};

export default StudentCourseLessons;
