import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface CheckoutData {
    course_id: number;
    payment_method_id: number;
    amount: number;
}

export interface CheckoutResponse {
    success: boolean;
    transaction_id: number;
    transaction_code: string;
    message: string;
}

export const useCheckout = () => {
    const api = getApiInstance();
    const queryClient = useQueryClient();

    return useMutation<CheckoutResponse, Error, CheckoutData>({
        mutationFn: async (data: CheckoutData) => {
            // Create transaction via transactions API
            const transaction = await api.transactions.createTransaction({
                course_id: data.course_id,
                amount: data.amount,
                method_id: data.payment_method_id,
            });
            return transaction;
        },
        onSuccess: () => {
            // Invalidate relevant queries after successful checkout
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['enrollments'] });
            queryClient.invalidateQueries({ queryKey: ['my-courses'] });
        },
    });
};
