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
    isMobile?: boolean;
    onEnroll: () => void;
    onContinue: () => void;
    onAddToCart: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
    course,
    isEnrolled,
    isMobile = false,
    onEnroll,
    onContinue,
    onAddToCart
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
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-primary ml-1" />
                        </div>
                    </button>
                </div>
            )}

            <div className="p-6">
                <div className="mb-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-[28px] font-bold leading-[30px]">
                                    {formatPrice(course.discount_price ?? course.price ?? 0)}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-base mt-1">
                                <span className="line-through font-normal text-slate-300">{formatPrice(course.price ?? 0).replace('₫', '')}</span>
                                <span>đ</span>
                            </div>
                        </div>
                        <div className="bg-[#FEEBEB] text-[#F56060] rounded px-2 py-1 text-xs font-semibold mt-1">
                            -{Math.round((1 - (course.discount_price ?? 0) / (course.price || 1)) * 100)}%
                        </div>
                    </div>
                </div>

                {isEnrolled ? (
                    <button
                        onClick={onContinue}
                        className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors mb-3 flex items-center justify-center gap-2 shadow-md ${isMobile ? 'py-3' : 'py-3.5'}`}
                    >
                        <PlayCircle className="w-5 h-5" />
                        Tiếp tục học
                    </button>
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
                            Mua ngay
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
                                    <span>{(course.sections ?? []).reduce((acc, s) => acc + (s.lessons?.length ?? 0), 0)} bài học</span>
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
