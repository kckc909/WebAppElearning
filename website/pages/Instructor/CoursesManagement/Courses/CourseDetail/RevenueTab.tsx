import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { instructor_routes } from '../../../../page_routes';

interface RevenueTabProps {
    courseId: string;
    revenueData: any[];
    revenueLoading: boolean;
    revenueError: string | null;
    fetchRevenue: () => void;
}

export const RevenueTab: React.FC<RevenueTabProps> = ({
    courseId,
    revenueData,
    revenueLoading,
    revenueError,
    fetchRevenue
}) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header with navigation button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-secondary">Thống kê doanh thu</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Tổng cộng {revenueData.length} giao dịch
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/${instructor_routes.base}${instructor_routes.revenue}`)}
                    className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                >
                    <ExternalLink className="w-4 h-4" />
                    Xem chi tiết doanh thu
                </button>
            </div>

            {/* Loading State */}
            {revenueLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}

            {/* Error State */}
            {revenueError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
                    <p className="text-red-600 font-medium">{revenueError}</p>
                    <button
                        onClick={fetchRevenue}
                        className="mt-3 text-sm text-red-700 underline hover:no-underline"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Charts */}
            {!revenueLoading && !revenueError && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Over Time Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Doanh thu theo thời gian</h3>
                        <div className="h-64">
                            {(() => {
                                const monthlyRevenue = revenueData
                                    .filter((t: any) => t.status === 'COMPLETED' || t.status === 'SUCCESS')
                                    .reduce((acc: any, transaction: any) => {
                                        const date = new Date(transaction.created_at);
                                        const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
                                        acc[monthKey] = (acc[monthKey] || 0) + (transaction.amount || 0);
                                        return acc;
                                    }, {});
                                const chartData = Object.entries(monthlyRevenue).map(([month, amount]) => ({
                                    month,
                                    amount
                                })).slice(-6);

                                if (chartData.length === 0) {
                                    return (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <div className="text-center">
                                                <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>Chưa có doanh thu</p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                                            <Tooltip formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                                            <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Doanh thu" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Total Revenue Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Tổng doanh thu</h3>
                        <div className="h-64 flex items-center justify-center">
                            {revenueData.length === 0 ? (
                                <div className="text-center text-slate-400">
                                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Chưa có giao dịch</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-4">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(
                                            revenueData
                                                .filter((t: any) => t.status === 'COMPLETED' || t.status === 'SUCCESS')
                                                .reduce((acc: number, t: any) => acc + (t.amount || 0), 0)
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <p className="text-green-600 font-semibold">
                                                {revenueData.filter((t: any) => t.status === 'COMPLETED' || t.status === 'SUCCESS').length}
                                            </p>
                                            <p className="text-green-700">Thành công</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <p className="text-slate-600 font-semibold">
                                                {revenueData.filter((t: any) => t.status !== 'COMPLETED' && t.status !== 'SUCCESS').length}
                                            </p>
                                            <p className="text-slate-500">Đang xử lý</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
