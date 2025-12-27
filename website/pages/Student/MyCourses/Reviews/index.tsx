import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useMyCourseReviews } from '../../../../hooks/useMyCourseReviews';

const StudentCourseReviews: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Get course ID from params
    const { courseId } = useParams<{ courseId: string }>();
    const numericCourseId = parseInt(courseId || '1');

    // Get reviews from API hook
    const { data: reviewsData, isLoading, error, refetch } = useMyCourseReviews(numericCourseId);

    const reviews = (reviewsData || []).map((review: any) => ({
        id: review.id,
        studentName: review.student_name || review.studentName || 'Anonymous',
        rating: review.rating,
        comment: review.comment || '',
        date: review.created_at ? new Date(review.created_at).toLocaleDateString('vi-VN') : 'N/A',
    }));

    const handleSubmitReview = () => {
        if (rating > 0) {
            // TODO: Submit review via API
            console.log('Submit review:', { rating, comment });
            setRating(0);
            setComment('');
            refetch();
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {(error as Error).message}</div>;
    }

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
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        onClick={handleSubmitReview}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Đánh giá từ học viên ({reviews.length})</h2>
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

            {reviews.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Chưa có đánh giá</h3>
                    <p className="text-slate-600">Hãy là người đầu tiên đánh giá khóa học này!</p>
                </div>
            )}
        </div>
    );
};

export default StudentCourseReviews;
