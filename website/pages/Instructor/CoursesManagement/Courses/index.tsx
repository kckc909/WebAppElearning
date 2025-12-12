import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import DataTable, { Column, RowAction } from '../../../../components/DataTable';
import { Course } from '../../../../types/types';
import { instructor_routes } from '../../../page_routes';
import Pagination from '../../../../components/Pagination';

const InstructorCourseList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Mock data - sẽ thay thế bằng API call
    const mockCourses: Course[] = [
        {
            id: 1,
            instructor_id: 1,
            category_id: 1,
            title: 'ReactJS từ A-Z',
            short_description: 'Học ReactJS từ cơ bản đến nâng cao',
            description: 'Khóa học toàn diện về ReactJS',
            level: 0,
            language: 'Vietnamese',
            price: 599000,
            discount_price: 399000,
            thumbnail: 'https://picsum.photos/300/200',
            status: 1,
            created_at: '2024-01-15',
        },
        {
            id: 2,
            instructor_id: 1,
            category_id: 1,
            title: 'Python Masterclass',
            short_description: 'Python từ zero to hero',
            description: 'Khóa học Python toàn diện',
            level: 1,
            language: 'English',
            price: 799000,
            discount_price: null,
            thumbnail: 'https://picsum.photos/300/200',
            status: 1,
            created_at: '2024-01-10',
        },
        {
            id: 3,
            instructor_id: 1,
            category_id: 2,
            title: 'UI/UX Design',
            short_description: 'Thiết kế giao diện chuyên nghiệp',
            description: 'Khóa học UI/UX Design',
            level: 0,
            language: 'Vietnamese',
            price: 899000,
            discount_price: 699000,
            thumbnail: 'https://picsum.photos/300/200',
            status: 0,
            created_at: '2024-01-05',
        },
    ];

    const filteredCourses = mockCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: Column<Course>[] = [
        {
            key: 'thumbnail',
            label: 'Thumbnail',
            render: (course) => (
                <img
                    src={course.thumbnail || 'https://via.placeholder.com/80'}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                />
            ),
            width: '100px',
        },
        {
            key: 'title',
            label: 'Course Title',
            render: (course) => (
                <div>
                    <Link
                        to={`/${instructor_routes.base}${instructor_routes.course_detail(course.id.toString())}`}
                        className="font-medium text-gray-900 hover:text-green-600"
                    >
                        {course.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{course.short_description}</p>
                </div>
            ),
        },
        {
            key: 'price',
            label: 'Price',
            render: (course) => (
                <div>
                    {course.discount_price ? (
                        <>
                            <span className="text-gray-400 line-through">
                                {course.price?.toLocaleString('vi-VN')} VNĐ
                            </span>
                            <br />
                            <span className="text-green-600 font-semibold">
                                {course.discount_price.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </>
                    ) : (
                        <span className="text-gray-900 font-semibold">
                            {course.price?.toLocaleString('vi-VN')} VNĐ
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (course) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === 1
                            ? 'bg-green-100 text-green-700'
                            : course.status === 0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                >
                    {course.status === 1 ? 'Published' : course.status === 0 ? 'Draft' : 'Inactive'}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Created',
            render: (course) => (
                <span className="text-sm text-gray-600">
                    {course.created_at ? new Date(course.created_at).toLocaleDateString('vi-VN') : '-'}
                </span>
            ),
        },
    ];

    const actions: RowAction<Course>[] = [
        {
            label: 'View',
            icon: <Eye className="w-4 h-4" />,
            onClick: (course) => {
                window.location.href = `/${instructor_routes.base}${instructor_routes.course_detail(course.id.toString())}`;
            },
        },
        {
            label: 'Edit',
            icon: <Edit2 className="w-4 h-4" />,
            onClick: (course) => {
                // Handle edit
                console.log('Edit course', course.id);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (course) => {
                if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
                    // Handle delete
                    console.log('Delete course', course.id);
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
                    <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                    <p className="text-gray-600 mt-1">Manage all your courses</p>
                </div>
                <Link
                    to={`/${instructor_routes.base}${instructor_routes.courses_create}`}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create Course
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search courses..."
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
                data={paginatedCourses}
                rowKey="id"
                actions={actions}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                pagination={{
                    currentPage,
                    totalItems: filteredCourses.length,
                    pageSize,
                    onPageChange: setCurrentPage,
                }}
            />
        </div>
    );
};

export default InstructorCourseList;
