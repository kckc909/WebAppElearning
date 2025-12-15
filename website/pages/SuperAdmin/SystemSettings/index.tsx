import React from 'react';
import { Settings as SettingsIcon, Database, Mail, Shield } from 'lucide-react';

const SuperAdminSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Database className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Database</h3>
                    <p className="text-sm text-gray-600 mb-4">Cấu hình kết nối database</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Cấu hình
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Mail className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-sm text-gray-600 mb-4">Cấu hình SMTP server</p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Cấu hình
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Shield className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Security</h3>
                    <p className="text-sm text-gray-600 mb-4">Cài đặt bảo mật hệ thống</p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Cấu hình
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <SettingsIcon className="w-8 h-8 text-yellow-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">General</h3>
                    <p className="text-sm text-gray-600 mb-4">Cài đặt chung hệ thống</p>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                        Cấu hình
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSettings;
