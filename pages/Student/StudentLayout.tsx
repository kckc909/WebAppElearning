import { Outlet } from "react-router-dom";

export default function StudentLayout() {
    return (
        <main className="w-full h-screen">
            <Outlet />
        </main>
    );
} 