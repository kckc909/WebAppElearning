import React, { useRef, useState, useEffect } from 'react';
import { MenuIcon, SearchIcon } from '../../components/icons/icons'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ChevronDown, User, Settings, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { instructor_routes, admin_routes, student_routes } from '../page_routes';
import { MOCK_USER } from '../../mockData';

interface HeaderProps {
    toggleSidebar: () => void;
    handleLogout: () => void;
}

const InstructorPageHeader: React.FC<HeaderProps> = ({ toggleSidebar, handleLogout }) => {
    const { user, logout } = useAuth();
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);

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

    const onLogout = () => {
        logout();
        handleLogout();
        setIsAvatarOpen(false);
    };

    return (
        <header className="bg-white shadow-sm flex items-center justify-between p-4 z-10 shrink-0">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 lg:hidden mr-4">
                    <MenuIcon className="w-6 h-6" />
                </button>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative" ref={avatarRef}>
                    <button
                        onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                        className="flex items-center space-x-2 focus:outline-none hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                    >
                        <span className="text-sm font-medium text-gray-700 hidden md:block">
                            {user?.full_name || 'Instructor'}
                        </span>
                        <img
                            src={user?.avatar_url || MOCK_USER.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-gray-200"
                        />
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {isAvatarOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-fade-in-down transform origin-top-right z-50">
                            <Link
                                to={'/' + student_routes.home}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                                <LayoutDashboard className="mr-3 h-5 w-5" />
                                Trang Học viên
                            </Link>

                            {user?.role === 2 && (
                                <Link
                                    to={'/admin/' + admin_routes.dashboard}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                >
                                    <Shield className="mr-3 h-5 w-5" />
                                    Trang Quản trị
                                </Link>
                            )}

                            <div className="border-t border-gray-100 my-1"></div>

                            <Link
                                to={'/instructor/' + instructor_routes.settings}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                                <Settings className="mr-3 h-5 w-5" />
                                Cài đặt
                            </Link>

                            <div className="border-t border-gray-100 my-1"></div>

                            <button
                                onClick={onLogout}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default InstructorPageHeader;