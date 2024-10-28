// src/app/(investor)/coinbasepay/page.tsx (updated)
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePaymentVerification } from '@/hooks/usePaymentVerification';
import { 
    CompletedStatus,
    PendingStatus,
    CancelledStatus,
    FailedStatus,
    ProcessingStatus 
} from '@/components/coinbasepayComponents/StatusComponents';
import { Layout } from '@/components/coinbasepayComponents/Layout';
import { ErrorBoundary } from '@/components/coinbasepayComponents/ErrorBoundary';

export default function CoinbasePaymentPage() {
    const searchParams = useSearchParams();
    const { paymentState, setPaymentState, verifyPayment } = usePaymentVerification();

    useEffect(() => {
        const status = searchParams.get('status');
        const chargeId = searchParams.get('chargeId');

        if (status === 'cancelled') {
            setPaymentState({
                status: 'cancelled',
                error: null
            });
        } else if (chargeId) {
            verifyPayment(chargeId);
        }
    }, [searchParams, verifyPayment, setPaymentState]);

    const renderStatusContent = () => {
        const StatusComponents = {
            completed: <CompletedStatus />,
            pending: <PendingStatus />,
            cancelled: <CancelledStatus />,
            failed: <FailedStatus error={paymentState.error} />,
            processing: <ProcessingStatus />
        };

        return StatusComponents[paymentState.status];
    };

    return (
        <ErrorBoundary>
            <Layout>
                {renderStatusContent()}
            </Layout>
        </ErrorBoundary>
    );
}