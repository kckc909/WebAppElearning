
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './icons/StarRating'

interface CourseCardProps {
  course: any; // Flexible type to support both DB and mock data structures
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Safe access with fallbacks
  const courseId = course?.id || 0;
  const thumbnail = course?.thumbnail || 'https://via.placeholder.com/400x200';
  const title = course?.title || 'Untitled Course';
  const instructorAvatar = course?.instructor?.avatar || course?.instructor?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
  const instructorName = course?.instructor?.name || course?.instructor?.full_name || 'Unknown';
  const rating = course?.rating || 0;
  const reviewsCount = course?.reviewsCount || course?.reviews_count || 0;
  const price = course?.discount_price || course?.price || 0;
  const originalPrice = course?.originalPrice || course?.price || 0;
  const level = course?.levelLabel || course?.level || '';

  return (
    <Link to={`/courses/${courseId}`} className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <img src={instructorAvatar} alt={instructorName} className="w-6 h-6 rounded-full" />
          <span>{instructorName}</span>
        </div>
        <h3 className="mt-2 font-semibold text-lg text-secondary leading-tight truncate group-hover:text-primary transition-colors">{title}</h3>
        <div className="mt-2 flex items-center space-x-2">
          <span className="font-bold text-yellow-500 text-sm">{rating.toFixed(1)}</span>
          <StarRating rating={rating} />
          <span className="text-sm text-slate-500">({reviewsCount})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</span>
            {originalPrice > price && <span className="text-sm text-slate-500 line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}</span>}
          </div>
          {level && <span className="px-2 py-1 text-xs font-semibold text-primary bg-blue-100 rounded-full">{level}</span>}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
