export interface TransactionMetadata {
    chargeCode: string;
    campaignName: string;
    companyName: string;
}

// export interface Transaction {
//     _id?: string;
//     userId: string;
//     campaignId: string;
//     chargeId: string;
//     transactionId?: string;  // Added field for Coinbase transaction ID
//     chargeCode: string;      // Made explicit instead of in metadata
//     amount: number;
//     currency: string;
//     paymentMethod: string;
//     paymentProvider: string;
//     status: string;
//     metadata: {
//         campaignName?: string;
//         companyName?: string;
//         [key: string]: any;
//     };
//     paymentDetails?: {
//         network?: string;
//         transaction_id?: string;
//         status?: string;
//         value?: any;
//     };
//     createdAt: Date;
//     updatedAt: Date;
// }

// @/types/Transaction.ts
export interface Transaction {
    userId: string;
    campaignId: string;
    chargeId: string;
    chargeCode: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentProvider: string;
    status: 'created' | 'pending' | 'completed' | 'failed' | 'delayed' | 'resolved';
    metadata: {
        campaignName: string;
        companyName: string;
        chargeCode: string;
        userEmail?: string;
    };
    charge?: {
        id: string;
        code: string;
        name: string;
        description: string;
        hosted_url: string;
        created_at: string;
        expires_at: string;
        pricing: {
            local: { amount: string; currency: string };
            bitcoin?: { amount: string; currency: string };
            ethereum?: { amount: string; currency: string };
            // Add other cryptocurrency types as needed
        };
        payments?: Array<{
            network: string;
            transaction_id: string;
            status: string;
            value: {
                local: { amount: string; currency: string };
                crypto: { amount: string; currency: string };
            };
        }>;
        timeline: Array<{
            status: string;
            time: string;
        }>;
    };
    paymentDetails?: {
        network?: string;
        transaction_id?: string;
        status?: string;
        value?: any;
    };
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    failureReason?: string;
    delayReason?: string;
}