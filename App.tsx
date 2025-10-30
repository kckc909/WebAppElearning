
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import BecomeInstructorPage from './pages/BecomeInstructorPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
};

const MainLayout: React.FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

    return (
        <div className="bg-light font-sans text-secondary">
            {!isAuthPage && <Header />}
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/courses/:id" element={<CourseDetailPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/become-instructor" element={<BecomeInstructorPage />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default App;