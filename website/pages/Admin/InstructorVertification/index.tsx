import React from 'react';
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

const AdminInstructorVerification: React.FC = () => {
    const applications = [
        {
            id: 1,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            expertise: 'Web Development',
            experience: '5 years',
            submittedDate: '2024-12-14',
            status: 'pending',
        },
        {
            id: 2,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            expertise: 'Data Science',
            experience: '3 years',
            submittedDate: '2024-12-13',
            status: 'pending',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Xác minh giảng viên</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                    <p className="text-sm text-gray-600">Chờ xác minh</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{applications.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Đã duyệt</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <XCircle className="w-8 h-8 text-red-600 mb-2" />
                    <p className="text-sm text-gray-600">Từ chối</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                </div>
            </div>

            {/* Applications */}
            <div className="space-y-4">
                {applications.map((app) => (
                    <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                                <p className="text-sm text-gray-600">{app.email}</p>
                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                    <span>Chuyên môn: {app.expertise}</span>
                                    <span>•</span>
                                    <span>Kinh nghiệm: {app.experience}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Gửi ngày: {new Date(app.submittedDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                Chờ xác minh
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Xem hồ sơ
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Duyệt
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                                <XCircle className="w-4 h-4" />
                                Từ chối
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminInstructorVerification;