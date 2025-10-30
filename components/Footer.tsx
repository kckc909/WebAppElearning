
import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-slate-400 hover:text-white transition-colors">{children}</Link>
);

const SocialIcon: React.FC<{ name: string }> = ({ name }) => (
  <a href="#" className="text-slate-400 hover:text-white">
    <IoHomeOutline name={name} className="text-2xl"></IoHomeOutline>
  </a>
)

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Về MiLearn</h3>
            <p className="mt-4 text-slate-400">
              Nền tảng học trực tuyến chuyên sâu về Kỹ năng số và Ngoại ngữ ứng dụng, kết nối người dạy và người học.
            </p>
            <div className="flex space-x-4 mt-4">
              <SocialIcon name="logo-facebook" />
              <SocialIcon name="logo-youtube" />
              <SocialIcon name="logo-linkedin" />
              <SocialIcon name="logo-tiktok" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Khóa học</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink to="/courses?category=digital">Kỹ năng số</FooterLink></li>
              <li><FooterLink to="/courses?category=language">Ngoại ngữ ứng dụng</FooterLink></li>
              <li><FooterLink to="/courses?category=business">Kinh doanh</FooterLink></li>
              <li><FooterLink to="/courses?category=design">Thiết kế</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Hỗ trợ</h3>
            <ul className="mt-4 space-y-2">
              <li><FooterLink to="/about">Về chúng tôi</FooterLink></li>
              <li><FooterLink to="/contact">Liên hệ</FooterLink></li>
              <li><FooterLink to="/faq">Câu hỏi thường gặp</FooterLink></li>
              <li><FooterLink to="/terms">Điều khoản dịch vụ</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Đăng ký nhận tin</h3>
            <p className="mt-4 text-slate-400">Nhận thông tin về các khóa học mới và ưu đãi đặc biệt.</p>
            <form className="mt-4 flex">
              <input type="email" placeholder="Email của bạn" className="w-full rounded-l-md border-0 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary" />
              <button type="submit" className="rounded-r-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-hover">
                Gửi
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} MiLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
