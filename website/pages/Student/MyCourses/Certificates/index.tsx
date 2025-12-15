import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';

const StudentCourseCertificates: React.FC = () => {
    const certificates = [
        {
            id: 1,
            courseName: 'Complete Web Development Bootcamp 2024',
            completedDate: '2024-12-10',
            certificateId: 'CERT-2024-001234',
            grade: 'A',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Chứng chỉ của tôi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                    <div key={cert.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border-2 border-blue-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <Award className="w-12 h-12 text-yellow-500" />
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                Điểm {cert.grade}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{cert.courseName}</h3>
                        <p className="text-sm text-slate-600 mb-1">Mã chứng chỉ: {cert.certificateId}</p>
                        <p className="text-sm text-slate-600 mb-4">Hoàn thành: {cert.completedDate}</p>
                        <div className="flex gap-2">
                            <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                Tải xuống
                            </button>
                            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {certificates.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có chứng chỉ</h3>
                    <p className="text-slate-600">Hoàn thành khóa học để nhận chứng chỉ</p>
                </div>
            )}
        </div>
    );
};

export default StudentCourseCertificates;
