import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Video, Users, Plus } from 'lucide-react';

interface ClassEvent {
    id: number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    instructor: string;
    location: string;
    type: 'online' | 'offline';
    color: string;
}

const StudentSchedule: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');

    const events: ClassEvent[] = [
        {
            id: 1,
            title: 'Lớp IELTS Advanced K15',
            date: new Date(2024, 11, 15, 19, 30),
            startTime: '19:30',
            endTime: '21:00',
            instructor: 'Ms. Bao Chau',
            location: 'Zoom Meeting',
            type: 'online',
            color: 'bg-blue-500',
        },
        {
            id: 2,
            title: 'ReactJS Workshop',
            date: new Date(2024, 11, 16, 14, 0),
            startTime: '14:00',
            endTime: '16:30',
            instructor: 'Mr. John Doe',
            location: 'Room 301',
            type: 'offline',
            color: 'bg-green-500',
        },
        {
            id: 3,
            title: 'Python Bootcamp',
            date: new Date(2024, 11, 18, 10, 0),
            startTime: '10:00',
            endTime: '12:00',
            instructor: 'Dr. Sarah Lee',
            location: 'Google Meet',
            type: 'online',
            color: 'bg-purple-500',
        },
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getEventsForDate = (day: number) => {
        return events.filter((event) => {
            return (
                event.date.getDate() === day &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
            );
        });
    };

    const upcomingEvents = events
        .filter((event) => event.date >= new Date())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Lịch học</h1>
                    <p className="text-slate-600 mt-1">Quản lý lịch học và sự kiện của bạn</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Thêm vào Google Calendar
                </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1 w-fit">
                {['month', 'week', 'day'].map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v as any)}
                        className={`px-4 py-2 rounded ${view === v ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        {v === 'month' ? 'Tháng' : v === 'week' ? 'Tuần' : 'Ngày'}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-secondary">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={previousMonth}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentDate(new Date())}
                                className="px-4 py-2 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                Hôm nay
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Day names */}
                        {dayNames.map((day) => (
                            <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                                {day}
                            </div>
                        ))}

                        {/* Empty cells for days before month starts */}
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                            <div key={`empty-${index}`} className="aspect-square"></div>
                        ))}

                        {/* Calendar days */}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1;
                            const dayEvents = getEventsForDate(day);
                            const isToday =
                                day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();

                            return (
                                <div
                                    key={day}
                                    className={`aspect-square border border-slate-200 rounded-lg p-2 hover:bg-slate-50 transition-colors cursor-pointer ${isToday ? 'bg-blue-50 border-primary' : ''
                                        }`}
                                >
                                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-slate-900'}`}>
                                        {day}
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.slice(0, 2).map((event) => (
                                            <div
                                                key={event.id}
                                                className={`${event.color} text-white text-xs px-1 py-0.5 rounded truncate`}
                                                title={event.title}
                                            >
                                                {event.startTime}
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && (
                                            <div className="text-xs text-slate-500">+{dayEvents.length - 2} more</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-secondary mb-4">Sắp diễn ra</h3>
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-1 h-full ${event.color} rounded-full`}></div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-slate-900 mb-2">{event.title}</h4>
                                            <div className="space-y-1 text-sm text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{event.date.toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {event.startTime} - {event.endTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {event.type === 'online' ? (
                                                        <Video className="w-4 h-4" />
                                                    ) : (
                                                        <MapPin className="w-4 h-4" />
                                                    )}
                                                    <span>{event.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    <span>{event.instructor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-secondary mb-4">Thống kê tháng này</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Tổng buổi học</span>
                                <span className="text-2xl font-bold text-primary">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Đã tham gia</span>
                                <span className="text-2xl font-bold text-green-600">10</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600">Vắng mặt</span>
                                <span className="text-2xl font-bold text-red-600">2</span>
                            </div>
                            <div className="pt-4 border-t border-slate-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Tỷ lệ tham gia</span>
                                    <span className="text-2xl font-bold text-purple-600">83%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSchedule;