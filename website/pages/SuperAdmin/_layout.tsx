import { Outlet, Navigate } from "react-router-dom";
import SuperAdminSidebar from "./_sidebar";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SuperAdminHeader from "./_header";

export default function SuperAdminLayout() {
    const [user, setUser] = useState<any>();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('Account');
        if (storedUser) {
            try {
                console.log(storedUser)
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
                // alert("Bạn phải là Super Admin ")
                setUser(null);  
            }
        } else {
            setUser(null);
        }
    }, [])

    if (user === undefined) {
        return <div>Loading...</div>;
    }

    // if (!user || user.role !== -1) {
    //     toast.error('Bạn cần đăng nhập với quyền Super Admin để truy cập trang quản trị!')
    //     return <Navigate to="/superadmin/login" replace />;
    // }

    return (<>
        <main className="flex h-screen bg-gray-50 overflow-hidden">
            <SuperAdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <SuperAdminHeader onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl animate-fade-in-up">
                        <Outlet />
                    </div>
                </main>
            </div>
        </main>
    </>)
}
