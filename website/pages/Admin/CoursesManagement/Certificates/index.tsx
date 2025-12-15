import React from 'react';
import { Award, Download, Eye, TrendingUp } from 'lucide-react';

const AdminCourseCertificates: React.FC = () => {
    const certificates = [
        {
            id: 1,
            courseName: 'Complete Web Development Bootcamp',
            studentName: 'Nguyễn Văn A',
            completedDate: '2024-12-10',
            certificateId: 'CERT-2024-001234',
            grade: 'A',
        },
        {
            id: 2,
            courseName: 'React - The Complete Guide',
            studentName: 'Trần Thị B',
            completedDate: '2024-12-08',
            certificateId: 'CERT-2024-001235',
            grade: 'A+',
        },
        {
            id: 3,
            courseName: 'Python for Data Science',
            studentName: 'Lê Văn C',
            completedDate: '2024-12-05',
            certificateId: 'CERT-2024-001236',
            grade: 'B+',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Chứng chỉ khóa học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tổng chứng chỉ</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{certificates.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tháng này</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">24</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Điểm A+</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">8</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">68%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificates Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mã chứng chỉ</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Khóa học</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Học viên</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày hoàn thành</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Điểm</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {certificates.map((cert) => (
                                <tr key={cert.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-900">{cert.certificateId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{cert.courseName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{cert.studentName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(cert.completedDate).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${cert.grade.startsWith('A')
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {cert.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCourseCertificates;