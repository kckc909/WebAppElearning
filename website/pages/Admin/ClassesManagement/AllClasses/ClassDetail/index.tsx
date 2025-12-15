import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Calendar, Clock, BookOpen } from 'lucide-react';

const AdminClassDetail: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="space-y-6">
            <Link to="/admin/classes" className="text-blue-600 hover:text-blue-700">← Quay lại</Link>
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết lớp học</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Học viên</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">25</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Calendar className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Buổi học</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">12/24</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <Clock className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Tiến độ</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">50%</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <BookOpen className="w-8 h-8 text-yellow-600 mb-2" />
                    <p className="text-sm text-gray-600">Bài tập</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Thông tin lớp học</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tên lớp:</span>
                        <span className="font-medium">Web Development - Lớp A1</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Giảng viên:</span>
                        <span className="font-medium">Nguyễn Văn A</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Lịch học:</span>
                        <span className="font-medium">T2, T4, T6 - 19:00-21:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClassDetail;