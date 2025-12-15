import React from 'react';
import { TrendingUp, Clock, Award, Target, Calendar, BookOpen, Zap, Trophy } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentStats: React.FC = () => {
    // Mock data
    const learningTimeData = [
        { month: 'T1', hours: 12 },
        { month: 'T2', hours: 18 },
        { month: 'T3', hours: 15 },
        { month: 'T4', hours: 22 },
        { month: 'T5', hours: 28 },
        { month: 'T6', hours: 25 },
        { month: 'T7', hours: 30 },
        { month: 'T8', hours: 35 },
        { month: 'T9', hours: 32 },
        { month: 'T10', hours: 38 },
        { month: 'T11', hours: 42 },
        { month: 'T12', hours: 45 },
    ];

    const categoryData = [
        { name: 'Web Development', value: 45, color: '#2563eb' },
        { name: 'Data Science', value: 25, color: '#10b981' },
        { name: 'Design', value: 15, color: '#f59e0b' },
        { name: 'Business', value: 10, color: '#8b5cf6' },
        { name: 'Other', value: 5, color: '#6b7280' },
    ];

    const weeklyActivityData = [
        { day: 'CN', hours: 2 },
        { day: 'T2', hours: 4 },
        { day: 'T3', hours: 3 },
        { day: 'T4', hours: 5 },
        { day: 'T5', hours: 4 },
        { day: 'T6', hours: 6 },
        { day: 'T7', hours: 3 },
    ];

    const achievements = [
        { id: 1, title: 'Người học chăm chỉ', description: 'Học 7 ngày liên tiếp', icon: '🔥', earned: true },
        { id: 2, title: 'Hoàn thành nhanh', description: 'Hoàn thành 5 khóa học', icon: '⚡', earned: true },
        { id: 3, title: 'Chuyên gia', description: 'Đạt 100% trong 3 khóa học', icon: '🎯', earned: true },
        { id: 4, title: 'Người tiên phong', description: 'Học 100 giờ', icon: '🚀', earned: false },
        { id: 5, title: 'Bậc thầy', description: 'Hoàn thành 10 khóa học', icon: '👑', earned: false },
        { id: 6, title: 'Siêu sao', description: 'Đạt 5 sao từ giảng viên', icon: '⭐', earned: false },
    ];

    const stats = {
        totalHours: 156,
        currentStreak: 7,
        coursesCompleted: 8,
        averageScore: 92,
        certificatesEarned: 5,
        totalCourses: 12,
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-secondary">Thống kê học tập</h1>
                <p className="text-slate-600 mt-1">Theo dõi tiến độ và thành tích của bạn</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Clock className="w-8 h-8 opacity-80" />
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.totalHours}h</p>
                            <p className="text-sm opacity-90">Tổng giờ học</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm opacity-90">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+12h tuần này</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Zap className="w-8 h-8 opacity-80" />
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.currentStreak}</p>
                            <p className="text-sm opacity-90">Ngày liên tiếp</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm opacity-90">
                        <Trophy className="w-4 h-4 mr-1" />
                        <span>Kỷ lục: 14 ngày</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <BookOpen className="w-8 h-8 opacity-80" />
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.coursesCompleted}/{stats.totalCourses}</p>
                            <p className="text-sm opacity-90">Khóa học</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm opacity-90">
                        <Target className="w-4 h-4 mr-1" />
                        <span>{Math.round((stats.coursesCompleted / stats.totalCourses) * 100)}% hoàn thành</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <Award className="w-8 h-8 opacity-80" />
                        <div className="text-right">
                            <p className="text-3xl font-bold">{stats.averageScore}%</p>
                            <p className="text-sm opacity-90">Điểm trung bình</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm opacity-90">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+5% so với tháng trước</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Learning Progress Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-secondary mb-6">Tiến độ học tập theo tháng</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={learningTimeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                            />
                            <Line type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-secondary mb-6">Phân bố theo danh mục</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-secondary mb-6">Hoạt động tuần này</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                            labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="hours" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-secondary mb-6">Thành tích</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-xl border-2 transition-all ${achievement.earned
                                ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
                                : 'bg-slate-50 border-slate-200 opacity-60'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">{achievement.icon}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 mb-1">{achievement.title}</h3>
                                    <p className="text-sm text-slate-600">{achievement.description}</p>
                                    {achievement.earned && (
                                        <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                            Đã đạt được
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Completion Rate */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-secondary mb-6">Tỷ lệ hoàn thành khóa học</h2>
                <div className="space-y-4">
                    {[
                        { name: 'Complete Web Development', progress: 100, color: 'bg-green-500' },
                        { name: 'React - The Complete Guide', progress: 85, color: 'bg-blue-500' },
                        { name: 'Python for Data Science', progress: 65, color: 'bg-purple-500' },
                        { name: 'UI/UX Design Masterclass', progress: 45, color: 'bg-amber-500' },
                        { name: 'Advanced JavaScript', progress: 30, color: 'bg-red-500' },
                    ].map((course, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-900">{course.name}</span>
                                <span className="text-slate-600">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <div
                                    className={`${course.color} h-3 rounded-full transition-all duration-500`}
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentStats;