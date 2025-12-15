import React from 'react';
import { Users } from 'lucide-react';

const InstructorCourseStudents: React.FC = () => {
    const students = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', progress: 65, enrolledDate: '2024-01-15' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', progress: 82, enrolledDate: '2024-02-20' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Học viên</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tiến độ</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Ngày đăng ký</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium">{student.name}</td>
                                <td className="px-6 py-4 text-sm">{student.email}</td>
                                <td className="px-6 py-4 text-sm">{student.progress}%</td>
                                <td className="px-6 py-4 text-sm">{student.enrolledDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorCourseStudents;
