import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from './_layout'
import { superadmin_routes } from "../page_routes";
import SuperAdminDashboard from "./Dashboard";
import SuperAdmin_Settings from "./Settings";
import SuperAdmin_AuditLogs from "./Audit_logs";
import SuperAdmin_UsersManagement from "./UsersManagement";

export default function SuperAdminRoutes() {
    return (<>
        <Routes>
            <Route element={<SuperAdminLayout />}>
                {/* = '/' */}
                <Route path={superadmin_routes.base} element={<SuperAdminDashboard />}></Route>

                <Route path={superadmin_routes.dashboard} element={<SuperAdminDashboard />} />
                <Route path={superadmin_routes.users_management} element={<SuperAdmin_UsersManagement />} />
                <Route path={superadmin_routes.audit_logs} element={<SuperAdmin_AuditLogs />} />
                <Route path={superadmin_routes.system_settings} element={<SuperAdmin_Settings />} />
            </Route>
        </Routes>
    </>)
}