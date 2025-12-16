import React, { useState } from 'react';
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
    FileText,
    Save
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock sections data
const MOCK_SECTIONS = [
    {
        id: 1,
        title: 'Chương 1: Giới thiệu về Web Development',
        lessons: [
            { id: 1, title: 'Chào mừng đến với khóa học', type: 'video', duration: 10 },
            { id: 2, title: 'Cài đặt môi trường', type: 'text', duration: 15 },
            { id: 3, title: 'HTML cơ bản', type: 'video', duration: 45 },
        ]
    },
    {
        id: 2,
        title: 'Chương 2: CSS Fundamentals',
        lessons: [
            { id: 4, title: 'Giới thiệu về CSS', type: 'video', duration: 30 },
            { id: 5, title: 'CSS Selectors', type: 'video', duration: 40 },
        ]
    },
    {
        id: 3,
        title: 'Chương 3: JavaScript Basics',
        lessons: [
            { id: 6, title: 'Variables và Data Types', type: 'video', duration: 35 },
            { id: 7, title: 'Functions', type: 'video', duration: 45 },
            { id: 8, title: 'Bài tập thực hành', type: 'text', duration: 30 },
        ]
    }
];

const CourseCurriculumPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [sections, setSections] = useState(MOCK_SECTIONS);
    const [expandedSections, setExpandedSections] = useState<number[]>([1, 2, 3]);

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleAddSection = () => {
        const newSection = {
            id: Date.now(),
            title: `Chương ${sections.length + 1}: Chương mới`,
            lessons: []
        };
        setSections([...sections, newSection]);
        setExpandedSections([...expandedSections, newSection.id]);
        toast.success('Đã thêm chương mới');
    };

    const handleAddLesson = (sectionId: number) => {
        navigate(`/instructor/courses/${courseId}/lessons/new?section=${sectionId}`);
    };

    const handleEditLesson = (lessonId: number) => {
        navigate(`/instructor/courses/${courseId}/lessons/${lessonId}`);
    };

    const handleDeleteSection = (sectionId: number) => {
        setSections(sections.filter(s => s.id !== sectionId));
        toast.success('Đã xóa chương');
    };

    const handleDeleteLesson = (sectionId: number, lessonId: number) => {
        setSections(sections.map(s =>
            s.id === sectionId
                ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
                : s
        ));
        toast.success('Đã xóa bài học');
    };

    const totalLessons = sections.reduce((acc, s) => acc + s.lessons.length, 0);
    const totalDuration = sections.reduce((acc, s) => acc + s.lessons.reduce((a, l) => a + l.duration, 0), 0);

    return (
        <div className="p-6 lg:p-8">
            {/* Page Header */}
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
                        <p className="text-slate-600 mt-1">
                            {sections.length} chương • {totalLessons} bài học • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
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

            {/* Sections List */}
            <div className="space-y-4 max-w-4xl mx-auto">
                {sections.map((section, sectionIndex) => (
                    <div key={section.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-200">
                            <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {sectionIndex + 1}
                            </div>
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="flex-1 flex items-center justify-between text-left"
                            >
                                <div>
                                    <h3 className="font-semibold text-secondary">{section.title}</h3>
                                    <p className="text-sm text-slate-500">{section.lessons.length} bài học</p>
                                </div>
                                {expandedSections.includes(section.id) ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </button>
                            <div className="flex items-center gap-1">
                                <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                    <Edit className="w-4 h-4 text-slate-600" />
                                </button>
                                <button
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>

                        {/* Lessons */}
                        {expandedSections.includes(section.id) && (
                            <div className="p-2">
                                {section.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleEditLesson(lesson.id)}
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
                                                onClick={(e) => { e.stopPropagation(); handleEditLesson(lesson.id); }}
                                                className="p-2 hover:bg-slate-200 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4 text-slate-600" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteLesson(section.id, lesson.id); }}
                                                className="p-2 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddLesson(section.id)}
                                    className="w-full p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 border-2 border-dashed border-slate-200"
                                >
                                    <Plus className="w-4 h-4" />
                                    Thêm bài học
                                </button>
                            </div>
                        )}
                    </div>
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
        </div>
    );
};

export default CourseCurriculumPage;
