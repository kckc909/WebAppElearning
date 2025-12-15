import React from 'react';
import { Play, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentCourseLessons: React.FC = () => {
    const lessons = [
        { id: 1, title: 'Introduction to React', duration: '5:30', completed: true, locked: false },
        { id: 2, title: 'JSX Basics', duration: '8:45', completed: true, locked: false },
        { id: 3, title: 'Components', duration: '12:20', completed: false, locked: false },
        { id: 4, title: 'Props & State', duration: '15:30', completed: false, locked: true },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Danh sách bài học</h1>

            <div className="space-y-3">
                {lessons.map((lesson) => (
                    <Link
                        key={lesson.id}
                        to={lesson.locked ? '#' : `/lesson/${lesson.id}`}
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
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentCourseLessons;
