// src/app/(investor)/coinbasepay/components/StatusComponents.tsx
import { useRouter } from 'next/navigation';
import { StatusIcons } from './StatusIcons';
import { Button } from './Button';
import { LoadingIndicator } from './LoadingIndicator';

interface StatusComponentProps {
    error?: string | null;
}

export const CompletedStatus = () => {
    const router = useRouter();
    
    return (
        <div className="text-center">
            <StatusIcons.CheckCircle className="mx-auto h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
                Your investment has been successfully processed.
            </p>
            <div className="space-x-4">
                <Button onClick={() => router.push('/profile')} variant="primary">
                    View My Investments
                </Button>
                <Button onClick={() => router.push('/campaigns')} variant="secondary">
                    Explore More Campaigns
                </Button>
            </div>
        </div>
    );
};

export const PendingStatus = () => (
    <div className="text-center">
        <StatusIcons.Clock className="mx-auto h-16 w-16 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Processing Payment
        </h2>
        <p className="text-gray-600 mb-6">
            Please wait while we confirm your payment. This may take a few minutes.
        </p>
        <LoadingIndicator color="bg-yellow-200" />
    </div>
);

export const CancelledStatus = () => {
    const router = useRouter();
    
    return (
        <div className="text-center">
            <StatusIcons.XCircle className="mx-auto h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Cancelled
            </h2>
            <p className="text-gray-600 mb-6">
                Your payment has been cancelled. No charges have been made.
            </p>
            <div className="space-x-4">
                <Button onClick={() => router.back()} variant="primary">
                    Try Again
                </Button>
                <Button onClick={() => router.push('/campaigns')} variant="secondary">
                    Browse Campaigns
                </Button>
            </div>
        </div>
    );
};

export const FailedStatus = ({ error }: StatusComponentProps) => {
    const router = useRouter();
    
    return (
        <div className="text-center">
            <StatusIcons.ExclamationCircle className="mx-auto h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Failed
            </h2>
            <p className="text-gray-600 mb-2">
                We encountered an error processing your payment.
            </p>
            {error && (
                <p className="text-red-600 text-sm mb-6">
                    Error: {error}
                </p>
            )}
            <div className="space-x-4">
                <Button onClick={() => router.back()} variant="primary">
                    Try Again
                </Button>
                <Button onClick={() => router.push('/support')} variant="secondary">
                    Contact Support
                </Button>
            </div>
        </div>
    );
};

export const ProcessingStatus = () => (
    <div className="text-center">
        <StatusIcons.ProcessingClock className="mx-auto h-16 w-16 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Initializing Payment
        </h2>
        <p className="text-gray-600 mb-6">
            Please wait while we set up your payment...
        </p>
        <LoadingIndicator color="bg-blue-200" />
    </div>
);