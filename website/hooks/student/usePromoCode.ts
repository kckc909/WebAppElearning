import { useState } from 'react';
import toast from 'react-hot-toast';

// Types
export interface PromoCode {
    code: string;
    discount: number;
}

export const usePromoCode = () => {
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

    const handleApplyPromo = (code: string) => {
        if (code === 'SAVE50K') {
            setAppliedPromo({ code, discount: 50000 });
            toast.success('Áp dụng mã giảm giá thành công!');
        } else {
            toast.error('Mã giảm giá không hợp lệ!');
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
    };

    return {
        promoCode,
        setPromoCode,
        appliedPromo,
        handleApplyPromo,
        handleRemovePromo
    };
};
