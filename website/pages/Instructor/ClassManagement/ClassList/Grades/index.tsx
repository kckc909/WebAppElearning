import React from 'react';
import { Award } from 'lucide-react';

const InstructorClassGrades: React.FC = () => {
    const students = [
        { id: 1, name: 'Nguyễn Văn A', grade: 'A', score: 95 },
        { id: 2, name: 'Trần Thị B', grade: 'A+', score: 98 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Điểm số</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Điểm</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Xếp loại</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium">{student.name}</td>
                                <td className="px-6 py-4 text-sm">{student.score}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                        {student.grade}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorClassGrades;