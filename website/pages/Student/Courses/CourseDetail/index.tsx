
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { COURSES } from '../../../../mockData';
import { IoHomeOutline } from 'react-icons/io5';

const StarRating: React.FC<{ rating: number; text?: boolean }> = ({ rating, text }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {text && <span className="font-bold text-yellow-500 text-sm mr-1">{rating.toFixed(1)}</span>}
      {[...Array(fullStars)].map((_, i) => <IoHomeOutline key={`full-${i}`} name="star" className="text-yellow-400"></IoHomeOutline>)}
      {halfStar && <IoHomeOutline name="star-half" className="text-yellow-400"></IoHomeOutline>}
      {[...Array(emptyStars)].map((_, i) => <IoHomeOutline key={`empty-${i}`} name="star-outline" className="text-yellow-400"></IoHomeOutline>)}
    </div>
  )
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams();
  const course = COURSES.find(c => c.id === parseInt(id || '1'));

  if (!course) {
    return <div className="text-center py-20">Course not found.</div>;
  }

  const onClickDangKyHocHandle = () => {

  }

  const { instructor, reviews } = course;

  return (
    <>
      {/* Header Section */}
      <header className="bg-secondary text-white pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold">{course.category}</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{course.title}</h1>
            <p className="mt-4 text-lg text-slate-300">{course.subtitle}</p>
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <StarRating rating={course.rating} text />
                <span>({course.reviewsCount} đánh giá)</span>
              </div>
              <span>Tạo bởi <a href="#" className="font-semibold text-primary hover:underline">{course.instructor.name}</a></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Bạn sẽ học được gì?</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {course.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <IoHomeOutline name="checkmark-outline" className="text-primary text-xl mr-3 mt-1 flex-shrink-0"></IoHomeOutline>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>

              {/* Sections */}
              {course.curriculum.map((section, index) => (
                <div key={index} className="border rounded-md mb-3">
                  <div className="bg-slate-50 p-4 font-semibold flex justify-between items-center cursor-pointer">
                    <span>{section.section}</span>
                    <IoHomeOutline name="chevron-down-outline"></IoHomeOutline>
                  </div>
                  <ul className="divide-y">
                    {section.lectures.map((lecture, lIndex) => (
                      <li key={lIndex} className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <IoHomeOutline name="play-circle-outline" className="text-slate-500 mr-3 text-xl"></IoHomeOutline>
                          <span>{lecture.title}</span>
                        </div>
                        <span className="text-sm text-slate-500">{lecture.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Instructor */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4">Về giảng viên</h2>
              <div className="flex items-start space-x-4">
                <img src={instructor.avatar} alt={instructor.name} className="w-24 h-24 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-primary">{instructor.name}</h3>
                  <p className="text-slate-500">{instructor.title}</p>
                  <p className="mt-2 text-slate-600">{instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4">Đánh giá từ học viên</h2>
              {reviews.map(review => (
                <div key={review.id} className="border-b py-4 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="flex items-center justify-between w-full">
                        <h4 className="font-semibold">{review.author}</h4>
                        <span className="text-sm text-slate-500">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="mt-2 text-slate-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}</span>
                    {course.originalPrice && <span className="text-base text-slate-500 line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.originalPrice)}</span>}
                  </div>
                  <Link to={`/lesson/${course.id}`}>
                    <button onClick={onClickDangKyHocHandle} className="mt-4 w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary-hover transition-colors">Đăng ký học</button>
                  </Link>
                  <ul className="mt-6 space-y-3 text-slate-600 text-sm">
                    <li className="flex justify-between"><span>Trình độ:</span> <span className="font-semibold">{course.level}</span></li>
                    <li className="flex justify-between"><span>Thời lượng:</span> <span className="font-semibold">{course.duration}</span></li>
                    <li className="flex justify-between"><span>Bài giảng:</span> <span className="font-semibold">{course.lectures}</span></li>
                    <li className="flex justify-between"><span>Ngôn ngữ:</span> <span className="font-semibold">{course.language}</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
