import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, CheckCircle, Lock, Clock, Award } from 'lucide-react';

const MyCourseDetail: React.FC = () => {
    const { id } = useParams();

    const course = {
        id: parseInt(id || '1'),
        title: 'Complete Web Development Bootcamp 2024',
        instructor: 'Dr. Angela Yu',
        progress: 65,
        completedLessons: 56,
        totalLessons: 86,
        timeSpent: '32h 15m',
        lastAccessed: '2 giờ trước',
        thumbnail: 'https://picsum.photos/seed/mycourse1/800/400',
        sections: [
            {
                id: 1,
                title: 'Introduction to Web Development',
                lessons: [
                    { id: 1, title: 'Welcome to the Course', duration: '5:30', completed: true, type: 'video' },
                    { id: 2, title: 'Course Overview', duration: '8:45', completed: true, type: 'video' },
                    { id: 3, title: 'Setting Up Your Environment', duration: '12:20', completed: true, type: 'video' },
                ],
            },
            {
                id: 2,
                title: 'HTML & CSS Fundamentals',
                lessons: [
                    { id: 4, title: 'HTML Basics', duration: '15:30', completed: true, type: 'video' },
                    { id: 5, title: 'CSS Styling', duration: '18:45', completed: true, type: 'video' },
                    { id: 6, title: 'Responsive Design', duration: '22:10', completed: false, type: 'video' },
                    { id: 7, title: 'Practice Project', duration: '30:00', completed: false, type: 'assignment' },
                ],
            },
            {
                id: 3,
                title: 'JavaScript Basics',
                lessons: [
                    { id: 8, title: 'Variables and Data Types', duration: '12:30', completed: false, type: 'video' },
                    { id: 9, title: 'Functions', duration: '16:45', completed: false, type: 'video' },
                    { id: 10, title: 'DOM Manipulation', duration: '20:15', completed: false, type: 'video', locked: true },
                ],
            },
        ],
    };

    const completedSections = course.sections.filter(s =>
        s.lessons.every(l => l.completed)
    ).length;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link to="/my-courses" className="inline-flex items-center text-primary hover:text-primary-hover mb-4">
                    ← Quay lại khóa học của tôi
                </Link>
                <h1 className="text-3xl font-bold text-secondary">{course.title}</h1>
                <p className="text-slate-600 mt-1">Giảng viên: {course.instructor}</p>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-slate-600 mb-1">Tiến độ</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600 mb-1">Bài học hoàn thành</p>
                        <p className="text-3xl font-bold text-green-600">{course.completedLessons}/{course.totalLessons}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600 mb-1">Thời gian học</p>
                        <p className="text-3xl font-bold text-purple-600">{course.timeSpent}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600 mb-1">Truy cập gần nhất</p>
                        <p className="text-lg font-semibold text-slate-900">{course.lastAccessed}</p>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">Nội dung khóa học</h2>
                        <div className="space-y-4">
                            {course.sections.map((section) => {
                                const sectionProgress = (section.lessons.filter(l => l.completed).length / section.lessons.length) * 100;

                                return (
                                    <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="p-4 bg-slate-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-slate-900">{section.title}</h3>
                                                <span className="text-sm text-slate-600">{Math.round(sectionProgress)}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                                                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${sectionProgress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="divide-y divide-slate-100">
                                            {section.lessons.map((lesson) => (
                                                <Link
                                                    key={lesson.id}
                                                    to={lesson.locked ? '#' : `/lesson/${lesson.id}`}
                                                    className={`flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                >
                                                    <div className="flex-shrink-0">
                                                        {lesson.locked ? (
                                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                                                <Lock className="w-4 h-4 text-slate-400" />
                                                            </div>
                                                        ) : lesson.completed ? (
                                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <Play className="w-4 h-4 text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-slate-900 truncate">{lesson.title}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs text-slate-500">{lesson.type === 'video' ? '📹 Video' : '📝 Bài tập'}</span>
                                                            <span className="text-xs text-slate-500">• {lesson.duration}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-secondary mb-4">Hành động nhanh</h3>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                                Tiếp tục học
                            </button>
                            <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                Xem chứng chỉ
                            </button>
                            <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                Đánh giá khóa học
                            </button>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-secondary mb-4">Thành tích</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Học viên chăm chỉ</p>
                                    <p className="text-xs text-slate-500">Hoàn thành {completedSections} sections</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Thời gian học</p>
                                    <p className="text-xs text-slate-500">{course.timeSpent} tổng cộng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCourseDetail;
