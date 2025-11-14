import { Route, Routes } from 'react-router-dom';
import StudentLayout from './StudentLayout'
import StudentDashboard from './Dashboard/index'

export default function StudentRoutes() {
    return (
        <Routes>
            <Route element={<StudentLayout />}>
                <Route path='/' element={<StudentDashboard />} />
                <Route path='/dashboard' element={<StudentDashboard />} />
            </Route>
        </Routes>
    );
} 