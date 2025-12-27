import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const InstructorFeature: React.FC<{ imageUrl: string; title: string; description: string; reversed?: boolean; }> = ({ imageUrl, title, description, reversed }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
            <img src={imageUrl} alt={title} className="rounded-lg shadow-xl w-full" />
        </div>
        <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-secondary">{title}</h3>
            <p className="mt-4 text-slate-600 text-lg">{description}</p>
        </div>
    </div>
);

const InstructorStat: React.FC<{ value: string; label: string; icon: string }> = ({ value, label, icon }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
        <div className="text-primary text-5xl mb-3">
            <IoHomeOutline name={icon}></IoHomeOutline>
        </div>
        <p className="text-4xl font-bold text-secondary">{value}</p>
        <p className="text-slate-500">{label}</p>
    </div>
);

const SupportPolicy: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-light p-6 rounded-lg h-full">
        <div className="flex items-start space-x-4">
            <div className="text-primary text-3xl mt-1 flex-shrink-0">
                <IoHomeOutline name={icon}></IoHomeOutline>
            </div>
            <div>
                <h4 className="text-xl font-bold text-secondary">{title}</h4>
                <p className="mt-1 text-slate-600">{description}</p>
            </div>
        </div>
    </div>
);


const StepCard: React.FC<{ step: string; title: string; description: string }> = ({ step, title, description }) => (
    <div className="relative pl-10">
        <div className="absolute left-0 top-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
            {step}
        </div>
        <h3 className="text-xl font-bold text-secondary">{title}</h3>
        <p className="mt-1 text-slate-600">{description}</p>
    </div>
)

const BecomeInstructorPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-secondary py-20 md:py-32 text-white text-center">
                <div className="absolute inset-0">
                    <img src="https://picsum.photos/seed/instructor-hero/1600/900" alt="Teaching online" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Chia sẻ kiến thức, thay đổi cuộc sống
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
                        Trở thành giảng viên trên MiLearn và truyền cảm hứng cho hàng ngàn học viên trên khắp thế giới.
                    </p>
                    <div className="mt-8">
                        <Link to="/auth" className="rounded-md bg-primary px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-hover">
                            Bắt đầu ngay
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-16">Tại sao nên giảng dạy trên MiLearn?</h2>
                    <div className="space-y-20">
                        <InstructorFeature
                            imageUrl="https://picsum.photos/seed/instructor-f1/800/600"
                            title="Mở rộng tầm ảnh hưởng"
                            description="Tiếp cận hàng ngàn học viên tiềm năng và xây dựng thương hiệu cá nhân của bạn trong lĩnh vực chuyên môn. MiLearn giúp bạn kết nối với cộng đồng học tập toàn cầu."
                        />
                        <InstructorFeature
                            imageUrl="https://picsum.photos/seed/instructor-f2/800/600"
                            title="Tạo nguồn thu nhập thụ động"
                            description="Kiếm tiền từ chính kiến thức và kinh nghiệm của bạn. Chúng tôi cung cấp mô hình chia sẻ doanh thu hấp dẫn và minh bạch, giúp bạn có nguồn thu nhập ổn định."
                            reversed
                        />
                        <InstructorFeature
                            imageUrl="https://picsum.photos/seed/instructor-f3/800/600"
                            title="Nền tảng và công cụ mạnh mẽ"
                            description="Sử dụng hệ thống quản lý học tập (LMS) trực quan, dễ dàng tải lên video, tài liệu, tạo bài kiểm tra và tương tác với học viên."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">MiLearn qua những con số</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InstructorStat value="10.000+" label="Học viên tiềm năng" icon="people-outline" />
                        <InstructorStat value="70%" label="Tỷ lệ chia sẻ doanh thu" icon="pie-chart-outline" />
                        <InstructorStat value="24/7" label="Hỗ trợ kỹ thuật" icon="headset-outline" />
                    </div>
                </div>
            </section>

            {/* How it works Section */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Quy trình đơn giản</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://picsum.photos/seed/process/800/600" alt="Planning a course" className="rounded-lg shadow-xl" />
                        </div>
                        <div className="space-y-8">
                            <StepCard step="1" title="Lên kế hoạch & Quay video" description="Xây dựng đề cương chi tiết và quay các bài giảng chất lượng cao. Chúng tôi sẽ hỗ trợ bạn về mặt kỹ thuật." />
                            <StepCard step="2" title="Xây dựng khóa học" description="Tải lên video và tài liệu của bạn lên nền tảng MiLearn thông qua các công cụ thân thiện." />
                            <StepCard step="3" title="Ra mắt & Quảng bá" description="Gửi khóa học để chúng tôi xét duyệt và ra mắt. Cùng chúng tôi quảng bá khóa học đến đúng đối tượng." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Policy Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Chính sách hỗ trợ toàn diện</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SupportPolicy
                            icon="videocam-outline"
                            title="Hỗ trợ sản xuất khóa học"
                            description="Chúng tôi cung cấp hướng dẫn chi tiết về quay phim, biên tập video và thiết kế bài giảng để khóa học của bạn đạt chất lượng tốt nhất."
                        />
                        <SupportPolicy
                            icon="megaphone-outline"
                            title="Marketing & Quảng bá"
                            description="Khóa học của bạn sẽ được quảng bá trên các kênh của MiLearn, giúp bạn tiếp cận đúng đối tượng học viên mục tiêu."
                        />
                        <SupportPolicy
                            icon="analytics-outline"
                            title="Phân tích & Báo cáo"
                            description="Theo dõi doanh thu, số lượng học viên và các chỉ số quan trọng khác thông qua bảng điều khiển dành riêng cho giảng viên."
                        />
                        <SupportPolicy
                            icon="chatbubbles-outline"
                            title="Cộng đồng giảng viên"
                            description="Tham gia cộng đồng các chuyên gia, chia sẻ kinh nghiệm và học hỏi lẫn nhau để cùng phát triển."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-secondary">Sẵn sàng chia sẻ kiến thức của bạn?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Hãy tham gia cộng đồng giảng viên của chúng tôi và tạo ra sự khác biệt ngay hôm nay.
                    </p>
                    <div className="mt-8">
                        <Link to="/auth" className="rounded-md bg-primary px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-primary-hover">
                            Bắt đầu giảng dạy
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BecomeInstructorPage;