import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit2, Trash2, Users, Calendar } from 'lucide-react';
import DataTable, { Column, RowAction } from '../../../../components/DataTable';
import { Class } from '../../../../types/types';
import { instructor_routes } from '../../../page_routes';

const InstructorClassList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Mock data - sẽ thay thế bằng API call
    const mockClasses: Class[] = [
        {
            id: 1,
            course_id: 1,
            instructor_id: 1,
            title: 'Lớp IELTS Advanced K15',
            description: 'Lớp học IELTS nâng cao',
            start_date: '2024-01-15',
            end_date: '2024-04-15',
            meeting_link: 'https://meet.google.com/abc-xyz',
            status: 1,
            created_at: '2024-01-10',
        },
        {
            id: 2,
            course_id: 2,
            instructor_id: 1,
            title: 'ReactJS Workshop',
            description: 'Workshop về ReactJS',
            start_date: '2024-01-20',
            end_date: '2024-03-20',
            meeting_link: 'https://meet.google.com/def-uvw',
            status: 1,
            created_at: '2024-01-15',
        },
        {
            id: 3,
            course_id: 3,
            instructor_id: 1,
            title: 'Python Bootcamp',
            description: 'Khóa học Python intensive',
            start_date: '2024-02-01',
            end_date: '2024-05-01',
            meeting_link: 'https://meet.google.com/ghi-rst',
            status: 0,
            created_at: '2024-01-20',
        },
    ];

    const filteredClasses = mockClasses.filter((classItem) =>
        classItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedClasses = filteredClasses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: Column<Class>[] = [
        {
            key: 'title',
            label: 'Class Title',
            render: (classItem) => (
                <div>
                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.class_detail(classItem.id.toString())}`}
                        className="font-medium text-gray-900 hover:text-green-600"
                    >
                        {classItem.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{classItem.description}</p>
                </div>
            ),
        },
        {
            key: 'start_date',
            label: 'Schedule',
            render: (classItem) => (
                <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {classItem.start_date
                                ? new Date(classItem.start_date).toLocaleDateString('vi-VN')
                                : '-'}
                        </span>
                    </div>
                    {classItem.end_date && (
                        <div className="text-gray-500 mt-1">
                            to {new Date(classItem.end_date).toLocaleDateString('vi-VN')}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (classItem) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        classItem.status === 1
                            ? 'bg-green-100 text-green-700'
                            : classItem.status === 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                >
                    {classItem.status === 1 ? 'Active' : classItem.status === 0 ? 'Upcoming' : 'Ended'}
                </span>
            ),
        },
        {
            key: 'meeting_link',
            label: 'Meeting Link',
            render: (classItem) => (
                <a
                    href={classItem.meeting_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                    Join Meeting
                </a>
            ),
        },
    ];

    const actions: RowAction<Class>[] = [
        {
            label: 'View',
            icon: <Eye className="w-4 h-4" />,
            onClick: (classItem) => {
                window.location.href = `/${instructor_routes.base}${instructor_routes.class_detail(classItem.id.toString())}`;
            },
        },
        {
            label: 'Edit',
            icon: <Edit2 className="w-4 h-4" />,
            onClick: (classItem) => {
                console.log('Edit class', classItem.id);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (classItem) => {
                if (confirm(`Are you sure you want to delete "${classItem.title}"?`)) {
                    console.log('Delete class', classItem.id);
                }
            },
            className: 'text-red-600 hover:text-red-700',
        },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
                    <p className="text-gray-600 mt-1">Manage all your classes</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search classes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={paginatedClasses}
                rowKey="id"
                actions={actions}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                pagination={{
                    currentPage,
                    totalItems: filteredClasses.length,
                    pageSize,
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
};

export default InstructorClassList;
