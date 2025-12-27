import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Users, Star, Clock, BookOpen, DollarSign, ArrowLeft,
    CheckCircle, XCircle, AlertCircle, Loader2, Play, FileText,
    ChevronDown, ChevronRight, Video, Code, Image as ImageIcon,
    Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DbCoursesApi } from '../../../../../API/implementations/db/DbCoursesApi';
import { CourseStatusBadge } from '../../../../../components/CourseStatusBadge';
import axiosInstance from '../../../../../API/api';
import { admin_routes } from '../../../../page_routes';

const AdminCourseDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [expandedSections, setExpandedSections] = useState<number[]>([]);

    const coursesApi = new DbCoursesApi();

    useEffect(() => {
        fetchCourseData();
    }, [id]);

    const fetchCourseData = async () => {
        setLoading(true);
        try {
            const [courseRes, sectionsRes] = await Promise.all([
                coursesApi.getById(Number(id)),
                coursesApi.getSections(Number(id))
            ]);

            if (courseRes.success) {
                setCourse(courseRes.data);
            }
            if (sectionsRes.success) {
                setSections(sectionsRes.data || []);
                // Auto expand first section
                if (sectionsRes.data?.length > 0) {
                    setExpandedSections([sectionsRes.data[0].id]);
                }
            }
        } catch (error: any) {
            toast.error('Không thể tải thông tin khóa học');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        const accountData = sessionStorage.getItem('Account');
        if (!accountData) {
            toast.error('Vui lòng đăng nhập');
            return;
        }

        const account = JSON.parse(accountData);
        setIsProcessing(true);

        try {
            const response = await coursesApi.approveCourse(Number(id), account.id);
            if (response.success) {
                toast.success('Đã duyệt khóa học thành công!');
                fetchCourseData();
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
            const response = await coursesApi.rejectCourse(Number(id), account.id, rejectReason);
            if (response.success) {
                toast.success('Đã từ chối khóa học');
                setShowRejectDialog(false);
                setRejectReason('');
                fetchCourseData();
            } else {
                toast.error(response.message || 'Không thể từ chối khóa học');
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra');
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleSection = (sectionId: number) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    // Navigate to lesson preview page
    const viewLesson = (lesson: any) => {
        navigate(`/admin/${admin_routes.lesson_preview(id!, lesson.id)}`);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600">Không tìm thấy khóa học</p>
                <Link to="/admin/courses" className="text-primary hover:underline mt-2 inline-block">
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-primary mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-secondary">{course.title}</h1>
                        <CourseStatusBadge status={course.status} />
                    </div>
                    <p className="text-slate-600 mt-1">
                        Giảng viên: {course.accounts?.full_name || 'N/A'} •
                        Danh mục: {course.course_categories?.name || 'N/A'}
                    </p>
                </div>

                {/* Action Buttons for PENDING courses */}
                {course.status === 'PENDING' && (
                    <div className="flex gap-3">
                        <button
                            onClick={handleApprove}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Duyệt
                        </button>
                        <button
                            onClick={() => setShowRejectDialog(true)}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            <XCircle className="w-4 h-4" />
                            Từ chối
                        </button>
                    </div>
                )}
            </div>

            {/* Rejection Reason Alert */}
            {course.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <p className="font-medium text-red-700">Lý do từ chối:</p>
                            <p className="text-red-600">{course.rejection_reason}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {course.thumbnail_url && (
                    <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-64 object-cover"
                    />
                )}
                <div className="p-6">
                    <h2 className="text-lg font-bold text-secondary mb-3">Mô tả ngắn</h2>
                    <p className="text-slate-700">{course.short_description || 'Chưa có mô tả'}</p>

                    {course.description && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-secondary mb-2">Mô tả chi tiết</h3>
                            <div
                                className="text-slate-600 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: course.description }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Học viên</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">
                                {course.total_students?.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Đánh giá</p>
                            <p className="text-2xl font-bold text-yellow-600 mt-1">
                                {Number(course.average_rating || 0).toFixed(1)} ⭐
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{course.total_reviews || 0} reviews</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Giá</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {formatCurrency(Number(course.price))}
                            </p>
                            {Number(course.discount_price) > 0 && (
                                <p className="text-xs text-slate-500 mt-1 line-through">
                                    {formatCurrency(Number(course.discount_price))}
                                </p>
                            )}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Bài học</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">
                                {course.total_lessons || sections.reduce((acc, s) => acc + (s.course_lessons?.length || 0), 0)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{sections.length} sections</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* What you'll learn */}
                {course.what_you_will_learn && course.what_you_will_learn.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-secondary mb-4">Bạn sẽ học được</h2>
                        <ul className="space-y-2">
                            {course.what_you_will_learn.map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-secondary mb-4">Yêu cầu</h2>
                        <ul className="space-y-2">
                            {course.requirements.map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-sm text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Target Audience */}
                {course.target_audience && course.target_audience.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-secondary mb-4">Đối tượng</h2>
                        <ul className="space-y-2">
                            {course.target_audience.map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-600">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Course Content - Curriculum */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-secondary mb-4">
                    Nội dung khóa học ({sections.length} sections, {sections.reduce((acc, s) => acc + (s.course_lessons?.length || 0), 0)} bài học)
                </h2>

                <div className="space-y-2">
                    {sections.map((section) => (
                        <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {expandedSections.includes(section.id) ? (
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-slate-500" />
                                    )}
                                    <span className="font-medium text-secondary">{section.title}</span>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {section.course_lessons?.length || 0} bài học
                                </span>
                            </button>

                            {expandedSections.includes(section.id) && section.course_lessons && (
                                <div className="divide-y divide-slate-100">
                                    {section.course_lessons.map((lesson: any) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => viewLesson(lesson)}
                                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Play className="w-4 h-4 text-slate-400" />
                                                <span className="text-sm text-slate-700">{lesson.title}</span>
                                                {lesson.is_preview && (
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                                                        Preview
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {lesson.duration ? `${Math.floor(lesson.duration / 60)}:${String(lesson.duration % 60).padStart(2, '0')}` : '--:--'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {/* Reject Dialog */}
                {showRejectDialog && (
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
                                        <strong>{course.title}</strong>
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
        </div>
    );
};

export default AdminCourseDetail;


