// import {NextRequest, NextResponse} from 'next/server';
// import Stripe from 'stripe';
// import clientPromise from "@/lib/mongodb";
// import {v4 as uuidv4} from "uuid";

// const DATABASE_NAME = "B2DVentureProject"
// const COLLECTION_NAME = "Statements"

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


// export async function POST(req: NextRequest) {
//     try {
//         // Parse the request body
//         const {user, campaign, amount} = await req.json();
//         const statementId = uuidv4();

//         // Create a payment session with Stripe Checkout
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'usd',
//                         product_data: {
//                             name: campaign.name,
//                         },
//                         unit_amount: amount * 100, // Convert dollars to cents
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/${statementId}`,
//             cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel/${statementId}`,
//         });

//         // Create the data object for the MongoDB statement collection
//         const data = {
//             statement_id: statementId,
//             user_id: user.sub,
//             campaign_id: campaign.id,
//             campaignName: campaign.name,
//             amount: amount, // Store the amount in dollars
//             session_id: session.id,
//             date: new Date().toJSON(),
//             successAt: null,
//             status: session.status,
//         };

//         // Connect to MongoDB and insert the data
//         const client = await clientPromise;
//         const db = client.db(DATABASE_NAME); // Make sure the 'payment' DB exists
//         const collection = db.collection(COLLECTION_NAME);

//         const result = await collection.insertOne(data); // Insert the payment statement data

//         return NextResponse.json({
//             message: "Checkout success.",
//             sessionId: session.id,
//             sessionUrl: session.url,
//             result,
//         });
//     } catch (error: any) {
//         console.error('Error creating payment intent:', error);
//         return NextResponse.json({message: error.message}, {status: 500});
//     }
// }
import { NextRequest, NextResponse } from 'next/server';
import { PaymentController } from '@/controller/paymentAPI/paymentController';
const paymentController = new PaymentController();

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { user, campaign, amount } = await req.json();
    return paymentController.createCheckoutSession(user, campaign, amount);
}