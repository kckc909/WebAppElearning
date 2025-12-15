import React from 'react';
import { Database, Download, Upload, RefreshCw } from 'lucide-react';

const SuperAdminBackup: React.FC = () => {
    const backups = [
        { id: 1, name: 'backup_2024_12_14.sql', size: '2.5 GB', date: '2024-12-14 02:00' },
        { id: 2, name: 'backup_2024_12_13.sql', size: '2.4 GB', date: '2024-12-13 02:00' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Backup & Restore</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Tạo backup mới
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Danh sách backup</h2>
                <div className="space-y-3">
                    {backups.map((backup) => (
                        <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Database className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-900">{backup.name}</p>
                                    <p className="text-xs text-gray-500">{backup.size} • {backup.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                                    <Upload className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminBackup;
