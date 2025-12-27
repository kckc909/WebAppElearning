import React, { useEffect, useRef, useState } from 'react';
import {
    ChevronDown, FileText, LayoutDashboard, Settings, Users, X, Menu, ChevronLeft, ChevronRight
} from "lucide-react";

import { NavLink, useLocation } from 'react-router-dom';
import { superadmin_routes } from '../page_routes';
import ApiModeSwitch from '../../components/ApiModeSwitch';

interface SidebarProps {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

const menuItems = [
    { name: 'Tổng quan', icon: <LayoutDashboard />, path: '/' + superadmin_routes.base + superadmin_routes.dashboard },
    { name: 'Quản lý người dùng', icon: <Users />, path: '/' + superadmin_routes.base + superadmin_routes.users_management },
    { name: 'Nhật ký hoạt động', icon: <FileText />, path: '/' + superadmin_routes.base + superadmin_routes.audit_logs },
    { name: 'Cài đặt', icon: <Settings />, path: '/' + superadmin_routes.base + superadmin_routes.system_settings },
]

const SuperAdminSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const isControlled = typeof isOpen === 'boolean' && typeof setIsOpen === 'function';
    const [localOpen, setLocalOpen] = useState<boolean>(isOpen ?? false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const location = useLocation(); // <- lấy route hiện tại

    // restore collapsed state
    useEffect(() => {
        try {
            const saved = localStorage.getItem('sa_sidebar_collapsed');
            if (saved !== null) setIsCollapsed(saved === '1');
        } catch { }
    }, []);

    useEffect(() => {
        try { localStorage.setItem('sa_sidebar_collapsed', isCollapsed ? '1' : '0'); } catch { }
    }, [isCollapsed]);

    useEffect(() => {
        if (!isControlled && typeof isOpen === 'boolean') setLocalOpen(isOpen);
    }, [isOpen, isControlled]);

    const open = isControlled ? !!isOpen : localOpen;
    const toggle = () => {
        if (isControlled) setIsOpen && setIsOpen(!isOpen);
        else setLocalOpen(v => !v);
    };

    const handleDropdownClick = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleItemClick = () => {
        if (!isControlled) {
            if (window.innerWidth < 1024) setLocalOpen(false);
        } else {
            if (window.innerWidth < 1024) setIsOpen && setIsOpen(false);
        }
    };

    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0 z-30
        ${isCollapsed ? 'w-20' : 'w-64'} bg-white text-gray-700
        transform transition-all duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
    `;

    return (
        <>
            {!open && (
                <button onClick={toggle} className="fixed top-4 left-4 z-40 bg-white border rounded-md p-2 shadow-sm lg:hidden">
                    <Menu className="w-5 h-5" />
                </button>
            )}

            {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggle}></div>}

            <aside className={sidebarClasses}>
                <div className="flex items-center justify-between p-3 border-b h-[65px]">
                    <NavLink to={'/' + superadmin_routes.base + superadmin_routes.dashboard} className={'flex items-center space-x-2'}>
                        <img
                            src="/MiLearnLogo.png"
                            alt="MiLearn Logo"
                            className={`transition-all duration-300 ${isCollapsed ? 'h-6 w-6' : 'h-10 w-10'}`}
                        />
                        <h1 className={`text-xl font-bold text-green-600 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>MiLearn</h1>
                    </NavLink>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsCollapsed(s => !s)}
                            className="hidden lg:inline-flex items-center justify-center p-1 rounded hover:bg-gray-100 text-gray-700 transition-transform duration-300"
                            aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
                        >
                            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        </button>
                        <button onClick={toggle} className="lg:hidden text-gray-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <nav
                    ref={navRef as any}
                    className="flex-1 p-2 space-y-1 overflow-auto"
                    onWheel={(e) => {
                        const nav = navRef.current;
                        if (!nav) return;
                        const canScrollX = nav.scrollWidth > nav.clientWidth;
                        if (canScrollX) {
                            const dx = e.deltaX;
                            const dy = e.deltaY;
                            const delta = Math.abs(dx) > 0 ? dx : dy;
                            if (delta !== 0) {
                                nav.scrollLeft += delta;
                                e.preventDefault();
                            }
                        }
                    }}
                >
                    {menuItems.map((item: any) => (
                        item.subItems ? (
                            <div key={item.name}>
                                <button
                                    onClick={() => handleDropdownClick(item.name)}
                                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium
                                        ${item.subItems.some((s: any) => location.pathname.startsWith(s.path)) ? 'text-green-700 bg-green-50' : 'hover:bg-gray-100'}`}
                                >
                                    <div className="flex items-center">
                                        <span className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</span>
                                        <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>{item.name}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 transition-all duration-300 ${openDropdown === item.name ? 'rotate-180' : ''} ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`} />
                                </button>
                                {openDropdown === item.name && !isCollapsed && (
                                    <div className="pl-4 mt-1 border-l-2 border-gray-200 ml-5">
                                        {item.subItems.map((subItem: any) => (
                                            <NavLink
                                                key={subItem.name}
                                                to={subItem.path}
                                                onClick={handleItemClick}
                                                className={({ isActive }) => `flex items-center p-2 my-1 rounded-md text-sm transition-colors
                                                    ${isActive ? 'bg-green-100 text-green-800 font-semibold border-l-4 border-green-500 -ml-[18px] pl-[14px]' : 'hover:bg-gray-100 text-gray-600'}`}
                                            >
                                                <span className="w-5 h-5 mr-3">{subItem.icon}</span>
                                                {subItem.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={handleItemClick}
                                title={isCollapsed ? item.name : undefined}
                                className={({ isActive }) => `flex items-center p-2 rounded-lg text-sm font-medium transition-colors
                                    ${isActive ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                <span className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</span>
                                <span className={`flex-1 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>{item.name}</span>
                            </NavLink>
                        )
                    ))}
                </nav>

                {/* Footer with API Mode Switch */}
                <div className="p-3 border-t border-gray-200">
                    {!isCollapsed ? (
                        <ApiModeSwitch />
                    ) : (
                        <div className="flex justify-center">
                            <ApiModeSwitch compact showLabel={false} />
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default SuperAdminSidebar;
