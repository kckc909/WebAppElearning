/**
 * Types for CheckOut page
 * Note: Main types are now in hooks for better reusability
 */

// Re-export types from hooks
export type { CartItem, PaymentMethod } from '../../../hooks/student/useCheckoutFlow';
export type { BillingInfo, FormErrors } from '../../../hooks/student/useCheckoutForm';
export type { PromoCode } from '../../../hooks/student/usePromoCode';

// Component-specific types
export interface QRPaymentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}
