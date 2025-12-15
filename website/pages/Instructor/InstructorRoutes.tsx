import { Route, Routes } from "react-router-dom";
import InstructorLayout from "./InstructorLayout";
import InstructorDashboard from "./Dashboard";
import { instructor_routes } from "../page_routes";

// Classes
import ClassOverview from './ClassManagement'
import ClassList from './ClassManagement/ClassList'
import Schedule from './ClassManagement/Schedule'
import Members from './ClassManagement/ClassList/Members'
import Grades from './ClassManagement/ClassList/Grades'
import Attandance from './ClassManagement/ClassList/Attendance'
import Assignments from './ClassManagement/ClassList/Assignments'
import Activity from './ClassManagement/ClassList/Activity'

import ClassDetail from './ClassManagement/ClassList/ClassDetail'

// Courses
import CoursesOverview from "./CoursesManagement";
import CourseList from "./CoursesManagement/Courses";
import CourseCreate from './CoursesManagement/InstructorCourseCreate'

import CourseDetail from "./CoursesManagement/Courses/CourseDetail";
import CourseCurriculum from "./CoursesManagement/Courses/CourseDetail/CurriculumPage";
import CourseLesson from "./CoursesManagement/Courses/CreateLesson";
import CourseStudents from './CoursesManagement/Courses/Students'
import CourseReviews from './CoursesManagement/Courses/Reviews'
import CourseCertificates from './CoursesManagement/Courses/Certificates'
import CourseSettings from './CoursesManagement/Courses/Settings'
import CourseAnalystics from './CoursesManagement/Courses/Analystics'

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
        <Routes>
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
                <Route path={instructor_routes.course_detail(":courseId") + "/curriculum"} element={<CourseCurriculum />} />
                <Route path={instructor_routes.course_detail(":courseId") + "/settings"} element={<CourseSettings />} />
                <Route path={instructor_routes.course_lesson(":courseId", ":lessonId")} element={<CourseLesson />} />
                <Route path={instructor_routes.course_students(':courseId')} element={<CourseStudents />} />
                <Route path={instructor_routes.course_certificates(':courseId')} element={<CourseCertificates />} />
                <Route path={instructor_routes.course_reviews(':courseId')} element={<CourseReviews />} />
                <Route path={instructor_routes.course_analytics(':courseId')} element={<CourseAnalystics />} />

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
    );
} 