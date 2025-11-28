
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../cus_types';
import StarRating from './icons/StarRating'

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full" />
          <span>{course.instructor.name}</span>
        </div>
        <h3 className="mt-2 font-semibold text-lg text-secondary leading-tight truncate group-hover:text-primary transition-colors">{course.title}</h3>
        <div className="mt-2 flex items-center space-x-2">
          <span className="font-bold text-yellow-500 text-sm">{course.rating.toFixed(1)}</span>
          <StarRating rating={course.rating} />
          <span className="text-sm text-slate-500">({course.reviewsCount})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}</span>
            {course.originalPrice && <span className="text-sm text-slate-500 line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.originalPrice)}</span>}
          </div>
          <span className="px-2 py-1 text-xs font-semibold text-primary bg-blue-100 rounded-full">{course.level}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
