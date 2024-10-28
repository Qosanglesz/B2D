// src/app/(investor)/coinbasepay/hooks/usePaymentVerification.ts
import { useState, useCallback } from 'react';
import { PaymentState } from '@/types/payment';

export const usePaymentVerification = () => {
    const [paymentState, setPaymentState] = useState<PaymentState>({
        status: 'processing',
        error: null
    });

    const verifyPayment = useCallback(async (chargeId: string) => {
        try {
            const response = await fetch(`/api/payment/coinbase?chargeId=${chargeId}`);
            const data = await response.json();

            setPaymentState(prevState => {
                const newState = { ...prevState };

                switch (data.status) {
                    case 'COMPLETED':
                        newState.status = 'completed';
                        break;
                    case 'PENDING':
                        newState.status = 'pending';
                        break;
                    case 'CANCELED':
                        newState.status = 'cancelled';
                        break;
                    default:
                        newState.status = 'failed';
                        newState.error = data.error || 'Payment processing failed';
                }

                return newState;
            });

            if (data.status === 'PENDING') {
                setTimeout(() => verifyPayment(chargeId), 5000);
            }
        } catch (error) {
            setPaymentState({
                status: 'failed',
                error: 'Failed to verify payment'
            });
        }
    }, []);

    return { paymentState, setPaymentState, verifyPayment };
};