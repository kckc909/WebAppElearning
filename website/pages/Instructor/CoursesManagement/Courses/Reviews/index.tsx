import React from 'react';
import { Star } from 'lucide-react';

const InstructorCourseReviews: React.FC = () => {
    const reviews = [
        { id: 1, studentName: 'Nguyễn Văn A', rating: 5, comment: 'Khóa học rất tuyệt vời!', date: '2024-12-10' },
        { id: 2, studentName: 'Trần Thị B', rating: 4, comment: 'Nội dung hay và dễ hiểu', date: '2024-12-08' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-secondary">Đánh giá</h1>
            <div className="space-y-4">
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

export default InstructorCourseReviews;
