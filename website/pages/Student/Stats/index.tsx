import React, { useMemo } from 'react';
import { TrendingUp, Clock, Award, Target, BookOpen, Zap, Trophy, PlayCircle, ChevronRight, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { student_routes } from '../../page_routes';
import { ErrorState } from '../../../components/DataStates';
import { 
    useStatsOverview, 
    useStatsStreak,
    useStatsActivity,
    useStatsCategoryDistribution,
    useStatsWeeklyActivity,
    useStatsCourseProgress
} from '../../../hooks/useStatsApi';
import { RealDataBadge } from './RealDataBadge';

const StudentStats: React.FC = () => {
    const { user } = useAuth();

    // Fetch real stats from new API
    const { data: overview, loading: overviewLoading, error: overviewError } = useStatsOverview();
    const { data: streak, loading: streakLoading } = useStatsStreak();
    const { data: activity, loading: activityLoading } = useStatsActivity('month');
    const { data: categoryDistribution, loading: categoryLoading } = useStatsCategoryDistribution();
    const { data: weeklyActivity, loading: weeklyLoading } = useStatsWeeklyActivity();
    const { data: courseProgress, loading: courseProgressLoading } = useStatsCourseProgress();

    // Stats from API
    const stats = useMemo(() => ({
        totalHours: overview?.total_hours || 0,
        totalCourses: overview?.total_courses || 0,
        completedCourses: overview?.completed_courses || 0,
        certificates: overview?.certificates || 0,
        completionRate: overview?.completion_rate || 0,
        currentStreak: streak?.current_streak || 0,
        bestStreak: streak?.longest_streak || 0,
    }), [overview, streak]);

    // Course progress data from API
    const courseProgressData = useMemo(() => {
        const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
        return (courseProgress || []).slice(0, 6).map((course, index) => ({
            name: course.title.substring(0, 20),
            progress: course.progress,
            fill: colors[index % 6]
        }));
    }, [courseProgress]);

    // Category distribution from API
    const categoryData = useMemo(() => {
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
        return (categoryDistribution || []).map((cat, index) => ({
            name: cat.category,
            value: cat.courses,
            color: colors[index % colors.length]
        }));
    }, [categoryDistribution]);

    // Weekly activity from API (already in correct format)
    const weeklyActivityData = useMemo(() => {
        return weeklyActivity || [];
    }, [weeklyActivity]);

    // Monthly trend from activity API
    const monthlyTrendData = useMemo(() => {
        if (!activity || activity.length === 0) {
            return [];
        }

        // Group by month
        const monthMap = new Map<number, number>();
        activity.forEach(a => {
            const date = new Date(a.date);
            const month = date.getMonth();
            const current = monthMap.get(month) || 0;
            monthMap.set(month, current + a.hours);
        });

        // Get last 6 months
        const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
        const currentMonth = new Date().getMonth();
        const result = [];

        for (let i = 5; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            result.push({
                month: months[monthIndex],
                hours: Math.round((monthMap.get(monthIndex) || 0) * 10) / 10
            });
        }

        return result;
    }, [activity]);

    // Loading state
    const isLoading = overviewLoading || streakLoading || activityLoading || categoryLoading || weeklyLoading || courseProgressLoading;

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="h-9 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-slate-100 rounded-xl p-6 h-32 animate-pulse"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-100 rounded-xl p-6 h-80 animate-pulse"></div>
                    <div className="bg-slate-100 rounded-xl p-6 h-80 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (overviewError) {
        return (
            <div className="max-w-7xl mx-auto">
                <ErrorState error={overviewError} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    // Achievements based on real data
    const achievements = [
        {
            id: 1,
            title: 'Người khởi đầu',
            description: 'Đăng ký khóa học đầu tiên',
            icon: '🚀',
            earned: stats.totalCourses > 0
        },
        {
            id: 2,
            title: 'Hoàn thành xuất sắc',
            description: 'Hoàn thành một khóa học',
            icon: '🎯',
            earned: stats.completedCourses > 0
        },
        {
            id: 3,
            title: 'Học giả chăm chỉ',
            description: 'Học hơn 10 giờ',
            icon: '📚',
            earned: stats.totalHours >= 10
        },
        {
            id: 4,
            title: 'Nhà sưu tập chứng chỉ',
            description: 'Đạt được chứng chỉ đầu tiên',
            icon: '🏆',
            earned: stats.certificates > 0
        },
        {
            id: 5,
            title: 'Người học chăm chỉ',
            description: 'Học 7 ngày liên tiếp',
            icon: '🔥',
            earned: stats.currentStreak >= 7
        },
        {
            id: 6,
            title: 'Đa tài năng',
            description: 'Học 5 khóa học khác nhau',
            icon: '⭐',
            earned: stats.totalCourses >= 5
        },
    ];

    const earnedAchievements = achievements.filter(a => a.earned);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">Thống kê học tập</h1>
                        <RealDataBadge />
                    </div>
                    <p className="text-slate-600">Theo dõi tiến độ và thành tích của bạn từ dữ liệu thực tế</p>
                </div>
                <Link
                    to={`/${student_routes.my_courses}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                >
                    <PlayCircle className="w-4 h-4" />
                    Tiếp tục học
                </Link>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold">{stats.totalHours}</p>
                            <p className="text-sm text-blue-100">giờ học</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center text-sm text-blue-100">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span>Tổng thời gian học tập</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold">{stats.currentStreak}</p>
                            <p className="text-sm text-emerald-100">ngày streak</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center text-sm text-emerald-100">
                            <Trophy className="w-4 h-4 mr-2" />
                            <span>Kỷ lục: {stats.bestStreak} ngày</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold">{stats.completedCourses}/{stats.totalCourses}</p>
                            <p className="text-sm text-purple-100">khóa học</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center text-sm text-purple-100">
                            <Target className="w-4 h-4 mr-2" />
                            <span>{stats.completionRate}% hoàn thành</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold">{stats.certificates}</p>
                            <p className="text-sm text-amber-100">chứng chỉ</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center text-sm text-amber-100">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span>Đã đạt được</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Learning Progress Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Xu hướng học tập</h2>
                    {stats.totalCourses > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={monthlyTrendData}>
                                <defs>
                                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                                    formatter={(value: any) => [`${value} giờ`, 'Thời gian học']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="hours"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorHours)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
                            <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
                            <p className="text-lg font-medium">Chưa có dữ liệu học tập</p>
                            <p className="text-sm">Đăng ký khóa học để bắt đầu theo dõi tiến độ</p>
                            <Link
                                to={`/${student_routes.courses}`}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                            >
                                Khám phá khóa học
                            </Link>
                        </div>
                    )}
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Phân bố theo chủ đề</h2>
                    {categoryData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any, name: any) => [`${value} khóa học`, name]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {categoryData.map((cat, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                            <span className="text-slate-600">{cat.name}</span>
                                        </div>
                                        <span className="font-medium text-slate-900">{cat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[280px] text-slate-500">
                            <Target className="w-12 h-12 text-slate-300 mb-3" />
                            <p className="text-sm">Chưa có dữ liệu</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Hoạt động trong tuần</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                            formatter={(value: any) => [`${value} giờ`, 'Thời gian học']}
                        />
                        <Bar
                            dataKey="hours"
                            fill="#10b981"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={50}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Course Progress */}
            {courseProgressData.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Tiến độ khóa học</h2>
                        <Link
                            to={`/${student_routes.my_courses}`}
                            className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1"
                        >
                            Xem tất cả
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courseProgressData.map((course: any, index: number) => (
                            <div key={index} className="p-4 bg-slate-50 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-slate-900 truncate flex-1 mr-4">{course.name}...</span>
                                    <span className="text-sm font-bold" style={{ color: course.fill }}>{course.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all"
                                        style={{ width: `${course.progress}%`, backgroundColor: course.fill }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Thành tích</h2>
                    <span className="text-sm text-slate-500">
                        {earnedAchievements.length}/{achievements.length} đã đạt
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-xl border-2 transition-all ${achievement.earned
                                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
                                    : 'bg-slate-50 border-slate-200 opacity-50'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`text-3xl ${achievement.earned ? '' : 'grayscale'}`}>
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900">{achievement.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                                    {achievement.earned && (
                                        <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                            ✓ Đã đạt
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentStats;