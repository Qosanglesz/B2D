// src/types/payment.ts
export interface PaymentRequest {
    user: {
        sub: string;
        email: string;
        name?: string;
    };
    campaign: {
        _id: string;
        name: string;
        companyName: string;
    };
    amount: number;
}

export interface CoinbaseCharge {
    id: string;
    code: string;
    hosted_url: string;
    expires_at: string;
    status: 'NEW' | 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'UNRESOLVED' | 'RESOLVED' | 'CANCELED';
}

export interface TransactionRecord {
    _id?: string;
    userId: string;
    campaignId: string;
    chargeId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentProvider: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    metadata: {
        chargeCode: string;
        campaignName: string;
        companyName: string;
        userEmail: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

// src/app/(investor)/coinbasepay/types/index.ts
export type PaymentStatus = 'processing' | 'completed' | 'pending' | 'cancelled' | 'failed';

export interface PaymentState {
    status: PaymentStatus;
    error: string | null;
}

export interface RequestBody {
    user: {
        sub: string;
        email: string;
    };
    campaign: {
        _id: string;
        name: string;
        companyName: string;
    };
    amount: number;
}

export interface ChargeResponse {
    id: string;
    status: string;
    timeline: Array<{
        time: string;
        status: string;
    }>;
    payments: Array<{
        network: string;
        transaction_id: string;
        status: string;
        value: {
            local: { amount: string; currency: string };
            crypto: { amount: string; currency: string };
        };
        block: {
            height: number;
            hash: string;
            confirmations: number;
            confirmations_required: number;
        };
    }>;
}

export interface ChargeMetadata {
    userId: string;
    userEmail: string;
    campaignId: string;
    campaignName: string;
    investmentAmount: string;
}