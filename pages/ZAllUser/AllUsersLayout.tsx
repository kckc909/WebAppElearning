import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function AllUsersLayout() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';
    const isLessonPage = location.pathname.startsWith('/lesson');

    return (
        <main className="w-full h-screen">
            {!isAuthPage && !isLessonPage && <Header />}
            <Outlet />
            {!isAuthPage && !isLessonPage && <Footer />}
        </main>
    );
} 