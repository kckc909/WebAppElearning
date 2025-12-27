import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Users, Search, Filter, Download, Mail,
    TrendingUp, Clock, Award, BarChart3, CheckCircle2,
    Circle, Loader2, ChevronDown
} from 'lucide-react';
import { instructor_routes } from '../../../page_routes';
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../../../../API';

const CourseStudentsPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'not_started'>('all');
    const [sortBy, setSortBy] = useState<'name' | 'progress' | 'enrolled_date'>('enrolled_date');

    // Fetch enrollments
    const { data: enrollmentsData, isLoading } = useQuery({
        queryKey: ['course-enrollments', courseId],
        queryFn: async () => {
            // TODO: Implement backend API endpoint for /courses/:id/enrollments
            // const response = await coursesApi.getEnrollments(parseInt(courseId!));
            // return response.data;

            // Mock data for now
            return [];
        },
        enabled: !!courseId
    });

    const students = enrollmentsData || [];

    // Filter and sort students
    const filteredStudents = students
        .filter((student: any) => {
            const matchesSearch = student.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email?.toLowerCase().includes(searchTerm.toLowerCase());

            if (!matchesSearch) return false;

            if (filterStatus === 'all') return true;
            if (filterStatus === 'completed') return student.progress >= 100;
            if (filterStatus === 'active') return student.progress > 0 && student.progress < 100;
            if (filterStatus === 'not_started') return student.progress === 0;
            return true;
        })
        .sort((a: any, b: any) => {
            if (sortBy === 'name') return (a.student_name || '').localeCompare(b.student_name || '');
            if (sortBy === 'progress') return (b.progress || 0) - (a.progress || 0);
            if (sortBy === 'enrolled_date') return new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime();
            return 0;
        });

    // Calculate stats
    const stats = {
        total: students.length,
        active: students.filter((s: any) => s.progress > 0 && s.progress < 100).length,
        completed: students.filter((s: any) => s.progress >= 100).length,
        notStarted: students.filter((s: any) => s.progress === 0).length,
        avgProgress: students.length > 0
            ? students.reduce((acc: number, s: any) => acc + (s.progress || 0), 0) / students.length
            : 0
    };

    const handleBack = () => {
        navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`);
    };

    const handleExport = () => {
        // TODO: Implement export functionality
        alert('Chức năng xuất dữ liệu đang được phát triển');
    };

    const handleEmailAll = () => {
        // TODO: Implement email functionality
        alert('Chức năng gửi email đang được phát triển');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-secondary">Học viên đã đăng ký</h1>
                                <p className="text-sm text-slate-500 mt-1">Quản lý và theo dõi tiến độ học tập</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleEmailAll}
                                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Gửi email
                            </button>
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Xuất dữ liệu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Tổng học viên</p>
                                <p className="text-3xl font-bold text-secondary mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Đang học</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.active}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Hoàn thành</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Chưa bắt đầu</p>
                                <p className="text-3xl font-bold text-slate-400 mt-1">{stats.notStarted}</p>
                            </div>
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <Circle className="w-6 h-6 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Tiến độ TB</p>
                                <p className="text-3xl font-bold text-primary mt-1">{stats.avgProgress.toFixed(0)}%</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* Filter Status */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">Tất cả</option>
                                <option value="active">Đang học</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="not_started">Chưa bắt đầu</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-4 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                            >
                                <option value="enrolled_date">Mới nhất</option>
                                <option value="name">Tên A-Z</option>
                                <option value="progress">Tiến độ cao</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Students List */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Học viên</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ngày đăng ký</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tiến độ</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Trạng thái</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Thời gian học</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>Không tìm thấy học viên nào</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student: any, index: number) => {
                                        const progress = student.progress || 0;
                                        const status = progress >= 100 ? 'completed' : progress > 0 ? 'active' : 'not_started';

                                        return (
                                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <span className="text-primary font-semibold">
                                                                {(student.student_name || 'U')[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-secondary">{student.student_name || 'Unknown'}</p>
                                                            <p className="text-sm text-slate-500">{student.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {new Date(student.enrolled_at).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full transition-all ${progress >= 100 ? 'bg-green-500' :
                                                                    progress > 0 ? 'bg-blue-500' : 'bg-slate-300'
                                                                    }`}
                                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 min-w-[45px] text-right">
                                                            {progress.toFixed(0)}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {status === 'completed' && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Hoàn thành
                                                        </span>
                                                    )}
                                                    {status === 'active' && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                            <TrendingUp className="w-4 h-4" />
                                                            Đang học
                                                        </span>
                                                    )}
                                                    {status === 'not_started' && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                                            <Circle className="w-4 h-4" />
                                                            Chưa bắt đầu
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {student.total_time_spent ?
                                                        `${Math.floor(student.total_time_spent / 60)}h ${student.total_time_spent % 60}m` :
                                                        '--'
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseStudentsPage;
