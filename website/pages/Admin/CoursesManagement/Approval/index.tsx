import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Eye, FileText, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { DbCoursesApi } from '../../../../API/implementations/db/DbCoursesApi';
import { CourseStatusBadge } from '../../../../components/CourseStatusBadge';

const AdminCourseApproval: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const coursesApi = new DbCoursesApi();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            let response;
            if (filter === 'pending') {
                response = await coursesApi.getPendingCourses();
            } else {
                response = await coursesApi.getAll({
                    ...(filter !== 'all' && { status: filter.toUpperCase() })
                });
            }

            if (response.success) {
                setCourses(response.data || []);
            } else {
                toast.error(response.message || 'Không thể tải danh sách khóa học');
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [filter]);

    const handleApprove = async (courseId: number) => {
        const accountData = sessionStorage.getItem('Account');
        if (!accountData) {
            toast.error('Vui lòng đăng nhập');
            return;
        }

        const account = JSON.parse(accountData);
        setIsProcessing(true);

        try {
            const response = await coursesApi.approveCourse(courseId, account.id);

            if (response.success) {
                toast.success('Đã duyệt khóa học thành công!', {
                    icon: '✅',
                    duration: 3000
                });
                fetchCourses();
            } else {
                toast.error(response.message || 'Không thể duyệt khóa học');
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!rejectReason.trim()) {
            toast.error('Vui lòng nhập lý do từ chối');
            return;
        }

        const accountData = sessionStorage.getItem('Account');
        if (!accountData) {
            toast.error('Vui lòng đăng nhập');
            return;
        }

        const account = JSON.parse(accountData);
        setIsProcessing(true);

        try {
            const response = await coursesApi.rejectCourse(
                selectedCourse.id,
                account.id,
                rejectReason
            );

            if (response.success) {
                toast.success('Đã từ chối khóa học', {
                    icon: '❌',
                    duration: 3000
                });
                setShowRejectDialog(false);
                setRejectReason('');
                setSelectedCourse(null);
                fetchCourses();
            } else {
                toast.error(response.message || 'Không thể từ chối khóa học');
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setIsProcessing(false);
        }
    };

    const openRejectDialog = (course: any) => {
        setSelectedCourse(course);
        setShowRejectDialog(true);
        setRejectReason('');
    };

    const getStatusCount = (status: string) => {
        return courses.filter((c: any) => {
            if (status === 'pending') return c.status === 'PENDING';
            if (status === 'approved') return c.status === 'PUBLISHED';
            if (status === 'rejected') return c.status === 'REJECTED';
            return false;
        }).length;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Duyệt khóa học</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <p className="text-sm text-slate-600">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {getStatusCount('pending')}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <p className="text-sm text-slate-600">Đã duyệt</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {getStatusCount('approved')}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <p className="text-sm text-slate-600">Từ chối</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                        {getStatusCount('rejected')}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex gap-2">
                    {[
                        { value: 'pending', label: 'Chờ duyệt' },
                        { value: 'approved', label: 'Đã duyệt' },
                        { value: 'rejected', label: 'Từ chối' },
                        { value: 'all', label: 'Tất cả' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.value
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
                {courses.map((course: any) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-secondary">{course.title}</h3>
                                    <CourseStatusBadge status={course.status} />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                                    <span>Giảng viên: {course.accounts?.full_name || course.instructor?.full_name || 'N/A'}</span>
                                    <span>•</span>
                                    <span>{course.course_categories?.name || course.category?.name || 'N/A'}</span>
                                    <span>•</span>
                                    <span>{course._count?.course_sections || 0} sections</span>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Gửi ngày: {course.submitted_at ? new Date(course.submitted_at).toLocaleDateString('vi-VN') :
                                        course.created_at ? new Date(course.created_at).toLocaleDateString('vi-VN') : '-'}
                                </p>
                                {course.rejection_reason && (
                                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm font-medium text-red-700 mb-1">Lý do từ chối:</p>
                                        <p className="text-sm text-red-600">{course.rejection_reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => window.open(`/admin/courses/${course.id}`, '_blank')}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                Xem chi tiết
                            </button>
                            {course.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => handleApprove(course.id)}
                                        disabled={isProcessing}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Duyệt
                                    </button>
                                    <button
                                        onClick={() => openRejectDialog(course)}
                                        disabled={isProcessing}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Từ chối
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-secondary mb-2">Không có khóa học nào</h3>
                    <p className="text-slate-600">Chưa có khóa học nào trong danh mục này</p>
                </div>
            )}

            {/* Reject Dialog */}
            {showRejectDialog && selectedCourse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-secondary mb-2">
                                    Từ chối khóa học
                                </h3>
                                <p className="text-slate-600 mb-1">
                                    <strong>{selectedCourse.title}</strong>
                                </p>
                                <p className="text-sm text-slate-500">
                                    Vui lòng nhập lý do từ chối để giảng viên có thể chỉnh sửa
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Lý do từ chối <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Ví dụ: Nội dung khóa học chưa đầy đủ, thiếu mô tả chi tiết..."
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowRejectDialog(false);
                                    setRejectReason('');
                                    setSelectedCourse(null);
                                }}
                                disabled={isProcessing}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={isProcessing || !rejectReason.trim()}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4" />
                                        Xác nhận từ chối
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourseApproval;