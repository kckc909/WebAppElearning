import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../mockData';
import CourseCard from '../components/CourseCard';
import { IoHomeOutline } from 'react-icons/io5';

const FeatureSection: React.FC<{
    imageUrl: string;
    title: string;
    description: string;
    reversed?: boolean;
}> = ({ imageUrl, title, description, reversed = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
            <img src={imageUrl} alt={title} className="rounded-lg shadow-xl w-full" />
        </div>
        <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-secondary">{title}</h3>
            <p className="mt-4 text-slate-600 text-lg">{description}</p>
            <div className="mt-6">
                <Link to="/courses" className="inline-block rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover">
                    Khám phá ngay
                </Link>
            </div>
        </div>
    </div>
);

const ReasonCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 h-full">
        <div className="text-primary text-4xl mb-4">
            <IoHomeOutline name={icon}></IoHomeOutline>
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const HomePage: React.FC = () => {
    const digitalCourses = COURSES.filter(c => c.category === 'Digital Skills');
    const languageCourses = COURSES.filter(c => c.category === 'Applied Language');

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-secondary tracking-tight">
                        Mở Khóa Tương Lai với <span className="text-primary">Kỹ Năng Vượt Trội</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
                        Hàng ngàn khóa học về Kỹ năng số và Ngoại ngữ ứng dụng, giúp bạn chinh phục mọi mục tiêu nghề nghiệp.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="relative w-full max-w-lg">
                            <input type="search" placeholder="Bạn muốn học gì hôm nay?" className="w-full rounded-full border-slate-300 py-3 pl-5 pr-32 text-lg focus:ring-primary focus:border-primary" />
                            <button className="absolute inset-y-0 right-0 m-1.5 rounded-full bg-primary px-6 text-white transition-colors hover:bg-primary-hover">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Promotion Section */}
            <section className="bg-blue-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-secondary">
                        🎉 Chào Hè Sôi Động!
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Nhân dịp hè, đăng ký tài khoản mới ngay hôm nay để nhận quyền truy cập <span className="font-bold text-primary">3 khóa học miễn phí</span> bất kỳ trong tuần đầu tiên!
                    </p>
                    <div className="mt-8">
                        <Link to="/auth" className="inline-block rounded-md bg-primary px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-primary-hover shadow-lg hover:shadow-xl transform hover:scale-105">
                            Đăng ký nhận quà
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Why Learn Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Vì Sao Cần Nâng Cấp Kỹ Năng Số & Ngoại Ngữ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ReasonCard 
                            icon="code-slash-outline"
                            title="Kỹ Năng Số: Chìa Khóa Tương Lai"
                            description="Trong kỷ nguyên số, thành thạo công nghệ, lập trình, và AI không còn là lợi thế mà là yêu cầu bắt buộc để phát triển sự nghiệp và không bị tụt hậu."
                        />
                        <ReasonCard 
                            icon="globe-outline"
                            title="Ngoại Ngữ: Cửa Sổ Ra Thế Giới"
                            description="Khả năng sử dụng ngoại ngữ mở ra cơ hội làm việc toàn cầu, tiếp cận nguồn tri thức vô tận và kết nối với bạn bè quốc tế."
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 space-y-20">
                    <h2 className="text-3xl font-bold text-center text-secondary">Tại sao chọn MiLearn?</h2>
                    <FeatureSection
                        imageUrl="https://picsum.photos/seed/feature1/800/600"
                        title="Lộ trình học tập cá nhân hóa"
                        description="Công nghệ AI của chúng tôi phân tích mục tiêu và trình độ của bạn để gợi ý những khóa học phù hợp nhất, giúp bạn đi đúng hướng và tiết kiệm thời gian."
                    />
                    <FeatureSection
                        imageUrl="https://picsum.photos/seed/feature2/800/600"
                        title="Nội dung chất lượng từ chuyên gia"
                        description="Học hỏi từ những giảng viên hàng đầu trong ngành, với các bài giảng được thiết kế chuyên sâu, thực tế và luôn cập nhật theo xu hướng mới nhất."
                        reversed
                    />
                    <FeatureSection
                        imageUrl="https://picsum.photos/seed/feature3/800/600"
                        title="Hệ sinh thái học tập toàn diện"
                        description="Không chỉ học qua video, bạn còn được tham gia cộng đồng, làm bài kiểm tra, nhận chứng chỉ và theo dõi tiến độ một cách trực quan."
                    />
                </div>
            </section>

            {/* Courses Sections */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-10">Khóa học Kỹ năng số nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {digitalCourses.slice(0, 4).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-10">Khóa học Ngoại ngữ ứng dụng nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {languageCourses.slice(0, 4).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="text-center py-16">
                <Link to="/courses" className="rounded-md bg-secondary px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-slate-700">
                    Xem tất cả khóa học
                </Link>
            </div>
        </div>
    );
};

export default HomePage;