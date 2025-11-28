import { useState, useEffect } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import SidebarButton from '../../components/Sidebar'
import { student_routes } from '../page_routes'

const Student_LogedInLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {

    }, [])

    const sidebar = (
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out hidden md:flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
            {/* Đóng mở */}
            <div className="p-4 flex justify-end">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-slate-100 text-slate-500">
                    {isCollapsed
                        ? <IoChevronForward className="text-xl" />
                        : <IoChevronBack className="text-xl" />
                    }
                </button>
            </div>
            {/* {!isCollapsed && (
                <div className="px-6 pb-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden">
                        <img src={MOCK_USER.avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-secondary truncate">{MOCK_USER.name}</h3>
                    <p className="text-xs text-slate-500">Học viên</p>
                </div>
            )} */}

            {/* Menu */}
            <nav className="flex-1 px-3 overflow-y-auto space-y-1">
                <SidebarButton to={student_routes.dashboard} icon="LayoutDashboard" label="Dashboard" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.my_courses} icon="BookOpen" label="Khóa học của tôi" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.my_classes} icon="School" label="Lớp học của tôi" isCollapsed={isCollapsed} />

                <div className="my-2 border-t border-slate-200"></div>

                <SidebarButton to={student_routes.schedule} icon="Calendar" label="Lịch học" isCollapsed={isCollapsed} />
                <SidebarButton to={student_routes.stats} icon="BarChart" label="Thống kê học tập" isCollapsed={isCollapsed} />

                <div className="my-2 border-t border-slate-200"></div>

                <SidebarButton to={student_routes.settings} icon="Settings" label="Cài đặt" isCollapsed={isCollapsed} />
            </nav>

        </aside>)


    return (
        <><div className="flex flex-1 overflow-hidden gap-2">
            {sidebar}
            <Outlet />
        </div>
        </>
    )
}

export default Student_LogedInLayout;