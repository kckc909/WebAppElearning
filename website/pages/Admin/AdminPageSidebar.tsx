import React, { useState } from 'react';

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

import { NavLink } from 'react-router-dom';
import { admin_routes, tmp_on_navigate } from '../page_routes';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: tmp_on_navigate + admin_routes.dashboard },
    {
        name: 'Classes Management',
        icon: <BookOpen />,
        subItems: [
            { name: 'Classes Overview', icon: <FileChartPie />, path: tmp_on_navigate + admin_routes.classes_overview },
            { name: 'All Classes', icon: <BookOpenText />, path: tmp_on_navigate + admin_routes.all_classes },
            { name: 'Schedule', icon: <Calendar />, path: tmp_on_navigate + admin_routes.schedule },
            { name: 'Grades', icon: <BadgeCheck />, path: tmp_on_navigate + admin_routes.class_grades },
            { name: `Documents`, icon: <Files />, path: tmp_on_navigate + admin_routes.documents },
        ]
    },
    {
        name: 'Course Management', icon: <Book />,
        subItems: [
            { name: 'Courses Overview', icon: <FileChartPie />, path: tmp_on_navigate + admin_routes.courses_overview },
            { name: 'All Courses', icon: <BookText />, path: tmp_on_navigate + admin_routes.all_courses },
            { name: 'Approval', icon: <ClipboardClock />, path: tmp_on_navigate + admin_routes.approval },
            { name: 'Grades', icon: <BadgeCheck />, path: tmp_on_navigate + admin_routes.course_grades },
            { name: 'Certificates', icon: <Award />, path: tmp_on_navigate + admin_routes.certificates },
        ]
    },
    { name: 'CMS', icon: <FolderKanban />, path: tmp_on_navigate + admin_routes.cms },

    { name: 'Students Management', icon: <Users />, path: tmp_on_navigate + admin_routes.student_management },

    { name: 'Instructors Management', icon: <GraduationCap />, path: tmp_on_navigate + admin_routes.instructor_management },
    { name: 'Instructors Vertification', icon: <UserRoundCheck />, path: tmp_on_navigate + admin_routes.instructor_vertification },

    {
        name: 'Finance', icon: <DollarSign />,
        subItems: [
            { name: 'Transactions', icon: <Repeat2 />, path: tmp_on_navigate + admin_routes.transactions },
            { name: 'Revenue', icon: <TrendingUp />, path: tmp_on_navigate + admin_routes.revenue },
            { name: 'Payouts', icon: <Wallet />, path: tmp_on_navigate + admin_routes.payouts },
        ]
    },

    { name: 'Document Library', icon: <FileText />, path: tmp_on_navigate + admin_routes.document_library },
    { name: 'Notifications', icon: <Bell />, path: tmp_on_navigate + admin_routes.notification },
    { name: 'Analytics & Reports', icon: <LineChart />, path: tmp_on_navigate + admin_routes.analytics_reports },
    { name: 'Settings', icon: <Settings />, path: tmp_on_navigate + admin_routes.settings },

    // { name: 'Users & Roles', icon: <ShieldCheck />, path: temp }, => superadmin
];

const AdminPageSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>();
    const [activeItem, setActiveItem] = useState<string>('Dashboard');

    const handleDropdownClick = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleItemClick = (name: string) => {
        setActiveItem(name);
        // On smaller screens, close sidebar after selection
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0 z-30
        w-64 bg-white text-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
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
                                            <a
                                                key={subItem.name}
                                                href={subItem.path}
                                                onClick={() => handleItemClick(subItem.name)}
                                                className={`flex items-center p-2 my-1 rounded-md text-sm transition-colors
                                                    ${activeItem === subItem.name ? 'bg-green-100 text-green-800 font-semibold border-l-4 border-green-500 -ml-[18px] pl-[14px]' : 'hover:bg-gray-100 text-gray-600'}`}
                                            >
                                                <span className="w-5 h-5 mr-3">{subItem.icon}</span>
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                key={item.name}
                                href={item.path}
                                onClick={() => handleItemClick(item.name)}
                                className={`flex items-center p-2 rounded-lg text-sm font-medium
                                    ${activeItem === item.name ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                            >
                                <span className="w-6 h-6 mr-3">{item.icon}</span>
                                {item.name}
                            </a>
                        )
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default AdminPageSidebar;
