import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Video, Users, Plus, Filter, ExternalLink } from 'lucide-react';
import { classesApi } from '../../../../API';
import { useAuth } from '../../../../contexts/AuthContext';
import { student_routes } from '../../../page_routes';

interface CalendarEvent {
    id: number;
    class_id: number;
    title: string;
    date: Date;
    start_time: string;
    end_time: string;
    type: 'class' | 'assignment' | 'exam';
    class_title?: string;
    instructor?: string;
    meeting_link?: string;
    color: string;
}

const StudentSchedule: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user?.id || 7;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'class' | 'assignment' | 'exam'>('all');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await classesApi.getCalendar(userId);
                if (response.success) {
                    // Transform API data to CalendarEvent format
                    const transformedEvents = response.data.map((event: any) => ({
                        id: event.id,
                        class_id: event.class_id,
                        title: event.title || event.class_title,
                        date: new Date(event.event_date || event.date),
                        start_time: event.start_time,
                        end_time: event.end_time,
                        type: event.type || 'class',
                        class_title: event.class_title,
                        instructor: event.instructor,
                        meeting_link: event.meeting_link,
                        color: getEventColor(event.type || 'class')
                    }));
                    setEvents(transformedEvents);
                }
            } catch (error) {
                console.error('Failed to fetch calendar events:', error);
            }
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const getEventColor = (type: string): string => {
        switch (type) {
            case 'assignment': return 'bg-orange-500';
            case 'exam': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        // Adjust for Monday start (0=Mon, 6=Sun)
        let startingDayOfWeek = firstDay.getDay() - 1;
        if (startingDayOfWeek < 0) startingDayOfWeek = 6;

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
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear() &&
                (selectedFilter === 'all' || event.type === selectedFilter)
            );
        });
    };

    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        if (event.class_id) {
            navigate('/' + student_routes.class_detail(event.class_id));
        }
    };

    const upcomingEvents = events
        .filter((event) => new Date(event.date) >= new Date() && (selectedFilter === 'all' || event.type === selectedFilter))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // .slice(0, 5); // Removed limit

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Lịch</h1>
                    <p className="text-slate-600 mt-1">Quản lý lịch học và sự kiện của bạn</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Filter dropdown */}
                    <div className="relative">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value as any)}
                            className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="all">Tất cả các khoá học</option>
                            <option value="class">Buổi học</option>
                            <option value="assignment">Bài tập</option>
                            <option value="exam">Kiểm tra</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Sự kiện mới
                    </button>
                </div>
            </div>

            {/* Calendar Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <button
                        onClick={previousMonth}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {monthNames[(currentDate.getMonth() - 1 + 12) % 12]}
                    </button>

                    <h2 className="text-xl font-bold text-secondary">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>

                    <button
                        onClick={nextMonth}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                    >
                        {monthNames[(currentDate.getMonth() + 1) % 12]}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Calendar Grid with Large Cells */}
                <div className="grid grid-cols-7">
                    {/* Day names header */}
                    {dayNames.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-slate-600 py-3 border-b border-slate-100 bg-slate-50">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                        <div key={`empty-${index}`} className="min-h-[120px] border-r border-b border-slate-100 bg-slate-50/50 last:border-r-0"></div>
                    ))}

                    {/* Calendar days with events */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const dayEvents = getEventsForDate(day);
                        const isToday =
                            day === new Date().getDate() &&
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear();
                        const isWeekend = ((startingDayOfWeek + index) % 7) >= 5;

                        return (
                            <div
                                key={day}
                                className={`
                                    min-h-[120px] border-r border-b border-slate-100 p-2 
                                    hover:bg-blue-50/50 transition-colors cursor-pointer
                                    last:border-r-0
                                    ${isToday ? 'bg-blue-50' : ''}
                                    ${isWeekend ? 'bg-slate-50/30' : ''}
                                `}
                            >
                                {/* Day number */}
                                <div className={`
                                    text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center rounded-full
                                    ${isToday ? 'bg-primary text-white' : 'text-slate-700'}
                                `}>
                                    {day}
                                </div>

                                {/* Events list */}
                                <div className="space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            onClick={(e) => handleEventClick(event, e)}
                                            className={`
                                                group flex items-center gap-1 px-2 py-1 rounded text-xs
                                                cursor-pointer hover:opacity-80 transition-opacity
                                                ${event.color} text-white
                                            `}
                                            title={`${event.title} - ${event.start_time}`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></span>
                                            <span className="truncate font-medium">{event.title}</span>
                                        </div>
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <div className="text-xs text-primary font-medium px-2 hover:underline cursor-pointer">
                                            +{dayEvents.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4">Sự kiện sắp tới</h3>
                    {loading ? (
                        <div className="text-center py-8 text-slate-500">Đang tải...</div>
                    ) : upcomingEvents.length > 0 ? (
                        <div className="space-y-3">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    onClick={(e) => handleEventClick(event, e)}
                                    className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <div className={`w-1 h-16 ${event.color} rounded-full flex-shrink-0`}></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-slate-900">{event.title}</h4>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.start_time} - {event.end_time}</span>
                                            </div>
                                            {event.instructor && (
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>{event.instructor}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {event.meeting_link && (
                                        <a
                                            href={event.meeting_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                                        >
                                            <Video className="w-4 h-4" />
                                            Vào học
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            Không có sự kiện sắp tới
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-secondary mb-4">Thống kê tháng này</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-slate-600">Tổng buổi học</span>
                            <span className="text-2xl font-bold text-blue-600">{events.filter(e => e.type === 'class').length}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-slate-600">Bài tập</span>
                            <span className="text-2xl font-bold text-orange-600">{events.filter(e => e.type === 'assignment').length}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <span className="text-slate-600">Bài kiểm tra</span>
                            <span className="text-2xl font-bold text-red-600">{events.filter(e => e.type === 'exam').length}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-200">
                            <button
                                onClick={() => setCurrentDate(new Date())}
                                className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Về hôm nay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSchedule;