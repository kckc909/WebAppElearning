import React from 'react';
import { Shield, Users, Settings } from 'lucide-react';

const SuperAdminManagement: React.FC = () => {
    const admins = [
        { id: 1, name: 'Admin 1', email: 'admin1@milearn.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Admin 2', email: 'admin2@milearn.com', role: 'Admin', status: 'active' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Admin</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vai trò</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">{admin.name}</td>
                                <td className="px-6 py-4 text-sm">{admin.email}</td>
                                <td className="px-6 py-4 text-sm">{admin.role}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        Hoạt động
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

export default SuperAdminManagement;
