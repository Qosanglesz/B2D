// src/app/api/payment/coinbase/webhook/route.ts

import { WebhookController } from '@/controller/coinbaseAPI/webhookController';

export async function POST(request: Request) {
    const controller = WebhookController.getInstance();
    return controller.handleWebhook(request);
}