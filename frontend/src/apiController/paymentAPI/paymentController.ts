import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import { PaymentService } from './paymentService';
import { StatementRepository, StatementData } from '@/apiController/statementAPI/statementRepository';
import { CampaignRepository } from '@/apiController/campaignAPI/campaignRepository';
import Stripe from 'stripe';

export class PaymentController {
    private paymentService: PaymentService;
    private statementRepository: StatementRepository;
    private campaignRepository: CampaignRepository;

    constructor() {
        this.paymentService = new PaymentService();
        this.statementRepository = new StatementRepository();
        this.campaignRepository = new CampaignRepository();
    }

    async createCheckoutSession(user: any, campaign: any, amount: number): Promise<NextResponse> {
        try {
            const statementId = uuidv4();

            const session = await this.paymentService.createCheckoutSession(campaign.name, amount, statementId);

            const statementData: StatementData = {
                statement_id: statementId,
                user_id: user.sub,
                campaign_id: campaign.id,
                campaignName: campaign.name,
                amount: amount,
                session_id: session.id,
                date: new Date().toJSON(),
                successAt: null,
                status: session.status || 'created',
            };

            const result = await this.statementRepository.insertStatement(statementData);

            return NextResponse.json({
                message: "Checkout success.",
                sessionId: session.id,
                sessionUrl: session.url,
                result,
            });
        } catch (error: any) {
            console.error('Error creating payment intent:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }

    async getStatement(statementId: string): Promise<NextResponse> {
        try {
            const statement = await this.statementRepository.findStatementById(statementId);

            if (!statement) {
                return NextResponse.json({ message: `Statement with id ${statementId} not found.` }, { status: 404 });
            }

            return NextResponse.json(statement);
        } catch (error: any) {
            console.error('Error fetching statement:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }

    async handleWebhook(body: string, signature: string | null): Promise<NextResponse> {
        try {
            const event = this.paymentService.verifyWebhookSignature(body, signature);

            if (event.type === 'checkout.session.completed') {
                const paymentData = event.data.object as Stripe.Checkout.Session;
                console.log(`PaymentIntent for paymentID: ${paymentData.id}, amount: ${paymentData.amount_total} was successful!`);

                await this.statementRepository.updateStatementStatus(paymentData.id, paymentData.status as string);

                const statement = await this.statementRepository.findStatementBySessionId(paymentData.id);
                if (statement) {
                    await this.campaignRepository.updateCampaignFunding(
                        statement.campaign_id,
                        paymentData.amount_total ? paymentData.amount_total / 100 : 0,
                        statement.user_id
                    );
                }

                console.log(`Campaign for session ${paymentData.id} updated successfully!`);
            } else {
                console.log(`Unhandled event type: ${event.type}`);
            }

            return NextResponse.json({ received: true }, { status: 200 });
        } catch (error: any) {
            console.error('Error processing webhook:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}