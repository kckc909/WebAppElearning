import React from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { Users, Calendar, Clock, Video, FileText, Award, Settings } from 'lucide-react';
import { instructor_routes } from '../../../../page_routes';

const ClassDetail: React.FC = () => {
    const { classId } = useParams<{ classId: string }>();

    // Mock data - sẽ thay thế bằng API call
    const classData = {
        id: Number(classId),
        title: 'Lớp IELTS Advanced K15',
        description: 'Lớp học IELTS nâng cao dành cho học viên muốn đạt band điểm 7.0+',
        course: 'IELTS Advanced Course',
        instructor: 'Ms. Bao Chau',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        meetingLink: 'https://meet.google.com/abc-xyz',
        status: 'Active',
        students: 25,
        schedule: 'Mon, Wed, Fri - 19:30',
    };

    const tabs = [
        { name: 'Overview', path: instructor_routes.class_detail(classId || ''), icon: FileText },
        { name: 'Live Session', path: instructor_routes.class_live(classId || ''), icon: Video },
        { name: 'Activity', path: instructor_routes.class_activity(classId || ''), icon: FileText },
        { name: 'Attendance', path: instructor_routes.class_attendance(classId || ''), icon: Calendar },
        { name: 'Assignments', path: instructor_routes.class_assignments(classId || ''), icon: FileText },
        { name: 'Materials', path: instructor_routes.class_materials(classId || ''), icon: FileText },
        { name: 'Grades', path: instructor_routes.class_grades(classId || ''), icon: Award },
        { name: 'Members', path: instructor_routes.class_members(classId || ''), icon: Users },
        { name: 'Settings', path: instructor_routes.class_settings(classId || ''), icon: Settings },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{classData.title}</h1>
                        <p className="text-gray-600 mt-1">{classData.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href={classData.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Video className="w-5 h-5" />
                            Join Meeting
                        </a>
                    </div>
                </div>

                {/* Class Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{classData.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{classData.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                            {new Date(classData.startDate).toLocaleDateString('vi-VN')} -{' '}
                            {new Date(classData.endDate).toLocaleDateString('vi-VN')}
                        </span>
                    </div>
                    <div>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                classData.status === 'Active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {classData.status}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <NavLink
                                key={tab.name}
                                to={`/${instructor_routes.base}${tab.path}`}
                                end={tab.name === 'Overview'}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <Icon className="w-4 h-4" />
                                {tab.name}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default ClassDetail;
