
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { COURSES, INSTRUCTORS, LESSON_COMMENTS, LESSON_QA, LESSONS } from '../../../mockData';

import SidebarIcon from '../../../components/icons/SidebarIcon';
import SimpleMarkdown from '../../../components/SimpleMarkdown';
import CommentsPanel from './CommentsPanel';
import CurriculumPanel from './CuriculumPanel';
import QAPanel from './QAPanel';
import CodingPanel from './CodingPanel';
import { SidebarItem, SidebarTab } from '../../../types/types';
import LessonView from './LessonView';


const LessonPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lessonId = parseInt(id || '1'); 

    const [activeTab, setActiveTab] = useState<SidebarTab>('content');

    const lesson = LESSONS.find(l => l.id === lessonId);
    const course = COURSES.find(c => c.id === lesson?.courseId);

    if (!lesson || !course) {
        return <div className="text-center py-20">Bài học không tồn tại.</div>;
    }

    const allLessonIds = course.curriculum.flatMap(s => s.lectures).map((l: any) => l.id);
    const currentLessonIndex = allLessonIds.indexOf(lessonId);
    const prevLessonId = currentLessonIndex > 0 ? allLessonIds[currentLessonIndex - 1] : null;
    const nextLessonId = currentLessonIndex < allLessonIds.length - 1 ? allLessonIds[currentLessonIndex + 1] : null;

    // Fix: Add SidebarItem type to sidebarItems array.
    const sidebarItems: SidebarItem[] = [
        { id: 'content', icon: 'document-text-outline', label: 'Nội dung' },
        { id: 'curriculum', icon: 'list-outline', label: 'Mục lục' },
        { id: 'comments', icon: 'chatbubbles-outline', label: 'Bình luận', notification: 2 },
        { id: 'help', icon: 'help-circle-outline', label: 'Hỏi đáp' },
    ];

    let leftContent;
    switch (activeTab) {
        case 'curriculum':
            leftContent = <CurriculumPanel course={course} currentLessonId={lessonId} />;
            break;
        case 'comments':
            leftContent = <CommentsPanel comments={LESSON_COMMENTS.filter(c => c.lessonId === lesson.id)} />;
            break;
        case 'help':
            leftContent = <QAPanel qas={LESSON_QA.filter(q => q.lessonId === lesson.id)} instructor={INSTRUCTORS.find(i => i.id === course.instructor.id)} />;
            break;
        case 'content':
        default:
            leftContent = <div className="p-6 lg:p-8"><SimpleMarkdown content={lesson.content} /></div>;
    }

    const rightContent = lesson.type === 'coding' ? <CodingPanel lesson={lesson} /> : (
        <div className="flex-1 flex items-center justify-center bg-slate-100 text-slate-500">
            <div className="text-center">
                <ion-icon name="reader-outline" class="text-6xl"></ion-icon>
                <p className="mt-2">Đây là bài học dạng đọc.</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800">
            {/* Header */}
            <header className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4 overflow-hidden">
                        <Link to={`/courses/${course.id}`} className="text-slate-500 hover:text-primary transition-colors flex-shrink-0">
                            <ion-icon name="arrow-back-outline" class="text-2xl"></ion-icon>
                        </Link>
                        <div className="truncate">
                            <p className="text-sm text-slate-500 truncate">{course.title}</p>
                            <h1 className="text-md font-bold text-secondary truncate">{lesson.title}</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => prevLessonId && navigate(`/lesson/${prevLessonId}`)} disabled={!prevLessonId} className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </button>
                        <button onClick={() => nextLessonId && navigate(`/lesson/${nextLessonId}`)} disabled={!nextLessonId} className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex min-h-0">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex w-20 bg-white border-r border-slate-200 flex-col items-center flex-shrink-0">
                    {sidebarItems.map(item => (
                        <SidebarIcon key={item.id} item={item} activeTab={activeTab} setActiveTab={setActiveTab} />
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex min-w-0 pb-16 lg:pb-0">
                    <LessonView leftContent={leftContent} rightContent={rightContent} layout="horizontal" />
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around shadow-lg">
                {sidebarItems.map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 flex flex-col items-center justify-center py-2 transition-colors ${activeTab === item.id ? 'text-primary' : 'text-slate-500'}`}>
                        <ion-icon name={item.icon} class="text-2xl"></ion-icon>
                        <span className="text-xs">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default LessonPage;
