import { useState } from "react";
import { Link } from "react-router-dom";
import CourseProgressCard from "./CourseProgressCard";
import { EnrolledCourse } from "../../../types/types";
import { STUDENT_COURSES } from '../../../mockData'
import { Book, BookOpen } from "lucide-react";

export default function Student_Courses() {
    const [filter, setFilter] = useState<'all' | 'learning' | 'completed'>('all');

    const filteredCourses = STUDENT_COURSES.filter((course: { completed: any; }) => {
        if (filter === 'learning') return !course.completed;
        if (filter === 'completed') return course.completed;
        return true;
    });

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