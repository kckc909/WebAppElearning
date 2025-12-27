import React from 'react';
import {
    Play,
    PlayCircle,
    Clock,
    BookOpen,
    FileText,
    Award,
    Users,
    ShoppingCart,
    Heart,
    Share2
} from 'lucide-react';

interface CourseCardProps {
    course: {
        thumbnail: string;
        title: string;
        price: number;
        discount_price: number;
        total_duration: number;
        sections: Array<{
            lessons: Array<any>;
        }>;
    };
    isEnrolled: boolean;
    enrollmentStatus?: {
        progress: number;
        completed_lessons: number;
        total_lessons: number;
    } | null;
    isMobile?: boolean;
    isOwnCourse?: boolean;
    hasCertificate?: boolean;
    onEnroll: () => void;
    onContinue: () => void;
    onAddToCart: () => void;
    onClaimCertificate?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
    course,
    isEnrolled,
    enrollmentStatus,
    isMobile = false,
    isOwnCourse = false,
    hasCertificate = false,
    onEnroll,
    onContinue,
    onAddToCart,
    onClaimCertificate
}) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDuration = (minutes: number | undefined | null) => {
        const hours = Math.floor((minutes ?? 0) / 60);
        return `${hours} giờ học`;
    };

    return (
        <div className={`bg-[#0d315d] text-white rounded-2xl overflow-hidden border border-[#374151] shadow-xl ${isMobile ? '' : ''}`}>
            {!isMobile && (
                <div className="relative">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                    />
                </div>
            )}

            <div className="p-6">
                <div className="mb-6">
                    {/* Check if course is free */}
                    {(() => {
                        const effectivePrice = course.discount_price ?? course.price ?? 0;
                        const originalPrice = course.price ?? 0;
                        const hasDiscount = originalPrice > 0 && effectivePrice < originalPrice;
                        const isFree = effectivePrice == 0;

                        if (isFree) {
                            return (
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-[28px] font-bold leading-[30px] text-green-400">
                                            Miễn phí
                                        </span>
                                        {/* Show original price if it was discounted to free */}
                                        {originalPrice > 0 && (
                                            <div className="flex items-center gap-1 text-base mt-1">
                                                <span className="line-through font-normal text-slate-300">{formatPrice(originalPrice).replace('₫', '')}</span>
                                                <span>đ</span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Show 100% discount badge if discounted to free */}
                                    {originalPrice > 0 && (
                                        <div className="bg-[#FEEBEB] text-[#F56060] rounded px-2 py-1 text-xs font-semibold mt-1">
                                            -100%
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[28px] font-bold leading-[30px]">
                                            {formatPrice(effectivePrice)}
                                        </span>
                                    </div>
                                    {/* Only show original price if there's a discount */}
                                    {hasDiscount && (
                                        <div className="flex items-center gap-1 text-base mt-1">
                                            <span className="line-through font-normal text-slate-300">{formatPrice(originalPrice).replace('₫', '')}</span>
                                            <span>đ</span>
                                        </div>
                                    )}
                                </div>
                                {/* Only show discount badge if there's a discount */}
                                {hasDiscount && (
                                    <div className="bg-[#FEEBEB] text-[#F56060] rounded px-2 py-1 text-xs font-semibold mt-1">
                                        -{Math.round((1 - effectivePrice / originalPrice) * 100)}%
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>

                {isOwnCourse ? (
                    <>
                        {/* Instructor's own course */}
                        <div className="mb-4 p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                            <div className="flex items-center gap-2 text-purple-200 text-sm font-semibold mb-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                                Khóa học của bạn
                            </div>
                            <p className="text-xs text-purple-100">
                                Bạn có thể xem toàn bộ nội dung khóa học để kiểm tra và đánh giá
                            </p>
                        </div>

                        <button
                            onClick={onContinue}
                            className={`w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                        >
                            <PlayCircle className="w-5 h-5" />
                            Xem nội dung khóa học
                        </button>
                    </>
                ) : isEnrolled ? (
                    <>
                        {/* Progress Bar */}
                        {enrollmentStatus && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Tiến độ học tập</span>
                                    <span className="font-semibold">{enrollmentStatus.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full transition-all duration-300 ${enrollmentStatus.progress === 100 ? 'bg-emerald-500' : 'bg-green-500'}`}
                                        style={{ width: `${enrollmentStatus.progress}%` }}
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs text-slate-300">
                                        {enrollmentStatus.progress === 100
                                            ? 'Đã hoàn thành khóa học!'
                                            : `Đã hoàn thành ${enrollmentStatus.completed_lessons}/${enrollmentStatus.total_lessons} bài học`}
                                    </p>
                                    {enrollmentStatus.progress === 100 && hasCertificate && (
                                        <p className="text-xs text-amber-400 flex items-center gap-1 mt-1">
                                            <Award className="w-3 h-3" />
                                            Đã nhận chứng chỉ
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Show different buttons based on completion and certificate status */}
                        {enrollmentStatus?.progress === 100 ? (
                            hasCertificate ? (
                                // Already has certificate - Show "Learn Again"
                                <button
                                    onClick={onContinue}
                                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                                >
                                    <PlayCircle className="w-5 h-5" />
                                    Ôn tập
                                </button>
                            ) : (
                                // Completed but no certificate - Show "Claim Certificate"
                                <>
                                    <button
                                        onClick={onClaimCertificate}
                                        className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md mb-3 ${isMobile ? 'py-3' : 'py-3.5'}`}
                                    >
                                        <Award className="w-5 h-5" />
                                        Nhận chứng chỉ
                                    </button>
                                    <button
                                        onClick={onContinue}
                                        className={`w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${isMobile ? 'py-3' : 'py-3.5'}`}
                                    >
                                        <PlayCircle className="w-5 h-5" />
                                        Ôn tập
                                    </button>
                                </>
                            )
                        ) : (
                            // Still learning - Show "Continue Learning"
                            <button
                                onClick={onContinue}
                                className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                            >
                                <PlayCircle className="w-5 h-5" />
                                Tiếp tục học
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button
                            onClick={onContinue}
                            className={`w-full bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors mb-3 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                        >
                            Học thử
                        </button>
                        <button
                            onClick={onEnroll}
                            className={`w-full bg-[#F56060] hover:bg-[#f05b5b] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                        >
                            Đăng ký
                        </button>
                    </>
                )}

                {!isMobile && (
                    <>
                        <div className="mt-6 pt-6 border-t border-[#374151]">
                            <h4 className="font-semibold text-[20px] mb-4">Thông tin khóa học</h4>
                            <ul className="space-y-3.5 text-sm">
                                <li className="flex items-center gap-2.5">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>{formatDuration(course.total_duration)}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                                    <span>{(course.sections ?? []).reduce((acc, s) => acc + ((s as any).lessons?.length ?? (s as any).course_lessons?.length ?? 0), 0)} bài học</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <PlayCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{(course.sections ?? []).length} phần</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <FileText className="w-4 h-4 flex-shrink-0" />
                                    <span>Tài liệu học tập</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Award className="w-4 h-4 flex-shrink-0" />
                                    <span>Chứng chỉ hoàn thành</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    <span>Truy cập trọn đời</span>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
