export type PricingType = 'no_price' | 'fixed_price';

export interface Investment {
    userId: string;
    campaignId: string;
    amount: number;
    paymentMethod: 'stripe' | 'crypto';
    transactionHash?: string; // For crypto payments
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
}

export interface chargeData {
    name: string;
    description: string;
    local_price: {
        amount: any;
        currency: string;
    };
    pricing_type: PricingType;
    metadata: {
        userId: any;
        campaignId: any;
        investmentAmount: any;
    };
    redirect_url: string;
    cancel_url: string;
    // payment_threshold: {
    //     overpayment_absolute_threshold: {
    //         amount: string;
    //         currency: string;
    //     },
    //     underpayment_absolute_threshold: {
    //         amount: string;
    //         currency: string;
    //     }
    // }
}