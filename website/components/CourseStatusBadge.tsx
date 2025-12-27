import React from 'react';
import { Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface CourseStatusBadgeProps {
    status: 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
    className?: string;
}

export const CourseStatusBadge: React.FC<CourseStatusBadgeProps> = ({ status, className = '' }) => {
    const statusConfig = {
        DRAFT: {
            label: 'Bản nháp',
            icon: Clock,
            className: 'bg-slate-100 text-slate-700 border-slate-200'
        },
        PENDING: {
            label: 'Chờ duyệt',
            icon: Clock,
            className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        },
        PUBLISHED: {
            label: 'Đã xuất bản',
            icon: CheckCircle,
            className: 'bg-green-100 text-green-700 border-green-200'
        },
        REJECTED: {
            label: 'Bị từ chối',
            icon: XCircle,
            className: 'bg-red-100 text-red-700 border-red-200'
        },
        ARCHIVED: {
            label: 'Đã lưu trữ',
            icon: Eye,
            className: 'bg-gray-100 text-gray-700 border-gray-200'
        }
    };

    const config = statusConfig[status] || statusConfig.DRAFT;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.className} ${className}`}>
            <Icon className="w-4 h-4" />
            {config.label}
        </span>
    );
};
