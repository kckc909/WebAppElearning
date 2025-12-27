import React, { useState } from 'react';
import { CheckCircle, Lock, Play, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: number;
    isCompleted: boolean;
    isCurrent: boolean;
    isLocked: boolean;
}

interface Section {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface CurriculumTabProps {
    sections: Section[];
    courseId: string;
    currentLessonId?: number;
    onLessonClick?: (lessonId: number) => void;
}

const CurriculumTab: React.FC<CurriculumTabProps> = ({ sections, courseId, currentLessonId, onLessonClick }) => {
    const [expandedSections, setExpandedSections] = useState<number[]>([1]);

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
    const completedLessons = sections.reduce(
        (acc, section) => acc + section.lessons.filter(l => l.isCompleted).length,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-secondary mb-2">Mục lục khóa học</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>{sections.length} chương</span>
                        <span>•</span>
                        <span>{totalLessons} bài học</span>
                        <span>•</span>
                        <span className="text-green-600 font-semibold">
                            {completedLessons}/{totalLessons} hoàn thành
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {sections.map((section) => {
                        const isExpanded = expandedSections.includes(section.id);
                        const sectionCompleted = section.lessons.filter(l => l.isCompleted).length;

                        return (
                            <div key={section.id} className="border border-slate-200 rounded-xl overflow-hidden">
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                            {section.id}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-secondary">{section.title}</h3>
                                            <p className="text-sm text-slate-500">
                                                {section.lessons.length} bài học • {sectionCompleted}/{section.lessons.length} hoàn thành
                                            </p>
                                        </div>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                </button>

                                {/* Lessons List */}
                                {isExpanded && (
                                    <div className="p-2 space-y-1">
                                        {section.lessons.map((lesson) => {
                                            const isCurrent = currentLessonId === lesson.id;
                                            return (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => onLessonClick?.(lesson.id)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${isCurrent
                                                        ? 'bg-primary/10 border border-primary'
                                                        : lesson.isCompleted
                                                            ? 'bg-green-50 hover:bg-green-100'
                                                            : lesson.isLocked
                                                                ? 'bg-slate-50 opacity-60 cursor-not-allowed'
                                                                : 'bg-white hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCurrent
                                                            ? 'bg-primary text-white'
                                                            : lesson.isCompleted
                                                                ? 'bg-green-600 text-white'
                                                                : lesson.isLocked
                                                                    ? 'bg-slate-300 text-slate-500'
                                                                    : 'bg-slate-200 text-slate-600'
                                                            }`}
                                                    >
                                                        {lesson.isCompleted ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : isCurrent ? (
                                                            <Play className="w-4 h-4" />
                                                        ) : lesson.isLocked ? (
                                                            <Lock className="w-4 h-4" />
                                                        ) : (
                                                            <Play className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <h4
                                                            className={`font-medium text-sm ${isCurrent ? 'text-primary' : 'text-secondary'
                                                                }`}
                                                        >
                                                            {lesson.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{lesson.duration} phút</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CurriculumTab;
