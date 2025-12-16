import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedCourses } from '../../hooks/useApi';
import CourseCard from '../../components/CourseCard';
import { ErrorState } from '../../components/DataStates';
import {
    BookOpen,
    Users,
    Award,
    TrendingUp,
    Zap,
    Globe,
    Code,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Play,
    Star,
    Loader2,
    RefreshCw
} from 'lucide-react';

// Feature Card Component
const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

// Stats Card Component
const StatsCard: React.FC<{
    number: string;
    label: string;
    icon: React.ReactNode;
}> = ({ number, label, icon }) => (
    <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white transition-all">
        <div className="flex justify-center mb-3 text-primary">
            {icon}
        </div>
        <div className="text-4xl font-bold text-secondary mb-2">{number}</div>
        <div className="text-slate-600">{label}</div>
    </div>
);

const HomePage: React.FC = () => {
    // Sử dụng API hook thay vì import trực tiếp
    const { data: courses, loading, error, refetch } = useFeaturedCourses(15);

    // Đảm bảo courses luôn là array
    const courseList = Array.isArray(courses) ? courses : [];

    // Filter courses by category
    const digitalCourses = courseList.filter((c: any) => c.category === 'Digital Skills');
    const languageCourses = courseList.filter((c: any) => c.category === 'Applied Language');

    // Course section loading/error component
    const renderCourseSection = (title: string, subtitle: string, emoji: string, courses: any[]) => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
                    <span className="text-slate-500">Đang tải khóa học...</span>
                </div>
            );
        }
        if (error) {
            return (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600 mb-3">{error}</p>
                    <button
                        onClick={refetch}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Thử lại
                    </button>
                </div>
            );
        }
        if (courses.length === 0) {
            return (
                <div className="text-center py-12 text-slate-500">
                    Chưa có khóa học nào trong danh mục này.
                </div>
            );
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.slice(0, 4).map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        );
    };


    return (
        <div className="bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section - Modern & Clean */}
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

            {/* What You'll Get - Individual Feature Sections */}

            {/* Section 1: AI Personalized Learning */}
            <section className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                                <Sparkles className="w-5 h-5" />
                                AI-Powered Technology
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
                                🎯 Lộ trình học tập<br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    được cá nhân hóa
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Hệ thống AI thông minh phân tích mục tiêu, trình độ hiện tại và tốc độ học tập của bạn.
                                Từ đó đề xuất lộ trình học tập tối ưu nhất, giúp bạn tiến bộ nhanh chóng và hiệu quả.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                                    <div className="text-3xl font-bold text-blue-600">100%</div>
                                    <div className="text-sm text-slate-600">Phù hợp với bạn</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                                    <div className="text-3xl font-bold text-purple-600">3x</div>
                                    <div className="text-sm text-slate-600">Nhanh hơn</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Interactive Mockup */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 transform hover:scale-105 transition-transform duration-500">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-sm text-slate-500 ml-3 font-semibold">Lộ trình của bạn</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Completed Course */}
                                    <div className="group bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-green-900 mb-1">HTML & CSS Basics</div>
                                                <div className="text-sm text-green-600">Hoàn thành • 24 bài học</div>
                                            </div>
                                            <div className="text-2xl font-bold text-green-600">100%</div>
                                        </div>
                                    </div>

                                    {/* In Progress Course */}
                                    <div className="group bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                                                <Play className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-blue-900 mb-1">JavaScript Fundamentals</div>
                                                <div className="text-sm text-blue-600">Đang học • 18/32 bài học</div>
                                                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600">65%</div>
                                        </div>
                                    </div>

                                    {/* Recommended Course */}
                                    <div className="group bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-400 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Sparkles className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-900 mb-1">React.js Advanced</div>
                                                <div className="text-sm text-purple-600">Khuyến nghị tiếp theo • 28 bài học</div>
                                            </div>
                                            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Rich Course Library */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Visual Grid */}
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Category Cards */}
                                <div className="group bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl">
                                    <Code className="w-12 h-12 mb-4 opacity-80" />
                                    <div className="text-4xl font-bold mb-2">120+</div>
                                    <div className="text-blue-100">Web Development</div>
                                </div>

                                <div className="group bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl mt-8">
                                    <Globe className="w-12 h-12 mb-4 opacity-80" />
                                    <div className="text-4xl font-bold mb-2">85+</div>
                                    <div className="text-green-100">English & Languages</div>
                                </div>

                                <div className="group bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl">
                                    <Sparkles className="w-12 h-12 mb-4 opacity-80" />
                                    <div className="text-4xl font-bold mb-2">95+</div>
                                    <div className="text-purple-100">AI & Data Science</div>
                                </div>

                                <div className="group bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl mt-8">
                                    <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
                                    <div className="text-4xl font-bold mb-2">200+</div>
                                    <div className="text-orange-100">Business & Marketing</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="space-y-6 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                                <BookOpen className="w-5 h-5" />
                                500+ Courses
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
                                📚 Thư viện khóa học<br />
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    phong phú & đa dạng
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Từ lập trình, thiết kế, marketing đến ngoại ngữ - chúng tôi có tất cả.
                                Mỗi khóa học được thiết kế bởi chuyên gia hàng đầu, cập nhật liên tục theo xu hướng mới nhất.
                            </p>
                            <ul className="space-y-4 pt-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <span className="text-lg text-slate-700">Nội dung từ cơ bản đến nâng cao</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <span className="text-lg text-slate-700">Cập nhật hàng tuần với khóa học mới</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <span className="text-lg text-slate-700">Học theo lộ trình hoặc tự do chọn</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Expert Instructors */}
            <section className="py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold mb-6">
                            <Users className="w-5 h-5" />
                            50+ Expert Instructors
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
                            👨‍🏫 Học từ những<br />
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                chuyên gia hàng đầu
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Giảng viên của chúng tôi là những chuyên gia đang làm việc tại các công ty công nghệ hàng đầu thế giới
                        </p>
                    </div>

                    {/* Instructor Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: 'Nguyễn Thị Duyên', role: 'Senior Developer', company: 'Meta', seed: 'instructor1', color: 'blue' },
                            { name: 'Trần Quang Minh Đức', role: 'AI Researcher', company: 'Google', seed: 'instructor2', color: 'purple' },
                            { name: 'Nguyễn Hùng Anh', role: 'UX Lead', company: 'Amazon', seed: 'instructor3', color: 'green' }
                        ].map((instructor, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200">
                                <div className="relative mb-6">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-${instructor.color}-400 to-${instructor.color}-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.seed}`}
                                        alt={instructor.name}
                                        className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg relative z-10"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-secondary text-center mb-2">{instructor.name}</h3>
                                <p className="text-slate-600 text-center mb-1">{instructor.role}</p>
                                <p className="text-sm text-slate-500 text-center">@ {instructor.company}</p>
                                <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex justify-around text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-secondary">{15 + idx * 5}+</div>
                                            <div className="text-xs text-slate-500">Khóa học</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-secondary">{5 + idx}K+</div>
                                            <div className="text-xs text-slate-500">Học viên</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-secondary">4.{8 + idx}</div>
                                            <div className="text-xs text-slate-500">Rating</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Community */}
            <section className="py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                                <Users className="w-5 h-5" />
                                10,000+ Active Members
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
                                💬 Cộng đồng học tập<br />
                                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                    sôi động & hỗ trợ
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Tham gia cộng đồng học viên năng động, nơi bạn có thể đặt câu hỏi, chia sẻ kinh nghiệm
                                và kết nối với những người cùng đam mê học tập.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-100">
                                    <div className="text-3xl font-bold text-green-600">24/7</div>
                                    <div className="text-sm text-slate-600">Hỗ trợ</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-100">
                                    <div className="text-3xl font-bold text-teal-600">&lt;1h</div>
                                    <div className="text-sm text-slate-600">Phản hồi</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Community Feed Mockup */}
                        <div className="space-y-4">
                            {[
                                { user: 'Minh Hoàng', time: '2 giờ trước', message: 'Mình vừa hoàn thành khóa React! Cảm ơn thầy và các bạn đã support 🎉', likes: 24, replies: 8, seed: 'user1' },
                                { user: 'Thu Hà', time: '5 giờ trước', message: 'Có ai học JavaScript cùng mình không? Mình đang bí bài tập về async/await 😅', likes: 15, replies: 12, seed: 'user2' },
                                { user: 'Đức Anh', time: '1 ngày trước', message: 'Tips: Nên học HTML/CSS thật vững trước khi nhảy sang framework nhé các bạn!', likes: 45, replies: 6, seed: 'user3' }
                            ].map((post, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 group">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.seed}`}
                                            alt={post.user}
                                            className="w-12 h-12 rounded-full border-2 border-green-200"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-secondary">{post.user}</span>
                                                <span className="text-xs text-slate-500">{post.time}</span>
                                            </div>
                                            <p className="text-slate-700 mb-3">{post.message}</p>
                                            <div className="flex items-center gap-6 text-sm text-slate-500">
                                                <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                                    <span>👍</span>
                                                    <span>{post.likes}</span>
                                                </button>
                                                <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                                    <span>💬</span>
                                                    <span>{post.replies} replies</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Multi-Platform & Progress Tracking Combined */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
                            Và còn nhiều hơn thế nữa...
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Multi-device */}
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100 hover:shadow-xl transition-all">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-2xl font-bold text-secondary mb-3">Đa nền tảng</h3>
                            <p className="text-slate-600 mb-6">Học mọi lúc, mọi nơi trên mọi thiết bị</p>
                            <div className="flex justify-center items-end gap-3">
                                <div className="w-16 h-24 bg-white rounded-xl border-2 border-slate-300 shadow-lg"></div>
                                <div className="w-20 h-28 bg-white rounded-xl border-2 border-slate-300 shadow-lg"></div>
                                <div className="w-28 h-20 bg-white rounded-xl border-2 border-slate-300 shadow-lg"></div>
                            </div>
                        </div>

                        {/* Certificates */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 hover:shadow-xl transition-all">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-2xl font-bold text-secondary mb-3">Chứng chỉ uy tín</h3>
                            <p className="text-slate-600 mb-6">Được công nhận bởi doanh nghiệp</p>
                            <div className="bg-white rounded-xl p-6 border-4 border-amber-200 shadow-lg">
                                <Award className="w-16 h-16 text-amber-500 mx-auto mb-3" />
                                <div className="text-center">
                                    <div className="font-bold text-amber-900">Certificate</div>
                                    <div className="text-xs text-slate-500 mt-1">of Completion</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Tracking */}
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 hover:shadow-xl transition-all">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-2xl font-bold text-secondary mb-3">Theo dõi tiến độ</h3>
                            <p className="text-slate-600 mb-6">Dashboard thông minh & trực quan</p>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600">Tuần này</span>
                                        <span className="font-bold text-violet-600">12h</span>
                                    </div>
                                    <div className="w-full bg-violet-200 rounded-full h-3">
                                        <div className="bg-violet-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600">Streak</span>
                                        <span className="font-bold text-orange-600">🔥 7 ngày</span>
                                    </div>
                                    <div className="w-full bg-orange-200 rounded-full h-3">
                                        <div className="bg-orange-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <Link
                            to="/auth"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 text-white px-10 py-5 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Bắt đầu học ngay - Miễn phí
                            <Zap className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Skills Matter Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                            🎓 Tại sao cần nâng cấp kỹ năng?
                        </h2>
                        <p className="text-xl text-slate-600">
                            Trong thời đại số, học tập liên tục là chìa khóa thành công
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all">
                            <div className="text-5xl mb-4">💻</div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Kỹ Năng Số - Chìa Khóa Tương Lai</h3>
                            <div className="space-y-3 text-slate-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>85% công việc trong tương lai yêu cầu kỹ năng công nghệ</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Lương trung bình cao hơn 40% so với ngành truyền thống</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Cơ hội làm việc remote và freelance linh hoạt</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all">
                            <div className="text-5xl mb-4">🌍</div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Ngoại Ngữ - Cửa Sổ Ra Thế Giới</h3>
                            <div className="space-y-3 text-slate-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Mở rộng cơ hội nghề nghiệp tại các công ty đa quốc gia</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Tiếp cận nguồn kiến thức toàn cầu không giới hạn</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>Kết nối và hợp tác với chuyên gia quốc tế</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - 4 Steps Section */}
            <section className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-6">
                            <Zap className="w-5 h-5" />
                            Dễ dàng & Nhanh chóng
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
                            Chỉ <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">4 bước</span> để bắt đầu
                        </h2>
                        <p className="text-xl text-slate-600">
                            Bắt đầu hành trình học tập của bạn chỉ trong vài phút
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {/* Connecting Line - Hidden on mobile */}
                            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-20" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>

                            {/* Step 1 */}
                            <div className="group relative">
                                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative z-10">
                                    {/* Step Number */}
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                            1
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-8 mb-6 flex justify-center">
                                        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <Users className="w-10 h-10 text-blue-600" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-secondary mb-3 text-center">Đăng ký tài khoản</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Tạo tài khoản miễn phí chỉ trong 30 giây với email hoặc Google
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="group relative">
                                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative z-10">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                            2
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-6 flex justify-center">
                                        <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                            <BookOpen className="w-10 h-10 text-purple-600" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-secondary mb-3 text-center">Chọn khóa học</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Khám phá 500+ khóa học hoặc để AI gợi ý lộ trình phù hợp với bạn
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="group relative">
                                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative z-10">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                            3
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-6 flex justify-center">
                                        <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                                            <Play className="w-10 h-10 text-pink-600" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-secondary mb-3 text-center">Bắt đầu học tập</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Học với video HD, bài tập thực hành và hỗ trợ từ cộng đồng
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="group relative">
                                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative z-10">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                            4
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-6 flex justify-center">
                                        <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                            <Award className="w-10 h-10 text-green-600" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-secondary mb-3 text-center">Nhận chứng chỉ</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Theo dõi tiến độ và nhận chứng chỉ được công nhận khi hoàn thành
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-16">
                            <Link
                                to="/auth"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                Bắt đầu ngay - Miễn phí
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <p className="text-sm text-slate-500 mt-4">
                                ✓ Không cần thẻ tín dụng  •  ✓ Hủy bất cứ lúc nào
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                            🚀 Tính năng nổi bật
                        </h2>
                        <p className="text-xl text-slate-600">
                            Công nghệ hiện đại phục vụ trải nghiệm học tập tốt nhất
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard
                            icon={<TrendingUp className="w-7 h-7" />}
                            title="AI Cá Nhân Hóa"
                            description="Hệ thống AI phân tích và đề xuất lộ trình học tập phù hợp với mục tiêu và năng lực của bạn"
                        />
                        <FeatureCard
                            icon={<Code className="w-7 h-7" />}
                            title="Thực Hành Tương Tác"
                            description="Coding playground, quiz tương tác và bài tập thực tế giúp củng cố kiến thức"
                        />
                        <FeatureCard
                            icon={<Users className="w-7 h-7" />}
                            title="Học Nhóm & Mentor"
                            description="Tham gia lớp học trực tuyến, thảo luận nhóm và nhận hỗ trợ từ mentor 1-1"
                        />
                        <FeatureCard
                            icon={<Award className="w-7 h-7" />}
                            title="Chứng Chỉ Uy Tín"
                            description="Nhận chứng chỉ được công nhận bởi các doanh nghiệp hàng đầu"
                        />
                        <FeatureCard
                            icon={<Globe className="w-7 h-7" />}
                            title="Đa Nền Tảng"
                            description="Học liền mạch trên web, mobile app với đồng bộ tiến độ tự động"
                        />
                        <FeatureCard
                            icon={<Sparkles className="w-7 h-7" />}
                            title="Nội Dung Premium"
                            description="Video HD, tài liệu chất lượng cao và cập nhật liên tục theo xu hướng"
                        />
                    </div>
                </div>
            </section>

            {/* Courses Sections */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                                💻 Khóa học Kỹ năng số
                            </h2>
                            <p className="text-slate-600">Làm chủ công nghệ, dẫn đầu tương lai</p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold group"
                        >
                            Xem tất cả
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    {renderCourseSection('Khóa học Kỹ năng số', 'Làm chủ công nghệ, dẫn đầu tương lai', '💻', digitalCourses)}
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                                🌏 Khóa học Ngoại ngữ
                            </h2>
                            <p className="text-slate-600">Mở rộng tầm nhìn, kết nối toàn cầu</p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold group"
                        >
                            Xem tất cả
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    {renderCourseSection('Khóa học Ngoại ngữ', 'Mở rộng tầm nhìn, kết nối toàn cầu', '🌏', languageCourses)}
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="relative py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Main CTA Content */}
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
                                <Sparkles className="w-4 h-4" />
                                Ưu đãi đặc biệt cho thành viên mới
                            </div>

                            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                🎉 Sẵn sàng thay đổi<br />
                                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                                    tương lai của bạn?
                                </span>
                            </h2>

                            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                                Tham gia cùng <span className="font-bold text-yellow-300">10,000+ học viên</span> đang thay đổi cuộc sống của họ với MiLearn
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                to="/auth"
                                className="group inline-flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-yellow-300/50 transition-all transform hover:scale-105"
                            >
                                Đăng ký miễn phí ngay
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/courses"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-bold text-xl border-2 border-white/40 hover:border-white/60 transition-all"
                            >
                                <Play className="w-6 h-6" />
                                Xem demo khóa học
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold mb-2">10K+</div>
                                <div className="text-white/80 text-sm">Học viên hài lòng</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold mb-2">500+</div>
                                <div className="text-white/80 text-sm">Khóa học chất lượng</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold mb-2">4.9⭐</div>
                                <div className="text-white/80 text-sm">Đánh giá trung bình</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <div className="text-white/80 text-sm">Hỗ trợ học viên</div>
                            </div>
                        </div>

                        {/* Benefits Highlight */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold mb-6">🎁 Đăng ký hôm nay, nhận ngay:</h3>
                            <div className="grid md:grid-cols-3 gap-6 text-left">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="font-semibold mb-1">3 khóa học miễn phí</div>
                                        <div className="text-sm text-white/70">Trong tuần đầu tiên</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="font-semibold mb-1">Chứng chỉ quốc tế</div>
                                        <div className="text-sm text-white/70">Sau khi hoàn thành</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="font-semibold mb-1">Truy cập trọn đời</div>
                                        <div className="text-sm text-white/70">Không giới hạn thời gian</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Urgency Element */}
                        <div className="mt-8 text-yellow-200 text-sm font-semibold animate-pulse">
                            ⚡ Ưu đãi có giới hạn - Chỉ còn 50 suất đăng ký miễn phí trong tháng này!
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;