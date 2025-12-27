import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  Award,
  Star,
  BookOpen,
  CheckCircle2,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Lock,
  ShoppingCart,
  X,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CourseCard } from './CourseCard';
import { student_routes } from '../../../page_routes';
import { useCourse, useCourseSections, useCourseReviews } from '../../../../hooks/useApi';
import { ErrorState } from '../../../../components/DataStates';
import { useCart } from '../../../../contexts/CartContext';
import { useEffect } from 'react';

// Default structure for course data (no fake data, only safe defaults)
const DEFAULT_INSTRUCTOR = {
  id: 0,
  full_name: 'Chưa có thông tin',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  title: '',
  bio: '',
  total_students: 0,
  total_courses: 0,
  rating: 0
};

// Interface for course type
interface CourseData {
  id: number;
  title: string;
  short_description: string;
  description: string;
  thumbnail: string;
  price: number;
  discount_price: number;
  level: number;
  language: string;
  rating: number;
  total_students: number;
  total_lessons: number;
  total_duration: number;
  last_updated: string;
  instructor: typeof DEFAULT_INSTRUCTOR;
  sections: any[];
  reviews: any[];
  what_you_will_learn: string[];
  requirements: string[];
}

// Enrollment Dialog Component
const EnrollmentDialog: React.FC<{
  course: CourseData;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onAddToCart: () => void;
  onFreeEnroll: () => Promise<void>;
  isEnrolling?: boolean;
}> = ({ course, isOpen, onClose, onCheckout, onAddToCart, onFreeEnroll, isEnrolling = false }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Check if course is free
  const effectivePrice = course.discount_price ?? course.price ?? 0;
  const isFree = effectivePrice === 0;
  const hasDiscount = course.price > 0 && course.discount_price < course.price;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-secondary">Xác nhận đăng ký khóa học</h2>
          <button
            onClick={onClose}
            disabled={isEnrolling}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Course Info */}
          <div className="flex gap-4 mb-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=No+Image';
              }}
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-secondary mb-2">{course.title}</h3>
              <p className="text-slate-600 mb-3 line-clamp-2">{course.short_description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{Number(course.rating ?? 0).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{(course.total_students ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor((course.total_duration ?? 0) / 60)}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.total_lessons ?? 0} bài</span>
                </div>
              </div>
            </div>
          </div>

          {/* Includes */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-secondary mb-3">Khóa học bao gồm:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                <span>{course.total_lessons ?? 0} bài học</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{course.sections?.length ?? 0} phần</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{Math.floor((course.total_duration ?? 0) / 60)}h nội dung</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Tài liệu học tập</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Chứng chỉ hoàn thành</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Truy cập trọn đời</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-b border-slate-200 py-4 mb-6">
            {isFree ? (
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-secondary">Tổng thanh toán:</span>
                <span className="text-2xl font-bold text-green-600">Miễn phí</span>
              </div>
            ) : (
              <>
                {hasDiscount && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Giá gốc:</span>
                      <span className="text-slate-400 line-through">{formatPrice(course.price)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-600">Giảm giá:</span>
                      <span className="text-red-600 font-semibold">
                        -{Math.round((1 - course.discount_price / course.price) * 100)}%
                      </span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-secondary">Tổng thanh toán:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(effectivePrice)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Actions - Different for free vs paid courses */}
          {isFree ? (
            <button
              onClick={onFreeEnroll}
              disabled={isEnrolling}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Đăng ký miễn phí ngay
                </>
              )}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onAddToCart}
                disabled={isEnrolling}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={onCheckout}
                disabled={isEnrolling}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                Thanh toán ngay
              </button>
            </div>
          )}

          {!isFree && (
            <p className="text-center text-sm text-slate-500 mt-4">
              💰 Đảm bảo hoàn tiền trong 30 ngày
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<any>(null);
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Certificate state
  const [hasCertificate, setHasCertificate] = useState(false);
  const [isClaimingCertificate, setIsClaimingCertificate] = useState(false);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);

  // Get current user
  const getCurrentUser = (): { id: number; role: string } | null => {
    try {
      const accountData = sessionStorage.getItem('Account');
      if (accountData) {
        return JSON.parse(accountData);
      }
    } catch {
      return null;
    }
    return null;
  };

  const currentUser = getCurrentUser();

  // Cart
  const { addItem, isInCart } = useCart();

  // Use API hooks
  const { data: courseData, loading: courseLoading, error: courseError, refetch: refetchCourse } = useCourse(parseInt(courseId || '0'));
  const { data: sectionsData, loading: sectionsLoading } = useCourseSections(parseInt(courseId || '0'));
  const { data: reviewsData, loading: reviewsLoading } = useCourseReviews(parseInt(courseId || '0'));

  // Check enrollment and certificate status
  useEffect(() => {
    checkEnrollment();
    checkCertificate();
  }, [courseId]);

  // Check user review when reviewsData is loaded
  useEffect(() => {
    if (reviewsData) {
      checkUserReview();
    }
  }, [reviewsData, courseId]);

  // Check if student already has certificate for this course
  const checkCertificate = async () => {
    const accountData = sessionStorage.getItem('Account');
    if (!accountData || !courseId) return;

    try {
      const account = JSON.parse(accountData);
      const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

      const response = await fetch(`${API_BASE_URL}/certificates/student/${account.id}`);
      if (response.ok) {
        const certificates = await response.json();
        // Check if there's a certificate for this course
        const existingCert = certificates.find((c: any) => c.course_id === parseInt(courseId));
        setHasCertificate(!!existingCert);
      }
    } catch (error) {
      console.error('Failed to check certificate:', error);
    }
  };

  const checkEnrollment = async () => {
    const accountData = sessionStorage.getItem('Account');
    if (!accountData || !courseId) return;

    try {
      const account = JSON.parse(accountData);
      const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

      // ✅ Fixed: Use correct endpoint with query params
      const response = await fetch(
        `${API_BASE_URL}/enrollments/check?course_id=${courseId}&user_id=${account.id}`,
        {
          headers: {
            'x-user-id': account.id.toString()
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Backend returns { success: true, is_enrolled: true, ... }
        setEnrollmentStatus(result);
        setIsEnrolled(result.is_enrolled);
      } else {
        console.error('Failed to check enrollment:', response.status);
        // Set default values if API fails
        setEnrollmentStatus({
          is_enrolled: false,
          progress: 0,
          completed_lessons: 0,
          total_lessons: 0
        });
        setIsEnrolled(false);
      }
    } catch (error) {
      console.error('Failed to check enrollment:', error);
      // Set default values if API fails
      setEnrollmentStatus({
        is_enrolled: false,
        progress: 0,
        completed_lessons: 0,
        total_lessons: 0
      });
      setIsEnrolled(false);
    }
  };

  const checkUserReview = async () => {
    const accountData = sessionStorage.getItem('Account');
    if (!accountData || !courseId) return;

    try {
      const account = JSON.parse(accountData);
      // Check if user already reviewed this course
      const existingReview = reviewsData?.find((r: any) => r.student_id === account.id);
      if (existingReview) {
        setUserReview(existingReview);
      }
    } catch (error) {
      console.error('Failed to check user review:', error);
    }
  };

  const handleSubmitReview = async () => {
    const accountData = sessionStorage.getItem('Account');
    if (!accountData || !courseId) {
      toast.error('Vui lòng đăng nhập để đánh giá!');
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    try {
      const account = JSON.parse(accountData);
      const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

      setIsSubmittingReview(true);

      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: account.id,
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });

      if (response.ok) {
        toast.success('Đã gửi đánh giá thành công! 🎉');
        setShowReviewForm(false);
        setReviewComment('');
        setReviewRating(5);
        // Refresh reviews
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Không thể gửi đánh giá');
      }
    } catch (error) {
      console.error('Submit review error:', error);
      toast.error('Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Build course object from API data with safe defaults (no fake data)
  const courseAny = courseData as any;

  // Calculate total lessons and duration from sections (more accurate than DB value)
  const sectionsArray = Array.isArray(sectionsData) ? sectionsData : [];
  const calculatedTotalLessons = sectionsArray.reduce((total, section) => {
    const lessons = section.lessons || section.course_lessons || [];
    return total + lessons.length;
  }, 0);

  const calculatedTotalDuration = sectionsArray.reduce((total, section) => {
    const lessons = section.lessons || section.course_lessons || [];
    return total + lessons.reduce((sum: number, lesson: any) => sum + (lesson.duration || 0), 0);
  }, 0);

  const course: CourseData | null = courseData ? {
    // Core fields from API
    id: courseAny.id ?? 0,
    title: courseAny.title ?? 'Không có tiêu đề',
    short_description: courseAny.short_description || (courseAny.description?.substring(0, 150) + '...') || '',
    description: courseAny.description ?? '',
    // Backend uses thumbnail_url, frontend uses thumbnail
    thumbnail: courseAny.thumbnail || courseAny.thumbnail_url || 'https://via.placeholder.com/800x450?text=No+Image',
    language: courseAny.language ?? 'vi',
    last_updated: courseAny.last_updated ?? courseAny.updated_at ?? '',

    // Numeric fields - use calculated values if available
    total_students: courseAny.total_students ?? 0,
    total_lessons: calculatedTotalLessons || courseAny.total_lessons || 0,
    total_duration: calculatedTotalDuration || courseAny.total_duration || 0,
    // Backend uses average_rating, frontend uses rating
    rating: courseAny.rating ?? courseAny.average_rating ?? 0,
    price: courseAny.price ?? 0,
    discount_price: courseAny.discount_price ?? courseAny.price ?? 0,
    level: courseAny.level ?? 0,

    sections: sectionsArray,
    reviews: Array.isArray(reviewsData) ? reviewsData : [],

    instructor: (() => {
      const inst = courseAny.instructor || courseAny.accounts || {};
      return {
        ...DEFAULT_INSTRUCTOR,
        ...inst,
        id: inst.id ?? DEFAULT_INSTRUCTOR.id,
        total_students: inst.total_students ?? 0,
        total_courses: inst.total_courses ?? 0,
        rating: inst.rating ?? 0,
        full_name: inst.full_name || DEFAULT_INSTRUCTOR.full_name,
        avatar_url: inst.avatar_url || DEFAULT_INSTRUCTOR.avatar_url,
        title: inst.title || '',
        bio: inst.bio || ''
      };
    })(),

    // Arrays that could be empty
    what_you_will_learn: Array.isArray(courseAny.what_you_will_learn) ? courseAny.what_you_will_learn : [],
    requirements: Array.isArray(courseAny.requirements) ? courseAny.requirements : []
  } : null;

  // Check if current user is the instructor
  const instructorId = courseAny?.instructor_id || courseAny?.accounts?.id;
  const isOwnCourse = currentUser && instructorId && currentUser.id === instructorId;

  const loading = courseLoading || sectionsLoading || reviewsLoading;

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getLevelLabel = (level: number) => {
    const labels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];
    return labels[level] || 'Tất cả';
  };

  const handleEnroll = () => {
    setShowEnrollmentDialog(true);
  };

  const handleContinueLearning = () => {
    if (!course) return;

    // If instructor owns the course, allow viewing all lessons
    if (isOwnCourse) {
      // Find first lesson
      for (const section of course.sections || []) {
        const lessons = section.lessons || section.course_lessons || [];
        if (lessons.length > 0) {
          navigate('/' + student_routes.lesson(courseId!, String(lessons[0].id)));
          return;
        }
      }
      toast.error('Không tìm thấy bài học nào!');
      return;
    }

    // Find first preview lesson or first lesson
    let firstLessonId = null;
    let firstSectionId = null;

    for (const section of course.sections || []) {
      const lessons = section.lessons || section.course_lessons || [];

      // If enrolled, go to first lesson
      if (isEnrolled && lessons.length > 0) {
        firstLessonId = lessons[0].id;
        firstSectionId = section.id;
        break;
      }

      // If not enrolled, find first preview lesson
      const previewLesson = lessons.find((l: any) => l.is_preview);
      if (previewLesson) {
        firstLessonId = previewLesson.id;
        firstSectionId = section.id;
        break;
      }
    }

    if (!firstLessonId) {
      toast.error('Không tìm thấy bài học để xem!');
      return;
    }

    // Navigate to lesson
    navigate('/' + student_routes.lesson(courseId!, String(firstLessonId)));
  };

  const handleCheckout = () => {
    setShowEnrollmentDialog(false);
    navigate('/checkout', { state: { courses: [course] } });
  };

  // Handle free course enrollment directly
  const handleFreeEnroll = async () => {
    if (!course) return;

    const accountData = sessionStorage.getItem('Account');
    if (!accountData) {
      toast.error('Vui lòng đăng nhập để đăng ký khóa học!');
      navigate('/login');
      return;
    }

    const account = JSON.parse(accountData);
    setIsEnrolling(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';
      const response = await fetch(`${API_BASE_URL}/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': account.id.toString()
        },
        body: JSON.stringify({
          course_id: course.id,
          student_id: account.id
        })
      });

      if (response.ok) {
        toast.success('Đăng ký khóa học thành công! 🎉', {
          duration: 4000
        });
        setShowEnrollmentDialog(false);
        setIsEnrolled(true);
        // Refresh enrollment status
        checkEnrollment();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Không thể đăng ký khóa học');
      }
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast.error('Có lỗi xảy ra khi đăng ký khóa học');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleAddToCart = async () => {
    if (!course) return;
    console.log(course);
    setShowEnrollmentDialog(false);

    // Check if already in cart
    if (isInCart(course.id)) {
      toast.error('Khóa học đã có trong giỏ hàng!', {
        icon: '⚠️',
        duration: 3000
      });
      return;
    }

    // Add to cart (only pass courseId - backend fetches course details)
    const added = await addItem(course.id);

    if (added) {
      toast.success('Đã thêm khóa học vào giỏ hàng!', {
        icon: '🛒',
        duration: 3000
      });
    }
  };

  // Handle claim certificate when course is 100% complete
  const handleClaimCertificate = async () => {
    if (!course || hasCertificate) return;

    const accountData = sessionStorage.getItem('Account');
    if (!accountData) {
      toast.error('Vui lòng đăng nhập!');
      return;
    }

    const account = JSON.parse(accountData);
    setIsClaimingCertificate(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

      // Generate certificate code
      const timestamp = Date.now();
      const certificateCode = `CERT-${course.id}-${account.id}-${timestamp.toString(36).toUpperCase()}`;

      // Create certificate
      const response = await fetch(`${API_BASE_URL}/certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: account.id,
          course_id: course.id,
          certificate_code: certificateCode,
          issued_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success('Chúc mừng! Bạn đã nhận được chứng chỉ! 🎉', {
          duration: 5000
        });
        setHasCertificate(true);

        // Redirect to certificates page or show certificate dialog
        navigate(`/${student_routes.certificates}`);
      } else {
        const errorData = await response.json();
        // Check if certificate already exists
        if (errorData.message?.includes('already') || errorData.message?.includes('exist')) {
          setHasCertificate(true);
          toast.success('Bạn đã có chứng chỉ cho khóa học này!');
        } else {
          toast.error(errorData.message || 'Không thể tạo chứng chỉ');
        }
      }
    } catch (error: any) {
      console.error('Claim certificate error:', error);
      toast.error('Có lỗi xảy ra khi nhận chứng chỉ');
    } finally {
      setIsClaimingCertificate(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (courseError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <ErrorState error={courseError} onRetry={refetchCourse} />
      </div>
    );
  }

  // No course found
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary">Không tìm thấy khóa học</h1>
          <p className="text-slate-600 mt-2">Khóa học này không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => navigate('/' + student_routes.courses)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Quay lại danh sách khóa học
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Container with 2 Columns - Persistent throughout page */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Left: All Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 my-8">
              <div className="mb-4">
                <span className="inline-block bg-primary/20 text-primary-light px-3 py-1 rounded-full text-sm font-semibold">
                  {getLevelLabel(course.level)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-slate-300 mb-6">{course.short_description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{course.rating ?? 0}</span>
                  <span className="text-slate-400">({(course.total_students ?? 0).toLocaleString()} học viên)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{(course.total_students ?? 0).toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(course.total_duration ?? 0)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>Tiếng Việt</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={course.instructor.avatar_url}
                  alt={course.instructor.full_name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div>
                  <p className="text-sm text-slate-400">Giảng viên</p>
                  <p className="font-semibold">{course.instructor.full_name}</p>
                </div>
              </div>

              {/* Mobile Card - Shows on small screens */}
              <div className="lg:hidden">
                <CourseCard
                  course={course}
                  isEnrolled={isEnrolled}
                  enrollmentStatus={enrollmentStatus}
                  isMobile={true}
                  isOwnCourse={isOwnCourse}
                  hasCertificate={hasCertificate}
                  onEnroll={handleEnroll}
                  onContinue={handleContinueLearning}
                  onAddToCart={handleAddToCart}
                  onClaimCertificate={handleClaimCertificate}
                />
              </div>
            </section>

            {/* Main Content Sections */}
            <div className="space-y-8 pb-12">
              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-secondary mb-6">Bạn sẽ học được gì</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.what_you_will_learn?.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary">Nội dung khóa học</h2>
                  <span className="text-sm text-slate-600">
                    {course.sections?.length ?? 0} phần • {course.total_lessons ?? 0} bài học • {formatDuration(course.total_duration ?? 0)}
                  </span>
                </div>

                <div className="space-y-2">
                  {course.sections?.map((section: any) => (
                    <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSections.includes(section.id) ? (
                            <ChevronUp className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          )}
                          <span className="font-semibold text-secondary">{section.title}</span>
                        </div>
                        <span className="text-sm text-slate-600">
                          {(section.lessons || section.course_lessons || []).length} bài học
                        </span>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="border-t border-slate-200 bg-slate-50">
                          {(section.lessons || section.course_lessons || []).map((lesson: any) => {
                            // Instructor can view all lessons, others need enrollment or preview
                            const canView = isOwnCourse || isEnrolled || lesson.is_preview;

                            return (
                              <div
                                key={lesson.id}
                                className={`flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0 ${canView ? 'hover:bg-white transition-colors cursor-pointer' : ''
                                  }`}
                                onClick={() => {
                                  if (canView) {
                                    navigate('/' + student_routes.lesson(courseId!, String(lesson.id)));
                                  }
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  {canView ? (
                                    <PlayCircle className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Lock className="w-5 h-5 text-slate-400" />
                                  )}
                                  <span className="text-slate-700">{lesson.title}</span>
                                  {lesson.is_preview && !isOwnCourse && (
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                      Xem trước
                                    </span>
                                  )}
                                  {isOwnCourse && (
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                      Khóa học của bạn
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-slate-600">
                                  {lesson.duration > 0 ? `${lesson.duration}:00` : 'Bài tập'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-secondary mb-6">Mô tả khóa học</h2>
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-secondary mb-6">Yêu cầu</h2>
                <ul className="space-y-3">
                  {course.requirements?.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-secondary mb-6">Đánh giá từ học viên</h2>

                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-slate-200">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-secondary mb-2">{course.rating ?? 0}</div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(course.rating ?? 0)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-slate-300'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">Đánh giá khóa học</p>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 w-12 text-right">
                          {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form - Only show if enrolled and haven't reviewed yet */}
                {isEnrolled && !isOwnCourse && !userReview && (
                  <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    {!showReviewForm ? (
                      <button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                      >
                        <Star className="w-5 h-5" />
                        Viết đánh giá của bạn
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-secondary">Đánh giá khóa học</h3>
                          <button
                            onClick={() => setShowReviewForm(false)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Rating Stars */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Đánh giá của bạn
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-8 h-8 ${star <= reviewRating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-slate-300'
                                    }`}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-sm text-slate-600">
                              ({reviewRating} sao)
                            </span>
                          </div>
                        </div>

                        {/* Comment Textarea */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nhận xét của bạn
                          </label>
                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setShowReviewForm(false);
                              setReviewComment('');
                              setReviewRating(5);
                            }}
                            className="flex-1 py-2.5 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleSubmitReview}
                            disabled={isSubmittingReview || !reviewComment.trim()}
                            className="flex-1 py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmittingReview ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Đang gửi...
                              </>
                            ) : (
                              'Gửi đánh giá'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* User's existing review */}
                {userReview && (
                  <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Đánh giá của bạn</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(userReview.rating || 0)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-700">{userReview.comment}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {course.reviews?.map((review: any) => {
                    // Backend uses 'accounts' relation, frontend expects 'student'
                    const reviewer = review.student || review.accounts || {};
                    const reviewerName = reviewer.name || reviewer.full_name || 'Học viên ẩn danh';
                    const reviewerAvatar = reviewer.avatar || reviewer.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

                    return (
                      <div key={review.id} className="flex gap-4">
                        <img
                          src={reviewerAvatar}
                          alt={reviewerName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-secondary">{reviewerName}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating || 0)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-slate-500">
                              {review.created_at ? new Date(review.created_at).toLocaleDateString('vi-VN') : ''}
                            </span>
                          </div>
                          <p className="text-slate-700">{review.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-secondary mb-6">Giảng viên</h2>
                <div className="flex gap-6">
                  <img
                    src={course.instructor.avatar_url}
                    alt={course.instructor.full_name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary mb-1">
                      {course.instructor.full_name}
                    </h3>
                    <p className="text-slate-600 mb-4">{course.instructor.title}</p>

                    <div className="flex flex-wrap gap-6 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{course.instructor?.rating ?? 0} đánh giá</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{(course.instructor?.total_students ?? 0).toLocaleString()} học viên</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>{course.instructor?.total_courses ?? 0} khóa học</span>
                      </div>
                    </div>

                    <p className="text-slate-700">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Card - Desktop Only - Stays visible entire page */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CourseCard
                course={course}
                isEnrolled={isEnrolled}
                enrollmentStatus={enrollmentStatus}
                isMobile={false}
                isOwnCourse={isOwnCourse}
                hasCertificate={hasCertificate}
                onEnroll={handleEnroll}
                onContinue={handleContinueLearning}
                onAddToCart={handleAddToCart}
                onClaimCertificate={handleClaimCertificate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Dialog */}
      <EnrollmentDialog
        course={course}
        isOpen={showEnrollmentDialog}
        onClose={() => setShowEnrollmentDialog(false)}
        onCheckout={handleCheckout}
        onAddToCart={handleAddToCart}
        onFreeEnroll={handleFreeEnroll}
        isEnrolling={isEnrolling}
      />
    </div>
  );
};

export default CourseDetail;
