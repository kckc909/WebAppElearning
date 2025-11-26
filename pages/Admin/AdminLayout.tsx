import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import AdminPageHeader from "./AdminPageHeader"
import AdminPageSidebar from './AdminPageSidebar'

export default function AdminLayout() {
    // Protect Route - 0 
    // Kiểm tra đăng nhập - quyền truy cập
    const [user, setUser] = useState<any>();
    const [redirect, setRedirect] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [])

    useEffect(() => {
        if (user) {
            toast.error('Bạn cần đăng nhập với quyền Admin để truy cập trang quản trị!')
            setRedirect(true)
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null)
    };

    // if (!user && redirect) {
    //     return (
    //         <>
    //             <Navigate to={"/auth"} replace />
    //         </>
    //     )
    // }

    // Pass quyền
    // if (user && user.role == 1) 
    {
        return (
            <main className="flex h-screen bg-gray-50 overflow-hidden">
                <AdminPageSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <AdminPageHeader toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} handleLogout={handleLogout}></AdminPageHeader>
                    <Outlet />
                </div>
            </main>
        );
    }
} 