import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';

const InstructorClassActivity: React.FC = () => {
    const activities = [
        { id: 1, student: 'Nguyễn Văn A', action: 'Nộp bài tập', time: '2 giờ trước' },
        { id: 2, student: 'Trần Thị B', action: 'Hoàn thành bài học', time: '5 giờ trước' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Hoạt động lớp học</h1>
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-medium text-slate-900">{activity.student}</p>
                                <p className="text-sm text-slate-600">{activity.action}</p>
                            </div>
                        </div>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorClassActivity;
