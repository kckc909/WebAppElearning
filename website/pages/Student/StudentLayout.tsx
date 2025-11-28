import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MOCK_USER } from "../../mockData";
import { Cus_User } from "../../cus_types";

export default function StudentLayout() {
    // Protect Route - 2 
    // Kiểm tra đăng nhập - quyền truy cập
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';
    const isLessonPage = location.pathname.startsWith('/lesson');
    const [user, setUser] = useState<null | Cus_User>(null);


    return (
        <main className="w-full h-screen">
            {/* nếu đã đăng nhập thì ....  */}
            {!isAuthPage && !isLessonPage && <Header />}
            <div className="min-h-screen pt-1">
                <Outlet />
            </div>
            {!isAuthPage && !isLessonPage && <Footer />}
        </main>
    );
}
