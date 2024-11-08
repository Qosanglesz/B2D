// src/app/api/payment/coinbase/services/CoinbaseService.ts
import { Webhook } from 'coinbase-commerce-node';
import { coinbaseClient, Charge } from '@/lib/coinbase'; // Import the initialized client and Charge resource
import { CoinbaseRepository } from '@/controller/coinbaseAPI/coinbaseRepository';
import { CreateChargeRequest, CoinbaseCharge, BaseCharge, ChargeResponse } from '@/types/payment';
import { CryptoSummary } from '@/types/cryptoSum'; 
import { CampaignRepository } from '@/controller/campaignAPI/campaignRepository';

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import * as crypto from 'crypto';

import { Transaction } from '@/types/Transaction';

export class CoinbaseService {
    private static instance: CoinbaseService;
    private readonly repository: CoinbaseRepository;
    private readonly campaignRepository: CampaignRepository;

    private constructor() {
        this.repository = new CoinbaseRepository();
        this.campaignRepository = new CampaignRepository();
    }

    public static getInstance(): CoinbaseService {
        if (!CoinbaseService.instance) {
            CoinbaseService.instance = new CoinbaseService();
        }
        return CoinbaseService.instance;
    }

    async createCharge(data: CreateChargeRequest) {
        const campaign = await this.campaignRepository.findById(data.campaign.id);
        if (!campaign) {
            throw new Error(`Campaign not found with ID: ${data.campaign.id}`);
        }
    
        const remainingAmount = campaign.targetAmount - campaign.amountRaised;
        if (data.amount > remainingAmount) {
            throw new Error(`Investment amount (${data.amount}) exceeds campaign remaining target (${remainingAmount})`);
        }
    
        try {
            const chargeData: BaseCharge = {
                name: `Investment in ${campaign.name}`,
                description: `Investment in ${campaign.companyName}`,
                local_price: {
                    amount: data.amount.toString(),
                    currency: 'USD'
                },
                pricing_type: 'fixed_price',
                metadata: {
                    userId: data.user.sub,
                    userEmail: data.user.email,
                    campaignId: data.campaign.id,
                    campaignName: campaign.name,
                    investmentAmount: data.amount.toString()
                },
                redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/${data.campaign.id}?provider=coinbase`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel/${data.campaign.id}?provider=coinbase`,
            };
    
            const charge = await Charge.create(chargeData);
    
            // Create transaction record with complete charge information
            await this.repository.createTransaction({
                userId: data.user.sub,
                campaignId: data.campaign.id,
                chargeId: charge.id,
                chargeCode: charge.code,
                amount: data.amount,
                currency: 'USD',
                paymentMethod: 'crypto',
                paymentProvider: 'coinbase',
                status: 'created',
                metadata: {
                    campaignName: campaign.name,
                    companyName: campaign.companyName,
                    chargeCode: charge.code,
                    userEmail: data.user.email
                },
                charge: {
                    id: charge.id,
                    code: charge.code,
                    name: charge.name,
                    description: charge.description,
                    hosted_url: charge.hosted_url,
                    created_at: charge.created_at,
                    expires_at: charge.expires_at,
                    pricing: charge.pricing,
                    timeline: [{
                        status: 'created',
                        time: new Date().toISOString()
                    }]
                },
                createdAt: new Date(),
                updatedAt: new Date()
            });
    
            return charge;
        } catch (error) {
            // console.error('Error creating charge:', error);
            throw new Error('Failed to create charge');
        }
    }

    async getChargeStatus(chargeId: string): Promise<CoinbaseCharge> {
        const response = await Charge.retrieve(chargeId) as unknown as ChargeResponse;
        return this.mapChargeToCoinbaseCharge(response.data);
    }

    private mapChargeToCoinbaseCharge(charge: any): CoinbaseCharge {
        return {
            id: charge.id,
            resource: charge.resource,
            code: charge.code,
            name: charge.name,
            description: charge.description,
            logo_url: charge.logo_url,
            hosted_url: charge.hosted_url,
            created_at: charge.created_at,
            expires_at: charge.expires_at,
            confirmed_at: charge.confirmed_at,
            checkout: charge.checkout,
            timeline: charge.timeline,
            metadata: charge.metadata,
            pricing_type: charge.pricing_type,
            pricing: charge.pricing,
            payments: charge.payments,
            addresses: charge.addresses,
            local_price: charge.local_price,
            status: charge.status
        };
    }

    private mapCoinbaseChargeToTransaction(eventData: any): Partial<Transaction> {
        return {
            chargeId: eventData.id,
            chargeCode: eventData.code,
            amount: parseFloat(eventData.pricing.local.amount),
            currency: eventData.pricing.local.currency,
            status: eventData.status as Transaction['status'],
            charge: {
                id: eventData.id,
                code: eventData.code,
                name: eventData.name,
                description: eventData.description,
                hosted_url: eventData.hosted_url,
                created_at: eventData.created_at,
                expires_at: eventData.expires_at,
                pricing: eventData.pricing,
                payments: eventData.payments,
                timeline: eventData.timeline
            },
            updatedAt: new Date()
        };
    }

    // public verifyWebhookSignature(rawBody: string, signature: string): any {
    //     return Webhook.verifyEventBody(
    //         rawBody,
    //         signature,
    //         process.env.COINBASE_COMMERCE_WEBHOOK_SECRET!
    //     );
    // }

    public verifyWebhookSignature(rawBody: string, signature: string, timestamp?: string): any {
        if (!process.env.COINBASE_COMMERCE_WEBHOOK_SECRET) {
          throw new Error('Webhook secret is not configured');
        }
      
        try {
          if (!timestamp) {
            // If no timestamp provided, fall back to simple verification
            const computedSignature = crypto
              .createHmac('sha256', process.env.COINBASE_COMMERCE_WEBHOOK_SECRET)
              .update(rawBody)
              .digest('hex');
            
            return computedSignature === signature;
          }
      
          // With timestamp (preferred method)
          const signaturePayload = timestamp + rawBody;
          const computedSignature = crypto
            .createHmac('sha256', process.env.COINBASE_COMMERCE_WEBHOOK_SECRET)
            .update(signaturePayload)
            .digest('hex');
      
          return computedSignature === signature;
        } catch (error) {
        //   console.error('Signature verification error:', error);
          return false;
        }
    }

    // public async processWebhookEvent(event: any) {
    //     const { data } = event; // This is now the charge data
    //     console.log('Processing webhook event:', event.type);
    //     console.log('Event data:', JSON.stringify(data, null, 2));
    
    //     // Find transaction by charge ID or code
    //     let transaction = await this.repository.findTransactionByChargeCodeOrId(data.id);
    
    //     if (!transaction) {
    //         console.log(`Transaction not found for charge ID: ${data.id}. Attempting to find by code: ${data.code}`);
    //         transaction = await this.repository.findTransactionByChargeCodeOrId(data.code);
    //     }
    
    //     if (!transaction) {
    //         console.log(`No transaction found for charge ID: ${data.id} or code: ${data.code}. Creating new transaction.`);
    //         transaction = await this.createTransactionFromWebhookData(data); // Pass the charge data directly
    //     }
    
    //     // Update transaction with payment details if available
    //     if (data.payments && data.payments.length > 0) {
    //         const payment = data.payments[0];
    //         await this.repository.updateTransactionWithPaymentDetails(transaction.chargeId, payment);
    //     }
    
    //     await this.handleWebhookUpdate(transaction.chargeId, data);
    
    //     switch (event.type) {
    //         case 'charge:created':
    //             await this.handleCreatedCharge(data);
    //             break;
    //         case 'charge:pending':
    //             await this.handlePendingPayment(data);
    //             break;
    //         case 'charge:confirmed':
    //             await this.handleConfirmedPayment(data, transaction);
    //             break;
    //         case 'charge:failed':
    //             await this.handleFailedPayment(data);
    //             break;
    //         case 'charge:delayed':
    //             await this.handleDelayedPayment(data);
    //             break;
    //         case 'charge:resolved':
    //             await this.handleResolvedPayment(data, transaction);
    //             break;
    //         default:
    //             console.log(`Unhandled event type: ${event.type}`);
    //             break;
    //     }
    // }

    public async processWebhookEvent(event: any) {
        const { data } = event; // This is the charge data
        console.log('Processing webhook event:', event.type);
        console.log('Event data:', JSON.stringify(data, null, 2));
    
        // Ensure that the metadata contains the userId and campaignId
        const userId = data.metadata?.userId;
        const campaignId = data.metadata?.campaignId;
    
        // Find transaction by charge ID or code
        let transaction = await this.repository.findTransactionByChargeCodeOrId(data.id);
    
        if (!transaction) {
            // console.log(`Transaction not found for charge ID: ${data.id}. Attempting to find by code: ${data.code}`);
            transaction = await this.repository.findTransactionByChargeCodeOrId(data.code);
        }
    
        if (!transaction) {
            // console.log(`No transaction found for charge ID: ${data.id} or code: ${data.code}. Creating new transaction.`);
            
            // Create a new transaction with the extracted campaignId
            const newTransaction = await this.createTransactionFromWebhookData(data, userId, campaignId);
            transaction = newTransaction; // Use the newly created transaction
        }
    
        // Update transaction with payment details if available
        if (data.payments && data.payments.length > 0) {
            const payment = data.payments[0];
            await this.repository.updateTransactionWithPaymentDetails(transaction.chargeId, payment);
        }
    
        await this.handleWebhookUpdate(transaction.chargeId, data);
    
        switch (event.type) {
            case 'charge:created':
                await this.handleCreatedCharge(data);
                break;
            case 'charge:pending':
                await this.handlePendingPayment(data);
                break;
            case 'charge:confirmed':
                await this.handleConfirmedPayment(data, transaction);
                break;
            case 'charge:failed':
                await this.handleFailedPayment(data);
                break;
            case 'charge:delayed':
                await this.handleDelayedPayment(data);
                break;
            case 'charge:resolved':
                await this.handleResolvedPayment(data, transaction);
                break;
            default:
                // console.log(`Unhandled event type: ${event.type}`);
                break;
        }
    }
    
    // private async createTransactionFromWebhookData(data: any): Promise<Transaction> {
    //     const newTransaction: Transaction = {
    //         userId: data.metadata?.userId || 'unknown',
    //         campaignId: data.metadata?.campaignId || 'unknown',
    //         chargeId: data.id,
    //         chargeCode: data.code,
    //         amount: parseFloat(data.pricing.local.amount),
    //         currency: data.pricing.local.currency,
    //         paymentMethod: 'crypto',
    //         paymentProvider: 'coinbase',
    //         status: this.mapCoinbaseStatusToTransactionStatus(data.status),
    //         metadata: {
    //             campaignName: data.metadata?.campaignName || 'unknown',
    //             companyName: data.metadata?.companyName || 'unknown',
    //             chargeCode: data.code,
    //             userEmail: data.metadata?.userEmail || 'unknown'
    //         },
    //         charge: {
    //             id: data.id,
    //             code: data.code,
    //             name: data.name,
    //             description: data.description,
    //             hosted_url: data.hosted_url,
    //             created_at: data.created_at,
    //             expires_at: data.expires_at,
    //             pricing: data.pricing,
    //             timeline: data.timeline || []
    //         },
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //     };
    
    //     await this.repository.createTransaction(newTransaction);
    //     console.log(`Created new transaction for charge ID: ${data.id}`);
    //     return newTransaction;
    // }

    private async createTransactionFromWebhookData(data: any, userId: string, campaignId: string): Promise<Transaction> {
        const newTransaction: Transaction = {
            userId: userId || 'unknown',
            campaignId: campaignId || 'unknown',
            chargeId: data.id,
            chargeCode: data.code,
            amount: parseFloat(data.pricing.local.amount),
            currency: data.pricing.local.currency,
            paymentMethod: 'crypto',
            paymentProvider: 'coinbase',
            status: this.mapCoinbaseStatusToTransactionStatus(data.status),
            metadata: {
                campaignName: data.metadata?.campaignName || 'unknown',
                companyName: data.metadata?.companyName || 'unknown',
                chargeCode: data.code,
                userEmail: data.metadata?.userEmail || 'unknown'
            },
            charge: {
                id: data.id,
                code: data.code,
                name: data.name,
                description: data.description,
                hosted_url: data.hosted_url,
                created_at: data.created_at,
                expires_at: data.expires_at,
                pricing: data.pricing,
                timeline: data.timeline || []
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
    
        await this.repository.createTransaction(newTransaction);
        // console.log(`Created new transaction for charge ID: ${data.id}`);
        return newTransaction;
    }
    
    private mapCoinbaseStatusToTransactionStatus(status: string): Transaction['status'] {
        const statusMap: { [key: string]: Transaction['status'] } = {
            'NEW': 'created',
            'PENDING': 'pending',
            'COMPLETED': 'completed',
            'FAILED': 'failed',
            'EXPIRED': 'failed',
            'UNRESOLVED': 'delayed',
            'RESOLVED': 'resolved'
        };
    
        return statusMap[status] || 'pending';
    }

    private async handleCreatedCharge(data: any) {
        await this.repository.updateTransactionStatus(data.id, 'created', {
            created_at: data.created_at,
            expires_at: data.expires_at
        });
    }
    
    private async handlePendingPayment(data: any) {
        await this.repository.updateTransactionStatus(data.id, 'pending', {
            status: 'pending',
            payment_details: data.payments?.[0],
            updated_at: new Date()
        });
    }

    private async handleConfirmedPayment(data: any, transaction: any) {
        const client = await clientPromise;
        const session = client.startSession();
    
        try {
            await session.withTransaction(async () => {
                // console.log('Transaction data:', JSON.stringify(transaction, null, 2));
    
                // Update transaction status
                await this.repository.updateTransactionStatus(data.id, 'completed', data);
    
                // Check if campaignId exists and is valid
                if (transaction.campaignId && ObjectId.isValid(transaction.campaignId)) {
                    // Update campaign amount
                    await this.repository.updateCampaignAmount(
                        transaction.campaignId,
                        transaction.amount,
                        session
                    );
    
                    // Create statement
                    await this.repository.createStatement({
                        userId: transaction.userId || 'unknown',
                        campaignId: transaction.campaignId,
                        transactionId: transaction._id,
                        chargeId: transaction.chargeId,
                        type: 'investment',
                        amount: transaction.amount,
                        currency: 'USD',
                        status: 'completed',
                        metadata: {
                            campaignName: transaction.metadata?.campaignName || 'Unknown Campaign',
                            companyName: transaction.metadata?.companyName || 'Unknown Company'
                        },
                        createdAt: new Date()
                    }, session);
                } else {
                    console.warn(`Invalid or missing campaignId for transaction ${transaction.chargeId}`);
                }
            });
        } catch (error) {
            // console.error('Error handling confirmed payment:', error);
            throw error;
        } finally {
            await session.endSession();
        }
    }


    private async handleFailedPayment(data: any) {
        await this.repository.updateTransactionStatus(data.id, 'failed', {
            status: 'failed',
            failure_reason: data.failure_reason,
            updated_at: new Date()
        });
    }
    
    private async handleDelayedPayment(data: any) {
        await this.repository.updateTransactionStatus(data.id, 'delayed', {
            status: 'delayed',
            delay_reason: data.delay_reason,
            updated_at: new Date()
        });
    }
    
    private async handleResolvedPayment(data: any, transaction: any) {
        const client = await clientPromise;
        const session = client.startSession();
    
        try {
            await session.withTransaction(async () => {
                // Update transaction status
                await this.repository.updateTransactionStatus(data.id, 'resolved', {
                    status: 'resolved',
                    resolution_details: data.resolution,
                    updated_at: new Date()
                });
    
                // If the resolution was successful, update campaign amount
                if (data.resolution === 'completed') {
                    await this.repository.updateCampaignAmount(
                        transaction.campaignId,
                        transaction.amount,
                        session
                    );
    
                    // Create statement for successful resolution
                    await this.repository.createStatement({
                        userId: transaction.userId,
                        campaignId: transaction.campaignId,
                        transactionId: transaction._id,
                        chargeId: transaction.chargeId,
                        type: 'investment',
                        amount: transaction.amount,
                        currency: 'USD',
                        status: 'resolved',
                        metadata: {
                            campaignName: transaction.metadata.campaignName,
                            companyName: transaction.metadata.companyName,
                            resolution: data.resolution
                        },
                        createdAt: new Date()
                    }, session);
                }
            });
        } catch (error) {
            // console.error('Error handling resolved payment:', error);
            throw error;
        } finally {
            await session.endSession();
        }
    }

    private async handleWebhookUpdate(chargeId: string, eventData: any) {
        const existingTransaction = await this.repository.findTransactionByChargeId(chargeId);
    
        if (!existingTransaction) {
            const newTransaction: Transaction = {
                ...this.mapCoinbaseChargeToTransaction(eventData),
                userId: eventData.metadata?.userId || '',
                campaignId: eventData.metadata?.campaignId || '',
                paymentMethod: 'crypto',
                paymentProvider: 'coinbase',
                metadata: {
                    campaignName: eventData.metadata?.campaignName || '',
                    companyName: eventData.metadata?.companyName || '',
                    chargeCode: eventData.code,
                    userEmail: eventData.metadata?.userEmail
                },
                createdAt: new Date()
            } as Transaction;
    
            await this.repository.createTransaction(newTransaction);
        } else {
            const updateData = this.mapCoinbaseChargeToTransaction(eventData);
            
            if (eventData.status === 'completed') {
                updateData.completedAt = new Date();
            }
    
            await this.repository.updateTransaction(chargeId, updateData);
        }
    }

    async getCryptoSummary(): Promise<{
        success: boolean;
        data?: CryptoSummary;
        error?: string;
    }> {
        try {
            const summary = await this.repository.getCryptoTransactionsSummary();
            return {
                success: true,
                data: summary
            };
        } catch (error) {
            console.error('Error in getCryptoSummary:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            };
        }
    }

}