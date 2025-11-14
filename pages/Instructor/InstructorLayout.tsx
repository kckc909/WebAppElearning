import { Outlet } from "react-router-dom";

export default function InstructorLayout() {
    return (
        <main className="w-full h-screen">
            <Outlet />
        </main>
    );
} 