import { Route, Routes } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import InstructorDashboard from "./Dashboard";

export default function InstructorRoutes() {
    return (
        <Routes>
            <Route element={<InstructorLayout />}>
                <Route path="/" element={<InstructorDashboard />}></Route>
                <Route path="/dashboard" element={<InstructorDashboard />}></Route>
            </Route>
        </Routes>
    );
} 