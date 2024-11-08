import { Collection, ClientSession } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Transaction } from '@/types/Transaction';
import { CryptoSummary } from '@/types/cryptoSum';

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

    async getCryptoTransactionsSummary(): Promise<CryptoSummary> {
        const transactions = await this.getAllCryptoTransactions();
    
        const summary: CryptoSummary = {
            totalTransactions: transactions.length,
            totalAmount: transactions.reduce((sum, tx) => {
                const amount = typeof tx.amount === 'number' ? tx.amount : 0;
                return sum + amount;
            }, 0),
            completedTransactions: transactions.filter(tx => tx.status === 'completed').length,
            pendingTransactions: transactions.filter(tx => tx.status === 'pending').length,
            failedTransactions: transactions.filter(tx => tx.status === 'failed').length,
            averageTransactionAmount: 0,
            cryptoCurrencies: []
        };
    
        // Calculate average transaction amount
        summary.averageTransactionAmount = 
            summary.totalTransactions > 0 ? summary.totalAmount / summary.totalTransactions : 0;
    
        // Group transactions by cryptocurrency
        const cryptoGroups = transactions.reduce((groups, tx) => {
            const currency = tx.currency || 'UNKNOWN';
            if (!groups[currency]) {
                groups[currency] = {
                    currency,
                    count: 0,
                    totalAmount: 0,
                };
            }
            groups[currency].count++;
            groups[currency].totalAmount += typeof tx.amount === 'number' ? tx.amount : 0;
            return groups;
        }, {} as Record<string, { currency: string; count: number; totalAmount: number }>);
    
        summary.cryptoCurrencies = Object.values(cryptoGroups);
    
        return summary;
    }
}
