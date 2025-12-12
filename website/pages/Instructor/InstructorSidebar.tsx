import React, { useState, useEffect } from 'react';

import {
    ChevronDown,
    X,
    LayoutDashboard,
    FileText,
    BadgeCheck,
    Users,
    Bell,
    Calendar,
    Settings,
    Book,
    BookText,
    FileChartPie,
    SquarePlus,
    Copy,
    Video,
    Activity,
    ClipboardList,
    FolderOpen
} from "lucide-react";

import { NavLink, useLocation } from 'react-router-dom';
import { instructor_routes } from '../page_routes';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface DynamicMenuConfig {
    [key: string]: {
        urlPattern: RegExp;
        getMenuItems: (id: string) => any[];
    };
}

/* ================================
    DEFAULT GLOBAL MENU
================================ */
const defaultMenuItems = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard />,
        path: '/' + instructor_routes.base + instructor_routes.dashboard,
    },

    {
        name: 'Courses Management',
        icon: <Book />,
        subItems: [
            {
                name: 'Courses Overview',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.courses_overview
            },
            {
                name: 'My Courses',
                icon: <BookText />,
                path: '/' + instructor_routes.base + instructor_routes.courses_list,
                dynamicKey: 'courses' // Key để map với dynamic menu
            },
            {
                name: 'Create Course',
                icon: <SquarePlus />,
                path: '/' + instructor_routes.base + instructor_routes.courses_create
            },
            {
                name: 'Drafts',
                icon: <Copy />,
                path: '/' + instructor_routes.base + instructor_routes.courses_draft
            }
        ],
    },

    {
        name: 'Classes Management',
        icon: <Users />,
        subItems: [
            {
                name: 'Classes Overview',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.classes_overview
            },
            {
                name: 'My Classes',
                icon: <BookText />,
                path: '/' + instructor_routes.base + instructor_routes.class_list,
                dynamicKey: 'classes' // Key để map với dynamic menu
            },
            {
                name: 'Schedule',
                icon: <Calendar />,
                path: '/' + instructor_routes.base + instructor_routes.schedule
            }
        ],
    },

    {
        name: 'Document Library',
        icon: <FileText />,
        path: '/' + instructor_routes.base + instructor_routes.document_library
    },
    {
        name: 'Notifications',
        icon: <Bell />,
        path: '/' + instructor_routes.base + instructor_routes.notification
    },
    {
        name: 'Settings',
        icon: <Settings />,
        path: '/' + instructor_routes.base + instructor_routes.settings
    },
];

/* ================================
    DYNAMIC MENU CONFIGURATION
================================ */
const dynamicMenuConfig: DynamicMenuConfig = {
    // Course dynamic menu
    courses: {
        urlPattern: /\/instructor\/courses\/(\d+)/,
        getMenuItems: (courseId: string) => [
            {
                name: 'Overview',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.course_detail(courseId)
            },
            {
                name: 'Students',
                icon: <Users />,
                path: '/' + instructor_routes.base + instructor_routes.course_students(courseId)
            },
            {
                name: 'Reviews',
                icon: <BadgeCheck />,
                path: '/' + instructor_routes.base + instructor_routes.course_reviews(courseId)
            },
            {
                name: 'Analytics',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.course_analytics(courseId)
            },
            {
                name: 'Certificates',
                icon: <FileText />,
                path: '/' + instructor_routes.base + instructor_routes.course_certificates(courseId)
            }
        ]
    },

    // Class dynamic menu
    classes: {
        urlPattern: /\/instructor\/classes\/(\d+)/,
        getMenuItems: (classId: string) => [
            {
                name: 'Overview',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.class_detail(classId)
            },
            {
                name: 'Live Session',
                icon: <Video />,
                path: '/' + instructor_routes.base + instructor_routes.class_live(classId)
            },
            {
                name: 'Activity',
                icon: <Activity />,
                path: '/' + instructor_routes.base + instructor_routes.class_activity(classId)
            },
            {
                name: 'Attendance',
                icon: <Calendar />,
                path: '/' + instructor_routes.base + instructor_routes.class_attendance(classId)
            },
            {
                name: 'Assignments',
                icon: <ClipboardList />,
                path: '/' + instructor_routes.base + instructor_routes.class_assignments(classId)
            },
            {
                name: 'Materials',
                icon: <FolderOpen />,
                path: '/' + instructor_routes.base + instructor_routes.class_materials(classId)
            },
            {
                name: 'Grades',
                icon: <BadgeCheck />,
                path: '/' + instructor_routes.base + instructor_routes.class_grades(classId)
            },
            {
                name: 'Members',
                icon: <Users />,
                path: '/' + instructor_routes.base + instructor_routes.class_members(classId)
            },
            {
                name: 'Settings',
                icon: <Settings />,
                path: '/' + instructor_routes.base + instructor_routes.class_settings(classId)
            }
        ]
    }
};

/* ================================
    SIDEBAR COMPONENT
================================ */
const InstructorSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Detect active dynamic menus
    const activeDynamicMenus: { [key: string]: string } = {};

    Object.entries(dynamicMenuConfig).forEach(([key, config]) => {
        const match = location.pathname.match(config.urlPattern);
        if (match) {
            activeDynamicMenus[key] = match[1]; // Store the ID (courseId or classId)
        }
    });

    // Auto open dropdown when viewing detail pages
    useEffect(() => {
        if (activeDynamicMenus.courses) {
            setOpenDropdown('Courses Management');
        } else if (activeDynamicMenus.classes) {
            setOpenDropdown('Classes Management');
        }
    }, [location.pathname]);

    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0 z-30
        w-64 bg-white text-gray-700 border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
    `;

    const handleItemClick = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <aside className={sidebarClasses}>
                <div className="flex items-center justify-between p-4 border-b h-[65px]">
                    <NavLink to="/instructor" className="flex items-center space-x-2">
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
                        <h1 className="text-xl font-bold text-green-600">MiLearn</h1>
                    </NavLink>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* ---------- MENU LIST ---------- */}
                <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {defaultMenuItems.map(item =>
                        item.subItems ? (
                            <div key={item.name}>
                                <button
                                    onClick={() =>
                                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                                    }
                                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors
                                        ${openDropdown === item.name ? 'text-green-700 bg-green-50' : 'hover:bg-gray-100'}
                                    `}
                                >
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 mr-3">{item.icon}</span>
                                        {item.name}
                                    </div>

                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {openDropdown === item.name && (
                                    <div className="ml-5 mt-1 border-l-2 pl-4 border-gray-200 space-y-1">
                                        {item.subItems.map(sub => {
                                            const dynamicKey = sub.dynamicKey;
                                            const dynamicId = dynamicKey ? activeDynamicMenus[dynamicKey] : null;
                                            const dynamicMenu = dynamicKey && dynamicId
                                                ? dynamicMenuConfig[dynamicKey].getMenuItems(dynamicId)
                                                : [];

                                            return (
                                                <React.Fragment key={sub.name}>
                                                    {/* Normal submenu item */}
                                                    <NavLink
                                                        to={sub.path}
                                                        onClick={handleItemClick}
                                                        end
                                                        className={({ isActive }) =>
                                                            `flex items-center p-2 rounded-md text-sm transition-colors
                                                            ${isActive
                                                                ? 'bg-green-100 text-green-800 font-semibold border-l-4 border-green-500 -ml-[18px] pl-[14px]'
                                                                : 'hover:bg-gray-100 text-gray-600'
                                                            }`
                                                        }
                                                    >
                                                        <span className="w-5 h-5 mr-3">{sub.icon}</span>
                                                        {sub.name}
                                                    </NavLink>

                                                    {/* Dynamic menu (nếu có) */}
                                                    {dynamicMenu.length > 0 && (
                                                        <div className="ml-6 mt-2 space-y-1 border-l-2 border-green-200 pl-3">
                                                            <div className="text-xs text-green-700 font-semibold mb-1 px-2">
                                                                {dynamicKey === 'courses' ? 'Course' : 'Class'} #{dynamicId}
                                                            </div>
                                                            {dynamicMenu.map(child => (
                                                                <NavLink
                                                                    key={child.name}
                                                                    to={child.path}
                                                                    onClick={handleItemClick}
                                                                    end
                                                                    className={({ isActive }) =>
                                                                        `flex items-center p-2 rounded-md text-sm transition-colors
                                                                        ${isActive
                                                                            ? 'bg-green-100 text-green-800 font-semibold'
                                                                            : 'hover:bg-gray-100 text-gray-600'
                                                                        }`
                                                                    }
                                                                >
                                                                    <span className="w-5 h-5 mr-2">{child.icon}</span>
                                                                    {child.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={handleItemClick}
                                end
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg text-sm font-medium transition-colors
                                    ${isActive ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-100'}`
                                }
                            >
                                <span className="w-6 h-6 mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        )
                    )}
                </nav>
            </aside>
        </>
    );
};

export default InstructorSidebar;