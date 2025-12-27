import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Account } from '../types/types';

// User type without password_hash for security
type SafeUser = Omit<Account, 'password_hash'>;

interface AuthContextType {
    user: SafeUser | null;
    isAuthenticated: boolean;
    login: (userData: SafeUser) => void;
    logout: () => void;
    updateUser: (userData: Partial<SafeUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<SafeUser | null>(null);

    useEffect(() => {
        // Kiểm tra sessionStorage khi component mount
        // sessionStorage riêng biệt cho mỗi tab, không chia sẻ giữa các tabs
        const storedUser = sessionStorage.getItem('Account');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                sessionStorage.removeItem('Account');
            }
        }
    }, []);

    const login = (userData: SafeUser) => {
        setUser(userData);
        // Sử dụng sessionStorage để mỗi tab có session riêng
        sessionStorage.setItem('Account', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('Account');
        sessionStorage.removeItem('Token');
    };

    const updateUser = (userData: Partial<SafeUser>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            sessionStorage.setItem('Account', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
