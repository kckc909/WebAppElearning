import React, { useState, useEffect } from 'react';
import { Search, DollarSign, CheckCircle, Clock, Send } from 'lucide-react';
import { usePayouts } from '../../../../hooks/usePayouts';

const AdminPayouts: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: payouts, loading, error, refetch } = usePayouts();

    useEffect(() => {
        refetch();
    }, []);

    const filteredPayouts = payouts.filter((payout: any) => {
        const matchesSearch = (payout.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (payout.instructor_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || payout.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Đã chi trả
                    </span>
                );
            case 'processing':
                return (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Đang xử lý
                    </span>
                );
            case 'pending':
                return (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Chờ xử lý
                    </span>
                );
            default:
                return null;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.abs(amount));
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    const totalPending = payouts.filter((p: any) => p.status === 'pending').reduce((sum: number, p: any) => sum + Math.abs(p.amount || 0), 0);
    const totalCompleted = payouts.filter((p: any) => p.status === 'completed').reduce((sum: number, p: any) => sum + Math.abs(p.amount || 0), 0);
    const pendingCount = payouts.filter((p: any) => p.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Chi trả giảng viên</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Xử lý tất cả
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Chờ chi trả</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">{formatCurrency(totalPending)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Đã chi trả</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalCompleted)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Số lượng chờ</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng tháng này</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalPending + totalCompleted)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm theo mã, giảng viên..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="completed">Đã chi trả</option>
                    </select>
                </div>
            </div>

            {/* Payouts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Giảng viên</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Số tiền</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPayouts.map((payout: any) => (
                                <tr key={payout.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-900">PO{String(payout.id).padStart(6, '0')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {payout.created_at ? new Date(payout.created_at).toLocaleDateString('vi-VN') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payout.instructor_name || payout.user_name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-green-600">{formatCurrency(payout.amount || 0)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(payout.status)}</td>
                                    <td className="px-6 py-4">
                                        {payout.status === 'pending' && (
                                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                                Xử lý
                                            </button>
                                        )}
                                        {payout.status === 'completed' && (
                                            <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                                                Xem
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayouts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Không có dữ liệu chi trả</p>
                    </div>
                )}
            </div>

            {/* Payout Schedule Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">Lịch chi trả</h3>
                <p className="text-sm text-blue-800">
                    Chi trả tự động vào ngày 15 và 30 hàng tháng. Giảng viên cần đạt tối thiểu 1,000,000 VNĐ để được chi trả.
                </p>
            </div>
        </div>
    );
};

export default AdminPayouts;