import React from 'react';
import { TEAM_MEMBERS } from '../mockData';
import { IoHomeOutline } from 'react-icons/io5';

const ValueCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full border-t-4 border-primary">
        <div className="text-primary text-5xl mb-3 inline-block">
            <IoHomeOutline name={icon}></IoHomeOutline >
        </div>
        <h3 className="text-2xl font-bold text-secondary">{title}</h3>
        <p className="mt-2 text-slate-600">{description}</p>
    </div>
);

const TeamMemberCard: React.FC<{ name: string; title: string; avatar: string }> = ({ name, title, avatar }) => (
    <div className="text-center">
        <img src={avatar} alt={name} className="w-40 h-40 rounded-full mx-auto shadow-lg mb-4 object-cover" />
        <h4 className="text-xl font-bold text-secondary">{name}</h4>
        <p className="text-primary">{title}</p>
    </div>
);

const StatCard: React.FC<{ value: string; label: string; icon: string }> = ({ value, label, icon }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
        <div className="text-primary text-5xl mb-3">
            <IoHomeOutline name={icon}></IoHomeOutline >
        </div>
        <p className="text-4xl font-bold text-secondary">{value}</p>
        <p className="text-slate-500">{label}</p>
    </div>
);


const AboutPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 text-center bg-light">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">Về MiLearn</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
                        MiLearn là nền tảng học trực tuyến thế hệ mới, được xây dựng với sứ mệnh dân chủ hóa giáo dục chất lượng cao, tập trung vào các kỹ năng thiết yếu của thế kỷ 21: Kỹ năng số và Ngoại ngữ ứng dụng.
                    </p>
                </div>
            </section>

            {/* Vision, Mission, Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 space-y-12">
                    <ValueCard
                        icon="eye-outline"
                        title="Tầm nhìn"
                        description="Trở thành hệ sinh thái học tập hàng đầu Châu Á, nơi mọi cá nhân đều có thể tiếp cận kiến thức để phát triển bản thân và sự nghiệp."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ValueCard
                            icon="rocket-outline"
                            title="Sứ mệnh"
                            description="Kết nối người dạy, người học và doanh nghiệp, cung cấp lộ trình học tập cá nhân hóa bằng AI để mang lại hiệu quả cao nhất."
                        />
                        <ValueCard
                            icon="heart-outline"
                            title="Giá trị cốt lõi"
                            description="Con người làm trung tâm - Đổi mới không ngừng - Cam kết chất lượng - Tạo dựng giá trị thực tiễn."
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Đội ngũ của chúng tôi</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {TEAM_MEMBERS.map(member => <TeamMemberCard key={member.name} {...member} />)}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Thành tựu đạt được</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard value="10.000+" label="Học viên" icon="people-outline" />
                        <StatCard value="500+" label="Khóa học" icon="book-outline" />
                        <StatCard value="150+" label="Giảng viên" icon="school-outline" />
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">Đối tác & Cộng đồng</h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                        <img src="https://via.placeholder.com/150x60?text=Partner+A" alt="Partner A" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                        <img src="https://via.placeholder.com/150x60?text=University+B" alt="University B" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                        <img src="https://via.placeholder.com/150x60?text=Tech+Corp+C" alt="Tech Corp C" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                        <img src="https://via.placeholder.com/150x60?text=Startup+D" alt="Startup D" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                        <img src="https://via.placeholder.com/150x60?text=Group+E" alt="Group E" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary">Liên hệ với chúng tôi</h2>
                            <p className="mt-4 text-slate-600">
                                Bạn có câu hỏi hoặc cần hỗ trợ? Đừng ngần ngại liên hệ với đội ngũ MiLearn. Chúng tôi luôn sẵn sàng lắng nghe.
                            </p>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <IoHomeOutline name="location-outline" className="text-primary text-2xl"></IoHomeOutline >
                                    <span className="text-slate-600">123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <IoHomeOutline name="mail-outline" className="text-primary text-2xl"></IoHomeOutline >
                                    <span className="text-slate-600">support@MiLearn.vn</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <IoHomeOutline name="call-outline" className="text-primary text-2xl"></IoHomeOutline >
                                    <span className="text-slate-600">(+84) 123 456 789</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-8 rounded-lg shadow-lg">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">Họ và tên</label>
                                    <input type="text" id="contact-name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary" />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" id="contact-email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary" />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">Nội dung</label>
                                    <textarea id="contact-message" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white font-bold py-2.5 rounded-md hover:bg-primary-hover transition-colors">
                                    Gửi tin nhắn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;