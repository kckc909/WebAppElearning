
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllUsersRoutes from './pages/ZAllUser/AllUsersRoutes';
import StudentRoutes from './pages/Student/StudentRoutes'
import InstructorRoutes from './pages/Instructor/InstructorRoutes'
import AdminRoutes from './pages/Admin/AdminRoutes'

import { setupIonicReact } from '@ionic/react';
setupIonicReact();

const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/instructor/*" element={<InstructorRoutes />} />
				<Route path="/student/*" element={<StudentRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/*" element={<AllUsersRoutes />} />
			</Routes>
		</HashRouter>
	);
};

export default App;