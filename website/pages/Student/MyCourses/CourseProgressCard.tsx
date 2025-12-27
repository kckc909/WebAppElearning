import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnrolledCourse } from '../../../types/types'
import { Award, Loader2 } from 'lucide-react'
import { student_routes } from '../../page_routes'
import CertificateDialog from '../../../components/CertificateDialog'
import toast from 'react-hot-toast'

const CourseProgressCard: React.FC<{ course: any }> = ({ course }) => {
    const [showCertificate, setShowCertificate] = useState(false);
    const [isClaimingCertificate, setIsClaimingCertificate] = useState(false);
    const [localCertificate, setLocalCertificate] = useState<any>(null);

    // Handle both direct course and enrollment with nested course
    // API returns: { courses: { title, accounts: {full_name}, certificates: [...] }, ... }
    const courseData = course.courses || course.course || course;
    const thumbnail = courseData.thumbnail_url || courseData.thumbnail || 'https://via.placeholder.com/400x200';
    const title = courseData.title || 'Untitled Course';
    const category = courseData.course_categories?.name || courseData.category || '';

    // Get instructor name from accounts relation (instructor) 
    const instructorName = courseData.accounts?.full_name
        || courseData.instructor?.full_name
        || courseData.instructor?.name
        || 'Giảng viên';

    const progress = course.progress || 0;
    const courseId = courseData.id;

    // Lấy bài học tiếp theo cần học từ API response
    const nextLessonId = course.next_lesson_id || course.last_lesson_id;

    // Tạo URL: nếu có lesson id thì đến lesson, không thì đến course detail
    const continueUrl = nextLessonId
        ? '/' + student_routes.lesson(courseId, nextLessonId)
        : '/' + student_routes.course_detail(courseId);

    // Lấy student name từ sessionStorage
    const getStudentName = () => {
        try {
            const accountData = sessionStorage.getItem('Account');
            if (accountData) {
                const account = JSON.parse(accountData);
                return account.full_name || 'Học viên';
            }
        } catch { }
        return 'Học viên';
    };

    // Get certificate from enrollment response or local state
    // API returns courseData.certificates as array (we take first one)
    const certificate = localCertificate || courseData.certificates?.[0] || course.certificate;

    // Only show certificate button if we have a real certificate (just need ID)
    const hasCertificate = certificate && certificate.id;

    // Get certificate threshold from course (default 100%)
    const certificateThreshold = courseData.certificate_threshold || 100;

    // Check if eligible for certificate (progress >= threshold but no certificate yet)
    const isEligibleForCertificate = progress >= certificateThreshold && !hasCertificate;

    // Handle claim certificate
    const handleClaimCertificate = async () => {
        try {
            setIsClaimingCertificate(true);
            const accountData = sessionStorage.getItem('Account');
            if (!accountData) {
                toast.error('Vui lòng đăng nhập!');
                return;
            }

            const account = JSON.parse(accountData);
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

            const response = await fetch(`${API_BASE_URL}/certificates/claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: account.id,
                    course_id: courseId,
                }),
            });

            if (response.ok) {
                const newCertificate = await response.json();
                setLocalCertificate(newCertificate);
                toast.success('Chúc mừng! Bạn đã nhận chứng chỉ thành công! 🎉');
                setShowCertificate(true);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Không thể nhận chứng chỉ');
            }
        } catch (error) {
            console.error('Claim certificate error:', error);
            toast.error('Có lỗi xảy ra khi nhận chứng chỉ');
        } finally {
            setIsClaimingCertificate(false);
        }
    };

    const certificateData = certificate ? {
        id: certificate.id,
        course_id: courseId,
        course_title: title,
        // Student name: certificate.accounts (student relation from certificates table)
        student_name: certificate.accounts?.full_name || getStudentName(),
        // Instructor name: courseData.accounts (instructor from courses table)
        instructor_name: instructorName,
        certificate_url: certificate.certificate_url || certificate.pdf_url || '',
        // Use real issued_at from certificate
        issued_at: certificate.issued_at,
        // IMPORTANT: Only use real certificate_code from DB
        certificate_code: certificate.certificate_code || ''
    } : {
        id: 0,
        course_id: courseId,
        course_title: title,
        student_name: getStudentName(),
        instructor_name: instructorName,
        certificate_url: '',
        issued_at: new Date().toISOString(),
        certificate_code: ''
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="relative">
                    <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
                    {category && (
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-secondary">
                            {category}
                        </div>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-secondary line-clamp-2 mb-2 h-12">{title}</h3>
                    <p className="text-xs text-slate-500 mb-4">{instructorName}</p>

                    <div className="mt-auto">
                        {/* Progress bar - Only show when not completed */}
                        {progress < 100 && (
                            <>
                                <div className="flex justify-between text-xs mb-1 text-slate-600">
                                    <span>Đang học</span>
                                    <span className="font-bold">{progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                                    <div
                                        className="h-2 rounded-full bg-primary"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </>
                        )}

                        {/* Action buttons based on state */}
                        <div className="space-y-2">
                            {/* State 1: Đang học - Chưa hoàn thành */}
                            {progress < 100 && (
                                <Link
                                    to={continueUrl}
                                    className="block w-full text-center bg-primary text-white font-medium py-2 rounded hover:bg-primary-hover transition-colors"
                                >
                                    Học tiếp
                                </Link>
                            )}

                            {/* State 2: Hoàn thành - Đủ điều kiện nhận chứng chỉ nhưng chưa nhận */}
                            {isEligibleForCertificate && (
                                <>
                                    <button
                                        onClick={handleClaimCertificate}
                                        disabled={isClaimingCertificate}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium py-2 rounded hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                    >
                                        {isClaimingCertificate ? (
                                            <>
                                                <Loader2 className='mr-2 text-lg animate-spin' />
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                <Award className='mr-2 text-lg' />
                                                Nhận chứng chỉ
                                            </>
                                        )}
                                    </button>
                                    <Link
                                        to={continueUrl}
                                        className="block w-full text-center border border-slate-300 text-slate-700 font-medium py-2 rounded hover:bg-slate-50 transition-colors"
                                    >
                                        Ôn tập
                                    </Link>
                                </>
                            )}

                            {/* State 3: Đã nhận chứng chỉ */}
                            {hasCertificate && (
                                <>
                                    <button
                                        onClick={() => setShowCertificate(true)}
                                        className="w-full border-2 border-emerald-500 text-emerald-600 font-medium py-2 rounded hover:bg-emerald-50 transition-colors flex items-center justify-center"
                                    >
                                        <Award className='mr-2 text-lg' />
                                        Xem chứng chỉ
                                    </button>
                                    <Link
                                        to={continueUrl}
                                        className="block w-full text-center border border-slate-300 text-slate-700 font-medium py-2 rounded hover:bg-slate-50 transition-colors"
                                    >
                                        Ôn tập
                                    </Link>
                                </>
                            )}

                            {/* Edge case: Completed but not eligible (shouldn't happen normally) */}
                            {progress >= 100 && !hasCertificate && !isEligibleForCertificate && (
                                <>
                                    <div className="text-center text-sm text-slate-500 py-2 border border-slate-200 rounded">
                                        <Award className='mx-auto text-slate-400 mb-1' />
                                        Chưa đủ điều kiện nhận chứng chỉ
                                    </div>
                                    <Link
                                        to={continueUrl}
                                        className="block w-full text-center border border-slate-300 text-slate-700 font-medium py-2 rounded hover:bg-slate-50 transition-colors"
                                    >
                                        Học lại
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Dialog */}
            <CertificateDialog
                isOpen={showCertificate}
                onClose={() => setShowCertificate(false)}
                certificate={certificateData}
            />
        </>
    );
};

export default CourseProgressCard;