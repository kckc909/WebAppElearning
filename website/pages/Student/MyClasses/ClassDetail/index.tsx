import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, Calendar, Clock, Video, FileText, Award, MessageSquare } from 'lucide-react';

const ClassDetail: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'homework' | 'docs'>('overview');

    const classData = {
        id: parseInt(id || '1'),
        name: 'Web Development - Lớp A1',
        instructor: 'Nguyễn Văn A',
        schedule: 'Thứ 2, 4, 6 - 19:00-21:00',
        students: 25,
        progress: 45,
        nextSession: '2024-12-16 19:00',
        thumbnail: 'https://picsum.photos/seed/class1/800/400',
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link to="/my-classes" className="inline-flex items-center text-primary hover:text-primary-hover mb-4">
                    ← Quay lại lớp học của tôi
                </Link>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <img src={classData.thumbnail} alt={classData.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-secondary mb-2">{classData.name}</h1>
                        <p className="text-slate-600">Giảng viên: {classData.instructor}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-slate-500">Lịch học</p>
                                    <p className="font-medium text-slate-900 text-sm">{classData.schedule}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-slate-500">Học viên</p>
                                    <p className="font-medium text-slate-900 text-sm">{classData.students} người</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-slate-500">Buổi tiếp theo</p>
                                    <p className="font-medium text-slate-900 text-sm">16/12 19:00</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-slate-500">Tiến độ</p>
                                    <p className="font-medium text-slate-900 text-sm">{classData.progress}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="border-b border-slate-200">
                    <div className="flex gap-4 px-6">
                        {[
                            { id: 'overview', label: 'Tổng quan', icon: FileText },
                            { id: 'schedule', label: 'Lịch học', icon: Calendar },
                            { id: 'homework', label: 'Bài tập', icon: FileText },
                            { id: 'docs', label: 'Tài liệu', icon: FileText },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-secondary mb-4">Buổi học gần nhất</h3>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-slate-900">Buổi 12: React Hooks Advanced</h4>
                                            <p className="text-sm text-slate-600 mt-1">Thứ 2, 14/12/2024 - 19:00-21:00</p>
                                        </div>
                                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">
                                            <Video className="w-4 h-4" />
                                            Xem lại
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-secondary mb-4">Thông báo mới</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Bài tập tuần 6 đã được giao', time: '2 giờ trước' },
                                        { title: 'Tài liệu bổ sung về React Hooks', time: '1 ngày trước' },
                                    ].map((notif, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                            <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-slate-900">{notif.title}</p>
                                                <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div>
                            <h3 className="font-bold text-secondary mb-4">Lịch học sắp tới</h3>
                            <div className="space-y-3">
                                {[
                                    { date: '16/12/2024', time: '19:00-21:00', topic: 'Redux Toolkit' },
                                    { date: '18/12/2024', time: '19:00-21:00', topic: 'Next.js Basics' },
                                    { date: '20/12/2024', time: '19:00-21:00', topic: 'API Integration' },
                                ].map((session, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{session.topic}</h4>
                                                <p className="text-sm text-slate-600 mt-1">{session.date} • {session.time}</p>
                                            </div>
                                            <Calendar className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'homework' && (
                        <div>
                            <h3 className="font-bold text-secondary mb-4">Bài tập</h3>
                            <div className="space-y-3">
                                {[
                                    { title: 'Bài tập tuần 6: React Hooks', deadline: '20/12/2024', status: 'pending' },
                                    { title: 'Bài tập tuần 5: State Management', deadline: '13/12/2024', status: 'submitted' },
                                ].map((hw, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{hw.title}</h4>
                                                <p className="text-sm text-slate-600 mt-1">Hạn nộp: {hw.deadline}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${hw.status === 'submitted'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {hw.status === 'submitted' ? 'Đã nộp' : 'Chưa nộp'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'docs' && (
                        <div>
                            <h3 className="font-bold text-secondary mb-4">Tài liệu</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'React Hooks Cheatsheet.pdf', size: '2.5 MB' },
                                    { name: 'Redux Toolkit Guide.pdf', size: '3.2 MB' },
                                ].map((doc, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-red-500" />
                                            <div>
                                                <p className="font-medium text-slate-900">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{doc.size}</p>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 text-sm text-primary border border-primary rounded hover:bg-blue-50 transition-colors">
                                            Tải xuống
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;