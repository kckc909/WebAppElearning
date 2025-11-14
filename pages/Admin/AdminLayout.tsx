import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <main className="w-full h-screen">
            <Outlet />
        </main>
    );
} 