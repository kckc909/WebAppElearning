import React, { useState } from 'react';
import { Search, Users, Calendar, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAllClasses: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const classes = [
        {
            id: 1,
            name: 'Web Development - Lớp A1',
            instructor: 'Nguyễn Văn A',
            students: 25,
            schedule: 'T2, T4, T6 - 19:00-21:00',
            startDate: '2024-01-15',
            status: 'active',
        },
        {
            id: 2,
            name: 'React Advanced - Lớp B2',
            instructor: 'Trần Thị B',
            students: 20,
            schedule: 'T3, T5, T7 - 18:00-20:00',
            startDate: '2024-02-01',
            status: 'active',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Tất cả lớp học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng lớp học</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{classes.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {classes.filter(c => c.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">Tổng học viên</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                        {classes.reduce((sum, c) => sum + c.students, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm text-gray-600">TB học viên/lớp</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {Math.round(classes.reduce((sum, c) => sum + c.students, 0) / classes.length)}
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm lớp học..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-2">{cls.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">Giảng viên: {cls.instructor}</p>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>{cls.students} học viên</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{cls.schedule}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/admin/classes/${cls.id}`}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center text-sm"
                            >
                                <Eye className="w-4 h-4 inline mr-1" />
                                Xem
                            </Link>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminAllClasses;