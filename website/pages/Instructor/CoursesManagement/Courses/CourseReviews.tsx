import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Star, MessageSquare, ThumbsUp, Flag,
    Filter, Search, ChevronDown, Loader2, TrendingUp
} from 'lucide-react';
import { instructor_routes } from '../../../page_routes';
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '../../../../API';

const CourseReviewsPage: React.FC = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'rating_high' | 'rating_low'>('recent');

    // Fetch reviews
    const { data: reviewsData, isLoading } = useQuery({
        queryKey: ['course-reviews', courseId],
        queryFn: async () => {
            const response = await coursesApi.getReviews(parseInt(courseId!));
            return response.data || [];
        },
        enabled: !!courseId
    });

    const reviews = reviewsData || [];

    // Calculate stats
    const stats = {
        total: reviews.length,
        average: reviews.length > 0
            ? reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / reviews.length
            : 0,
        distribution: [5, 4, 3, 2, 1].map(rating => ({
            rating,
            count: reviews.filter((r: any) => Math.round(r.rating) === rating).length,
            percentage: reviews.length > 0
                ? (reviews.filter((r: any) => Math.round(r.rating) === rating).length / reviews.length) * 100
                : 0
        }))
    };

    // Filter and sort
    const filteredReviews = reviews
        .filter((review: any) => {
            const matchesSearch = review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.student_name?.toLowerCase().includes(searchTerm.toLowerCase());

            if (!matchesSearch) return false;

            if (filterRating === 'all') return true;
            return Math.round(review.rating) === parseInt(filterRating);
        })
        .sort((a: any, b: any) => {
            if (sortBy === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (sortBy === 'rating_high') return (b.rating || 0) - (a.rating || 0);
            if (sortBy === 'rating_low') return (a.rating || 0) - (b.rating || 0);
            return 0;
        });

    const handleBack = () => {
        navigate(`/${instructor_routes.base}${instructor_routes.course_detail(courseId!)}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-secondary">Đánh giá khóa học</h1>
                            <p className="text-sm text-slate-500 mt-1">Phản hồi và đánh giá từ học viên</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Rating Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
                            <h3 className="font-semibold text-secondary mb-6">Tổng quan đánh giá</h3>

                            {/* Average Rating */}
                            <div className="text-center mb-8 pb-8 border-b border-slate-200">
                                <div className="text-6xl font-bold text-yellow-500 mb-3">
                                    {stats.average.toFixed(1)}
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-6 h-6 ${star <= Math.round(stats.average)
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-slate-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-600">
                                    {stats.total} đánh giá
                                </p>
                            </div>

                            {/* Rating Distribution */}
                            <div className="space-y-3">
                                {stats.distribution.map((item) => (
                                    <div key={item.rating} className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 min-w-[80px]">
                                            <span className="text-sm font-medium text-slate-700">{item.rating}</span>
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        </div>
                                        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 transition-all"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-slate-600 min-w-[45px] text-right">
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Reviews List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Filters */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm đánh giá..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <select
                                            value={filterRating}
                                            onChange={(e) => setFilterRating(e.target.value as any)}
                                            className="pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                                        >
                                            <option value="all">Tất cả</option>
                                            <option value="5">5 sao</option>
                                            <option value="4">4 sao</option>
                                            <option value="3">3 sao</option>
                                            <option value="2">2 sao</option>
                                            <option value="1">1 sao</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="px-4 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                                        >
                                            <option value="recent">Mới nhất</option>
                                            <option value="rating_high">Điểm cao</option>
                                            <option value="rating_low">Điểm thấp</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="space-y-4">
                            {filteredReviews.length === 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500">Không tìm thấy đánh giá nào</p>
                                </div>
                            ) : (
                                filteredReviews.map((review: any, index: number) => (
                                    <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <span className="text-primary font-semibold text-lg">
                                                        {(review.student_name || 'U')[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-secondary">{review.student_name || 'Anonymous'}</p>
                                                    <p className="text-sm text-slate-500">
                                                        {new Date(review.created_at).toLocaleDateString('vi-VN')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-5 h-5 ${star <= review.rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-slate-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-slate-700 leading-relaxed mb-4">
                                            {review.comment || 'Không có nhận xét'}
                                        </p>

                                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                            <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="text-sm">Hữu ích</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                                                <Flag className="w-4 h-4" />
                                                <span className="text-sm">Báo cáo</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseReviewsPage;
