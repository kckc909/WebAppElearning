import { useState } from "react";
import { Link } from "react-router-dom";
import CourseProgressCard from "./CourseProgressCard";
import { EnrolledCourse } from "../../../types/types";
import { useMyEnrollments } from '../../../hooks/useApi';
import { Book, BookOpen, Loader2 } from "lucide-react";

// Mock user ID - sẽ thay bằng user từ auth context
const CURRENT_USER_ID = 7;

export default function Student_Courses() {
    const [filter, setFilter] = useState<'all' | 'learning' | 'completed'>('all');
    const { data: enrollments, loading } = useMyEnrollments(CURRENT_USER_ID);

    const filteredCourses = (enrollments || []).filter((course: any) => {
        if (filter === 'learning') return !course.completed;
        if (filter === 'completed') return course.completed;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
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