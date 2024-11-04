// src/app/api/payment/coinbase/webhook/route.ts

// import { CoinbaseController } from '@/controller/coinbaseAPI/coinbaseController';

// export async function POST(request: Request) {
//     const controller = CoinbaseController.getInstance();
//     return controller.handleWebhook(request);
// }

// src/app/api/payment/coinbase/webhook/route.ts
import { NextResponse } from 'next/server';
import { CoinbaseController } from '@/controller/coinbaseAPI/coinbaseController';
import { CoinbaseService } from '@/controller/coinbaseAPI/coinbaseService';

// export async function POST(request: Request) {
//     try {
//         // Clone the request to get both the raw body and JSON
//         const clonedRequest = request.clone();
        
//         // Get the raw body for signature verification
//         const rawBody = await request.text();
        
//         // Get the signature from headers
//         const signature = request.headers.get('x-cc-webhook-signature');

//         if (!signature) {
//             return NextResponse.json(
//                 { error: 'Missing webhook signature' },
//                 { status: 400 }
//             );
//         }

//         const controller = CoinbaseController.getInstance();

//         // Create a new request with the raw body for the controller
//         const webhookRequest = new Request(request.url, {
//             method: 'POST',
//             headers: request.headers,
//             body: rawBody
//         });

//         return controller.handleWebhook(webhookRequest);

//     } catch (error: any) {
//         console.error('Webhook processing error:', error);
//         return NextResponse.json(
//             { error: error.message || 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }



// export async function POST(request: Request) {
//   try {
//     const rawBody = await request.text();
//     const signature = request.headers.get('x-cc-webhook-signature');
//     const timestamp = request.headers.get('x-cc-webhook-timestamp');

//     if (!signature) {
//       return NextResponse.json(
//         { error: 'Missing webhook signature' },
//         { status: 400 }
//       );
//     }

//     const coinbaseService = CoinbaseService.getInstance();
    
//     // Verify the signature
//     const isValid = coinbaseService.verifyWebhookSignature(
//       rawBody,
//       signature,
//       timestamp || undefined
//     );

//     if (!isValid) {
//       return NextResponse.json(
//         { error: 'Invalid webhook signature' },
//         { status: 400 }
//       );
//     }

//     // Process the webhook
//     const event = JSON.parse(rawBody);
//     await coinbaseService.processWebhookEvent(event);

//     return NextResponse.json({ success: true });

//   } catch (error: any) {
//     console.error('Webhook error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Webhook processing failed' },
//       { status: 500 }
//     );
//   }
// }
// In your webhook route handler
// export async function POST(req: Request) {
//     try {
//         const rawBody = await req.text();
//         const event = JSON.parse(rawBody);
        
//         if (!event || !event.type || !event.data) {
//             return new Response('Invalid webhook payload', { status: 400 });
//         }

//         // Process the webhook
//         const coinbaseService = CoinbaseService.getInstance();
//         await coinbaseService.processWebhookEvent(event);

//         return new Response('Webhook processed successfully', { status: 200 });
//     } catch (error) {
//         console.error('Webhook error:', error);
//         return new Response('Webhook processing failed', { status: 500 });
//     }
// }

// Optional: Add configuration for the route
// export const config = {
//     api: {
//         bodyParser: false, // Disable the automatic body parsing
//     },
// };

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        console.log('Raw webhook body:', rawBody); // Log the raw body

        const signature = request.headers.get('x-cc-webhook-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing webhook signature' },
                { status: 400 }
            );
        }

        const controller = CoinbaseController.getInstance();
        const webhookRequest = new Request(request.url, {
            method: 'POST',
            headers: request.headers,
            body: rawBody
        });

        return controller.handleWebhook(webhookRequest);

    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// import { NextResponse } from 'next/server';
// import crypto from 'crypto';

// const WEBHOOK_SECRET = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

// export async function POST(request: Request) {
//   const body = await request.json();
//   const rawBody = JSON.stringify(body);
//   const signature = request.headers.get('X-CC-Webhook-Signature');
//   const timestamp = request.headers.get('X-CC-Timestamp');

//   if (!signature || !timestamp || !WEBHOOK_SECRET) {
//     return NextResponse.json({ error: 'Missing required headers or secret' }, { status: 400 });
//   }

//   const computedSignature = crypto
//     .createHmac('sha256', WEBHOOK_SECRET)
//     .update(timestamp + rawBody)
//     .digest('hex');

//   if (computedSignature !== signature) {
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
//   }

//   // Process the webhook event
//   console.log('Received valid webhook:', body);

//   // Add your webhook processing logic here

//   return NextResponse.json({ received: true });
// }