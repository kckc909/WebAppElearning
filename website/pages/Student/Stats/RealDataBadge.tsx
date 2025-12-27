import React from 'react';
import { CheckCircle } from 'lucide-react';

export const RealDataBadge: React.FC = () => {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
                Đã cập nhật
            </span>
        </div>
    );
};
