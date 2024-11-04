export interface CoinbaseWebhookEvent {
    id: string;
    scheduled_for: string;
    attempt_number: number;
    type: string;
    data: {
        id: string;
        code: string;
        name: string;
        description: string;
        hosted_url: string;
        created_at: string;
        expires_at: string;
        timeline: Array<{
            time: string;
            status: string;
        }>;
        metadata: {
            userId: string;
            userEmail: string;
            campaignId: string;
            campaignName: string;
            investmentAmount: string;
        };
        pricing: {
            local: {
                amount: string;
                currency: string;
            };
            bitcoin?: {
                amount: string;
                currency: string;
            };
            ethereum?: {
                amount: string;
                currency: string;
            };
        };
        payments: Array<{
            network: string;
            transaction_id: string;
            status: string;
            value: {
                local: {
                    amount: string;
                    currency: string;
                };
                crypto: {
                    amount: string;
                    currency: string;
                };
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
            usdc?: string;
        };
    };
}