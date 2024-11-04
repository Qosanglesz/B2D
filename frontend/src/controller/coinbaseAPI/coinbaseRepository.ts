import { Collection, ClientSession } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Transaction } from '@/types/Transaction';

const DATABASE_NAME = "B2DVentureProject";

export class CoinbaseRepository {
    private async getDatabase() {
        const client = await clientPromise;
        return client.db(DATABASE_NAME);
    }
 
    async createTransaction(transaction: Transaction): Promise<void> {
        const db = await this.getDatabase();
        await db.collection('Transactions').insertOne(transaction);
    }

    async updateTransactionWithPaymentDetails(chargeId: string, payment: any) {
        const db = await this.getDatabase();
        
        const updateData = {
            transactionId: payment.transaction_id,
            paymentDetails: {
                network: payment.network,
                transaction_id: payment.transaction_id,
                status: payment.status,
                value: payment.value
            },
            updatedAt: new Date()
        };

        return db.collection('Transactions').updateOne(
            { chargeId },
            { $set: updateData }
        );
    }

    async findTransactionByChargeCodeOrId(identifier: string): Promise<Transaction | null> {
        const db = await this.getDatabase();
        return db.collection<Transaction>('Transactions').findOne({
            $or: [
                { chargeId: identifier },
                { chargeCode: identifier }
            ]
        });
    }

    async findTransactionByChargeId(chargeId: string): Promise<Transaction | null> {
        const db = await this.getDatabase();
        // Add logging to debug the search
        // console.log('Searching for transaction with chargeId:', chargeId);
        const transaction = await db.collection<Transaction>('Transactions').findOne({ chargeId });
        // console.log('Found transaction:', transaction);
        return transaction;
    }

    

    async updateTransactionStatus(identifier: string, status: string, additionalData?: any) {
        const db = await this.getDatabase();
        const updateData: any = {
            status,
            updatedAt: new Date()
        };

        if (additionalData) {
            updateData.lastWebhookData = additionalData;
            if (status === 'failed') {
                updateData.failureReason = additionalData.failure_reason;
            } else if (status === 'pending') {
                updateData.delayReason = additionalData.delay_reason;
            } else {
                updateData.paymentDetails = additionalData;
            }
        }

        const result = await db.collection('Transactions').updateOne(
            {
                $or: [
                    { chargeId: identifier },
                    { 'metadata.chargeCode': identifier }
                ]
            },
            { $set: updateData }
        );

        return result;
    }

    async updateCampaignAmount(campaignId: string, amount: number, session?: ClientSession) {
        const db = await this.getDatabase();
        return db.collection('Campaigns').updateOne(
            { _id: new ObjectId(campaignId) },
            { $inc: { amountRaised: amount } },
            { session }
        );
    }

    async createStatement(statementData: any, session?: ClientSession) {
        const db = await this.getDatabase();
        return db.collection('Statements').insertOne(statementData, { session });
    }

    async updateTransaction(chargeId: string, updateData: Partial<Transaction>) {
        const db = await this.getDatabase();
        return db.collection('Transactions').updateOne(
            { chargeId },
            { $set: updateData }
        );
    }

    async getAllCryptoTransactions(): Promise<Transaction[]> {
        const db = await this.getDatabase();
        return db.collection<Transaction>('Transactions').find({ paymentMethod: 'crypto' }).toArray();
    }
}