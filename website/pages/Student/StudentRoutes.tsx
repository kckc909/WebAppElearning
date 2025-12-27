import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { student_routes } from '../page_routes';

import StudentLayout from './StudentLayout'
import HomePage from './HomePage'
import CoursesPage from './Courses'
import CourseDetailPage from './Courses/CourseDetail'
import LessonPage from './Courses/Lesson/index'
import StudentDashboard from './Dashboard/index'
import BecomeInstructorPage from './BecomeInstructorPage'
import AuthPage from './AuthPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import AboutPage from './AboutPage'
import NotFoundPageAll from '../NotFoundPageAll';

import Student_Checkout from "./CheckOut"
import Student_Cart from "./Cart"
import Student_Profile from "./Profile"
import Schedule from "./MyClasses/Schedule"
import StudentStats from "./Stats"

import MyClasses from './MyClasses'
import ClassDetail from './MyClasses/ClassDetail'
import MyCourses from './MyCourses'
import Student_PaymentHistory from "./PaymentHistory"
import Student_Certificates from './Certificates'
import Student_Settings from './Settings'

import Student_LoggedInLayout from './StudentSideBar'

export default function StudentRoutes() {
    return (
        <>
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
                <Route element={<StudentLayout />}>
                    <Route path={student_routes.home} element={<HomePage />} />

                    <Route path={student_routes.courses} element={<CoursesPage />} />
                    <Route path={student_routes.course_detail(':courseId')} element={<CourseDetailPage />} />
                    <Route path={student_routes.lesson(':courseId', ':lessonId')} element={<LessonPage />} />
                    <Route path={student_routes.auth} element={<AuthPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path={student_routes.about} element={<AboutPage />} />
                    <Route path={student_routes.become_instructor} element={<BecomeInstructorPage />} />

                    <Route element={<Student_LoggedInLayout />}>
                        <Route path={student_routes.dashboard} element={<StudentDashboard />} />
                        <Route path={student_routes.my_classes} element={<MyClasses />} />
                        <Route path={student_routes.schedule} element={<Schedule />} />
                        <Route path={student_routes.class_detail(':classId')} element={<ClassDetail />} />
                        <Route path={student_routes.my_courses} element={<MyCourses />} />
                        <Route path="cart" element={<Student_Cart />} />
                        <Route path={student_routes.checkout} element={<Student_Checkout />} />
                        <Route path={student_routes.payment_history} element={<Student_PaymentHistory />} />
                        <Route path={student_routes.certificates} element={<Student_Certificates />} />
                        <Route path={student_routes.profile} element={<Student_Profile />} />
                        <Route path={student_routes.settings} element={<Student_Settings />}></Route>
                        <Route path={student_routes.stats} element={<StudentStats />}></Route>
                    </Route>

                </Route>
                <Route path="*" element={<NotFoundPageAll />} />
            </Routes>
        </>
    );
}

