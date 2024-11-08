export interface CryptoTransaction {
    _id?: string;
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
    createdAt: Date;
    updatedAt: Date;
}

export interface CryptoCurrencyGroup {
    currency: string;
    count: number;
    totalAmount: number;
}

export interface CryptoSummary {
    totalTransactions: number;
    totalAmount: number;
    completedTransactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    averageTransactionAmount: number;
    cryptoCurrencies: CryptoCurrencyGroup[];
}