import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from './Dashboard/index'

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<AdminDashboard />}></Route>
                <Route path="/dashboard" element={<AdminDashboard />}></Route>
            </Route>
        </Routes>
    );
} 