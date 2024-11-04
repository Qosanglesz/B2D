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

export interface ChargeMetadata {
    userId: string;
    userEmail: string;
    campaignId: string;
    campaignName: string;
    investmentAmount: string;
}

// export interface CreateChargeRequest {
//     user: {
//         sub: string;
//         email: string;
//     };
//     campaign: {
//         id: string;
//         name: string;
//         companyName: string;
//     };
//     amount: number;
// }

export type PricingType = 'no_price' | 'fixed_price';

export interface ChargeMetadata {
    userId: string;
    userEmail: string;
    campaignId: string;
    campaignName: string;
    investmentAmount: string;
}

export interface PricingInformation {
    amount: string;
    currency: string;
}

// export interface BaseCharge {
//     name: string;
//     description: string;
//     pricing_type: PricingType;
//     local_price: PricingInformation;
//     metadata: ChargeMetadata;
//     redirect_url?: string;
//     cancel_url?: string;
// }


export interface CreateChargeRequest {
    user: {
        sub: string;
        email: string;
    };
    campaign: {
        id: string;
        name: string;
        companyName: string;
    };
    amount: number;
}

export type ChargeStatus = 'NEW' | 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'UNRESOLVED' | 'RESOLVED' | 'CANCELED' | 'REFUNDED';

export interface ChargeMetadata {
    userId: string;
    userEmail: string;
    campaignId: string;
    campaignName: string;
    investmentAmount: string;
}

export interface PricingInformation {
    amount: string;
    currency: string;
}

export interface BaseCharge {
    name: string;
    description: string;
    pricing_type: PricingType;
    local_price: PricingInformation;
    metadata: ChargeMetadata;
    redirect_url?: string;
    cancel_url?: string;
}

// Updated to match Coinbase Commerce API response
export interface CoinbaseCharge {
    id: string;
    resource: string;
    code: string;
    name: string;
    description: string;
    logo_url?: string;
    hosted_url: string;
    created_at: string;
    expires_at: string;
    confirmed_at?: string;
    checkout?: {
        id: string;
    };
    timeline: Array<{
        time: string;
        status: ChargeStatus;
        context?: string;
    }>;
    metadata: ChargeMetadata;
    pricing_type: PricingType;
    pricing: {
        local: PricingInformation;
        bitcoin?: PricingInformation;
        ethereum?: PricingInformation;
    };
    payments: Array<{
        network: string;
        transaction_id: string;
        status: string;
        value: {
            local: PricingInformation;
            crypto: PricingInformation;
        };
        block: {
            height: number;
            hash: string;
            confirmations: number;
            confirmations_required: number;
        };
    }>;
    addresses: {
        bitcoin?: string;
        ethereum?: string;
    };
    local_price: PricingInformation;
    status: ChargeStatus;
}

export interface ChargeResponse {
    data: CoinbaseCharge;
}