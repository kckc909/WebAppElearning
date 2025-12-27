import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const InstructorClassAttendance: React.FC = () => {
    const students = [
        { id: 1, name: 'Nguyễn Văn A', present: 10, absent: 2, total: 12 },
        { id: 2, name: 'Trần Thị B', present: 11, absent: 1, total: 12 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Điểm danh</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Có mặt</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Vắng</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tỷ lệ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium">{student.name}</td>
                                <td className="px-6 py-4 text-sm text-green-600">{student.present}</td>
                                <td className="px-6 py-4 text-sm text-red-600">{student.absent}</td>
                                <td className="px-6 py-4 text-sm">{Math.round((student.present / student.total) * 100)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorClassAttendance;