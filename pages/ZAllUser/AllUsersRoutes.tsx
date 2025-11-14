import { Routes, Route } from "react-router-dom";
import LessonPage from "../Student/Lesson";
import AboutPage from "./AboutPage";
import AuthPage from "./AuthPage";
import AllUsersLayout from './AllUsersLayout'
import HomePage from './HomePage'
import CoursesPage from './CoursesPage'
import CourseDetailPage from './CourseDetailPage'
import BecomeInstructorPage from './BecomeInstructorPage'

export default function AllUsersRoutes() {
    return (
        <Routes>
            <Route element={<AllUsersLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/become-instructor" element={<BecomeInstructorPage />} />
                <Route path="/lesson/:id" element={<LessonPage />} />
            </Route>
        </Routes>
    );
}
