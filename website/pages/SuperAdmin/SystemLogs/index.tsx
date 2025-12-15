import React from 'react';
import { Activity, Clock } from 'lucide-react';

const SuperAdminLogs: React.FC = () => {
    const logs = [
        { id: 1, action: 'User login', user: 'admin@milearn.com', time: '2024-12-14 10:30', status: 'success' },
        { id: 2, action: 'Course created', user: 'instructor@milearn.com', time: '2024-12-14 09:15', status: 'success' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">System Logs</h1>

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
                                <td className="px-6 py-4 text-sm font-medium">{log.action}</td>
                                <td className="px-6 py-4 text-sm">{log.user}</td>
                                <td className="px-6 py-4 text-sm">{log.time}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Success
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminLogs;
