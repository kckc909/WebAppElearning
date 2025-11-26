import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from './Dashboard/index'
import { Toaster } from 'react-hot-toast';
import { admin_routes } from "../page_routes";

import Admin_AllClasses from '../Admin/ClassesManagement/AllClasses'
import Admin_ClassDetail from "./ClassesManagement/AllClasses/ClassDetail";
import Admin_ClassesOverview from "../Admin/ClassesManagement/ClassesOverview";
import Admin_Documents from "../Admin/DocumentLibrary";
import Admin_ClassGrades from "../Admin/ClassesManagement/Grades";
import Admin_Schedule from "../Admin/ClassesManagement/Schedule";

import Admin_AllCourses from "../Admin/CoursesManagement/AllCourses";
import Admin_CourseDetail from "../Admin/CoursesManagement/AllCourses/CourseDetail";
import Admin_Approval from "../Admin/CoursesManagement/Approval";
import Admin_Certificates from "../Admin/CoursesManagement/Certificates";
import Admin_CoursesOverview from "../Admin/CoursesManagement/CoursesOverview";
import Admin_CourseGrades from "../Admin/CoursesManagement/Grades";
import Admin_DocumentLibrary from "../Admin/DocumentLibrary";

import Admin_StudentManagement from "../Admin/StudentManagement"
import Admin_InstructorManagement from '../Admin/InstructorManagement'
import Admin_InstructorVertification from '../Admin/InstructorVertification'

import Admin_Transactions from '../Admin/Finance/Transactions'
import Admin_Revenue from '../Admin/Finance/Revenue'
import Admin_Payouts from '../Admin/Finance/Payouts'

import Admin_Notification from '../Admin/Notification'
import Admin_AnalyticsReports from '../Admin/Analytics_Reports'
import Admin_Settings from '../Admin/Settings'

export default function AdminRoutes() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: { fontSize: '14px' }
                }}
            />
            <Routes>
                <Route element={<AdminLayout />}>
                    {/* DASHBOARD */}
                    <Route path="/" element={<AdminDashboard />}></Route>
                    <Route path={admin_routes.dashboard} element={<AdminDashboard />}></Route>

                    {/*  CLASSES MANAGEMENT  */}
                    <Route path={admin_routes.all_classes} element={<Admin_AllClasses />} />
                    <Route path={admin_routes.class_detail} element={<Admin_ClassDetail />} />
                    <Route path={admin_routes.classes_overview} element={<Admin_ClassesOverview />} />
                    <Route path={admin_routes.documents} element={<Admin_Documents />} />
                    <Route path={admin_routes.class_grades} element={<Admin_ClassGrades />} />
                    <Route path={admin_routes.schedule} element={<Admin_Schedule />} />

                    {/*  COURSES MANAGEMENT  */}
                    <Route path={admin_routes.all_courses} element={<Admin_AllCourses />} />
                    <Route path={admin_routes.course_detail} element={<Admin_CourseDetail />} />
                    <Route path={admin_routes.approval} element={<Admin_Approval />} />
                    <Route path={admin_routes.certificates} element={<Admin_Certificates />} />
                    <Route path={admin_routes.courses_overview} element={<Admin_CoursesOverview />} />
                    <Route path={admin_routes.course_grades} element={<Admin_CourseGrades />} />

                    {/*  USERS & LIBRARY  */}
                    <Route path={admin_routes.document_library} element={<Admin_DocumentLibrary />} />
                    <Route path={admin_routes.student_management} element={<Admin_StudentManagement />} />
                    <Route path={admin_routes.instructor_management} element={<Admin_InstructorManagement />} />
                    <Route path={admin_routes.instructor_vertification} element={<Admin_InstructorVertification />} />

                    {/*  FINANCE  */}
                    <Route path={admin_routes.transactions} element={<Admin_Transactions />} />
                    <Route path={admin_routes.revenue} element={<Admin_Revenue />} />
                    <Route path={admin_routes.payouts} element={<Admin_Payouts />} />

                    {/*  OTHER  */}
                    <Route path={admin_routes.notification} element={<Admin_Notification />} />
                    <Route path={admin_routes.analytics_reports} element={<Admin_AnalyticsReports />} />
                    <Route path={admin_routes.settings} element={<Admin_Settings />} />
                </Route>
            </Routes>
        </>
    );
} 