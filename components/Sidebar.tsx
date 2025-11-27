import { NavLink } from "react-router-dom";
import * as Icons from 'lucide-react'

interface SidebarLinkProps {
    to: string;
    icon: keyof typeof Icons;
    label: string;
    isCollapsed: boolean;
    notification?: number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
    to,
    icon,
    label,
    isCollapsed,
    notification
}) => {

    const IconCom = Icons[icon] as Icons.LucideIcon;

    return (
        <NavLink
            to={`/${to}`}
            className={({ isActive }) =>
                `group flex items-center relative w-full px-3 py-2 rounded-xl transition-all duration-200
                ${isActive ? "bg-blue-50 text-primary" : "text-slate-600 hover:bg-slate-100"}`
            }
        >
            {/* Active indicator */}
            <div
                className={`
                    absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-lg bg-primary transition-all 
                    ${window.location.pathname === to ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Icon (Lucide) — thay thế ion-icon */}
            <IconCom
                className={`w-7 h-7 transition-all duration-200 text-xxl
                    ${isCollapsed ? "mx-auto" : "mr-3"}
                `}
            />

            {/* Label */}
            {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">
                    {label}
                </span>
            )}

            {/* Notification badge */}
            {notification && (
                <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs 
                    rounded-full w-5 h-5 flex items-center justify-center"
                >
                    {notification}
                </span>
            )}
        </NavLink>
    );
};

export default SidebarLink;
