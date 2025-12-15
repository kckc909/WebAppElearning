import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: number; // -1 for SuperAdmin, 2 for Admin, 1 for Instructor, 0 for Student
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('Bạn cần đăng nhập để truy cập trang này!');
        } else if (requiredRole !== undefined && user?.role !== requiredRole) {
            const roleNames: { [key: number]: string } = {
                '-1': 'Super Admin',
                '2': 'Admin',
                '1': 'Instructor',
                '0': 'Student'
            };
            toast.error(`Bạn cần quyền ${roleNames[requiredRole]} để truy cập trang này!`);
        }
    }, [isAuthenticated, user, requiredRole]);

    // Nếu chưa đăng nhập
    if (!isAuthenticated) {
        // Redirect về trang login tương ứng
        if (requiredRole === -1) {
            return <Navigate to="/superadmin/login" state={{ from: location }} replace />;
        } else if (requiredRole === 2) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        } else if (requiredRole === 1) {
            return <Navigate to="/instructor/login" state={{ from: location }} replace />;
        } else {
            return <Navigate to="/auth" state={{ from: location }} replace />;
        }
    }

    // Nếu đã đăng nhập nhưng không đủ quyền
    if (requiredRole !== undefined && user?.role !== requiredRole) {
        // Redirect về trang login tương ứng với role yêu cầu
        if (requiredRole === -1) {
            return <Navigate to="/superadmin/login" state={{ from: location }} replace />;
        } else if (requiredRole === 2) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        } else if (requiredRole === 1) {
            return <Navigate to="/instructor/login" state={{ from: location }} replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
