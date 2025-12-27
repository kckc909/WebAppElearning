import React from 'react';
import { Calendar } from 'lucide-react';

const InstructorClassSchedule: React.FC = () => {
    const sessions = [
        { id: 1, date: '2024-12-16', time: '19:00-21:00', topic: 'React Hooks', status: 'upcoming' },
        { id: 2, date: '2024-12-18', time: '19:00-21:00', topic: 'Redux Toolkit', status: 'upcoming' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Lịch giảng dạy</h1>
            <div className="space-y-3">
                {sessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-5 h-5 text-green-600" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">{session.topic}</h3>
                                    <p className="text-sm text-slate-600">{session.date} • {session.time}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                Sắp tới
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorClassSchedule;
