import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, FileText } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import { instructor_routes } from '../../page_routes';

const InstructorCoursesOverview: React.FC = () => {
    // Mock data
    const stats = {
        totalCourses: 12,
        publishedCourses: 8,
        draftCourses: 4,
        totalStudents: 245,
        totalRevenue: 12500000,
        averageRating: 4.8,
    };

    const topCourses = [
        { id: 1, title: 'ReactJS từ A-Z', students: 125, revenue: 2500000, rating: 4.9 },
        { id: 2, title: 'Python Masterclass', students: 89, revenue: 1800000, rating: 4.8 },
        { id: 3, title: 'UI/UX Design', students: 45, revenue: 900000, rating: 4.7 },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Courses Overview</h1>
                    <p className="text-gray-600 mt-1">Manage and track your courses performance</p>
                </div>
                <Link
                    to={`/${instructor_routes.base}${instructor_routes.courses_create}`}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create Course
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="text-blue-600"
                    trend={12}
                />
                <StatCard
                    title="Published"
                    value={stats.publishedCourses}
                    icon={FileText}
                    color="text-green-600"
                    trend={5}
                />
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="text-purple-600"
                    trend={8}
                />
                <StatCard
                    title="Total Revenue"
                    value={`${(stats.totalRevenue / 1000000).toFixed(1)}M VNĐ`}
                    icon={DollarSign}
                    color="text-yellow-600"
                    trend={15}
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Performing Courses */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Top Performing Courses</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_list}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {topCourses.map((course) => (
                            <Link
                                key={course.id}
                                to={`/${instructor_routes.base}${instructor_routes.course_detail(course.id.toString())}`}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors cursor-pointer"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {course.students} students
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            {(course.revenue / 1000000).toFixed(1)}M VNĐ
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            {course.rating} ⭐
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
                    <div className="space-y-3">
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_list}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                            <BookOpen className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">My Courses</span>
                        </Link>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_create}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                            <Plus className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">Create Course</span>
                        </Link>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_draft}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                            <FileText className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">Drafts</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCoursesOverview;
