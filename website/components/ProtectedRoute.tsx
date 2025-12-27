import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { UserRole } from '../mock-db/enums.mock';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: number | string; // -1/'SUPER_ADMIN', 2/'ADMIN', 1/'INSTRUCTOR', 0/'STUDENT'
}

// Map numeric roles to string roles for comparison
const getRoleString = (numericRole: number): string => {
    switch (numericRole) {
        case -1: return UserRole.SUPER_ADMIN;
        case 2: return UserRole.ADMIN;
        case 1: return UserRole.INSTRUCTOR;
        case 0: return UserRole.STUDENT;
        default: return '';
    }
};

// Get display name for role
const getRoleDisplayName = (role: number | string): string => {
    const roleStr = typeof role === 'number' ? getRoleString(role) : role.toUpperCase();
    switch (roleStr) {
        case 'SUPER_ADMIN': return 'Super Admin';
        case 'ADMIN': return 'Admin';
        case 'INSTRUCTOR': return 'Giảng viên';
        case 'STUDENT': return 'Học viên';
        default: return String(role);
    }
};

// Check if user role matches required role
const checkRoleMatch = (userRole: any, requiredRole: number | string): boolean => {
    // Debug log
    console.log('[ProtectedRoute] Role check:', { userRole, requiredRole, typeOfUserRole: typeof userRole, typeOfRequiredRole: typeof requiredRole });

    if (userRole === requiredRole) return true;

    // Convert userRole to uppercase for comparison
    const normalizedUserRole = typeof userRole === 'string' ? userRole.toUpperCase() : userRole;

    // If requiredRole is a number, convert to string role for comparison
    if (typeof requiredRole === 'number') {
        const expectedStringRole = getRoleString(requiredRole);
        const match = normalizedUserRole === expectedStringRole || userRole === requiredRole;
        console.log('[ProtectedRoute] Numeric role check:', { expectedStringRole, normalizedUserRole, match });
        return match;
    }

    // If requiredRole is string, compare normalized
    const normalizedRequiredRole = typeof requiredRole === 'string' ? requiredRole.toUpperCase() : requiredRole;
    const match = normalizedUserRole === normalizedRequiredRole;
    console.log('[ProtectedRoute] String role check:', { normalizedRequiredRole, normalizedUserRole, match });
    return match;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    const isSuperAdminRequired = requiredRole === -1 || requiredRole === UserRole.SUPER_ADMIN;
    const isAdminRequired = requiredRole === 2 || requiredRole === UserRole.ADMIN;
    const isInstructorRequired = requiredRole === 1 || requiredRole === UserRole.INSTRUCTOR;

    useEffect(() => {
        // Sử dụng toast id cố định để tránh duplicate
        const toastId = 'protected-route-auth-toast';

        if (!isAuthenticated) {
            // Dismiss toast cũ trước khi hiển thị mới
            toast.dismiss(toastId);
            toast.error('Bạn cần đăng nhập để truy cập trang này!', { id: toastId });
        } else if (requiredRole !== undefined && !checkRoleMatch(user?.role, requiredRole)) {
            const roleName = getRoleDisplayName(requiredRole);
            toast.dismiss(toastId);
            toast.error(`Bạn cần quyền ${roleName} để truy cập trang này!`, { id: toastId });
        }
    }, [isAuthenticated, user?.role, requiredRole]);

    // Nếu chưa đăng nhập
    if (!isAuthenticated) {
        // Redirect về trang login tương ứng
        if (isSuperAdminRequired) {
            return <Navigate to="/superadmin/login" state={{ from: location }} replace />;
        } else if (isAdminRequired) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        } else if (isInstructorRequired) {
            return <Navigate to="/instructor/login" state={{ from: location }} replace />;
        } else {
            return <Navigate to="/auth" state={{ from: location }} replace />;
        }
    }

    // Nếu đã đăng nhập nhưng không đủ quyền
    if (requiredRole !== undefined && !checkRoleMatch(user?.role, requiredRole)) {
        // Redirect về trang login tương ứng với role yêu cầu
        if (isSuperAdminRequired) {
            return <Navigate to="/superadmin/login" state={{ from: location }} replace />;
        } else if (isAdminRequired) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        } else if (isInstructorRequired) {
            return <Navigate to="/instructor/login" state={{ from: location }} replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;

