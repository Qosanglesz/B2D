// app/api/payment/coinbase/services/CoinbaseService.ts

import { Client, resources } from 'coinbase-commerce-node';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { chargeData } from '@/types/Investment';
import { RequestBody, ChargeMetadata, ChargeResponse } from '@/types/payment';


// export interface RequestBody {
//     user: {
//         sub: string;
//         email: string;
//     };
//     campaign: {
//         _id: string;
//         name: string;
//         companyName: string;
//     };
//     amount: number;
// }

// interface ChargeMetadata {
//     userId: string;
//     userEmail: string;
//     campaignId: string;
//     campaignName: string;
//     investmentAmount: string;
// }

// interface ChargeResponse {
//     id: string;
//     status: string;
//     timeline: Array<{
//         time: string;
//         status: string;
//     }>;
//     payments: Array<{
//         network: string;
//         transaction_id: string;
//         status: string;
//         value: {
//             local: { amount: string; currency: string };
//             crypto: { amount: string; currency: string };
//         };
//         block: {
//             height: number;
//             hash: string;
//             confirmations: number;
//             confirmations_required: number;
//         };
//     }>;
// }

export class CoinbaseService {
    private static instance: CoinbaseService;
    private readonly Charge = resources.Charge;

    private constructor() {
        if (!process.env.COINBASE_COMMERCE_API_KEY) {
            throw new Error('Coinbase Commerce API key not configured');
        }
        Client.init(process.env.COINBASE_COMMERCE_API_KEY);
    }

    public static getInstance(): CoinbaseService {
        if (!CoinbaseService.instance) {
            CoinbaseService.instance = new CoinbaseService();
        }
        return CoinbaseService.instance;
    }

    private async validateEnvironment() {
        if (!process.env.MONGODB_URL) {
            throw new Error('MongoDB database not configured');
        }
    }

    private async getDatabase() {
        const mongoClient = await clientPromise;
        return mongoClient.db('B2DVentureProject');
    }

    private async verifyCampaign(campaignId: string, amount: number) {
        const db = await this.getDatabase();
        const campaignDoc = await db.collection('Campaigns').findOne({
            _id: new ObjectId(campaignId.toString()),
            status: 'Active'
        });

        if (!campaignDoc) {
            throw new Error('Campaign not found or inactive');
        }

        const remainingAmount = campaignDoc.targetAmount - campaignDoc.amountRaised;
        if (amount > remainingAmount) {
            throw new Error('Investment amount exceeds campaign remaining target');
        }

        return { campaignDoc, remainingAmount };
    }

    private async createTransaction(charge: any, userData: any) {
        const db = await this.getDatabase();
        await db.collection('Transactions').insertOne({
            userId: userData.user.sub,
            campaignId: new ObjectId(userData.campaign._id.toString()),
            chargeId: charge.id,
            amount: userData.amount,
            currency: 'USD',
            paymentMethod: 'crypto',
            paymentProvider: 'coinbase',
            status: 'pending',
            metadata: {
                chargeCode: charge.code,
                campaignName: userData.campaignDoc.name,
                companyName: userData.campaignDoc.companyName,
                companyStage: userData.campaignDoc.companyStage,
                industry: userData.campaignDoc.industry,
                sector: userData.campaignDoc.sector
            },
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    public async createCharge(data: RequestBody) {
        await this.validateEnvironment();
        const { user, campaign, amount } = data;
        const { campaignDoc, remainingAmount } = await this.verifyCampaign(campaign._id, amount);

        const metadata: ChargeMetadata = {
            userId: user.sub,
            userEmail: user.email,
            campaignId: campaign._id,
            campaignName: campaign.name,
            investmentAmount: amount.toString()
        };

        const chargeData: chargeData = {
            name: `Investment in ${campaignDoc.name}`,
            description: `Investment in ${campaignDoc.companyName} - ${campaignDoc.description.substring(0, 100)}...`,
            local_price: {
                amount: amount.toString(),
                currency: 'USD'
            },
            pricing_type: 'fixed_price',
            metadata,
            redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/${campaign._id}?provider=coinbase`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel/${campaign._id}?provider=coinbase`,
        };

        const charge = await this.Charge.create(chargeData);
        await this.createTransaction(charge, { user, campaign, amount, campaignDoc });

        return {
            success: true,
            chargeId: charge.id,
            hostedUrl: charge.hosted_url,
            expiresAt: charge.expires_at,
            campaignDetails: {
                name: campaignDoc.name,
                companyName: campaignDoc.companyName,
                remainingTarget: remainingAmount - amount
            }
        };
    }

    public async getChargeStatus(chargeId: string) {
        const charge = await this.Charge.retrieve(chargeId) as unknown as ChargeResponse;
        return {
            status: charge.status,
            timeline: charge.timeline,
            payments: charge.payments
        };
    }
}