// src/app/api/payment/coinbase/webhook/controllers/WebhookController.ts

import { NextResponse } from 'next/server';
import { WebhookService } from '@/controller/coinbaseAPI/webhookService';

export class WebhookController {
    private static instance: WebhookController;
    private readonly webhookService: WebhookService;

    private constructor() {
        this.webhookService = WebhookService.getInstance();
    }

    public static getInstance(): WebhookController {
        if (!WebhookController.instance) {
            WebhookController.instance = new WebhookController();
        }
        return WebhookController.instance;
    }

    public async handleWebhook(request: Request) {
        try {
            const rawBody = await request.text();
            const signature = request.headers.get('x-cc-webhook-signature');

            if (!signature) {
                return NextResponse.json(
                    { error: 'Invalid webhook signature' },
                    { status: 400 }
                );
            }

            const event = this.webhookService.verifyWebhookSignature(rawBody, signature);
            await this.webhookService.processWebhookEvent(event);

            return NextResponse.json({ success: true });

        } catch (error) {
            console.error('Webhook error:', error);
            return this.handleError(error);
        }
    }

    private handleError(error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { 
                    error: 'Webhook processing failed',
                    details: error.message
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                error: 'Webhook processing failed',
                details: 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}