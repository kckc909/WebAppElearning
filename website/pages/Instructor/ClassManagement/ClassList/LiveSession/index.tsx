import React from 'react';
import { Video, Play } from 'lucide-react';

const InstructorLiveSession: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Buổi học trực tuyến</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                <Video className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Bắt đầu buổi học</h3>
                <p className="text-sm text-slate-600 mb-4">Nhấn nút bên dưới để bắt đầu buổi học trực tuyến</p>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto">
                    <Play className="w-5 h-5" />
                    Bắt đầu
                </button>
            </div>
        </div>
    );
};

export default InstructorLiveSession;