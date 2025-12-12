import React from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Calendar, Award, Clock, BarChart3 } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import { Link } from 'react-router-dom';
import { instructor_routes } from '../../page_routes';

const InstructorDashboard: React.FC = () => {
    // Mock data - sẽ thay thế bằng API call
    const stats = {
        totalCourses: 12,
        totalStudents: 245,
        totalRevenue: 12500000,
        averageRating: 4.8,
        activeClasses: 8,
        upcomingSessions: 3,
    };

    const recentCourses = [
        { id: 1, title: 'ReactJS từ A-Z', students: 125, progress: 85, status: 'Published' },
        { id: 2, title: 'Python Masterclass', students: 89, progress: 72, status: 'Published' },
        { id: 3, title: 'UI/UX Design', students: 45, progress: 60, status: 'Draft' },
    ];

    const upcomingSessions = [
        { id: 1, title: 'Lớp IELTS Advanced K15', time: 'Today, 19:30', students: 25 },
        { id: 2, title: 'ReactJS Workshop', time: 'Tomorrow, 14:00', students: 18 },
        { id: 3, title: 'Python Bootcamp', time: 'Dec 15, 10:00', students: 30 },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your courses.</p>
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
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="text-green-600"
                    trend={8}
                />
                <StatCard
                    title="Total Revenue"
                    value={`${(stats.totalRevenue / 1000000).toFixed(1)}M VNĐ`}
                    icon={DollarSign}
                    color="text-purple-600"
                    trend={15}
                />
                <StatCard
                    title="Average Rating"
                    value={stats.averageRating}
                    icon={Award}
                    color="text-yellow-600"
                    trend={2}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Courses */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.courses_list}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentCourses.map((course) => (
                            <div
                                key={course.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {course.students} students
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                course.status === 'Published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {course.status}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Progress</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.schedule}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                            <div
                                key={session.id}
                                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="font-medium text-gray-900 mb-2">{session.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{session.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{session.students} students</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.courses_create}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                    >
                        <div className="p-2 bg-green-100 rounded-lg">
                            <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Create Course</h3>
                            <p className="text-sm text-gray-600">Start a new course</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.class_list}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Manage Classes</h3>
                            <p className="text-sm text-gray-600">View all classes</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.schedule}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">View Schedule</h3>
                            <p className="text-sm text-gray-600">Check calendar</p>
                        </div>
                    </Link>

                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.courses_overview}`}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                    >
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Analytics</h3>
                            <p className="text-sm text-gray-600">View reports</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
