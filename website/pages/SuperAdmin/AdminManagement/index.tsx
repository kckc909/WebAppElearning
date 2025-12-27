import React from 'react';
import { useAccounts } from '../../../hooks/useAccounts';

const SuperAdminManagement: React.FC = () => {
    // Use accounts hook with role filter (2 = Admin)
    const { accounts: admins, loading, error } = useAccounts({ role: 2 });

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

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
                                <td className="px-6 py-4 text-sm font-medium">{admin.full_name}</td>
                                <td className="px-6 py-4 text-sm">{admin.email}</td>
                                <td className="px-6 py-4 text-sm">Admin</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.status === 1
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {admin.status === 1 ? 'Hoạt động' : 'Tạm khóa'}
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
