import { useState } from "react";
import { Link } from "react-router-dom";
import CourseProgressCard from "./CourseProgressCard";
import { EnrolledCourse } from "../../../types/types";
import { useMyEnrollments } from '../../../hooks/useApi';
import { useAuth } from '../../../contexts/AuthContext';
import { BookOpen, Loader2 } from "lucide-react";
import { ErrorState } from '../../../components/DataStates';

export default function Student_Courses() {
    const [filter, setFilter] = useState<'all' | 'learning' | 'completed'>('all');

    const { user } = useAuth();
    const userId = user?.id || 7;

    // 🐛 DEBUG: Log user info
    console.log('=== MY COURSES DEBUG ===');
    console.log('User from AuthContext:', user);
    console.log('User ID:', userId);
    console.log('sessionStorage Account:', sessionStorage.getItem('Account'));

    const { data: enrollments, loading, error, refetch } = useMyEnrollments(userId);

    // 🐛 DEBUG: Log API response
    console.log('Enrollments data:', enrollments);
    console.log('Enrollments type:', typeof enrollments);
    console.log('Enrollments is array?:', Array.isArray(enrollments));
    console.log('Enrollments keys:', enrollments ? Object.keys(enrollments) : 'null');
    console.log('Enrollments.data:', enrollments?.data);
    console.log('Enrollments count:', Array.isArray(enrollments) ? enrollments.length : 0);
    console.log('Loading:', loading);
    console.log('Error:', error);

    // Đảm bảo enrollments luôn là array
    // Fix: Backend trả về { success: true, data: [...] } nên cần lấy .data
    const enrollmentList = Array.isArray(enrollments) 
        ? enrollments 
        : (enrollments?.data && Array.isArray(enrollments.data)) 
            ? enrollments.data 
            : [];

    const filteredCourses = enrollmentList.filter((course: any) => {
        if (filter === 'learning') return !course.completed;
        if (filter === 'completed') return course.completed;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-slate-500">Đang tải khóa học...</span>
            </div>
        );
    }

    if (error) {
        return <ErrorState error={error} onRetry={refetch} />;
    }


    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-secondary">Khóa học của tôi</h1>
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilter('learning')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'learning' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Đang học
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'completed' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        Đã hoàn thành
                    </button>
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course: EnrolledCourse) => (
                        <CourseProgressCard key={course.id} course={course} />
                    ))}
                    
                    {/* Explore Courses Card */}
                    <Link 
                        to="/courses"
                        className="group relative bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-primary transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-8 min-h-[320px] hover:shadow-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-700 group-hover:text-primary transition-colors mb-2">
                                Khám phá khóa học
                            </h3>
                            
                            <p className="text-sm text-slate-500 mb-4">
                                Tìm kiếm và đăng ký khóa học mới
                            </p>
                            
                            <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                                <span>Xem tất cả</span>
                                <svg 
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-slate-200 border-dashed">
                    <BookOpen size={50} className="w-16 h-16 text-slate-300 mx-auto mb-4"></BookOpen>
                    <h3 className="text-lg font-medium text-slate-600">Chưa có khóa học nào trong danh sách này</h3>
                    <Link to="/courses" className="mt-4 inline-block text-primary hover:underline">Khám phá khóa học mới</Link>
                </div>
            )}
        </div>
    );
} 