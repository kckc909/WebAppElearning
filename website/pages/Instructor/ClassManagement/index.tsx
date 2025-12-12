import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock, TrendingUp, Plus, Video } from 'lucide-react';
import StatCard from '../../../components/StatCard';
import { instructor_routes } from '../../page_routes';

const ClassesOverview: React.FC = () => {
    // Mock data
    const stats = {
        totalClasses: 8,
        activeClasses: 6,
        totalStudents: 245,
        upcomingSessions: 3,
    };

    const recentClasses = [
        { id: 1, title: 'Lớp IELTS Advanced K15', students: 25, nextSession: 'Today, 19:30', status: 'Active' },
        { id: 2, title: 'ReactJS Workshop', students: 18, nextSession: 'Tomorrow, 14:00', status: 'Active' },
        { id: 3, title: 'Python Bootcamp', students: 30, nextSession: 'Dec 15, 10:00', status: 'Active' },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Classes Overview</h1>
                    <p className="text-gray-600 mt-1">Manage and track your classes</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Classes"
                    value={stats.totalClasses}
                    icon={Users}
                    color="text-blue-600"
                    trend={12}
                />
                <StatCard
                    title="Active Classes"
                    value={stats.activeClasses}
                    icon={Video}
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
                    title="Upcoming Sessions"
                    value={stats.upcomingSessions}
                    icon={Calendar}
                    color="text-yellow-600"
                    trend={3}
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Classes */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Classes</h2>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.class_list}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentClasses.map((classItem) => (
                            <Link
                                key={classItem.id}
                                to={`/${instructor_routes.base}${instructor_routes.class_detail(classItem.id.toString())}`}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors cursor-pointer"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {classItem.students} students
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {classItem.nextSession}
                                        </span>
                                    </div>
                                    <span
                                        className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                                            classItem.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {classItem.status}
                                    </span>
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
                            to={`/${instructor_routes.base}${instructor_routes.class_list}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">My Classes</span>
                        </Link>
                        <Link
                            to={`/${instructor_routes.base}${instructor_routes.schedule}`}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                        >
                            <Calendar className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">Schedule</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesOverview;
