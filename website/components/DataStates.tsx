import React from 'react';
import { Loader2, AlertCircle, RefreshCw, Inbox, Database, WifiOff } from 'lucide-react';

interface LoadingStateProps {
    message?: string;
}

interface ErrorStateProps {
    error: string;
    onRetry?: () => void;
    compact?: boolean;
}

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
}

// Loading State
export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Đang tải dữ liệu...' }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <p className="text-slate-500 text-sm">{message}</p>
    </div>
);

// Error State
export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry, compact = false }) => {
    // Detect error type
    const isNetworkError = error.toLowerCase().includes('network') || error.toLowerCase().includes('kết nối');
    const isNotFound = error.toLowerCase().includes('not found') || error.toLowerCase().includes('không tìm thấy');

    const Icon = isNetworkError ? WifiOff : AlertCircle;
    const title = isNetworkError ? 'Lỗi kết nối' : isNotFound ? 'Không tìm thấy' : 'Đã xảy ra lỗi';

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <Icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-red-700 truncate">{error}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Thử lại
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 text-center mb-4 max-w-md text-sm">{error}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Thử lại
                </button>
            )}
        </div>
    );
};

// Empty State
export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'Không có dữ liệu',
    message = 'Chưa có dữ liệu nào để hiển thị.',
    icon,
}) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            {icon || <Inbox className="w-8 h-8 text-slate-400" />}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-center max-w-md text-sm">{message}</p>
    </div>
);

// Database Empty State (specific for DB mode)
export const DatabaseEmptyState: React.FC<{ entityName?: string }> = ({ entityName = 'dữ liệu' }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Database className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Database trống</h3>
        <p className="text-slate-500 text-center max-w-md text-sm">
            Chưa có {entityName} nào trong database. Hãy thêm dữ liệu hoặc chuyển sang chế độ Mock Data để xem demo.
        </p>
    </div>
);

// Inline Loading (for smaller areas)
export const InlineLoading: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return <Loader2 className={`${sizeClass} animate-spin text-primary`} />;
};

// Inline Error (for smaller areas)
export const InlineError: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex items-center gap-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
    </div>
);
