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
            console.error('Error getting charge status:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to get charge status' },
                { status: 500 }
            );
        }
    }

    // async handleWebhook(request: Request): Promise<NextResponse> {
    //     try {
    //         const rawBody = await request.text();
    //         const signature = request.headers.get('x-cc-webhook-signature');

    //         if (!signature) {
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook signature' },
    //                 { status: 400 }
    //             );
    //         }

    //         const event = this.coinbaseService.verifyWebhookSignature(rawBody, signature);
    //         await this.coinbaseService.processWebhookEvent(event);
            
    //         return NextResponse.json({ success: true });

    //     } catch (error: any) {
    //         console.error('Webhook error:', error);
    //         return NextResponse.json(
    //             { error: error.message || 'Webhook processing failed' },
    //             { status: 500 }
    //         );
    //     }
    // }

    // src/controller/coinbaseAPI/coinbaseController.ts
    // async handleWebhook(request: Request): Promise<NextResponse> {
    //     try {
    //         const rawBody = await request.text();
    //         const signature = request.headers.get('x-cc-webhook-signature');

    //         if (!signature) {
    //             return NextResponse.json(
    //                 { error: 'Missing webhook signature' },
    //                 { status: 400 }
    //             );
    //         }

    //         try {
    //             // Verify the webhook signature
    //             const event = this.coinbaseService.verifyWebhookSignature(rawBody, signature);
                
    //             // Process the webhook event
    //             await this.coinbaseService.processWebhookEvent(event);
                
    //             return NextResponse.json({ success: true });

    //         } catch (error: any) {
    //             console.error('Webhook verification error:', error);
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook signature' },
    //                 { status: 400 }
    //             );
    //         }

    //     } catch (error: any) {
    //         console.error('Webhook processing error:', error);
    //         return NextResponse.json(
    //             { error: error.message || 'Webhook processing failed' },
    //             { status: 500 }
    //         );
    //     }
    // }

    // async handleWebhook(request: Request): Promise<NextResponse> {
    //     try {
    //         const rawBody = await request.text();
    //         console.log('Received webhook payload:', rawBody);
    
    //         if (!rawBody) {
    //             console.error('Empty webhook payload received');
    //             return NextResponse.json(
    //                 { error: 'Empty webhook payload' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         let event;
    //         try {
    //             event = JSON.parse(rawBody);
    //         } catch (parseError) {
    //             console.error('Failed to parse webhook payload:', parseError);
    //             return NextResponse.json(
    //                 { error: 'Invalid JSON in webhook payload' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         if (!event || !event.type || !event.data) {
    //             console.error('Invalid webhook event structure:', event);
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook event structure' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         const signature = request.headers.get('x-cc-webhook-signature');
    //         const timestamp = request.headers.get('x-cc-timestamp');
    
    //         if (!signature) {
    //             console.error('Missing webhook signature');
    //             return NextResponse.json(
    //                 { error: 'Missing webhook signature' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         // Verify the webhook signature
    //         const isValid = this.coinbaseService.verifyWebhookSignature(rawBody, signature, timestamp || undefined);
            
    //         if (!isValid) {
    //             console.error('Invalid webhook signature');
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook signature' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         // Process the webhook event
    //         await this.coinbaseService.processWebhookEvent(event);
            
    //         return NextResponse.json({ success: true });
    
    //     } catch (error: any) {
    //         console.error('Webhook processing error:', error);
    //         return NextResponse.json(
    //             { error: error.message || 'Webhook processing failed' },
    //             { status: 500 }
    //         );
    //     }
    // }

    // async handleWebhook(request: Request): Promise<NextResponse> {
    //     try {
    //         const rawBody = await request.text();
    //         const signature = request.headers.get('x-cc-webhook-signature');
    //         const timestamp = request.headers.get('x-cc-timestamp');
    
    //         if (!signature) {
    //             console.error('Missing webhook signature');
    //             return NextResponse.json(
    //                 { error: 'Missing webhook signature' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         // Verify the webhook signature
    //         const isValid = this.coinbaseService.verifyWebhookSignature(rawBody, signature, timestamp);
    //         if (!isValid) {
    //             console.error('Invalid webhook signature');
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook signature' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         // Parse the event data
    //         let event;
    //         try {
    //             event = JSON.parse(rawBody);
    //         } catch (parseError) {
    //             console.error('Failed to parse webhook payload:', parseError);
    //             return NextResponse.json(
    //                 { error: 'Invalid JSON in webhook payload' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         if (!event || !event.type || !event.data) {
    //             console.error('Invalid webhook event structure:', event);
    //             return NextResponse.json(
    //                 { error: 'Invalid webhook event structure' },
    //                 { status: 400 }
    //             );
    //         }
    
    //         // Process the webhook event
    //         await this.coinbaseService.processWebhookEvent(event);
    
    //         return NextResponse.json({ success: true });
    
    //     } catch (error: any) {
    //         console.error('Webhook processing error:', error);
    //         return NextResponse.json(
    //             { error: error.message || 'Webhook processing failed' },
    //             { status: 500 }
    //         );
    //     }
    // }

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
            console.log('Parsed webhook event:', event); // Log the parsed event
    
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
            console.error('Webhook error:', error);
            return NextResponse.json(
                { error: error.message || 'Webhook processing failed' },
                { status: 500 }
            );
        }
    }
}