import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    BookOpen,
    MessageSquare,
    Star,
    List,
    ChevronLeft,
    ChevronRight,
    X,
    Menu
} from 'lucide-react';
import { student_routes } from '../../../page_routes';
import ContentTab from './Tabs/ContentTab';
import CurriculumTab from './Tabs/CurriculumTab';
import ReviewsTab from './Tabs/ReviewsTab';
import DiscussionsTab from './Tabs/DiscussionsTab';

// Mock data với sections và lessons
const MOCK_LESSON = {
    id: 2,
    title: 'Giới thiệu về React Components',
    courseId: 1,
    courseTitle: 'Complete Web Development Bootcamp 2024',
    duration: 45,
    isCompleted: false,
    content: `
# Giới thiệu về React Components

## Components là gì?

Components là các khối xây dựng cơ bản của ứng dụng React. Mỗi component đại diện cho một phần của giao diện người dùng.

### Đặc điểm của Components:

1. **Tái sử dụng**: Components có thể được sử dụng nhiều lần
2. **Độc lập**: Mỗi component hoạt động độc lập
3. **Composable**: Components có thể kết hợp với nhau

## Ví dụ Component đơn giản

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### Cách sử dụng:

\`\`\`jsx
<Welcome name="Sara" />
<Welcome name="Cahal" />
<Welcome name="Edite" />
\`\`\`

## Props và State

Components nhận dữ liệu thông qua **props** và quản lý trạng thái nội bộ qua **state**.

---

**Bài tập**: Hãy tạo một component Button có thể tái sử dụng!
  `,
    // Curriculum với cấu trúc sections > lessons
    sections: [
        {
            id: 1,
            title: 'Chương 1: Giới thiệu về React',
            lessons: [
                { id: 1, title: 'Giới thiệu khóa học', duration: 10, isCompleted: true, isCurrent: false, isLocked: false },
                { id: 2, title: 'Giới thiệu về React Components', duration: 45, isCompleted: false, isCurrent: true, isLocked: false },
                { id: 3, title: 'Props và State', duration: 30, isCompleted: false, isCurrent: false, isLocked: false },
            ]
        },
        {
            id: 2,
            title: 'Chương 2: React Lifecycle',
            lessons: [
                { id: 4, title: 'Component Lifecycle Overview', duration: 35, isCompleted: false, isCurrent: false, isLocked: false },
                { id: 5, title: 'Lifecycle Methods', duration: 40, isCompleted: false, isCurrent: false, isLocked: true },
                { id: 6, title: 'useEffect Hook', duration: 50, isCompleted: false, isCurrent: false, isLocked: true },
            ]
        },
        {
            id: 3,
            title: 'Chương 3: React Hooks',
            lessons: [
                { id: 7, title: 'useState Hook', duration: 25, isCompleted: false, isCurrent: false, isLocked: true },
                { id: 8, title: 'useEffect Hook chi tiết', duration: 45, isCompleted: false, isCurrent: false, isLocked: true },
                { id: 9, title: 'Custom Hooks', duration: 50, isCompleted: false, isCurrent: false, isLocked: true },
            ]
        }
    ],
    reviews: [
        {
            id: 1,
            user: 'Nguyễn Văn A',
            avatar: 'https://ui-avatars.com/api/?name=NVA&background=2563eb&color=fff',
            rating: 5,
            comment: 'Bài học rất rõ ràng và dễ hiểu!',
            time: '2 ngày trước',
            likes: 12
        },
        {
            id: 2,
            user: 'Trần Thị B',
            avatar: 'https://ui-avatars.com/api/?name=TTB&background=16a34a&color=fff',
            rating: 4,
            comment: 'Nội dung hay nhưng cần thêm ví dụ thực tế.',
            time: '5 ngày trước',
            likes: 8
        }
    ],
    discussions: [
        {
            id: 1,
            user: 'Lê Văn C',
            avatar: 'https://ui-avatars.com/api/?name=LVC&background=dc2626&color=fff',
            question: 'Props và State khác nhau như thế nào?',
            time: '1 giờ trước',
            replies: 3
        }
    ]
};

type Tab = 'content' | 'curriculum' | 'reviews' | 'discussions';

interface TabConfig {
    id: Tab;
    label: string;
    icon: React.ReactNode;
}

const LessonPage: React.FC = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('content');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const tabs: TabConfig[] = [
        { id: 'content', label: 'Nội dung', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'curriculum', label: 'Mục lục', icon: <List className="w-5 h-5" /> },
        { id: 'reviews', label: 'Đánh giá', icon: <Star className="w-5 h-5" /> },
        { id: 'discussions', label: 'Thảo luận', icon: <MessageSquare className="w-5 h-5" /> },
    ];

    const handleBackToCourse = () => {
        navigate('/' + student_routes.course_detail(courseId!));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'content':
                return <ContentTab content={MOCK_LESSON.content} />;
            case 'curriculum':
                return <CurriculumTab sections={MOCK_LESSON.sections} courseId={courseId!} />;
            case 'reviews':
                return <ReviewsTab reviews={MOCK_LESSON.reviews} />;
            case 'discussions':
                return <DiscussionsTab discussions={MOCK_LESSON.discussions} />;
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
                            <p className="text-xs text-slate-500 truncate">{MOCK_LESSON.courseTitle}</p>
                            <h1 className="text-sm font-bold text-secondary truncate">{MOCK_LESSON.title}</h1>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden md:flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Trước
                        </button>
                        <button className="px-4 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2">
                            <span className="hidden md:inline">Tiếp theo</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

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
        </div>
    );
};

export default LessonPage;
