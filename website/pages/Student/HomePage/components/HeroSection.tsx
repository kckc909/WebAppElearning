import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, Award, ArrowRight, Play } from 'lucide-react';
import { StatsCard } from './StatsCard';

export const HeroSection: React.FC = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-secondary tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Học Tập Thông Minh,{' '}
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Tương Lai Rực Rỡ
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Khám phá hàng ngàn khóa học chất lượng cao về
                    <span className="font-semibold text-primary"> Kỹ năng số</span> và
                    <span className="font-semibold text-purple-600"> Ngoại ngữ</span>.
                    Học mọi lúc, mọi nơi với MiLearn 🚀
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link
                        to="/courses"
                        className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        Khám phá khóa học
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/auth"
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-secondary px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-primary transition-all"
                    >
                        <Play className="w-5 h-5" />
                        Dùng thử miễn phí
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <StatsCard number="10K+" label="Học viên" icon={<Users className="w-6 h-6" />} />
                    <StatsCard number="500+" label="Khóa học" icon={<BookOpen className="w-6 h-6" />} />
                    <StatsCard number="98%" label="Hài lòng" icon={<Star className="w-6 h-6" />} />
                    <StatsCard number="50+" label="Chuyên gia" icon={<Award className="w-6 h-6" />} />
                </div>
            </div>
        </div>
    </section>
);
