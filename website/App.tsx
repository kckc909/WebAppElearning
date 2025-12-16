
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import StudentRoutes from './pages/Student/StudentRoutes'
import InstructorRoutes from './pages/Instructor/InstructorRoutes'
import AdminRoutes from './pages/Admin/AdminRoutes'
import ErrorBoundery from './pages/ErrorBoundery'
import NotFoundPageAll from './pages/NotFoundPageAll'

import { setupIonicReact } from '@ionic/react';
import { useEffect } from 'react';
import SuperAdminRoutes from './pages/SuperAdmin/_route';
import { AuthProvider } from './contexts/AuthContext';
setupIonicReact();

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

const App = () => {
	return (
		<>
			<ErrorBoundery>
				<AuthProvider>
					<BrowserRouter>
						<ScrollToTop />
						<Routes>
							<Route path="/superadmin/*" element={<SuperAdminRoutes />} />

							<Route path="/admin/*" element={<AdminRoutes />} />

							<Route path="/instructor/*" element={<InstructorRoutes />} />

							<Route path="/*" element={<StudentRoutes />} />

						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</ErrorBoundery>
		</>
	);
};

export default App;