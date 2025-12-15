import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InstructorCourseAnalytics: React.FC = () => {
    const data = [
        { month: 'T1', students: 120 },
        { month: 'T2', students: 145 },
        { month: 'T3', students: 130 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Phân tích khóa học</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold mb-4">Học viên theo tháng</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="students" stroke="#16a34a" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default InstructorCourseAnalytics;
