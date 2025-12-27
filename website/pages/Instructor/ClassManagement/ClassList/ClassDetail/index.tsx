import React from 'react';
import { Users, Calendar, BookOpen } from 'lucide-react';

const InstructorClassDetail: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Chi tiết lớp học</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-slate-600">Học viên</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">25</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-slate-600">Buổi học</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">12/24</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-slate-600">Tiến độ</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">50%</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorClassDetail;
