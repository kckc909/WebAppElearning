import React, { useState } from 'react';
import {
    ChevronDown, X
} from "lucide-react";

import { NavLink } from 'react-router-dom';
import { superadmin_routes, tmp_on_navigate } from '../page_routes';

import SuperAdmin_Dashboard from './Dashboard'
import SuperAdmin_AuditLogs from './Audit_logs'
import SuperAdmin_Settings from './Settings'
import SuperAdmin_UsersManagement from './UsersManagement'


interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
    { name: 'Dashboard', icon: <SuperAdmin_Dashboard />, path: tmp_on_navigate + superadmin_routes.dashboard },
    { name: 'Users Management', icon: <SuperAdmin_UsersManagement />, path: tmp_on_navigate + superadmin_routes.users_management },
    { name: 'Audit logs', icon: <SuperAdmin_AuditLogs />, path: tmp_on_navigate + superadmin_routes.audit_logs },
    { name: 'Settings', icon: <SuperAdmin_Settings />, path: tmp_on_navigate + superadmin_routes.system_settings },
]

const SuperAdminSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
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
                    {menuItems.map((item: any) => (
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
                                        {item.subItems.map((subItem: any) => (
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

export default SuperAdminSidebar;