import React, { useState } from 'react';
import { IoHomeOutline, IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { SiZalo } from "react-icons/si";
import { Link } from 'react-router-dom';
import { Database, FileText } from 'lucide-react';
import { ApiModeManager } from '../../utils/apiMode';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-slate-400 hover:text-white transition-colors">{children}</Link>
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: IoHomeOutline,
  facebook: IoLogoFacebook,
  github: IoLogoGithub,
  linkedin: IoLogoLinkedin,
  zalo: SiZalo,
};

interface SocialIconProps {
  name: keyof typeof iconMap;
  href?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ name, href = "#" }) => {
  const Icon = iconMap[name];

  if (!Icon) return null;

  return (
    <a href={href} className="text-slate-400 hover:text-white">
      <Icon className="text-2xl" />
    </a>
  );
};


// API Mode Switch Component for Footer
const ApiModeSwitchFooter: React.FC = () => {
  const [useMockAPI, setUseMockAPI] = useState(() => ApiModeManager.isUsingMockAPI());

  const toggleMode = () => {
    const newMode = ApiModeManager.toggleMode();
    setUseMockAPI(newMode === 'mock');
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500">Data Source:</span>
      <button
        onClick={toggleMode}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${useMockAPI
          ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
          : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
          }`}
        title={`Click để chuyển sang ${useMockAPI ? 'Database' : 'Mock Data'}`}
      >
        {useMockAPI ? (
          <>
            <FileText className="w-3.5 h-3.5" />
            Mock Data
          </>
        ) : (
          <>
            <Database className="w-3.5 h-3.5" />
            Database
          </>
        )}
        <div className={`w-2 h-2 rounded-full ${useMockAPI ? 'bg-blue-400' : 'bg-green-400'}`} />
      </button>
    </div>
  );
}

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
              <SocialIcon name="zalo" href="" />
              <SocialIcon name="facebook" />
              <SocialIcon name="github" />
              <SocialIcon name="linkedin" />
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
        <div className="mt-12 border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500">&copy; {new Date().getFullYear()} MiLearn. All rights reserved.</p>

            {/* API Mode Switch */}
            <ApiModeSwitchFooter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
