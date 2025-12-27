import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { instructor_routes } from '../../../../page_routes';

interface StudentsTabProps {
    courseId: string;
    enrollmentsData: any[];
    enrollmentsLoading: boolean;
    enrollmentsError: string | null;
    fetchEnrollments: () => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
    courseId,
    enrollmentsData,
    enrollmentsLoading,
    enrollmentsError,
    fetchEnrollments
}) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header with navigation button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-secondary">Thống kê học viên</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Tổng cộng {enrollmentsData.length} học viên đã đăng ký
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/${instructor_routes.base}courses/${courseId}/students`)}
                    className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                >
                    <ExternalLink className="w-4 h-4" />
                    Xem danh sách đầy đủ
                </button>
            </div>

            {/* Loading State */}
            {enrollmentsLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}

            {/* Error State */}
            {enrollmentsError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
                    <p className="text-red-600 font-medium">{enrollmentsError}</p>
                    <button
                        onClick={fetchEnrollments}
                        className="mt-3 text-sm text-red-700 underline hover:no-underline"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Charts */}
            {!enrollmentsLoading && !enrollmentsError && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Enrollments Over Time Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Đăng ký theo thời gian</h3>
                        <div className="h-64">
                            {(() => {
                                const monthlyData = enrollmentsData.reduce((acc: any, enrollment: any) => {
                                    const date = new Date(enrollment.enrolled_at || enrollment.created_at);
                                    const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
                                    acc[monthKey] = (acc[monthKey] || 0) + 1;
                                    return acc;
                                }, {});
                                const chartData = Object.entries(monthlyData).map(([month, count]) => ({
                                    month,
                                    count
                                })).slice(-6);

                                if (chartData.length === 0) {
                                    return (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <div className="text-center">
                                                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>Chưa có dữ liệu đăng ký</p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                            <YAxis stroke="#64748b" fontSize={12} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#93c5fd" name="Học viên" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Completion Rate Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Tỷ lệ hoàn thành</h3>
                        <div className="h-64">
                            {(() => {
                                const completed = enrollmentsData.filter((e: any) => e.status === 'COMPLETED' || e.progress >= 100).length;
                                const inProgress = enrollmentsData.filter((e: any) => e.progress > 0 && e.progress < 100).length;
                                const notStarted = enrollmentsData.length - completed - inProgress;
                                const pieData = [
                                    { name: 'Hoàn thành', value: completed, color: '#22c55e' },
                                    { name: 'Đang học', value: inProgress, color: '#3b82f6' },
                                    { name: 'Chưa bắt đầu', value: notStarted, color: '#e2e8f0' }
                                ].filter(d => d.value > 0);

                                if (pieData.length === 0 || enrollmentsData.length === 0) {
                                    return (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <div className="text-center">
                                                <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>Chưa có dữ liệu tiến độ</p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
