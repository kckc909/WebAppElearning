import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

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

export interface BillingInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

export interface AppliedPromo {
    code: string;
    discount: number;
}

/**
 * Generate unique transaction code
 */
const generateUniqueTransactionCode = (userId: number): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `TXN-${userId}-${timestamp}-${random}`;
};

export const useCheckoutFlow = (
    cartItems: CartItem[],
    total: number,
    isFromCart: boolean,
    validateForm: () => boolean,
    agreeTerms: boolean,
    paymentMethod: PaymentMethod,
    billingInfo: BillingInfo,
    appliedPromo: AppliedPromo | null,
    subtotal: number
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
        // Validate lại billing info trước khi call API
        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin thanh toán!');
            setShowQRDialog(false);
            return;
        }

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

            // Prepare billing info
            const billingData = {
                full_name: billingInfo.fullName,
                email: billingInfo.email,
                phone: billingInfo.phone,
                address: billingInfo.address
            };

            // Calculate discount
            const discount = appliedPromo ? appliedPromo.discount : 0;

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
                    transaction_code: generateUniqueTransactionCode(account.id),
                    billing_info: billingData,
                    promo_code: appliedPromo?.code || null,
                    discount_amount: discount,
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
                const errorMessage = result.error || 'Checkout failed';
                
                // Better error messages
                if (errorMessage.includes('Already enrolled')) {
                    toast.error('Bạn đã đăng ký khóa học này rồi!');
                } else if (errorMessage.includes('Invalid promo')) {
                    toast.error('Mã giảm giá không hợp lệ!');
                } else if (errorMessage.includes('not found')) {
                    toast.error('Không tìm thấy khóa học!');
                } else {
                    toast.error(errorMessage);
                }
                
                throw new Error(errorMessage);
            }

            // Clear cart only after successful checkout
            if (isFromCart) {
                await clearCart();
            }

            toast.success('Thanh toán thành công! Chúc mừng bạn đã đăng ký khóa học.', {
                duration: 4000,
                icon: '🎉'
            });

            setTimeout(() => {
                navigate('/courses/my');
            }, 2000);

        } catch (error: any) {
            console.error('Checkout error:', error);
            // Error message already shown in better format above
            if (!error.message.includes('Already enrolled') && 
                !error.message.includes('Invalid promo') &&
                !error.message.includes('not found')) {
                toast.error('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại!');
            }
        }
    };

    return {
        showQRDialog,
        setShowQRDialog,
        handleCheckout,
        handlePaymentSuccess
    };
};
