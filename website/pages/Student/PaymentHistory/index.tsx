import React, { useState } from 'react';
import { Download, Search, Filter, ChevronDown, CheckCircle2, XCircle, Clock } from 'lucide-react';
import DataTable from '../../../components/DataTable';

interface Transaction {
    id: number;
    date: string;
    courseTitle: string;
    amount: number;
    paymentMethod: string;
    status: 'completed' | 'pending' | 'failed';
    invoiceUrl: string;
}

const StudentPaymentHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [methodFilter, setMethodFilter] = useState<string>('all');
    const [dateRange, setDateRange] = useState<string>('all');

    const transactions: Transaction[] = [
        {
            id: 1,
            date: '2024-12-10',
            courseTitle: 'Complete Web Development Bootcamp 2024',
            amount: 299000,
            paymentMethod: 'Thẻ tín dụng',
            status: 'completed',
            invoiceUrl: '#',
        },
        {
            id: 2,
            date: '2024-12-08',
            courseTitle: 'React - The Complete Guide',
            amount: 349000,
            paymentMethod: 'MoMo',
            status: 'completed',
            invoiceUrl: '#',
        },
        {
            id: 3,
            date: '2024-12-05',
            courseTitle: 'Python for Data Science',
            amount: 399000,
            paymentMethod: 'ZaloPay',
            status: 'pending',
            invoiceUrl: '#',
        },
        {
            id: 4,
            date: '2024-11-28',
            courseTitle: 'UI/UX Design Masterclass',
            amount: 279000,
            paymentMethod: 'Chuyển khoản',
            status: 'failed',
            invoiceUrl: '#',
        },
        {
            id: 5,
            date: '2024-11-20',
            courseTitle: 'Advanced JavaScript Course',
            amount: 329000,
            paymentMethod: 'Thẻ tín dụng',
            status: 'completed',
            invoiceUrl: '#',
        },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            completed: {
                icon: <CheckCircle2 className="w-4 h-4" />,
                text: 'Thành công',
                className: 'bg-green-100 text-green-700 border-green-200',
            },
            pending: {
                icon: <Clock className="w-4 h-4" />,
                text: 'Đang xử lý',
                className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            },
            failed: {
                icon: <XCircle className="w-4 h-4" />,
                text: 'Thất bại',
                className: 'bg-red-100 text-red-700 border-red-200',
            },
        };

        const badge = badges[status as keyof typeof badges];
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                {badge.icon}
                {badge.text}
            </span>
        );
    };

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
        const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter;

        let matchesDate = true;
        if (dateRange !== 'all') {
            const transactionDate = new Date(transaction.date);
            const now = new Date();
            if (dateRange === '7days') {
                matchesDate = (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
            } else if (dateRange === '30days') {
                matchesDate = (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24) <= 30;
            } else if (dateRange === '90days') {
                matchesDate = (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24) <= 90;
            }
        }

        return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    });

    const totalSpent = transactions
        .filter((t) => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-secondary">Lịch sử thanh toán</h1>
                <p className="text-slate-600 mt-1">Xem và quản lý các giao dịch của bạn</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Tổng chi tiêu</p>
                            <p className="text-2xl font-bold text-primary mt-1">{formatCurrency(totalSpent)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Giao dịch thành công</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {transactions.filter((t) => t.status === 'completed').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Đang xử lý</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">
                                {transactions.filter((t) => t.status === 'pending').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tìm kiếm</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm theo tên khóa học..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Trạng thái</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="all">Tất cả</option>
                            <option value="completed">Thành công</option>
                            <option value="pending">Đang xử lý</option>
                            <option value="failed">Thất bại</option>
                        </select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Thời gian</label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="all">Tất cả</option>
                            <option value="7days">7 ngày qua</option>
                            <option value="30days">30 ngày qua</option>
                            <option value="90days">90 ngày qua</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Ngày
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Khóa học
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Số tiền
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Phương thức
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                    Hóa đơn
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            <div className="max-w-xs">
                                                <p className="font-medium line-clamp-2">{transaction.courseTitle}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(transaction.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {transaction.status === 'completed' && (
                                                <button className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm">
                                                    <Download className="w-4 h-4" />
                                                    Tải xuống
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <p className="text-slate-600 font-medium">Không tìm thấy giao dịch nào</p>
                                            <p className="text-sm text-slate-500 mt-1">Thử thay đổi bộ lọc của bạn</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredTransactions.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                        <p className="text-sm text-slate-600">
                            Hiển thị <span className="font-medium">{filteredTransactions.length}</span> giao dịch
                        </p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">
                                1
                            </button>
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentPaymentHistory;