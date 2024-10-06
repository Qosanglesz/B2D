import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const { user, campaign, amount } = await req.json();
        const statementId = uuidv4();

        // Create a payment session with Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: campaign.name,
                        },
                        unit_amount: amount * 100, // Convert dollars to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment/success',
            cancel_url: 'http://localhost:3000/payment/fail',
        });

        // Create the data object for the MongoDB statement collection
        const data = {
            statement_id: statementId,
            user_sub: user.sub,
            campaign_id: campaign.id,
            amount: amount, // Store the amount in dollars
            session_id: session.id,
            date: new Date().toJSON(),
            status: session.status,
        };

        // Connect to MongoDB and insert the data
        const client = await clientPromise;
        const db = client.db("payment"); // Make sure the 'payment' DB exists
        const collection = db.collection("statement");

        const result = await collection.insertOne(data); // Insert the payment statement data

        return NextResponse.json({
            message: "Checkout success.",
            id: session.id,
            result,
        });
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
