import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./_sidebar";
import { useState } from "react";
import SuperAdminHeader from "./_header";
import { useAuth } from "../../contexts/AuthContext";

export default function SuperAdminLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
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
    )
}
