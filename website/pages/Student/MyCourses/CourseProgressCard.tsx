import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnrolledCourse } from '../../../types/types'
import { Award } from 'lucide-react'
import { student_routes } from '../../page_routes'
import CertificateDialog from '../../../components/CertificateDialog'

const CourseProgressCard: React.FC<{ course: any }> = ({ course }) => {
    const [showCertificate, setShowCertificate] = useState(false);

    // Handle both direct course and enrollment with nested course
    const courseData = course.course || course;
    const thumbnail = courseData.thumbnail || 'https://via.placeholder.com/400x200';
    const title = courseData.title || 'Untitled Course';
    const category = courseData.category || '';
    const instructorName = courseData.instructor?.name || courseData.instructor?.full_name || 'Unknown Instructor';
    const progress = course.progress || 0;
    const courseId = courseData.id || 1;

    // Lấy bài học tiếp theo cần học từ API response
    const nextLessonId = course.next_lesson_id || course.last_lesson_id || 1;

    // Tạo URL đến bài học tiếp theo sử dụng student_routes (thêm / để là absolute path)
    const continueUrl = '/' + student_routes.lesson(courseId, nextLessonId);

    // Chuẩn bị data cho certificate dialog
    const certificateData = {
        id: course.certificate?.id || 0,
        course_id: courseId,
        course_title: title,
        student_name: course.certificate?.student_name || 'Học viên',
        instructor_name: instructorName,
        certificate_url: course.certificate?.certificate_url || course.certificate_url,
        issued_at: course.certificate?.issued_at,
        certificate_code: course.certificate?.certificate_code
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
                        <div className="flex justify-between text-xs mb-1 text-slate-600">
                            <span>{progress === 100 ? 'Hoàn thành' : 'Đang học'}</span>
                            <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                            <div
                                className={`h-2 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {progress === 100 ? (
                            <button
                                onClick={() => setShowCertificate(true)}
                                className="w-full border border-emerald-500 text-emerald-600 font-medium py-2 rounded hover:bg-emerald-50 transition-colors flex items-center justify-center"
                            >
                                <Award className='mr-2 text-lg' />
                                Xem chứng chỉ
                            </button>
                        ) : (
                            <Link
                                to={continueUrl}
                                className="block w-full text-center bg-primary text-white font-medium py-2 rounded hover:bg-primary-hover transition-colors"
                            >
                                Tiếp tục học
                            </Link>
                        )}
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