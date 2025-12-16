import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Clock,
  Users,
  Award,
  Star,
  BookOpen,
  CheckCircle2,
  Globe,
  FileText,
  Share2,
  Heart,
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
import { coursesApi } from '../../../../API';

// Mock data
const MOCK_COURSE = {
  id: 1,
  title: 'Complete Web Development Bootcamp 2024',
  short_description: 'Học lập trình web từ cơ bản đến nâng cao với HTML, CSS, JavaScript, React và Node.js',
  description: `
        <h3>Về khóa học này</h3>
        <p>Khóa học Web Development toàn diện nhất dành cho người mới bắt đầu. Bạn sẽ học được:</p>
        <ul>
            <li>HTML5 và CSS3 từ cơ bản đến nâng cao</li>
            <li>JavaScript ES6+ và lập trình hướng đối tượng</li>
            <li>React.js - Thư viện phổ biến nhất hiện nay</li>
            <li>Node.js và Express.js để xây dựng backend</li>
            <li>MongoDB và cơ sở dữ liệu NoSQL</li>
            <li>Deployment và DevOps cơ bản</li>
        </ul>
        <h3>Bạn sẽ học được gì?</h3>
        <p>Sau khi hoàn thành khóa học, bạn sẽ có thể:</p>
        <ul>
            <li>Xây dựng website responsive từ đầu</li>
            <li>Tạo ứng dụng web động với React</li>
            <li>Phát triển RESTful API với Node.js</li>
            <li>Làm việc với database và authentication</li>
            <li>Deploy ứng dụng lên production</li>
        </ul>
    `,
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  price: 1990000,
  discount_price: 990000,
  level: 1,
  language: 'vi',
  rating: 4.8,
  total_students: 12543,
  total_lessons: 156,
  total_duration: 3240,
  last_updated: '2024-01-15',
  instructor: {
    id: 1,
    full_name: 'Nguyễn Văn A',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor1',
    title: 'Senior Full-stack Developer',
    bio: '10+ năm kinh nghiệm trong phát triển web. Đã làm việc tại Google, Meta và nhiều startup công nghệ.',
    total_students: 45000,
    total_courses: 12,
    rating: 4.9
  },
  sections: [
    {
      id: 1,
      title: 'Giới thiệu và Chuẩn bị',
      lessons: [
        { id: 1, title: 'Chào mừng đến với khóa học', duration: 5, is_preview: true, type: 'video' },
        { id: 2, title: 'Cài đặt môi trường phát triển', duration: 15, is_preview: true, type: 'video' },
        { id: 3, title: 'Tổng quan về Web Development', duration: 20, is_preview: false, type: 'video' }
      ]
    },
    {
      id: 2,
      title: 'HTML & CSS Fundamentals',
      lessons: [
        { id: 4, title: 'HTML Basics - Tags và Elements', duration: 25, is_preview: false, type: 'video' },
        { id: 5, title: 'CSS Styling và Selectors', duration: 30, is_preview: false, type: 'video' },
        { id: 6, title: 'Flexbox và Grid Layout', duration: 35, is_preview: false, type: 'video' },
        { id: 7, title: 'Responsive Design', duration: 40, is_preview: false, type: 'video' },
        { id: 8, title: 'Bài tập thực hành', duration: 0, is_preview: false, type: 'assignment' }
      ]
    },
    {
      id: 3,
      title: 'JavaScript Programming',
      lessons: [
        { id: 9, title: 'JavaScript Basics', duration: 30, is_preview: false, type: 'video' },
        { id: 10, title: 'Functions và Scope', duration: 25, is_preview: false, type: 'video' },
        { id: 11, title: 'Arrays và Objects', duration: 35, is_preview: false, type: 'video' },
        { id: 12, title: 'DOM Manipulation', duration: 40, is_preview: false, type: 'video' },
        { id: 13, title: 'ES6+ Features', duration: 30, is_preview: false, type: 'video' }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      student: {
        name: 'Trần Thị B',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
      },
      rating: 5,
      comment: 'Khóa học rất chi tiết và dễ hiểu. Thầy giảng rất tận tâm!',
      created_at: '2024-01-10'
    },
    {
      id: 2,
      student: {
        name: 'Lê Văn C',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2'
      },
      rating: 5,
      comment: 'Tốt nhất cho người mới bắt đầu. Nội dung cập nhật và thực tế.',
      created_at: '2024-01-08'
    },
    {
      id: 3,
      student: {
        name: 'Phạm Thị D',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3'
      },
      rating: 4,
      comment: 'Khóa học hay, nhưng có một số phần hơi nhanh. Nhìn chung rất tốt!',
      created_at: '2024-01-05'
    }
  ],
  what_you_will_learn: [
    'Xây dựng website responsive hoàn chỉnh',
    'Làm chủ HTML5, CSS3 và JavaScript',
    'Phát triển ứng dụng với React.js',
    'Tạo RESTful API với Node.js và Express',
    'Làm việc với MongoDB database',
    'Deploy ứng dụng lên production',
    'Git và GitHub cho version control',
    'Best practices và coding standards'
  ],
  requirements: [
    'Máy tính có kết nối internet',
    'Không cần kiến thức lập trình trước đó',
    'Đam mê học hỏi và kiên trì'
  ]
};

// Enrollment Dialog Component
const EnrollmentDialog: React.FC<{
  course: typeof MOCK_COURSE;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onAddToCart: () => void;
}> = ({ course, isOpen, onClose, onCheckout, onAddToCart }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-secondary">Xác nhận đăng ký khóa học</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
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
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-secondary mb-2">{course.title}</h3>
              <p className="text-slate-600 mb-3">{course.short_description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.total_students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(course.total_duration / 60)}h</span>
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
                <span>{course.total_lessons} bài học video</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{Math.floor(course.total_duration / 60)}h nội dung</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Tài liệu học tập</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Chứng chỉ hoàn thành</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-b border-slate-200 py-4 mb-6">
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
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-secondary">Tổng thanh toán:</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(course.discount_price)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors"
            >
              Thanh toán ngay
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            💰 Đảm bảo hoàn tiền trong 30 ngày
          </p>
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
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch course data from API
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const response = await coursesApi.getById(parseInt(courseId));
        if (response.success && response.data) {
          // Merge API data với default structure
          setCourse({
            ...MOCK_COURSE, // Default structure làm fallback
            ...response.data,
            short_description: response.data.short_description || response.data.description?.substring(0, 150) + '...',
            sections: response.data.sections || MOCK_COURSE.sections
          });
        } else {
          // Fallback to mock data if API fails
          setCourse(MOCK_COURSE);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
        setCourse(MOCK_COURSE);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [courseId]);

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
    // Navigate to first lesson of the course
    const firstLessonId = course.sections?.[0]?.lessons?.[0]?.id || '1';
    navigate('/' + student_routes.lesson(courseId!, firstLessonId));
  };

  const handleCheckout = () => {
    setShowEnrollmentDialog(false);
    navigate('/checkout', { state: { courses: [course] } });
  };

  const handleAddToCart = () => {
    setShowEnrollmentDialog(false);
    toast.success('Đã thêm khóa học vào giỏ hàng!', {
      icon: '🛒',
      duration: 3000
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-slate-400">({course.total_students.toLocaleString()} học viên)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.total_students.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(course.total_duration)}</span>
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
                  isMobile={true}
                  onEnroll={handleEnroll}
                  onContinue={handleContinueLearning}
                  onAddToCart={handleAddToCart}
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
                    {course.sections.length} phần • {course.total_lessons} bài học • {formatDuration(course.total_duration)}
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
                          {section.lessons.length} bài học
                        </span>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="border-t border-slate-200 bg-slate-50">
                          {section.lessons.map((lesson: any) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-4 hover:bg-white transition-colors border-b border-slate-100 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.is_preview ? (
                                  <PlayCircle className="w-5 h-5 text-primary" />
                                ) : (
                                  <Lock className="w-5 h-5 text-slate-400" />
                                )}
                                <span className="text-slate-700">{lesson.title}</span>
                                {lesson.is_preview && (
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                    Xem trước
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-slate-600">
                                {lesson.duration > 0 ? `${lesson.duration}:00` : 'Bài tập'}
                              </span>
                            </div>
                          ))}
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
                    <div className="text-5xl font-bold text-secondary mb-2">{course.rating}</div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(course.rating)
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

                <div className="space-y-6">
                  {course.reviews?.map((review: any) => (
                    <div key={review.id} className="flex gap-4">
                      <img
                        src={review.student.avatar}
                        alt={review.student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-secondary">{review.student.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">
                            {new Date(review.created_at).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <p className="text-slate-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}
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
                        <span>{course.instructor.rating} đánh giá</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{course.instructor.total_students.toLocaleString()} học viên</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>{course.instructor.total_courses} khóa học</span>
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
                isMobile={false}
                onEnroll={handleEnroll}
                onContinue={handleContinueLearning}
                onAddToCart={handleAddToCart}
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
      />
    </div>
  );
};

export default CourseDetail;
