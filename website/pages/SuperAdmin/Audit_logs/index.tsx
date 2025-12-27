import React from 'react';
import { useAuditLogs } from '../../../hooks/useAuditLogs';
import { Search, AlertCircle, CheckCircle, Info, Calendar } from 'lucide-react';

const AuditLogs: React.FC = () => {
    const { data: logs, loading, error } = useAuditLogs();

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'failed':
                return <AlertCircle className="h-6 w-6 text-red-500" />;
            case 'pending':
                return <Info className="h-6 w-6 text-yellow-500" />;
            default:
                return <Info className="h-6 w-6 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View detailed logs of system activities, user actions, and security events.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                        placeholder="Search logs..."
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <button className="flex items-center justify-center gap-2 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        Date Range
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <ul role="list" className="divide-y divide-gray-100">
                    {logs.map((log) => (
                        <li key={log.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 transition-colors">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="mt-1 flex-none">
                                    {getStatusIcon(log.status)}
                                </div>
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {log.action}
                                    </p>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="truncate">By: <span className="font-medium text-gray-700">{log.user_name}</span></p>
                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current"><circle cx="1" cy="1" r="1" /></svg>
                                        <p className="truncate">Target: {log.resource_type} #{log.resource_id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-4">
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{log.timestamp.split('T')[0]}</p>
                                    <p className="text-xs leading-5 text-gray-500">{log.timestamp.split('T')[1]?.slice(0, 5)}</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <span className="sr-only">View Details</span>
                                    <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
                    <button className="text-sm font-semibold leading-6 text-brand-600 hover:text-brand-500">
                        View all logs <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
