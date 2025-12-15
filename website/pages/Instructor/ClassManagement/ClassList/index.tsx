import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Users,
    Calendar,
    Clock,
    Video,
    MoreVertical,
    Edit,
    Eye,
    Trash2,
    Play,
    MapPin
} from 'lucide-react';

// Mock classes
const MOCK_CLASSES = [
    {
        id: 1,
        name: 'Web Development - Lớp A1',
        course: 'Complete Web Development Bootcamp',
        thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
        status: 'active',
        students: 25,
        maxStudents: 30,
        schedule: 'T2, T4, T6',
        time: '19:00 - 21:00',
        nextSession: '2024-12-16 19:00',
        totalSessions: 24,
        completedSessions: 12,
        instructor: 'Nguyễn Văn A'
    },
    {
        id: 2,
        name: 'React Advanced - Lớp B2',
        course: 'React & TypeScript Mastery',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        status: 'active',
        students: 20,
        maxStudents: 25,
        schedule: 'T3, T5, T7',
        time: '18:00 - 20:00',
        nextSession: '2024-12-17 18:00',
        totalSessions: 20,
        completedSessions: 8,
        instructor: 'Nguyễn Văn A'
    },
    {
        id: 3,
        name: 'Python Basics - Lớp C1',
        course: 'Python for Beginners',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
        status: 'upcoming',
        students: 15,
        maxStudents: 30,
        schedule: 'T2, T4',
        time: '20:00 - 22:00',
        nextSession: '2024-12-20 20:00',
        totalSessions: 16,
        completedSessions: 0,
        instructor: 'Nguyễn Văn A'
    },
    {
        id: 4,
        name: 'Node.js Backend - Lớp D1',
        course: 'Node.js Backend Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        status: 'completed',
        students: 22,
        maxStudents: 25,
        schedule: 'T3, T5',
        time: '19:00 - 21:00',
        nextSession: null,
        totalSessions: 18,
        completedSessions: 18,
        instructor: 'Nguyễn Văn A'
    }
];

type StatusFilter = 'all' | 'active' | 'upcoming' | 'completed';

const ClassListPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'upcoming':
                return 'bg-blue-100 text-blue-700';
            case 'completed':
                return 'bg-slate-100 text-slate-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang học';
            case 'upcoming':
                return 'Sắp khai giảng';
            case 'completed':
                return 'Đã kết thúc';
            default:
                return status;
        }
    };

    const formatNextSession = (dateStr: string | null) => {
        if (!dateStr) return 'Đã hoàn thành';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const filteredClasses = MOCK_CLASSES.filter(cls => {
        if (statusFilter !== 'all' && cls.status !== statusFilter) return false;
        if (searchQuery && !cls.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-secondary mb-2">Danh sách lớp học</h1>
                    <p className="text-slate-600">Quản lý {MOCK_CLASSES.length} lớp học của bạn</p>
                </div>
                <button
                    onClick={() => navigate('/instructor/classes/create')}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                    <Plus className="w-5 h-5" />
                    Tạo lớp mới
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="search"
                            placeholder="Tìm kiếm lớp học..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'active', 'upcoming', 'completed'] as StatusFilter[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === status
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {status === 'all' ? 'Tất cả' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls) => (
                    <div
                        key={cls.id}
                        onClick={() => navigate(`/instructor/classes/${cls.id}`)}
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group"
                    >
                        {/* Thumbnail */}
                        <div className="relative">
                            <img
                                src={cls.thumbnail}
                                alt={cls.name}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(cls.status)}`}>
                                    {getStatusLabel(cls.status)}
                                </span>
                            </div>
                            {cls.status === 'active' && (
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/instructor/classes/${cls.id}/live`);
                                        }}
                                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold flex items-center gap-1"
                                    >
                                        <Play className="w-3 h-3 fill-white" />
                                        Live
                                    </button>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <p className="text-white text-xs opacity-80">{cls.course}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-secondary mb-3 group-hover:text-primary transition-colors">
                                {cls.name}
                            </h3>

                            {/* Stats */}
                            <div className="space-y-2 text-sm text-slate-600 mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{cls.students}/{cls.maxStudents} học viên</span>
                                    </div>
                                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${(cls.students / cls.maxStudents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{cls.schedule} • {cls.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{cls.completedSessions}/{cls.totalSessions} buổi</span>
                                </div>
                            </div>

                            {/* Next Session */}
                            {cls.status !== 'completed' && (
                                <div className="p-3 bg-blue-50 rounded-lg mb-4">
                                    <p className="text-xs text-blue-600 font-medium mb-1">Buổi học tiếp theo</p>
                                    <p className="text-sm text-blue-800 font-semibold">{formatNextSession(cls.nextSession)}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/instructor/classes/${cls.id}`);
                                    }}
                                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Eye className="w-4 h-4" />
                                    Chi tiết
                                </button>
                                {cls.status === 'active' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/instructor/classes/${cls.id}/live`);
                                        }}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Video className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredClasses.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                    <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-secondary mb-2">Không tìm thấy lớp học</h3>
                    <p className="text-slate-600 mb-6">Thử thay đổi bộ lọc hoặc tạo lớp học mới</p>
                    <button
                        onClick={() => navigate('/instructor/classes/create')}
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Tạo lớp mới
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClassListPage;
