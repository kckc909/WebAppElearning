import React, { useState, useEffect } from 'react';
import { Search, Download, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useTransactions } from '../../../../hooks/useTransactions';

const AdminTransactions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: transactions, loading, error, refetch } = useTransactions();

    useEffect(() => {
        refetch();
    }, []);

    const filteredTransactions = transactions.filter((txn: any) => {
        const matchesSearch = (txn.id?.toString() || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (txn.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (txn.course_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Thành công
                    </span>
                );
            case 'pending':
                return (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Đang xử lý
                    </span>
                );
            case 'failed':
                return (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Thất bại
                    </span>
                );
            default:
                return null;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    const totalAmount = filteredTransactions.reduce((sum: number, txn: any) => sum + (txn.amount || 0), 0);
    const completedCount = filteredTransactions.filter((txn: any) => txn.status === 'completed').length;
    const pendingCount = filteredTransactions.filter((txn: any) => txn.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Giao dịch</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Xuất Excel
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng giao dịch</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{filteredTransactions.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Thành công</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{completedCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Đang xử lý</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng giá trị</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalAmount)}</p>
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
                            placeholder="Tìm kiếm theo mã GD, người dùng, sản phẩm..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="completed">Thành công</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="failed">Thất bại</option>
                    </select>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã GD</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày giờ</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sản phẩm</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Số tiền</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTransactions.map((txn: any) => (
                                <tr key={txn.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-900">TXN{String(txn.id).padStart(6, '0')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {txn.created_at ? new Date(txn.created_at).toLocaleString('vi-VN') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{txn.user_name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div>
                                            <p className="font-medium">{txn.course_name || 'N/A'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(txn.amount || 0)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(txn.status)}</td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Không tìm thấy giao dịch nào</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTransactions;