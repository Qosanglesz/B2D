// src/app/api/payment/coinbase/webhook/services/WebhookService.ts

import { Webhook } from 'coinbase-commerce-node';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export class WebhookService {
    private static instance: WebhookService;

    private constructor() {}

    public static getInstance(): WebhookService {
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
        }
        return WebhookService.instance;
    }

    public verifyWebhookSignature(rawBody: string, signature: string): any {
        return Webhook.verifyEventBody(
            rawBody,
            signature,
            process.env.COINBASE_COMMERCE_WEBHOOK_SECRET!
        );
    }

    private async getDatabase() {
        const mongoClient = await clientPromise;
        return mongoClient.db('B2DVentureProject');
    }

    public async processWebhookEvent(event: any) {
        const db = await this.getDatabase();

        switch (event.type) {
            case 'charge:confirmed':
                await this.handleConfirmedPayment(db, event.data);
                break;
            case 'charge:failed':
                await this.handleFailedPayment(db, event.data);
                break;
            case 'charge:delayed':
                await this.handleDelayedPayment(db, event.data);
                break;
            default:
                throw new Error(`Unhandled event type: ${event.type}`);
        }
    }

    private async handleConfirmedPayment(db: any, data: any) {
        const session = await db.client.startSession();
        
        try {
            await session.withTransaction(async () => {
                const transaction = await this.updateTransaction(db, data, session);
                await this.updateCampaignAmount(db, transaction.value, session);
                await this.createStatement(db, transaction.value, session);
            });
        } finally {
            await session.endSession();
        }
    }

    private async updateTransaction(db: any, data: any, session: any) {
        const transaction = await db.collection('Transactions')
            .findOneAndUpdate(
                { chargeId: data.id },
                {
                    $set: {
                        status: 'completed',
                        updatedAt: new Date(),
                        paymentDetails: data
                    }
                },
                { session, returnDocument: 'after' }
            );

        if (!transaction.value) {
            throw new Error('Transaction not found');
        }

        return transaction;
    }

    private async updateCampaignAmount(db: any, transaction: any, session: any) {
        await db.collection('Campaigns').updateOne(
            { _id: new ObjectId(transaction.campaignId) },
            { $inc: { amountRaised: transaction.amount } },
            { session }
        );
    }

    private async createStatement(db: any, transaction: any, session: any) {
        await db.collection('Statements').insertOne({
            userId: transaction.userId,
            campaignId: transaction.campaignId,
            transactionId: transaction._id,
            type: 'investment',
            amount: transaction.amount,
            currency: 'USD',
            status: 'completed',
            metadata: {
                campaignName: transaction.metadata.campaignName,
                companyName: transaction.metadata.companyName
            },
            createdAt: new Date()
        }, { session });
    }

    private async handleFailedPayment(db: any, data: any) {
        await db.collection('Transactions').updateOne(
            { chargeId: data.id },
            {
                $set: {
                    status: 'failed',
                    updatedAt: new Date(),
                    failureReason: data.failure_reason
                }
            }
        );
    }

    private async handleDelayedPayment(db: any, data: any) {
        await db.collection('Transactions').updateOne(
            { chargeId: data.id },
            {
                $set: {
                    status: 'pending',
                    updatedAt: new Date(),
                    delayReason: data.delay_reason
                }
            }
        );
    }
}