/**
 * MOCK DB - Cart Items
 * Default cart items for checkout page when no state is passed
 */

export interface CartItem {
    id: number;
    title: string;
    instructor: {
        full_name: string;
    };
    thumbnail: string;
    price: number;
    discount_price: number;
    rating?: number;
    total_students?: number;
    total_duration?: number;
}

export const DEFAULT_CART_ITEMS: CartItem[] = [
    {
        id: 1,
        title: 'Complete Web Development Bootcamp 2024',
        instructor: { full_name: 'Nguyễn Văn A' },
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        price: 1990000,
        discount_price: 990000,
        rating: 4.8,
        total_students: 12543,
        total_duration: 3240
    },
    {
        id: 2,
        title: 'React - The Complete Guide',
        instructor: { full_name: 'Maximilian Schwarzmüller' },
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        price: 1490000,
        discount_price: 599000,
        rating: 4.9,
        total_students: 8234,
        total_duration: 2880
    },
];
