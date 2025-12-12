import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { instructor_routes } from '../../../page_routes';

const Schedule: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock data
    const sessions = [
        {
            id: 1,
            classId: 1,
            title: 'Lớp IELTS Advanced K15',
            date: new Date(2024, 0, 15),
            time: '19:30',
            duration: 120,
            students: 25,
            meetingLink: 'https://meet.google.com/abc-xyz',
        },
        {
            id: 2,
            classId: 2,
            title: 'ReactJS Workshop',
            date: new Date(2024, 0, 16),
            time: '14:00',
            duration: 90,
            students: 18,
            meetingLink: 'https://meet.google.com/def-uvw',
        },
        {
            id: 3,
            classId: 3,
            title: 'Python Bootcamp',
            date: new Date(2024, 0, 17),
            time: '10:00',
            duration: 180,
            students: 30,
            meetingLink: 'https://meet.google.com/ghi-rst',
        },
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getSessionsForDate = (date: Date | null) => {
        if (!date) return [];
        return sessions.filter(
            (session) =>
                session.date.getDate() === date.getDate() &&
                session.date.getMonth() === date.getMonth() &&
                session.date.getFullYear() === date.getFullYear()
        );
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
                    <p className="text-gray-600 mt-1">View and manage your class schedule</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={goToPreviousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button
                            onClick={goToNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
                                {day}
                            </div>
                        ))}
                        {days.map((date, index) => {
                            const daySessions = getSessionsForDate(date);
                            const isToday =
                                date &&
                                date.getDate() === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear();

                            return (
                                <div
                                    key={index}
                                    className={`min-h-[80px] p-2 border border-gray-200 rounded-lg ${
                                        isToday ? 'bg-green-50 border-green-300' : 'bg-white'
                                    } ${!date ? 'bg-gray-50' : ''}`}
                                >
                                    {date && (
                                        <>
                                            <div
                                                className={`text-sm font-medium mb-1 ${
                                                    isToday ? 'text-green-700' : 'text-gray-900'
                                                }`}
                                            >
                                                {date.getDate()}
                                            </div>
                                            {daySessions.length > 0 && (
                                                <div className="space-y-1">
                                                    {daySessions.slice(0, 2).map((session) => (
                                                        <div
                                                            key={session.id}
                                                            className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate"
                                                        >
                                                            {session.time}
                                                        </div>
                                                    ))}
                                                    {daySessions.length > 2 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{daySessions.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
                    <div className="space-y-4">
                        {sessions
                            .filter((session) => session.date >= new Date())
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .slice(0, 5)
                            .map((session) => (
                                <Link
                                    key={session.id}
                                    to={`/${instructor_routes.base}${instructor_routes.class_detail(session.classId.toString())}`}
                                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors"
                                >
                                    <h3 className="font-medium text-gray-900 mb-2">{session.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {session.date.toLocaleDateString('vi-VN', {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {session.time} ({session.duration} min)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{session.students} students</span>
                                    </div>
                                    <a
                                        href={session.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Video className="w-4 h-4" />
                                        Join Meeting
                                    </a>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
