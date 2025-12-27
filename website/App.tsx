
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudentRoutes from './pages/Student/StudentRoutes'
import InstructorRoutes from './pages/Instructor/InstructorRoutes'
import AdminRoutes from './pages/Admin/AdminRoutes'
import ErrorBoundery from './pages/ErrorBoundery'
import NotFoundPageAll from './pages/NotFoundPageAll'

import { setupIonicReact } from '@ionic/react';
import { useEffect } from 'react';
import SuperAdminRoutes from './pages/SuperAdmin/_route';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
setupIonicReact();

// Create a client for react-query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 1,
		},
	},
});

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
			<QueryClientProvider client={queryClient}>
				<ErrorBoundery>
					<AuthProvider>
						<CartProvider>
							<BrowserRouter>
								<ScrollToTop />
								<Routes>
									<Route path="/superadmin/*" element={<SuperAdminRoutes />} />

									<Route path="/admin/*" element={<AdminRoutes />} />

									<Route path="/instructor/*" element={<InstructorRoutes />} />

									<Route path="/*" element={<StudentRoutes />} />

								</Routes>
							</BrowserRouter>
						</CartProvider>
					</AuthProvider>
				</ErrorBoundery>
			</QueryClientProvider>
		</>
	);
};

export default App;