
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600'}`
    }
  >
    {children}
  </NavLink>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-light/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-secondary">MiLearn</span>
            </NavLink>
            <nav className="hidden items-center space-x-6 md:flex">
              <NavItem to="/">Trang chủ</NavItem>
              <NavItem to="/courses">Khóa học</NavItem>
              <NavItem to="/become-instructor">Trở thành giảng viên</NavItem>
              <NavItem to="/about">Giới thiệu</NavItem>
            </nav>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <NavLink to="/auth" className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Đăng nhập</NavLink>
            <NavLink to="/auth" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover">Đăng ký</NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 pb-4">
            <NavItem to="/">Trang chủ</NavItem>
            <NavItem to="/courses">Khóa học</NavItem>
            <NavItem to="/become-instructor">Trở thành giảng viên</NavItem>
            <NavItem to="/about">Giới thiệu</NavItem>
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-200">
              <NavLink to="/auth" className="w-full text-center rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Đăng nhập</NavLink>
              <NavLink to="/auth" className="w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover">Đăng ký</NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;