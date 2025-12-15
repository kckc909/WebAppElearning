import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

const InstructorCourseLesson: React.FC = () => {
    const lessons = [
        { id: 1, title: 'Introduction', type: 'video', duration: '5:30' },
        { id: 2, title: 'HTML Basics', type: 'video', duration: '15:20' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Bài học</h1>
            <div className="space-y-3">
                {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {lesson.type === 'video' ? <Video className="w-5 h-5 text-blue-600" /> : <FileText className="w-5 h-5 text-green-600" />}
                            <div>
                                <p className="font-medium text-slate-900">{lesson.title}</p>
                                <p className="text-xs text-slate-500">{lesson.duration}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorCourseLesson;