import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from "@/lib/mongodb";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Set your webhook secret (get this from your Stripe dashboard)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    let event;

    // Buffer the raw body for signature verification
    const body = await req.text(); // This will read the raw body
    const signature = req.headers.get('stripe-signature');

    try {
        // Verify webhook signature
        if (endpointSecret && signature) {
            event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        } else {
            // If no endpointSecret is defined, use basic JSON parsing
            event = JSON.parse(body);
        }
    } catch (err: any) {
        console.log(`⚠️ Webhook signature verification failed: ${err.message}`);
        return new NextResponse('Webhook Error: Signature verification failed', { status: 400 });
    }

    // Handle different types of events
    switch (event.type) {
        case 'checkout.session.completed': {
            const paymentData = event.data.object;
            // console.log("PaymentData:", paymentData)
            console.log(`PaymentIntent for paymentID: ${paymentData.id},amount: ${paymentData.amount_total} was successful!`);
            // Add your custom logic here, e.g., update database, notify user, etc.

            const sessionId = paymentData.id
            const paymentStatus = paymentData.status

            // Connecting to the database
            try {
                const client = await clientPromise;
                const db = client.db("payment");
                const collection = db.collection("statement");

                // Update the statement document where the session ID matches
                const result = await collection.updateOne(
                    { session_id: sessionId }, // Match the document by session ID
                    { $set: { status: paymentStatus, successAt: new Date().toJSON() } } // Update the status and add updated timestamp
                );

                console.log(`Payment status for session ${sessionId} updated in the database!`);
            } catch (dbError) {
                console.error('Error updating payment status in database:', dbError.message);
            }

            break;
        }
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of the event
    return new NextResponse('Event received', { status: 200 });
}

export const config = {
    api: {
        bodyParser: false, // Disable the bodyParser to handle the raw body for Stripe
    },
};
