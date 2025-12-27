import React from 'react';
import { useSystemLogs } from '../../../hooks/useSystemLogs';

// Helper to format datetime
const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const SuperAdminLogs: React.FC = () => {
    const { data: logs, loading, error } = useSystemLogs();

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'success':
                return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Thành công</span>;
            case 'warning':
                return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Cảnh báo</span>;
            case 'error':
                return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Lỗi</span>;
            default:
                return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Không rõ</span>;
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Nhật ký hệ thống</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Người dùng</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Thời gian</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">{log.message}</td>
                                <td className="px-6 py-4 text-sm">{log.category}</td>
                                <td className="px-6 py-4 text-sm">{formatDateTime(log.timestamp)}</td>
                                <td className="px-6 py-4">{getStatusBadge(log.level)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminLogs;
