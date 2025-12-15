import React from 'react';
import { Calendar } from 'lucide-react';

const AdminClassSchedule: React.FC = () => {
    const sessions = [
        { id: 1, date: '2024-12-16', time: '19:00-21:00', topic: 'React Hooks Advanced', status: 'upcoming' },
        { id: 2, date: '2024-12-18', time: '19:00-21:00', topic: 'Redux Toolkit', status: 'upcoming' },
        { id: 3, date: '2024-12-14', time: '19:00-21:00', topic: 'React Basics', status: 'completed' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Lịch học lớp</h1>

            <div className="space-y-3">
                {sessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                                    <p className="text-sm text-gray-600">{session.date} • {session.time}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                {session.status === 'completed' ? 'Đã học' : 'Sắp tới'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminClassSchedule;