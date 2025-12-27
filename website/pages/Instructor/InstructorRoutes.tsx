import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import InstructorLayout from "./InstructorLayout";
import InstructorDashboard from "./Dashboard";
import { instructor_routes } from "../page_routes";

// Classes
import ClassOverview from './ClassManagement'
import ClassList from './ClassManagement/ClassList'
import Schedule from './ClassManagement/Schedule'

import ClassDetail from './ClassManagement/ClassList/ClassDetail'

// Courses
import CoursesOverview from "./CoursesManagement";
import CourseList from "./CoursesManagement/Courses";
import CourseCreate from './CoursesManagement/InstructorCourseCreate'

import CourseDetail from "./CoursesManagement/Courses/CourseDetail";
import CourseCurriculum from "./CoursesManagement/Courses/Curriculum";
import LessonBuilder from "./CoursesManagement/Courses/LessonBuilder";

// New standalone course detail pages
import CourseStudents from './CoursesManagement/Courses/CourseStudents'
import CourseReviews from './CoursesManagement/Courses/CourseReviews'
import CourseAnalytics from './CoursesManagement/Courses/CourseAnalytics'
import CourseSettings from './CoursesManagement/Courses/CourseSettings'

// Legacy (not used)
// import CourseCertificates from './CoursesManagement/Courses/Certificates'


import ClassLiveSession from './ClassManagement/ClassList/LiveSession'
import ClassActivity from './ClassManagement/ClassList/Activity'
import ClassAttendance from './ClassManagement/ClassList/Attendance'
import ClassAssignments from './ClassManagement/ClassList/Assignments'
import ClassMaterials from './ClassManagement/ClassList/Matertial'
import ClassGrades from './ClassManagement/ClassList/Grades'
import ClassMembers from './ClassManagement/ClassList/Members'
import ClassSettings from './ClassManagement/ClassList/Settings'

// Others
import DocumentLibrary from "./DocumentLibrary";
import Notification from "./Notification";
import Settings from "./Settings";

export default function InstructorRoutes() {
    return (
        <>
            {/* Toast Notifications */}
            <Toaster
                position="top-right"
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
                {/* Regular Instructor Pages (WITH InstructorLayout) */}
                {/* Lesson Builder - Path: /courses/:courseId/lesson-builder/:lessonId?action= */}
                <Route path="courses/:courseId/lesson-builder/:lessonId" element={<LessonBuilder />} />
                {/* Lesson Builder without lessonId - for add-section/add-lesson */}
                <Route path="courses/:courseId/lesson-builder" element={<LessonBuilder />} />

                <Route element={<InstructorLayout />}>
                    <Route path={'/'} element={<InstructorDashboard />} />

                    {/* Dashboard */}
                    <Route path={instructor_routes.dashboard} element={<InstructorDashboard />} />

                    {/* ---------- COURSES ---------- */}
                    <Route path={instructor_routes.courses_overview} element={<CoursesOverview />} />
                    <Route path={instructor_routes.courses_list} element={<CourseList />} />
                    <Route path={instructor_routes.courses_create} element={<CourseCreate />} />

                    {/* Course Detail */}
                    <Route path={instructor_routes.course_detail(":courseId")} element={<CourseDetail />} />
                    <Route path={instructor_routes.course_curriculum(":courseId")} element={<CourseCurriculum />} />
                    <Route path={instructor_routes.course_settings(":courseId")} element={<CourseSettings />} />
                    <Route path={instructor_routes.course_students(':courseId')} element={<CourseStudents />} />
                    {/* <Route path={instructor_routes.course_certificates(':courseId')} element={<CourseCertificates />} /> */}
                    <Route path={instructor_routes.course_reviews(':courseId')} element={<CourseReviews />} />
                    <Route path={instructor_routes.course_analytics(':courseId')} element={<CourseAnalytics />} />


                    {/* Classes Management - Main Pages */}
                    <Route path={instructor_routes.classes_overview} element={<ClassOverview />} />
                    <Route path={instructor_routes.class_list} element={<ClassList />} />
                    <Route path={instructor_routes.schedule} element={<Schedule />} />

                    {/* Class Overview */}
                    <Route path={instructor_routes.class_detail(":classId")} element={<ClassDetail />} />
                    <Route path={instructor_routes.class_live(":classId")} element={<ClassLiveSession />} />
                    <Route path={instructor_routes.class_activity(":classId")} element={<ClassActivity />} />
                    <Route path={instructor_routes.class_attendance(":classId")} element={<ClassAttendance />} />
                    <Route path={instructor_routes.class_assignments(":classId")} element={<ClassAssignments />} />
                    <Route path={instructor_routes.class_materials(":classId")} element={<ClassMaterials />} />
                    <Route path={instructor_routes.class_grades(":classId")} element={<ClassGrades />} />
                    <Route path={instructor_routes.class_members(":classId")} element={<ClassMembers />} />
                    <Route path={instructor_routes.class_settings(":classId")} element={<ClassSettings />} />

                    {/* OTHER */}
                    <Route path={instructor_routes.document_library} element={<DocumentLibrary />} />
                    <Route path={instructor_routes.notification} element={<Notification />} />
                    <Route path={instructor_routes.settings} element={<Settings />} />

                </Route>
            </Routes>
        </>
    );
} 