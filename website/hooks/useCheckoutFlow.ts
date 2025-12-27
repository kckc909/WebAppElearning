import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';

// Types
export type PaymentMethod = 'card' | 'momo' | 'zalopay' | 'bank';

export interface CartItem {
    id: number;
    title: string;
    thumbnail: string;
    instructor: string | { full_name?: string } | null;
    original_price: number;
    discount_price: number;
    price?: number;
    rating: number;
    students?: number;
    total_students?: number;
    duration?: string;
    total_duration?: number;
}

export const useCheckoutFlow = (
    cartItems: CartItem[],
    total: number,
    isFromCart: boolean,
    validateForm: () => boolean,
    agreeTerms: boolean,
    paymentMethod: PaymentMethod
) => {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [showQRDialog, setShowQRDialog] = useState(false);

    const handleCheckout = () => {
        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin thanh toán!');
            return;
        }

        if (!agreeTerms) {
            toast.error('Vui lòng đồng ý với điều khoản và điều kiện!');
            return;
        }

        if (paymentMethod === 'bank') {
            setShowQRDialog(true);
        } else {
            toast.error('Phương thức thanh toán này chưa khả dụng!');
        }
    };

    const handlePaymentSuccess = async () => {
        setShowQRDialog(false);

        try {
            const accountData = sessionStorage.getItem('Account');
            const account = accountData ? JSON.parse(accountData) : null;

            if (!account) {
                toast.error('Vui lòng đăng nhập lại');
                navigate('/login');
                return;
            }

            const courseIds = cartItems.map(item => item.id);
            const API_BASE_URL = import.meta.env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

            const loadingToast = toast.loading('Đang xử lý thanh toán...');

            const response = await fetch(`${API_BASE_URL}/checkout/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': account.id.toString()
                },
                body: JSON.stringify({
                    course_ids: courseIds,
                    payment_method: paymentMethod,
                    transaction_code: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
                    total_amount: total
                })
            });

            toast.dismiss(loadingToast);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Checkout failed');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Checkout failed');
            }

            if (isFromCart) {
                await clearCart();
            }

            toast.success('Thanh toán thành công! Chúc mừng bạn đã đăng ký khóa học.', {
                duration: 4000,
                icon: '🎉'
            });

            setTimeout(() => {
                navigate('/my-courses');
            }, 2000);

        } catch (error: any) {
            console.error('Checkout error:', error);
            toast.error(error.message || 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại!');
        }
    };

    return {
        showQRDialog,
        setShowQRDialog,
        handleCheckout,
        handlePaymentSuccess
    };
};
