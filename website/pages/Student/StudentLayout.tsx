import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function StudentLayout() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';
    const isLessonPage = location.pathname.startsWith('/lesson') || location.pathname.includes('/lesson/');

    return (
        <main className="w-full min-h-screen flex flex-col">
            {!isAuthPage && !isLessonPage && <Header />}

            <div className="flex-1 min-h-screen">
                <Outlet />
            </div>

            {!isAuthPage && !isLessonPage && <Footer />}
        </main>
    );
}
