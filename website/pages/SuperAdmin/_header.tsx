import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, LogOut, User, Home, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Default avatar fallback
const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin';

interface HeaderProps {
    onToggleSidebar: () => void;
}

const SuperAdminHeader: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate('/')
    }

    return (
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden md:flex items-center max-w-md w-full">
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search size={18} />
                        </div>
                        <input
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6 transition-all"
                            placeholder="Search users, logs, settings..."
                            type="search"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="sr-only">View notifications</span>
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        <img
                            className="h-8 w-8 rounded-full object-cover border border-gray-200"
                            src={user?.avatar_url || DEFAULT_AVATAR}
                            alt="User Avatar"
                        />
                        <span className="hidden md:block text-sm font-medium text-gray-700">{user?.full_name || 'Super Admin'}</span>
                        <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-out">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user?.full_name || 'Super Admin'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || 'superadmin@example.com'}</p>
                            </div>

                            <div className="py-1">
                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <User size={16} className="mr-3 text-gray-400" />
                                    My Profile
                                </a>
                                <Link
                                    to="/"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <Home size={16} className="mr-3 text-gray-400" />
                                    Back to User Site
                                </Link>
                            </div>

                            <div className="border-t border-gray-100 py-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={16} className="mr-3 text-red-500" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default SuperAdminHeader;