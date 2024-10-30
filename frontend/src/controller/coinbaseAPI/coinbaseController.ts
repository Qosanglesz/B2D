// src/app/api/payment/coinbase/controllers/CoinbaseController.ts
import { NextResponse } from 'next/server';
import { CoinbaseService } from '@/controller/coinbaseAPI/coinbaseService';
import { CreateChargeRequest } from '@/types/payment';  

export class CoinbaseController {
    private static instance: CoinbaseController;
    private readonly coinbaseService: CoinbaseService;

    private constructor() {
        this.coinbaseService = CoinbaseService.getInstance();
    }

    public static getInstance(): CoinbaseController {
        if (!CoinbaseController.instance) {
            CoinbaseController.instance = new CoinbaseController();
        }
        return CoinbaseController.instance;
    }

    async createCharge(request: Request): Promise<NextResponse> {
        try {
            const body: CreateChargeRequest = await request.json();
            
            if (!body.user?.sub || !body.campaign?.id || !body.amount) {
                return NextResponse.json(
                    { error: 'Missing required fields' },
                    { status: 400 }
                );
            }

            const charge = await this.coinbaseService.createCharge(body);

            return NextResponse.json({
                success: true,
                chargeId: charge.id,
                hostedUrl: charge.hosted_url,
                expiresAt: charge.expires_at
            });

        } catch (error: any) {
            console.error('Error creating charge:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to create charge' },
                { status: 500 }
            );
        }
    }

    async getChargeStatus(request: Request): Promise<NextResponse> {
        try {
            const { searchParams } = new URL(request.url);
            const chargeId = searchParams.get('chargeId');

            if (!chargeId) {
                return NextResponse.json(
                    { error: 'Charge ID is required' },
                    { status: 400 }
                );
            }

            const charge = await this.coinbaseService.getChargeStatus(chargeId);
            
            return NextResponse.json({
                status: charge.status,
                timeline: charge.timeline,
                payments: charge.payments
            });

        } catch (error: any) {
            // console.error('Error getting charge status:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to get charge status' },
                { status: 500 }
            );
        }
    }

    async handleWebhook(request: Request): Promise<NextResponse> {
        try {
            const rawBody = await request.text();
            const signature = request.headers.get('x-cc-webhook-signature');
    
            if (!signature) {
                return NextResponse.json(
                    { error: 'Missing webhook signature' },
                    { status: 400 }
                );
            }
    
            const event = JSON.parse(rawBody); // Ensure you parse the raw body
            // console.log('Parsed webhook event:', event); // Log the parsed event
    
            // Check if the event structure is valid
            if (!event || !event.event || !event.event.data) {
                console.error('Invalid webhook event structure:', event);
                return NextResponse.json(
                    { error: 'Invalid webhook event structure' },
                    { status: 400 }
                );
            }
    
            // Process the event
            await this.coinbaseService.processWebhookEvent(event.event); // Pass only the event part
    
            return NextResponse.json({ success: true });
    
        } catch (error: any) {
            // console.error('Webhook error:', error);
            return NextResponse.json(
                { error: error.message || 'Webhook processing failed' },
                { status: 500 }
            );
        }
    }
}