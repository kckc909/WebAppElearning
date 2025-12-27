import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface Review {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    time: string;
    likes: number;
}

interface ReviewsTabProps {
    reviews: Review[];
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-secondary mb-6">Đánh giá bài học</h2>

                {reviews.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <Star className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Chưa có đánh giá nào</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex gap-4 pb-6 border-b last:border-0">
                                <img
                                    src={review.avatar}
                                    alt={review.user}
                                    className="w-12 h-12 rounded-full flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-semibold text-secondary">{review.user}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-slate-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-slate-500">{review.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 mb-3">{review.comment}</p>
                                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>Hữu ích ({review.likes})</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsTab;
