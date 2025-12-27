import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { instructor_routes } from '../../../../page_routes';

interface ReviewsTabProps {
    courseId: string;
    reviewsData: any[];
    reviewsLoading: boolean;
    reviewsError: string | null;
    fetchReviews: () => void;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
    courseId,
    reviewsData,
    reviewsLoading,
    reviewsError,
    fetchReviews
}) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Header with navigation button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-secondary">Thống kê đánh giá</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Tổng cộng {reviewsData.length} đánh giá
                    </p>
                </div>
                <button
                    onClick={() => navigate(`/${instructor_routes.base}courses/${courseId}/reviews`)}
                    className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                >
                    <ExternalLink className="w-4 h-4" />
                    Xem tất cả đánh giá
                </button>
            </div>

            {/* Loading State */}
            {reviewsLoading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            )}

            {/* Error State */}
            {reviewsError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-3" />
                    <p className="text-red-600 font-medium">{reviewsError}</p>
                    <button
                        onClick={fetchReviews}
                        className="mt-3 text-sm text-red-700 underline hover:no-underline"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Charts */}
            {!reviewsLoading && !reviewsError && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Rating Distribution Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Phân bố đánh giá</h3>
                        <div className="h-64">
                            {(() => {
                                const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
                                    rating: `${rating} sao`,
                                    count: reviewsData.filter((r: any) => Math.round(r.rating) === rating).length
                                }));

                                if (reviewsData.length === 0) {
                                    return (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <div className="text-center">
                                                <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p>Chưa có đánh giá nào</p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={ratingCounts} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis type="number" stroke="#64748b" fontSize={12} />
                                            <YAxis type="category" dataKey="rating" stroke="#64748b" fontSize={12} width={60} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#fbbf24" name="Số lượng" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Average Rating Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-secondary mb-4">Điểm đánh giá trung bình</h3>
                        <div className="h-64 flex items-center justify-center">
                            {reviewsData.length === 0 ? (
                                <div className="text-center text-slate-400">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Chưa có đánh giá</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-yellow-500 mb-2">
                                        {(reviewsData.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / reviewsData.length).toFixed(1)}
                                    </div>
                                    <div className="flex items-center justify-center gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-6 h-6 ${star <= Math.round(reviewsData.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / reviewsData.length)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-slate-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-slate-500">
                                        Dựa trên {reviewsData.length} đánh giá
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
