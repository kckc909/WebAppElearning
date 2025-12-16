import { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import SidebarButton from '../../components/SidebarLink'
import { student_routes } from '../page_routes'
import { useAuth } from "../../contexts/AuthContext";
const Student_LogedInLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();

    const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

    const sidebar = (
        <aside
            className={`
                bg-white border-r border-slate-200 
                transition-all duration-300 ease-in-out 
                min-h-screen
                hidden md:flex flex-col
                h-full sticky top-0
                shadow-sm
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Header với nút đóng/mở */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
                {!isCollapsed && (
                    <span className="font-bold text-primary text-lg">Menu</span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors ml-auto"
                    title={isCollapsed ? "Mở rộng" : "Thu gọn"}
                >
                    {isCollapsed
                        ? <IoChevronForward className="text-lg" />
                        : <IoChevronBack className="text-lg" />
                    }
                </button>
            </div>

            {/* User Info */}
            {user && (
                <div className={`p-4 border-b border-slate-100 ${isCollapsed ? 'px-3' : ''}`}>
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                        <img
                            src={user.avatar_url || defaultAvatar}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                        />
                        {!isCollapsed && (
                            <div className="min-w-0">
                                <h3 className="font-semibold text-secondary truncate text-sm">
                                    {user.full_name || 'Học viên'}
                                </h3>
                                <p className="text-xs text-slate-500 truncate">
                                    Học viên
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Menu Navigation */}
            <nav className="flex-1 p-3 overflow-y-auto space-y-1">
                <SidebarButton to={student_routes.dashboard} icon="LayoutDashboard" label="Dashboard" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.my_courses} icon="BookOpen" label="Khóa học của tôi" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.my_classes} icon="School" label="Lớp học của tôi" isCollapsed={isCollapsed} />
                <div className="my-3 border-t border-slate-200"></div>
                <SidebarButton to={student_routes.schedule} icon="Calendar" label="Lịch học" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.certificates} icon="Award" label="Chứng chỉ" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.stats} icon="BarChart" label="Thống kê học tập" isCollapsed={isCollapsed} />
                <div className="my-3 border-t border-slate-200"></div>
                <SidebarButton to={student_routes.checkout} icon="ShoppingCart" label="Giỏ hàng" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.payment_history} icon="CreditCard" label="Lịch sử thanh toán" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.profile} icon="User" label="Hồ sơ cá nhân" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.settings} icon="Settings" label="Cài đặt" isCollapsed={isCollapsed} />
            </nav>
            {/* Footer */}
            {!isCollapsed && (
                <div className="p-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 text-center">
                        © 2024 MiLearn
                    </p>
                </div>
            )}
        </aside>
    );
    return (
        <div className="flex flex-1 min-h-screen overflow-hidden">
            {sidebar}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
                <Outlet />
            </div>
        </div>
    );
}
export default Student_LogedInLayout;