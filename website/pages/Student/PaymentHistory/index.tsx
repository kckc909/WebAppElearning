import React, { useState, useEffect } from 'react';
import { Download, Search, CheckCircle2, XCircle, Clock, FileText, X, Printer, Mail } from 'lucide-react';

// Invoice Detail Modal Component
interface InvoiceModalProps {
    invoice: any;
    onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 relative">
                {/* Header Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="In hóa đơn"
                    >
                        <Printer className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Invoice Content */}
                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-8 mb-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-primary mb-2">MiLean Platform</h1>
                                <p className="text-slate-600">Nền tảng học trực tuyến</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold text-secondary mb-2">HÓA ĐƠN</h2>
                                <p className="text-sm text-slate-600">Mã: <span className="font-semibold text-slate-900">{invoice.invoice_number}</span></p>
                                <p className="text-sm text-slate-600 mt-1">Ngày: {formatDate(invoice.issued_at)}</p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-6">
                            {invoice.status === 'paid' && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-200">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-semibold">Đã thanh toán</span>
                                </div>
                            )}
                            {invoice.status === 'pending' && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg border border-yellow-200">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-semibold">Đang xử lý</span>
                                </div>
                            )}
                            {invoice.status === 'cancelled' && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg border border-red-200">
                                    <XCircle className="w-5 h-5" />
                                    <span className="font-semibold">Đã hủy</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 uppercase mb-3">Khách hàng</h3>
                            <p className="font-semibold text-slate-900 text-lg">{invoice.customer_name || 'Khách hàng'}</p>
                            <p className="text-slate-600 mt-1">{invoice.customer_email || 'N/A'}</p>
                            {invoice.customer_phone && (
                                <p className="text-slate-600 mt-1">{invoice.customer_phone}</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 uppercase mb-3">Phương thức thanh toán</h3>
                            <p className="text-slate-900 font-medium">
                                {invoice.payment_method === 'bank_transfer' ? 'Chuyển khoản ngân hàng' :
                                    invoice.payment_method === 'momo' ? 'Ví MoMo' :
                                        invoice.payment_method === 'zalopay' ? 'ZaloPay' :
                                            'Thẻ tín dụng/Ghi nợ'}
                            </p>
                            {invoice.paid_at && (
                                <p className="text-slate-600 mt-1 text-sm">Thanh toán: {formatDate(invoice.paid_at)}</p>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-slate-600 uppercase mb-4">Chi tiết khóa học</h3>
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">STT</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Khóa học</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Giá gốc</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Giảm giá</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {invoice.items?.map((item: any, index: number) => (
                                        <tr key={item.id || index} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-slate-900">{item.course_title}</p>
                                                {item.course_id && (
                                                    <p className="text-xs text-slate-500 mt-1">ID: {item.course_id}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-600">
                                                {formatCurrency(item.original_price || item.price || 0)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-green-600">
                                                {item.discount_amount ? `-${formatCurrency(item.discount_amount)}` : '0₫'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                                                {formatCurrency(item.price || 0)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-slate-200 pt-6 mb-8">
                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center justify-between w-full md:w-1/2 lg:w-1/3">
                                <span className="text-slate-600">Tạm tính:</span>
                                <span className="font-medium text-slate-900">
                                    {formatCurrency((invoice.subtotal || invoice.total_amount || 0))}
                                </span>
                            </div>
                            {invoice.discount_amount && invoice.discount_amount > 0 && (
                                <div className="flex items-center justify-between w-full md:w-1/2 lg:w-1/3">
                                    <span className="text-slate-600">Giảm giá:</span>
                                    <span className="font-medium text-green-600">
                                        -{formatCurrency(invoice.discount_amount)}
                                    </span>
                                </div>
                            )}
                            {invoice.tax_amount && invoice.tax_amount > 0 && (
                                <div className="flex items-center justify-between w-full md:w-1/2 lg:w-1/3">
                                    <span className="text-slate-600">Thuế VAT ({invoice.tax_rate || 10}%):</span>
                                    <span className="font-medium text-slate-900">
                                        {formatCurrency(invoice.tax_amount)}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between w-full md:w-1/2 lg:w-1/3 pt-3 border-t border-slate-200">
                                <span className="text-lg font-bold text-secondary">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-primary">
                                    {formatCurrency(invoice.total_amount || 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2">Ghi chú</h3>
                            <p className="text-sm text-blue-700">{invoice.notes}</p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="border-t border-slate-200 pt-6 text-center">
                        <p className="text-sm text-slate-600">
                            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            Hóa đơn này được tạo tự động bởi hệ thống. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ support@eduplatform.vn
                        </p>
                    </div>
                </div>

                {/* Print Button (visible only when viewing) */}
                <div className="px-8 pb-8 flex gap-3 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                        <Printer className="w-5 h-5" />
                        In hóa đơn
                    </button>
                    <button
                        onClick={() => {
                            // TODO: Implement email sending
                            alert('Chức năng gửi email đang được phát triển');
                        }}
                        className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                        <Mail className="w-5 h-5" />
                        Gửi email
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudentPaymentHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [dateRange, setDateRange] = useState<string>('all');
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const accountData = sessionStorage.getItem('Account');
            const account = accountData ? JSON.parse(accountData) : null;

            if (!account) {
                setError('Vui lòng đăng nhập');
                return;
            }

            const API_BASE_URL = (import.meta as any).env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
            const response = await fetch(`${API_BASE_URL}/checkout/invoices`, {
                headers: {
                    'x-user-id': account.id.toString()
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch invoices');
            }

            const data = await response.json();
            if (data.success) {
                setInvoices(data.invoices || []);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            paid: {
                icon: <CheckCircle2 className="w-4 h-4" />,
                text: 'Đã thanh toán',
                className: 'bg-green-100 text-green-700 border-green-200',
            },
            pending: {
                icon: <Clock className="w-4 h-4" />,
                text: 'Đang xử lý',
                className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            },
            cancelled: {
                icon: <XCircle className="w-4 h-4" />,
                text: 'Đã hủy',
                className: 'bg-red-100 text-red-700 border-red-200',
            },
        };

        const badge = badges[status as keyof typeof badges] || badges.pending;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                {badge.icon}
                {badge.text}
            </span>
        );
    };

    const filteredInvoices = invoices.filter((invoice: any) => {
        // Search by invoice number or course titles
        const invoiceNumber = invoice.invoice_number || '';
        const coursesTitles = invoice.items?.map((item: any) => item.course_title || '').join(' ') || '';
        const matchesSearch =
            invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coursesTitles.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

        let matchesDate = true;
        if (dateRange !== 'all') {
            const invoiceDate = new Date(invoice.issued_at);
            const now = new Date();
            const daysDiff = (now.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24);

            if (dateRange === '7days') {
                matchesDate = daysDiff <= 7;
            } else if (dateRange === '30days') {
                matchesDate = daysDiff <= 30;
            } else if (dateRange === '90days') {
                matchesDate = daysDiff <= 90;
            }
        }

        return matchesSearch && matchesStatus && matchesDate;
    });

    const totalSpent = invoices
        .filter((inv: any) => inv.status === 'paid')
        .reduce((sum: number, inv: any) => sum + (inv.total_amount || 0), 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-700 font-medium">Lỗi: {error}</p>
                    <button
                        onClick={fetchInvoices}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Invoice Modal */}
            {selectedInvoice && (
                <InvoiceModal
                    invoice={selectedInvoice}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Lịch sử thanh toán</h1>
                    <p className="text-slate-600 mt-1">Xem và quản lý hóa đơn của bạn</p>
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
                                <p className="text-sm text-slate-600">Hóa đơn đã thanh toán</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    {invoices.filter((inv: any) => inv.status === 'paid').length}
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
                                <p className="text-sm text-slate-600">Tổng hóa đơn</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">
                                    {invoices.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-slate-600" />
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
                                    placeholder="Tìm theo mã hóa đơn hoặc tên khóa học..."
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
                                <option value="paid">Đã thanh toán</option>
                                <option value="pending">Đang xử lý</option>
                                <option value="cancelled">Đã hủy</option>
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

                {/* Invoices Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Mã hóa đơn
                                    </th>
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
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredInvoices.length > 0 ? (
                                    filteredInvoices.map((invoice: any) => (
                                        <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {invoice.invoice_number}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {formatDate(invoice.issued_at)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-900">
                                                <div className="max-w-xs">
                                                    {invoice.items && invoice.items.length > 0 ? (
                                                        <div>
                                                            <p className="font-medium line-clamp-1">
                                                                {invoice.items[0].course_title}
                                                            </p>
                                                            {invoice.items.length > 1 && (
                                                                <p className="text-xs text-slate-500 mt-1">
                                                                    +{invoice.items.length - 1} khóa học khác
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-slate-500">N/A</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                                {formatCurrency(invoice.total_amount || 0)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(invoice.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm"
                                                    onClick={() => setSelectedInvoice(invoice)}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                                    <FileText className="w-8 h-8 text-slate-400" />
                                                </div>
                                                <p className="text-slate-600 font-medium">Không có hóa đơn nào</p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {searchTerm || statusFilter !== 'all' || dateRange !== 'all'
                                                        ? 'Thử thay đổi bộ lọc của bạn'
                                                        : 'Bạn chưa có giao dịch nào'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredInvoices.length > 0 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Hiển thị <span className="font-medium">{filteredInvoices.length}</span> hóa đơn
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentPaymentHistory;
