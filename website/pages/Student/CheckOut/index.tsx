import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../../contexts/CartContext';
import { CartItem, PaymentMethod } from '../../../hooks/student/useCheckoutFlow';
import { QRPaymentDialog } from './components/QRPaymentDialog';
import { CartItemList } from './components/CartItemList';
import { BillingForm } from './components/BillingForm';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { OrderSummary } from './components/OrderSummary';
import { useCheckoutForm } from '../../../hooks/student/useCheckoutForm';
import { usePromoCode } from '../../../hooks/student/usePromoCode';
import { useCheckoutFlow } from '../../../hooks/student/useCheckoutFlow';

const StudentCheckout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items: cartContextItems, removeItem: removeFromCart } = useCart();

    // Get courses from navigation state (direct checkout) or cart context (from add to cart)
    const getInitialCourses = (): CartItem[] => {
        // If "Mua ngay" was clicked, courses are passed via location state
        if (location.state?.courses && location.state.courses.length > 0) {
            return location.state.courses.map((c: any) => ({
                id: c.id,
                title: c.title,
                thumbnail: c.thumbnail,
                instructor: c.instructor?.full_name || c.instructor || null,
                original_price: c.price || 0,
                discount_price: c.discount_price || c.price || 0,
                price: c.price || 0,
                rating: c.rating || 0,
                total_students: c.total_students || 0,
                total_duration: c.total_duration || 0,
            }));
        }
        // Otherwise, use cart context
        return cartContextItems.map(c => ({
            id: c.id,
            title: c.title,
            thumbnail: c.thumbnail,
            instructor: c.instructor,
            original_price: c.price || 0,
            discount_price: c.discount_price || c.price || 0,
            price: c.price || 0,
            rating: c.rating || 0,
            total_students: c.total_students || 0,
            total_duration: c.total_duration || 0,
        }));
    };

    const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCourses);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Track if we came from cart (not direct checkout)
    const isFromCart = !location.state?.courses || location.state.courses.length === 0;

    // Custom hooks
    const { billingInfo, errors, updateField, validateForm } = useCheckoutForm();
    const { promoCode, setPromoCode, appliedPromo, handleApplyPromo, handleRemovePromo } = usePromoCode();

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.discount_price, 0);
    const discount = appliedPromo ? appliedPromo.discount : 0;
    const total = subtotal - discount;

    const { showQRDialog, setShowQRDialog, handleCheckout, handlePaymentSuccess } = useCheckoutFlow(
        cartItems,
        total,
        isFromCart,
        validateForm,
        agreeTerms,
        paymentMethod,
        billingInfo,
        appliedPromo,
        subtotal
    );

    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
        // Also remove from cart context if from cart
        if (isFromCart) {
            removeFromCart(id);
        }
        toast.success('Đã xóa khóa học khỏi giỏ hàng');
    };

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-secondary mb-2">Giỏ hàng trống</h2>
                    <p className="text-slate-600 mb-6">Bạn chưa có khóa học nào trong giỏ hàng</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold"
                    >
                        Khám phá khóa học
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary">Thanh toán</h1>
                <p className="text-slate-600 mt-1">Hoàn tất đơn hàng của bạn</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Cart & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cart Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">
                            Khóa học ({cartItems.length})
                        </h2>
                        <CartItemList items={cartItems} onRemoveItem={handleRemoveItem} />
                    </div>

                    {/* Billing Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">Thông tin thanh toán</h2>
                        <BillingForm
                            billingInfo={billingInfo}
                            errors={errors}
                            onChange={updateField}
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <PaymentMethodSelector
                            selectedMethod={paymentMethod}
                            onSelect={setPaymentMethod}
                        />
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div>
                    <OrderSummary
                        subtotal={subtotal}
                        discount={discount}
                        total={total}
                        itemCount={cartItems.length}
                        promoCode={appliedPromo}
                        onApplyPromo={handleApplyPromo}
                        onRemovePromo={handleRemovePromo}
                        agreeTerms={agreeTerms}
                        onAgreeTermsChange={setAgreeTerms}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>

            {/* QR Payment Dialog */}
            <QRPaymentDialog
                isOpen={showQRDialog}
                onClose={() => setShowQRDialog(false)}
                onSuccess={handlePaymentSuccess}
                amount={total}
            />
        </div>
    );
};

export default StudentCheckout;
