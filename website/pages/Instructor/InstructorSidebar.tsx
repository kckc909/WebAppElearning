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
    Video,
    Activity,
    ClipboardList,
    FolderOpen,
    Pin,
    PinOff,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react";

import { NavLink, useLocation } from 'react-router-dom';
import { instructor_routes } from '../page_routes';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

interface DynamicMenuConfig {
    [key: string]: {
        urlPattern: RegExp;
        getMenuItems: (id: string) => any[];
    };
}

// Settings key in localStorage
const SIDEBAR_SETTINGS_KEY = 'instructor_sidebar_settings';
const PINNED_MENUS_KEY = 'instructor_pinned_menus';
const SIDEBAR_COLLAPSED_KEY = 'instructor_sidebar_collapsed';

interface SidebarSettings {
    keepMenuExpanded: boolean; // Giữ menu mở rộng khi navigate
}

interface PinnedMenus {
    courses?: string; // courseId
    classes?: string; // classId
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
                name: 'Tổng quan',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.course_detail(courseId)
            },
            {
                name: 'Mục lục',
                icon: <BookText />,
                path: '/' + instructor_routes.base + instructor_routes.course_curriculum(courseId)
            },
            {
                name: 'Học viên',
                icon: <Users />,
                path: '/' + instructor_routes.base + instructor_routes.course_students(courseId)
            },
            {
                name: 'Đánh giá',
                icon: <BadgeCheck />,
                path: '/' + instructor_routes.base + instructor_routes.course_reviews(courseId)
            },
            {
                name: 'Thống kê',
                icon: <FileChartPie />,
                path: '/' + instructor_routes.base + instructor_routes.course_analytics(courseId)
            },
            {
                name: 'Cài đặt',
                icon: <Settings />,
                path: '/' + instructor_routes.base + instructor_routes.course_settings(courseId)
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
const InstructorSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Load settings from localStorage
    const [settings, setSettings] = useState<SidebarSettings>(() => {
        try {
            const saved = localStorage.getItem(SIDEBAR_SETTINGS_KEY);
            return saved ? JSON.parse(saved) : { keepMenuExpanded: true };
        } catch {
            return { keepMenuExpanded: true };
        }
    });

    // Load pinned menus from localStorage
    const [pinnedMenus, setPinnedMenus] = useState<PinnedMenus>(() => {
        try {
            const saved = localStorage.getItem(PINNED_MENUS_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    // Detect active dynamic menus from URL
    const getActiveDynamicMenus = (): { [key: string]: string } => {
        const result: { [key: string]: string } = {};
        Object.entries(dynamicMenuConfig).forEach(([key, config]) => {
            const match = location.pathname.match(config.urlPattern);
            if (match) {
                result[key] = match[1];
            }
        });
        return result;
    };

    const urlActiveDynamic = getActiveDynamicMenus();

    // Combine URL active + pinned menus (if setting enabled)
    const activeDynamicMenus: { [key: string]: string } = settings.keepMenuExpanded
        ? { ...pinnedMenus, ...urlActiveDynamic }
        : urlActiveDynamic;

    // Track items that user manually unpinned (reset on page reload or toggle setting)
    const [manuallyUnpinned, setManuallyUnpinned] = useState<Set<string>>(new Set());

    // When URL changes to a course/class detail, save to pinned (unless manually unpinned)
    useEffect(() => {
        if (settings.keepMenuExpanded) {
            const currentActive = getActiveDynamicMenus();
            if (Object.keys(currentActive).length > 0) {
                // Only pin if not manually unpinned in this session
                const newPinned = { ...pinnedMenus };
                Object.entries(currentActive).forEach(([key, id]) => {
                    if (!manuallyUnpinned.has(key)) {
                        newPinned[key as keyof PinnedMenus] = id;
                    }
                });
                setPinnedMenus(newPinned);
                localStorage.setItem(PINNED_MENUS_KEY, JSON.stringify(newPinned));
            }
        }
    }, [location.pathname, settings.keepMenuExpanded]);

    // Auto open dropdown ONLY when URL is on a detail page (not based on pinned)
    useEffect(() => {
        // Only check current URL, not pinned menus
        const currentUrlActive = getActiveDynamicMenus();

        if (currentUrlActive.courses) {
            setOpenDropdown('Courses Management');
        } else if (currentUrlActive.classes) {
            setOpenDropdown('Classes Management');
        }
        // Don't force open when navigating to other pages - let user control dropdown
    }, [location.pathname]);

    // Save settings to localStorage
    const updateSettings = (newSettings: Partial<SidebarSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem(SIDEBAR_SETTINGS_KEY, JSON.stringify(updated));

        // If user toggles keepMenuExpanded ON, reset manually unpinned
        if (newSettings.keepMenuExpanded === true) {
            setManuallyUnpinned(new Set());
        }
    };

    // Unpin a menu - mark as manually unpinned
    const handleUnpin = (key: string) => {
        const newPinned = { ...pinnedMenus };
        delete newPinned[key as keyof PinnedMenus];
        setPinnedMenus(newPinned);
        localStorage.setItem(PINNED_MENUS_KEY, JSON.stringify(newPinned));

        // Mark as manually unpinned so it won't auto re-pin
        setManuallyUnpinned(prev => new Set(prev).add(key));
    };

    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0 z-30
        ${isCollapsed ? 'w-20' : 'w-64'} bg-white text-gray-700 border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:flex lg:flex-col
    `;

    const handleItemClick = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };

    const toggleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(newCollapsed));

        // Close dropdown when collapsed
        if (newCollapsed) {
            setOpenDropdown(null);
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
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b h-[65px]`}>
                    <NavLink to="/instructor" className="flex items-center space-x-2">
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10 flex-shrink-0" />
                        {!isCollapsed && <h1 className="text-xl font-bold text-green-600">MiLearn</h1>}
                    </NavLink>

                    {!isCollapsed && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Collapse Toggle Button */}
                <button
                    onClick={toggleCollapse}
                    className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 shadow-sm transition-colors z-50"
                    title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
                >
                    {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
                </button>

                {/* ---------- MENU LIST ---------- */}
                <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'p-2'} space-y-1 overflow-y-auto`}>
                    {defaultMenuItems.map(item =>
                        item.subItems ? (
                            <div key={item.name}>
                                <button
                                    onClick={() => {
                                        if (isCollapsed) {
                                            setIsCollapsed(false);
                                            setOpenDropdown(item.name);
                                        } else {
                                            setOpenDropdown(openDropdown === item.name ? null : item.name);
                                        }
                                    }}
                                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-2 rounded-lg text-sm font-medium transition-colors
                                        ${openDropdown === item.name ? 'text-green-700 bg-green-50' : 'hover:bg-gray-100'}
                                    `}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <div className={`flex items-center ${isCollapsed ? '' : ''}`}>
                                        <span className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                                        {!isCollapsed && item.name}
                                    </div>

                                    {!isCollapsed && (
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''
                                                }`}
                                        />
                                    )}
                                </button>

                                {openDropdown === item.name && !isCollapsed && (
                                    <div className="ml-5 mt-1 border-l-2 pl-4 border-gray-200 space-y-1">
                                        {item.subItems.map(sub => {
                                            const dynamicKey = sub.dynamicKey;
                                            const dynamicId = dynamicKey ? activeDynamicMenus[dynamicKey] : null;
                                            const dynamicMenu = dynamicKey && dynamicId
                                                ? dynamicMenuConfig[dynamicKey].getMenuItems(dynamicId)
                                                : [];
                                            const isPinned = dynamicKey && pinnedMenus[dynamicKey as keyof PinnedMenus] === dynamicId;

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
                                                            <div className="flex items-center justify-between text-xs text-green-700 font-semibold mb-1 px-2">
                                                                <span>
                                                                    {dynamicKey === 'courses' ? 'Course' : 'Class'} #{dynamicId}
                                                                </span>
                                                                {settings.keepMenuExpanded && isPinned && (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleUnpin(dynamicKey!);
                                                                        }}
                                                                        className="p-1 hover:bg-gray-100 rounded"
                                                                        title="Bỏ ghim"
                                                                    >
                                                                        <PinOff className="w-3 h-3" />
                                                                    </button>
                                                                )}
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
                                    `flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg text-sm font-medium transition-colors
                                    ${isActive ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-100'}`
                                }
                                title={isCollapsed ? item.name : undefined}
                            >
                                <span className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                                {!isCollapsed && item.name}
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Settings toggle at bottom */}
                {!isCollapsed && (
                    <div className="p-3 border-t border-gray-200">
                        <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-600 flex items-center gap-2">
                                <Pin className="w-4 h-4" />
                                Giữ menu mở rộng
                            </span>
                            <input
                                type="checkbox"
                                checked={settings.keepMenuExpanded}
                                onChange={(e) => updateSettings({ keepMenuExpanded: e.target.checked })}
                                className="w-4 h-4 text-green-600 rounded"
                            />
                        </label>
                    </div>
                )}
            </aside>
        </>
    );
};

export default InstructorSidebar;