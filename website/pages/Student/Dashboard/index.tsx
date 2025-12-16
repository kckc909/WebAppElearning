
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyClasses, useMyEnrollments } from '../../../hooks/useApi';
import { classesApi } from '../../../API';
import { IoDocumentTextOutline, IoPersonCircleOutline, IoPlayCircle, IoTimeOutline } from 'react-icons/io5';
import { Loader2 } from 'lucide-react';
import { student_routes } from '../../page_routes';
import { ErrorState, EmptyState } from '../../../components/DataStates';

// Mock user ID - sẽ thay bằng user từ auth context
const CURRENT_USER_ID = 7;

const StudentDashboard: React.FC = () => {
    // Sử dụng API hooks
    const { data: myClasses, loading: classesLoading, error: classesError, refetch: refetchClasses } = useMyClasses(CURRENT_USER_ID);
    const { data: myEnrollments, loading: enrollmentsLoading, error: enrollmentsError, refetch: refetchEnrollments } = useMyEnrollments(CURRENT_USER_ID);
    const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);

    // Đảm bảo myClasses và myEnrollments luôn là array
    const classesList = Array.isArray(myClasses) ? myClasses : [];
    const enrollmentsList = Array.isArray(myEnrollments) ? myEnrollments : [];

    // Fetch pending assignments từ các classes
    useEffect(() => {
        const fetchAssignments = async () => {
            if (classesList.length > 0) {
                const allAssignments: any[] = [];
                for (const cls of classesList) {
                    try {
                        const response = await classesApi.getAssignments(cls.id);
                        if (response.success && Array.isArray(response.data)) {
                            const pending = response.data.filter((a: any) => new Date(a.due_date) > new Date());
                            allAssignments.push(...pending.map((a: any) => ({
                                ...a,
                                deadline: new Date(a.due_date).toLocaleDateString('vi-VN')
                            })));
                        }
                    } catch {
                        // Ignore individual assignment fetch errors
                    }
                }
                setPendingAssignments(allAssignments);
            }
        };
        fetchAssignments();
    }, [classesList.length]);

    // Only show classes that have a next session defined
    const activeClasses = classesList.filter((c: any) => c.nextSession);
    const hasActiveClasses = activeClasses.length > 0;
    const studentCourses = enrollmentsList;

    // Loading state
    const isLoading = classesLoading || enrollmentsLoading;
    // Combined error
    const hasError = classesError || enrollmentsError;
    const errorMessage = classesError || enrollmentsError || '';

    // Retry function
    const handleRetry = () => {
        if (classesError) refetchClasses();
        if (enrollmentsError) refetchEnrollments();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-slate-500">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="max-w-6xl mx-auto">
                <ErrorState error={errorMessage} onRetry={handleRetry} />
            </div>
        );
    }


    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-secondary">Học tập cá nhân</h1>
                <p className="text-slate-600">Chào mừng trở lại! Bạn có <span className="text-primary font-bold">{pendingAssignments.length} bài tập</span> cần hoàn thành.</p>
            </div>

            {/* Active Class Monitor Section */}
            {hasActiveClasses && (
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <h2 className="font-bold text-lg">Lớp học đang diễn ra</h2>
                        </div>
                        <Link to={student_routes.my_classes} className="text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors">
                            Xem tất cả lớp
                        </Link>
                    </div>

                    <div className="p-6">
                        {activeClasses.map(cls => (
                            <div key={cls.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-secondary mb-1">{cls.name}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                        <div className="flex items-center">
                                            <IoPersonCircleOutline className='mr-1 text-lg' />
                                            GV: {cls.instructor}
                                        </div>
                                        <div className="flex items-center">
                                            <IoTimeOutline className='mr-1 text-lg' />
                                            {cls.nextSession?.startTime ? new Date(cls.nextSession.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            -
                                            {cls.nextSession?.title}
                                        </div>
                                    </div>
                                    {/* Progress */}
                                    <div className="mt-4 max-w-md">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Tiến độ lớp học</span>
                                            <span className="font-bold">{cls.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: `${cls.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-lg shadow-red-200 transition-all transform hover:scale-105">
                                        <IoPlayCircle className='text-2xl' />
                                        <span className="font-bold">Vào học ngay</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Assignments & Schedule */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Assignments */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-secondary">Bài tập cần làm</h2>
                            <Link to={student_routes.my_classes} className="text-sm text-primary hover:underline">Xem tất cả</Link>
                        </div>
                        <div className="space-y-4">
                            {pendingAssignments.map((assign: any) => (
                                <div key={assign.id} className="flex items-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                                        <IoDocumentTextOutline className='text-xl' />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-slate-800">{assign.title}</h4>
                                        <p className="text-xs text-slate-500">Hạn nộp: <span className="text-red-500 font-medium">{assign.deadline}</span></p>
                                    </div>
                                    <button className="text-sm font-medium text-primary border border-primary px-3 py-1 rounded hover:bg-blue-50">Làm bài</button>
                                </div>
                            ))}
                            {pendingAssignments.length === 0 && <p className="text-slate-500 text-center py-4">Không có bài tập nào.</p>}
                        </div>
                    </section>

                    {/* Simple Monthly Schedule Preview */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-secondary">Lịch học sắp tới</h2>
                            <Link to={student_routes.schedule} className="text-sm text-primary hover:underline">Xem lịch tháng</Link>
                        </div>
                        <div className="space-y-3">
                            {/* Mock Schedule Items */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center">
                                    <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase">Tháng 6</div>
                                        <div className="text-xl font-bold text-secondary">{10 + i}</div>
                                    </div>
                                    <div className="flex-1 ml-4 p-3 bg-slate-50 rounded-lg border-l-4 border-primary">
                                        <h4 className="font-semibold text-slate-800">Lớp IELTS Advanced K15</h4>
                                        <p className="text-sm text-slate-500">19:30 - 21:00 • Ms. Bao Chau</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Course Overview / Sidebar Info */}
                <div className="space-y-8">
                    {/* Course Summary */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-secondary mb-4">Tổng quan khóa học</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg text-center">
                                <p className="text-2xl font-bold text-primary">{studentCourses.length}</p>
                                <p className="text-xs text-slate-600">Khóa học</p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-lg text-center">
                                <p className="text-2xl font-bold text-emerald-600">{studentCourses.filter((c: any) => c.completed).length}</p>
                                <p className="text-xs text-slate-600">Đã hoàn thành</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg text-center">
                                <p className="text-2xl font-bold text-purple-600">12</p>
                                <p className="text-xs text-slate-600">Giờ học</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg text-center">
                                <p className="text-2xl font-bold text-orange-600">1</p>
                                <p className="text-xs text-slate-600">Chứng chỉ</p>
                            </div>
                        </div>
                    </section>

                    {/* Recent Courses */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-secondary">Học gần đây</h2>
                        </div>
                        <div className="space-y-4">
                            {studentCourses.slice(0, 3).map((course: any) => (
                                <Link to={`/lesson/1`} key={course.id} className="block group">
                                    <div className="flex items-center space-x-3">
                                        <img src={course.course?.thumbnail || course.thumbnail} alt={course.course?.title || course.title} className="w-12 h-12 rounded object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-slate-800 truncate group-hover:text-primary">{course.course?.title || course.title}</h4>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Link to={student_routes.my_courses} className="block text-center mt-4 text-sm text-primary font-medium hover:underline">
                            Vào học tiếp
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
