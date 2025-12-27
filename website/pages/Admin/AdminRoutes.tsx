import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from './Dashboard/index'
import { Toaster } from 'react-hot-toast';
import { admin_routes } from "../page_routes";

import Admin_AllClasses from './ClassesManagement/AllClasses'
import Admin_ClassDetail from "./ClassesManagement/AllClasses/ClassDetail";
import Admin_ClassesOverview from "./ClassesManagement/ClassesOverview";
import Admin_ClassGrades from "./ClassesManagement/Grades";
import Admin_Schedule from "./ClassesManagement/Schedule";

import Admin_AllCourses from "./CoursesManagement/AllCourses";
import Admin_CourseDetail from "./CoursesManagement/AllCourses/CourseDetail";
import Admin_Approval from "./CoursesManagement/Approval";
import Admin_Certificates from "./CoursesManagement/Certificates";
import Admin_CoursesOverview from "./CoursesManagement/CoursesOverview";
import Admin_CourseGrades from "./CoursesManagement/Grades";
import Admin_LessonPreview from "./CoursesManagement/LessonPreview";
import Admin_DocumentLibrary from "./DocumentLibrary";

import Admin_StudentManagement from "./StudentManagement"
import Admin_InstructorManagement from './InstructorManagement'
import Admin_InstructorVertification from './InstructorVertification'

import Admin_Transactions from './Finance/Transactions'
import Admin_Revenue from './Finance/Revenue'
import Admin_Payouts from './Finance/Payouts'

import Admin_CMS from './CMS'
import Admin_Notification from './Notification'
import Admin_AnalyticsReports from './Analytics_Reports'
import Admin_Settings from './Settings'

export default function AdminRoutes() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={12}
                containerStyle={{
                    top: 20,
                    right: 20,
                }}
                toastOptions={{
                    duration: 3000,
                    style: {
                        padding: '14px 20px',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                        maxWidth: '400px',
                    },
                    success: {
                        style: {
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10B981',
                        },
                    },
                    error: {
                        style: {
                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#EF4444',
                        },
                    },
                    loading: {
                        style: {
                            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#3B82F6',
                        },
                    },
                }}
            />
            <Routes>
                <Route element={<AdminLayout />}>
                    {/* DASHBOARD */}
                    <Route path="/" element={<AdminDashboard />}></Route>
                    <Route path={admin_routes.dashboard} element={<AdminDashboard />}></Route>

                    {/*  CLASSES MANAGEMENT  */}
                    <Route path={admin_routes.all_classes} element={<Admin_AllClasses />} />
                    <Route path={admin_routes.class_detail(':id')} element={<Admin_ClassDetail />} />
                    <Route path={admin_routes.classes_overview} element={<Admin_ClassesOverview />} />
                    <Route path={admin_routes.documents} element={<Admin_DocumentLibrary />} />
                    <Route path={admin_routes.class_grades} element={<Admin_ClassGrades />} />
                    <Route path={admin_routes.schedule} element={<Admin_Schedule />} />

                    {/*  COURSES MANAGEMENT  */}
                    <Route path={admin_routes.all_courses} element={<Admin_AllCourses />} />
                    <Route path={admin_routes.course_detail(':id')} element={<Admin_CourseDetail />} />
                    <Route path={admin_routes.lesson_preview(':courseId', ':lessonId')} element={<Admin_LessonPreview />} />
                    <Route path={admin_routes.approval} element={<Admin_Approval />} />
                    <Route path={admin_routes.certificates} element={<Admin_Certificates />} />
                    <Route path={admin_routes.courses_overview} element={<Admin_CoursesOverview />} />
                    <Route path={admin_routes.course_grades} element={<Admin_CourseGrades />} />

                    {/*  USERS & LIBRARY  */}
                    <Route path={admin_routes.document_library} element={<Admin_DocumentLibrary />} />
                    <Route path={admin_routes.student_management} element={<Admin_StudentManagement />} />
                    <Route path={admin_routes.instructor_management} element={<Admin_InstructorManagement />} />
                    <Route path={admin_routes.instructor_verification} element={<Admin_InstructorVertification />} />

                    {/*  FINANCE  */}
                    <Route path={admin_routes.transactions} element={<Admin_Transactions />} />
                    <Route path={admin_routes.revenue} element={<Admin_Revenue />} />
                    <Route path={admin_routes.payouts} element={<Admin_Payouts />} />

                    {/*  OTHER  */}
                    <Route path={admin_routes.cms} element={<Admin_CMS />} />
                    <Route path={admin_routes.notification} element={<Admin_Notification />} />
                    <Route path={admin_routes.analytics_reports} element={<Admin_AnalyticsReports />} />
                    <Route path={admin_routes.settings} element={<Admin_Settings />} />
                </Route>
            </Routes>
        </>
    );
} 