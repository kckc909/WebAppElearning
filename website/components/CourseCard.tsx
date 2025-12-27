
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StarRating from './icons/StarRating'
import { Users, Clock, BookOpen, PlayCircle, Award, CheckCircle } from 'lucide-react';

interface EnrollmentInfo {
  isEnrolled: boolean;
  progress: number;
  isCompleted: boolean;
  nextLessonId?: number | null;
  certificateCode?: string | null;
}

interface CourseCardProps {
  course: any; // Flexible type to support both DB and mock data structures
  enrollment?: EnrollmentInfo | null; // Optional enrollment info for logged-in users
  currentUserId?: number; // Current user ID to check if they're the instructor
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrollment, currentUserId }) => {
  const navigate = useNavigate();

  // Safe access with fallbacks - Map backend fields correctly
  const courseId = course?.id || 0;
  // Backend uses thumbnail_url, frontend uses thumbnail
  const thumbnail = course?.thumbnail_url || course?.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image';
  const title = course?.title || 'Untitled Course';

  // Backend uses 'accounts' relation for instructor
  const instructor = course?.accounts || course?.instructor || {};
  const instructorAvatar = instructor?.avatar_url || instructor?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
  // Ensure instructorName is a string, not an object
  const instructorName = typeof instructor?.full_name === 'string'
    ? instructor.full_name
    : (typeof instructor?.name === 'string' ? instructor.name : 'Chưa có thông tin');

  // Check if current user is the instructor
  const instructorId = course?.instructor_id || instructor?.id;
  const isOwnCourse = currentUserId && instructorId && currentUserId === instructorId;

  // Backend uses average_rating, frontend uses rating - ensure it's a number
  const ratingValue = course?.average_rating ?? course?.rating;
  const rating = typeof ratingValue === 'number' ? ratingValue : 0;

  // Ensure reviewsCount is a number, not an object
  const reviewsValue = course?.total_reviews ?? course?.reviewsCount ?? course?.reviews_count;
  const reviewsCount = typeof reviewsValue === 'number' ? reviewsValue : 0;

  // Price handling
  const originalPrice = course?.price || 0;
  const discountPrice = course?.discount_price ?? originalPrice;
  const effectivePrice = discountPrice;
  const hasDiscount = originalPrice > 0 && discountPrice < originalPrice;
  const isFree = effectivePrice === 0;

  // Stats - ensure they are numbers, not objects
  const totalStudents = typeof course?.total_students === 'number' ? course.total_students : 0;
  const totalLessons = typeof course?.total_lessons === 'number' ? course.total_lessons : 0;
  const totalDuration = typeof course?.total_duration === 'number' ? course.total_duration : 0;
  const durationHours = Math.floor(totalDuration / 60);

  // Level mapping - ensure level is not an object
  const levelLabels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];
  const levelValue = typeof course?.level === 'number' ? course.level : undefined;
  const level = levelValue !== undefined ? (levelLabels[levelValue] || '') : (typeof course?.levelLabel === 'string' ? course.levelLabel : '');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle continue learning click
  const handleContinueLearning = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (enrollment?.nextLessonId) {
      navigate(`/courses/${courseId}/lessons/${enrollment.nextLessonId}`);
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  // Handle view certificate click
  const handleViewCertificate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/certificates');
  };

  // Determine enrollment status
  const isEnrolled = enrollment?.isEnrolled || false;
  const progress = enrollment?.progress || 0;
  const isCompleted = enrollment?.isCompleted || progress >= 100;

  return (
    <Link to={`/courses/${courseId}`} className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-slate-100 hover:border-primary/20">
      {/* Thumbnail */}
      <div className="overflow-hidden relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        {/* Level badge */}
        {level && !isEnrolled && !isOwnCourse && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white bg-primary/90 rounded-full backdrop-blur-sm">
            {level}
          </span>
        )}
        {/* Own course badge */}
        {isOwnCourse && (
          <span className="absolute top-3 left-3 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Khóa học của bạn
          </span>
        )}
        {/* Enrolled badge */}
        {isEnrolled && !isCompleted && !isOwnCourse && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full backdrop-blur-sm flex items-center gap-1">
            <PlayCircle className="w-3 h-3" />
            Đang học
          </span>
        )}
        {/* Completed badge */}
        {isCompleted && !isOwnCourse && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full backdrop-blur-sm flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Hoàn thành
          </span>
        )}
        {/* Free badge */}
        {isFree && !isEnrolled && !isOwnCourse && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
            Miễn phí
          </span>
        )}

        {/* Progress overlay for enrolled courses */}
        {isEnrolled && !isCompleted && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-white">{progress}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Instructor */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
          <img
            src={instructorAvatar}
            alt={instructorName}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
            }}
          />
          <span className="truncate">{instructorName}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-secondary leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Stats row - hide for enrolled courses to make room for buttons */}
        {!isEnrolled && (
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
            {totalStudents > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{totalStudents.toLocaleString()}</span>
              </div>
            )}
            {totalLessons > 0 && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{totalLessons} bài</span>
              </div>
            )}
            {durationHours > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{durationHours}h</span>
              </div>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="mt-3 flex items-center space-x-2">
          <span className="font-bold text-yellow-500 text-sm">{Number(rating).toFixed(1)}</span>
          <StarRating rating={Number(rating)} />
          <span className="text-sm text-slate-500">({reviewsCount})</span>
        </div>

        {/* Action buttons for enrolled users */}
        {isOwnCourse ? (
          /* Show manage button for instructor's own course */
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/instructor/courses/${courseId}`);
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Quản lý khóa học
            </button>
          </div>
        ) : isEnrolled ? (
          <div className="mt-4">
            {isCompleted ? (
              <div className="flex gap-2">
                {/* Main button: Go to course detail for review */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`/courses/${courseId}`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <PlayCircle className="w-4 h-4" />
                  Ôn tập
                </button>
                {/* Icon button: View certificate */}
                <button
                  onClick={handleViewCertificate}
                  className="py-2.5 px-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-green-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                  title="Xem chứng chỉ"
                >
                  <Award className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleContinueLearning}
                className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                Học tiếp ({progress}%)
              </button>
            )}
          </div>
        ) : (
          /* Price - only show for non-enrolled */
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              {effectivePrice == 0 ? (
                <>
                  <span className="text-xl font-bold text-green-600">Miễn phí</span>
                  {/* Show original price if it was discounted to free */}
                  {originalPrice > 0 && (
                    <span className="text-sm text-slate-400 line-through">{formatPrice(originalPrice)}</span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-xl font-bold text-primary">{formatPrice(effectivePrice)}</span>
                  {hasDiscount && (
                    <span className="text-sm text-slate-400 line-through">{formatPrice(originalPrice)}</span>
                  )}
                </>
              )}
            </div>
            {/* Show discount badge: either for discounted to free (100%) or normal discount */}
            {originalPrice > 0 && effectivePrice < originalPrice && (
              <span className="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">
                -{Math.round((1 - effectivePrice / originalPrice) * 100)}%
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;

