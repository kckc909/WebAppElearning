import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function InstructorLayout() {
    // Protect Route - 1
    // Kiểm tra đăng nhập - quyền truy cập
    const [user, setUser] = useState<any>();
    const [redirect, setRedirect] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // useEffect(() => {
    //     setUser(localStorage.getItem('user'))
    // }, [])

    // useEffect(() => {
    //     if (user) {
    //         toast.error('Bạn cần đăng nhập với quyền Admin để truy cập trang quản trị!')
    //         setRedirect(true)
    //     }
    // }, [user])

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     setUser(null)
    // };
    // if (!user) {
    //     return (
    //         <>
    //             {alert("Bạn không có quyền truy cập website của Giảng viên(Instructor)!")}
    //             <Navigate to={"/auth"} />
    //         </>
    //     )
    // }
    // if (user && user) {
    // }
    // Pass quyền
    return (
        <main className="w-full h-screen">

            <Outlet />

        </main>
    );
}

