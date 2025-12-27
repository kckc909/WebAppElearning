import React from 'react';
import { Users, Mail } from 'lucide-react';

const InstructorClassMembers: React.FC = () => {
    const members = [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'student' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'student' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Thành viên</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Vai trò</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium">{member.name}</td>
                                <td className="px-6 py-4 text-sm">{member.email}</td>
                                <td className="px-6 py-4 text-sm">Học viên</td>
                                <td className="px-6 py-4">
                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorClassMembers;