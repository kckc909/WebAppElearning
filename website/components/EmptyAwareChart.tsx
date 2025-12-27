/**
 * EMPTY-AWARE CHART CONTAINER
 * 
 * Component wrapper cho tất cả biểu đồ, xử lý trạng thái empty data thống nhất.
 * 
 * Nguyên tắc:
 * - Empty state là trạng thái hợp lệ, KHÔNG phải lỗi
 * - LUÔN render biểu đồ, kể cả khi data rỗng
 * - Hiển thị overlay message giải thích lý do
 * - Visual: opacity thấp, màu trung tính, không animation
 */

import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

// Context type để xác định message phù hợp
export type EmptyMessageContext = 'student' | 'instructor' | 'admin' | 'general';

// Chart type để xác định icon phù hợp
export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'metric';

interface EmptyAwareChartProps {
    /** Dữ liệu của chart - dùng để kiểm tra empty */
    data: any[] | Record<string, any> | number | null | undefined;
    /** Context để hiển thị message phù hợp */
    context?: EmptyMessageContext;
    /** Loại biểu đồ */
    chartType?: ChartType;
    /** Custom empty message (override default) */
    emptyMessage?: string;
    /** Custom empty title */
    emptyTitle?: string;
    /** Children là biểu đồ thực tế */
    children: React.ReactNode;
    /** Chiều cao tối thiểu của container */
    minHeight?: string;
    /** Class bổ sung */
    className?: string;
    /** Có phải là metric card không (sẽ xử lý khác) */
    isMetricCard?: boolean;
}

// Helper để kiểm tra data có empty hay không
const isDataEmpty = (data: any): boolean => {
    if (data === null || data === undefined) return true;
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === 'number') return data === 0;
    if (typeof data === 'object') {
        // Kiểm tra xem tất cả giá trị có bằng 0 không
        const values = Object.values(data);
        if (values.length === 0) return true;
        return values.every(v => v === 0 || v === null || v === undefined);
    }
    return false;
};

// Default messages theo context
const getEmptyMessage = (context: EmptyMessageContext): { title: string; message: string } => {
    switch (context) {
        case 'student':
            return {
                title: 'Chưa có dữ liệu',
                message: 'Bạn chưa có dữ liệu học tập vì chưa tham gia khóa học nào.'
            };
        case 'instructor':
            return {
                title: 'Chưa có thống kê',
                message: 'Chưa có học viên hoặc khóa học chưa hoạt động nên chưa có thống kê.'
            };
        case 'admin':
            return {
                title: 'Chưa có dữ liệu',
                message: 'Chưa có dữ liệu phát sinh trong khoảng thời gian này.'
            };
        default:
            return {
                title: 'Không có dữ liệu',
                message: 'Chưa có dữ liệu để hiển thị.'
            };
    }
};

// Icon theo loại chart
const getChartIcon = (type: ChartType) => {
    switch (type) {
        case 'line':
            return <TrendingUp className="w-5 h-5" />;
        case 'bar':
            return <BarChart3 className="w-5 h-5" />;
        case 'pie':
            return <PieChart className="w-5 h-5" />;
        case 'area':
            return <Activity className="w-5 h-5" />;
        default:
            return <BarChart3 className="w-5 h-5" />;
    }
};

export const EmptyAwareChart: React.FC<EmptyAwareChartProps> = ({
    data,
    context = 'general',
    chartType = 'bar',
    emptyMessage,
    emptyTitle,
    children,
    minHeight = 'min-h-[300px]',
    className = '',
    isMetricCard = false
}) => {
    const isEmpty = isDataEmpty(data);
    const defaultMessage = getEmptyMessage(context);

    const title = emptyTitle || defaultMessage.title;
    const message = emptyMessage || defaultMessage.message;

    if (isMetricCard) {
        // Metric card xử lý đơn giản hơn
        return (
            <div className={`relative ${className}`}>
                {isEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="bg-slate-900/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                            Chưa có dữ liệu
                        </div>
                    </div>
                )}
                <div className={isEmpty ? 'opacity-40 grayscale pointer-events-none' : ''}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${minHeight} ${className}`}>
            {/* Chart luôn được render */}
            <div className={`h-full ${isEmpty ? 'opacity-30 grayscale pointer-events-none select-none' : ''}`}>
                {children}
            </div>

            {/* Overlay message khi empty */}
            {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm px-6 py-4 max-w-xs text-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                            {getChartIcon(chartType)}
                        </div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-1">{title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * EmptyAwareMetric - Wrapper cho metric cards/stat boxes
 */
interface EmptyAwareMetricProps {
    value: number | null | undefined;
    context?: EmptyMessageContext;
    children: React.ReactNode;
    className?: string;
}

export const EmptyAwareMetric: React.FC<EmptyAwareMetricProps> = ({
    value,
    context = 'general',
    children,
    className = ''
}) => {
    const isEmpty = value === null || value === undefined || value === 0;

    return (
        <div className={`relative ${className}`}>
            {isEmpty && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="bg-slate-600/80 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Chưa có dữ liệu
                    </div>
                </div>
            )}
            <div className={isEmpty ? 'opacity-60' : ''}>
                {children}
            </div>
        </div>
    );
};

/**
 * EmptyStatePlaceholder - Placeholder đơn giản cho các section rỗng
 */
interface EmptyStatePlaceholderProps {
    icon?: React.ReactNode;
    title: string;
    message: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export const EmptyStatePlaceholder: React.FC<EmptyStatePlaceholderProps> = ({
    icon,
    title,
    message,
    action,
    className = ''
}) => {
    return (
        <div className={`bg-slate-50 border border-slate-200 border-dashed rounded-xl p-8 text-center ${className}`}>
            {icon && (
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    {icon}
                </div>
            )}
            <h4 className="text-base font-semibold text-slate-700 mb-2">{title}</h4>
            <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">{message}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyAwareChart;
