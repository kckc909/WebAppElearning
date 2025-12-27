import React from 'react';
import { Award, Download } from 'lucide-react';

const InstructorCourseCertificates: React.FC = () => {
    const certificates = [
        { id: 1, studentName: 'Nguyễn Văn A', completedDate: '2024-12-10', certificateId: 'CERT-001' },
        { id: 2, studentName: 'Trần Thị B', completedDate: '2024-12-08', certificateId: 'CERT-002' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Chứng chỉ</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Mã CC</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Học viên</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Ngày</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {certificates.map((cert) => (
                            <tr key={cert.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-mono">{cert.certificateId}</td>
                                <td className="px-6 py-4 text-sm">{cert.studentName}</td>
                                <td className="px-6 py-4 text-sm">{cert.completedDate}</td>
                                <td className="px-6 py-4">
                                    <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                                        <Download className="w-4 h-4" />
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

export default InstructorCourseCertificates;
