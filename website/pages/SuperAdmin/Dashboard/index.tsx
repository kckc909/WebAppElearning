import React from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, Server, Database } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Super Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <Server className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Tổng hệ thống</p>
                    <p className="text-3xl font-bold mt-1">5</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <Users className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Tổng người dùng</p>
                    <p className="text-3xl font-bold mt-1">15,240</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <DollarSign className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Doanh thu tổng</p>
                    <p className="text-3xl font-bold mt-1">2.5B VNĐ</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <Database className="w-8 h-8 opacity-80 mb-4" />
                    <p className="text-sm opacity-90">Database Size</p>
                    <p className="text-3xl font-bold mt-1">45 GB</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Trạng thái hệ thống</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-900">API Server</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-900">Database</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-900">Storage</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;