import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StudentCourseReviews: React.FC = () => {
    const [rating, setRating] = useState(0);

    const reviews = [
        {
            id: 1,
            studentName: 'Nguyễn Văn A',
            rating: 5,
            comment: 'Khóa học rất tuyệt vời! Giảng viên dạy rất dễ hiểu.',
            date: '2024-12-10',
        },
        {
            id: 2,
            studentName: 'Trần Thị B',
            rating: 4,
            comment: 'Nội dung hay, nhưng cần thêm bài tập thực hành.',
            date: '2024-12-08',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-secondary">Đánh giá khóa học</h1>

            {/* Write Review */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Viết đánh giá của bạn</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Đánh giá</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-slate-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nhận xét</label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={4}
                            placeholder="Chia sẻ trải nghiệm của bạn về khóa học..."
                        ></textarea>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                        Gửi đánh giá
                    </button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Đánh giá từ học viên</h2>
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-medium text-slate-900">{review.studentName}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-slate-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentCourseReviews;
