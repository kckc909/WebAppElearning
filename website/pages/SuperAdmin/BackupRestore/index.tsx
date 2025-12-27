import React from 'react';
import { Database, Download, Upload, RefreshCw } from 'lucide-react';
import { useBackups, useCreateBackup, useRestoreBackup } from '../../../hooks/useBackupRestore';

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

// Helper to format size
const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2) + ' GB';
};

const SuperAdminBackup: React.FC = () => {
    const { data: backups, loading, error, refetch } = useBackups();
    const { createBackup, loading: creating } = useCreateBackup();

    const handleCreateBackup = async () => {
        const result = await createBackup('full');
        if (result.success) {
            refetch();
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Backup & Restore</h1>
                <button
                    onClick={handleCreateBackup}
                    disabled={creating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${creating ? 'animate-spin' : ''}`} />
                    {creating ? 'Đang tạo...' : 'Tạo backup mới'}
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
                                    <p className="font-medium text-gray-900">{backup.filename}</p>
                                    <p className="text-xs text-gray-500">{formatSize(backup.size)} • {formatDateTime(backup.created_at)}</p>
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
