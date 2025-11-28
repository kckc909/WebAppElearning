
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../../mockData';
import { BookOpen, CalendarDays, ChevronDown, ChevronDownIcon, LayoutDashboard, LogOut, Settings, User, Users } from 'lucide-react';
import { student_routes } from '../page_routes'

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

const Header: React.FC<{ isLoggedIn?: boolean; onLogout?: () => void }> = ({
  isLoggedIn = false,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setIsAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarRef]);

  const handleLogout = () => {
    if (onLogout) onLogout();
    setIsAvatarOpen(false);
    navigate(student_routes.home);
  }

  return (
    <header className="sticky top-0 z-50 bg-light/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavLink to={'/' + student_routes.home} className="flex items-center space-x-2">
              <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-secondary">MiLearn</span>
            </NavLink>
            <nav className="hidden items-center space-x-6 md:flex">
              <NavItem to={'/' + student_routes.home}>Trang chủ</NavItem>
              <NavItem to={'/' + student_routes.courses}>Khóa học</NavItem>
              <NavItem to={'/' + student_routes.become_instructor}>Trở thành giảng viên</NavItem>
              <NavItem to={'/' + student_routes.about}>Giới thiệu</NavItem>
            </nav>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {!isLoggedIn ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {/* User */}
                  <span className="text-sm font-medium text-slate-700 hidden lg:block">Hi, {MOCK_USER.name}</span>
                  <img src={MOCK_USER.avatar} alt="User Avatar" className="h-9 w-9 rounded-full border border-slate-200" />

                  <ChevronDownIcon className='w-5 h-5 text-slate-500' />
                </button>

                {isAvatarOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-slate-100 animate-fade-in-down transform origin-top-right z-50">
                    <Link
                      to={'/' + student_routes.dashboard}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <LayoutDashboard className="mr-3 h-5 w-5" />
                      Học tập cá nhân
                    </Link>

                    <Link
                      to={'/' + student_routes.courses}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <BookOpen className="mr-3 h-5 w-5" />
                      Khóa học của tôi
                    </Link>

                    <Link
                      to={'/' + student_routes.my_classes}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Lớp học của tôi
                    </Link>

                    <Link
                      to={'/' + student_routes.schedule}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <CalendarDays className="mr-3 h-5 w-5" />
                      Lịch học
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <Link
                      to={'/' + student_routes.profile}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <User className="mr-3 h-5 w-5" />
                      Hồ sơ cá nhân
                    </Link>

                    <Link
                      to={'/' + student_routes.settings}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Cài đặt
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to={'/' + student_routes.auth} className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Đăng nhập</NavLink>
                <NavLink to={'/' + student_routes.auth} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover">Đăng ký</NavLink>
              </>
            )}
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
        <div className="md:hidden border-t border-slate-200">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {!isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
                  <img src={MOCK_USER.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-secondary">{MOCK_USER.name}</p>
                    <p className="text-xs text-slate-500">Học viên</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary">
                    <NavItem to={'/' + student_routes.home}>Trang chủ</NavItem>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary">
                    <NavItem to={'/' + student_routes.courses}>Khóa học</NavItem>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary">
                    <NavItem to={'/' + student_routes.become_instructor}>Trở thành giảng viên</NavItem>
                  </div>
                  <div className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary">
                    <NavItem to={'/' + student_routes.about}>Giới thiệu</NavItem>
                  </div>
                </div>
                <div className="border-t border-slate-100 my-1"></div>

                <Link
                  to={'/' + student_routes.dashboard}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Học tập cá nhân
                </Link>

                <Link
                  to={'/' + student_routes.courses}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  Khóa học của tôi
                </Link>

                <Link
                  to={'/' + student_routes.my_classes}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Lớp học của tôi
                </Link>

                <Link
                  to={'/' + student_routes.schedule}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <CalendarDays className="mr-3 h-5 w-5" />
                  Lịch học
                </Link>

                <div className="border-t border-slate-100 my-1"></div>

                <Link
                  to={'/' + student_routes.profile}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <User className="mr-3 h-5 w-5" />
                  Hồ sơ cá nhân
                </Link>

                <Link
                  to={'/' + student_routes.settings}
                  className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Cài đặt
                </Link>

                <div className="border-t border-slate-100 my-1"></div>

                <button onClick={handleLogout} className="text-left text-sm font-medium text-red-600 py-2">Đăng xuất</button>
              </>
            ) : (
              <>
                <NavItem to={'/' + student_routes.home}>Trang chủ</NavItem>
                <NavItem to={'/' + student_routes.courses}>Khóa học</NavItem>
                <NavItem to={'/' + student_routes.become_instructor}>Trở thành giảng viên</NavItem>
                <NavItem to={'/' + student_routes.about}>Giới thiệu</NavItem>
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-200">
                  <NavLink to={'/' + student_routes.auth} className="w-full text-center rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Đăng nhập</NavLink>
                  <NavLink to={'/' + student_routes.auth} className="w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover">Đăng ký</NavLink>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;