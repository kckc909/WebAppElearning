/**
 * Cart Context - Database Version
 * Global state management for shopping cart
 * Syncs with backend API instead of localStorage
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
    id: number;
    course_id: number;
    title: string;
    thumbnail: string;
    instructor: string;
    instructor_username?: string;
    price: number;
    discount_price: number;
    rating?: number;
    total_students?: number;
    total_duration?: number;
    slug?: string;
    added_at?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (courseId: number) => Promise<boolean>;
    removeItem: (courseId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    isInCart: (courseId: number) => boolean;
    itemCount: number;
    total: number;
    loading: boolean;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch cart from backend when user logs in
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchCart();
        } else {
            setItems([]);
        }
    }, [isAuthenticated, user]);

    const fetchCart = async () => {
        if (!isAuthenticated || !user) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id.toString() // Temporary until auth is implemented
                }
            });

            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
            }
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (courseId: number): Promise<boolean> => {
        if (!isAuthenticated || !user) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return false;
        }

        // Check if already in cart
        if (items.some(item => item.course_id === courseId)) {
            return false;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/cart/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id.toString()
                },
                body: JSON.stringify({ course_id: courseId })
            });

            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
                return true;
            } else {
                const error = await response.json();
                console.error('Failed to add to cart:', error);
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (courseId: number): Promise<void> => {
        if (!isAuthenticated || !user) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/cart/items/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id.toString()
                }
            });

            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async (): Promise<void> => {
        if (!isAuthenticated || !user) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id.toString()
                }
            });

            if (response.ok) {
                setItems([]);
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const isInCart = (courseId: number): boolean => {
        return items.some(item => item.course_id === courseId);
    };

    const refreshCart = async (): Promise<void> => {
        await fetchCart();
    };

    const total = items.reduce((sum, item) => sum + (item.discount_price || item.price || 0), 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            clearCart,
            isInCart,
            itemCount: items.length,
            total,
            loading,
            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
