import React from 'react';
import { Users, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstructorClassManagement: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Quản lý lớp học</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-slate-600">Lớp học của tôi</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">8</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-slate-600">Buổi học tuần này</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">12</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-slate-600">Tổng học viên</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">185</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/instructor/classes/list" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    <Users className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Danh sách lớp học</h3>
                    <p className="text-sm text-slate-600">Xem và quản lý tất cả lớp học</p>
                </Link>
                <Link to="/instructor/classes/schedule" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                    <Calendar className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Lịch giảng dạy</h3>
                    <p className="text-sm text-slate-600">Xem lịch giảng dạy của bạn</p>
                </Link>
            </div>
        </div>
    );
};

export default InstructorClassManagement;
