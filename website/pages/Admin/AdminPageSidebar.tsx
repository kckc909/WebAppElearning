import React, { useState, useEffect } from 'react';

import {
    ChevronDown,
    X,
    BookOpen,
    Layers,
    LayoutDashboard,
    FileText,
    FileCheck,
    Trophy,
    BadgeCheck,
    Users,
    Bell,
    Calendar,
    Settings,
    ShieldCheck,
    LineChart,
    GraduationCap,
    Files,
    MonitorPlay,
    ClipboardClock,
    Book,
    BookCopy,
    BookText,
    BookOpenText,
    FileChartPie,
    Award,
    ClipboardList,
    UserRoundCheck,
    FolderKanban,
    DollarSign,
    Repeat2,
    TrendingUp,
    Wallet
} from "lucide-react";

import { NavLink, useLocation } from 'react-router-dom';
import { admin_routes } from '../page_routes';


interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
    { name: 'Tổng quan', icon: <LayoutDashboard />, path: '/' + admin_routes.base + admin_routes.dashboard },
    {
        name: 'Quản lý lớp học',
        icon: <BookOpen />,
        subItems: [
            { name: 'Tổng quan lớp học', icon: <FileChartPie />, path: '/' + admin_routes.base + admin_routes.classes_overview },
            { name: 'Tất cả lớp học', icon: <BookOpenText />, path: '/' + admin_routes.base + admin_routes.all_classes },
            { name: 'Lịch học', icon: <Calendar />, path: '/' + admin_routes.base + admin_routes.schedule },
            { name: 'Điểm lớp học', icon: <BadgeCheck />, path: '/' + admin_routes.base + admin_routes.class_grades },
            { name: `Tài liệu`, icon: <Files />, path: '/' + admin_routes.base + admin_routes.documents },
        ]
    },
    {
        name: 'Quản lý khóa học', icon: <Book />,
        subItems: [
            { name: 'Tổng quan khóa học', icon: <FileChartPie />, path: '/' + admin_routes.base + admin_routes.courses_overview },
            { name: 'Tất cả khóa học', icon: <BookText />, path: '/' + admin_routes.base + admin_routes.all_courses },
            { name: 'Phê duyệt', icon: <ClipboardClock />, path: '/' + admin_routes.base + admin_routes.approval },
            { name: 'Điểm khóa học', icon: <BadgeCheck />, path: '/' + admin_routes.base + admin_routes.course_grades },
            { name: 'Chứng chỉ', icon: <Award />, path: '/' + admin_routes.base + admin_routes.certificates },
        ]
    },
    { name: 'CMS', icon: <FolderKanban />, path: '/' + admin_routes.base + admin_routes.cms },

    { name: 'Quản lý học viên', icon: <Users />, path: '/' + admin_routes.base + admin_routes.student_management },

    { name: 'Quản lý giảng viên', icon: <GraduationCap />, path: '/' + admin_routes.base + admin_routes.instructor_management },
    { name: 'Xác thực giảng viên', icon: <UserRoundCheck />, path: '/' + admin_routes.base + admin_routes.instructor_verification },

    {
        name: 'Tài chính', icon: <DollarSign />,
        subItems: [
            { name: 'Giao dịch', icon: <Repeat2 />, path: '/' + admin_routes.base + admin_routes.transactions },
            { name: 'Doanh thu', icon: <TrendingUp />, path: '/' + admin_routes.base + admin_routes.revenue },
            { name: 'Chi trả', icon: <Wallet />, path: '/' + admin_routes.base + admin_routes.payouts },
        ]
    },

    { name: 'Thư viện tài liệu', icon: <FileText />, path: '/' + admin_routes.base + admin_routes.document_library },
    { name: 'Thông báo', icon: <Bell />, path: '/' + admin_routes.base + admin_routes.notification },
    { name: 'Phân tích & Báo cáo', icon: <LineChart />, path: '/' + admin_routes.base + admin_routes.analytics_reports },
    { name: 'Cài đặt', icon: <Settings />, path: '/' + admin_routes.base + admin_routes.settings },

    // { name: 'Users & Roles', icon: <ShieldCheck />, path: temp }, => superadmin
];

const AdminPageSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Auto-open dropdown if current path matches a subitem
    useEffect(() => {
        for (const item of menuItems) {
            if (item.subItems) {
                const matchingSubItem = item.subItems.find(sub => location.pathname === sub.path);
                if (matchingSubItem) {
                    setOpenDropdown(item.name);
                    break;
                }
            }
        }
    }, [location.pathname]);

    const handleDropdownClick = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleItemClick = () => {
        // On smaller screens, close sidebar after selection
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    // Check if a path is active
    const isPathActive = (path: string) => location.pathname === path;

    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0 z-30
        w-64 bg-white text-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
        lg:mr-[5px]
    `;

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setIsOpen(false)}></div>}
            <aside className={sidebarClasses}>
                <div className="flex items-center justify-between p-4 border-b h-[65px]">
                    <NavLink to={'/admin'} className={'flex items-center space-x-2'}>
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
                        <h1 className="text-xl font-bold text-green-600">MiLearn</h1>
                    </NavLink>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        item.subItems ? (
                            <div key={item.name}>
                                <button
                                    onClick={() => handleDropdownClick(item.name)}
                                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium
                                        ${openDropdown === item.name ? 'text-green-700 bg-green-50' : 'hover:bg-gray-100'}`}
                                >
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 mr-3">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === item.name && (
                                    <div className="pl-4 mt-1 border-l-2 border-gray-200 ml-5">
                                        {item.subItems.map(subItem => (
                                            <NavLink
                                                key={subItem.name}
                                                to={subItem.path}
                                                onClick={handleItemClick}
                                                className={`flex items-center p-2 my-1 rounded-md text-sm transition-colors
                                                    ${isPathActive(subItem.path) ? 'bg-green-100 text-green-800 font-semibold border-l-4 border-green-500 -ml-[18px] pl-[14px]' : 'hover:bg-gray-100 text-gray-600'}`}
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
                                to={item.path!}
                                onClick={handleItemClick}
                                className={`flex items-center p-2 rounded-lg text-sm font-medium
                                    ${isPathActive(item.path!) ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                            >
                                <span className="w-6 h-6 mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        )
                    ))}
                </nav>

            </aside>
        </>
    );
};

export default AdminPageSidebar;
