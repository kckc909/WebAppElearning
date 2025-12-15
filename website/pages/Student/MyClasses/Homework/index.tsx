import React from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const StudentHomework: React.FC = () => {
    const homework = [
        {
            id: 1,
            title: 'Bài tập tuần 6: React Hooks',
            className: 'Web Development - Lớp A1',
            deadline: '2024-12-20',
            status: 'pending',
        },
        {
            id: 2,
            title: 'Bài tập tuần 5: State Management',
            className: 'Web Development - Lớp A1',
            deadline: '2024-12-13',
            status: 'submitted',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Bài tập của tôi</h1>

            <div className="space-y-4">
                {homework.map((hw) => (
                    <div key={hw.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{hw.title}</h3>
                                <p className="text-sm text-slate-600 mt-1">{hw.className}</p>
                                <p className="text-sm text-slate-500 mt-1">Hạn nộp: {hw.deadline}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${hw.status === 'submitted'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {hw.status === 'submitted' ? 'Đã nộp' : 'Chưa nộp'}
                            </span>
                        </div>
                        {hw.status === 'pending' && (
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                                Nộp bài
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentHomework;
