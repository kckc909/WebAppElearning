import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./_sidebar";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SuperAdminHeader from "./_header";

export default function SuperAdminLayout() {
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
    return (<>
        <main className="flex h-screen bg-gray-50 overflow-hidden">
            <SuperAdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
            <div>
                <SuperAdminHeader toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} handleLogout={handleLogout} />
                <Outlet />
            </div>
        </main>
    </>)
}