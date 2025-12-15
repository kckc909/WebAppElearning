import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Account } from '../types/types';

interface AuthContextType {
    user: Account | null;
    isAuthenticated: boolean;
    login: (userData: Account) => void;
    logout: () => void;
    updateUser: (userData: Partial<Account>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Account | null>(null);

    useEffect(() => {
        // Kiểm tra localStorage khi component mount
        const storedUser = localStorage.getItem('Account');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('Account');
            }
        }
    }, []);

    const login = (userData: Account) => {
        setUser(userData);
        localStorage.setItem('Account', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('Account');
    };

    const updateUser = (userData: Partial<Account>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('Account', JSON.stringify(updatedUser));
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
