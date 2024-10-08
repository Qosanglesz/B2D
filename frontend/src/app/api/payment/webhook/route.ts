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
                let client = await clientPromise;
                let db = client.db("payment");
                let collection = db.collection("statement");

                // Update the statement document where the session ID matches
                const result = await collection.updateOne(
                    { session_id: sessionId }, // Match the document by session ID
                    { $set: { status: paymentStatus, successAt: new Date().toJSON() } } // Update the status and add updated timestamp
                );

                // Retrieve user_sub related to the session
                const statement = await collection.findOne({ session_id: sessionId });
                const { user_id, campaign_id } = statement;

                // Connect to the fundraising campaign database
                db = client.db("Campaign");
                collection = db.collection("fundraising_campaign");

                // Find the campaign document that the user is funding (add criteria to match the correct campaign)
                const campaign = await collection.findOne({"id": campaign_id});

                if (campaign) {
                    // Check if the user has already invested
                    const isInvestor = campaign.investors.includes(user_id);

                    // Update the campaign's target and add user to investors if they are not already listed
                    const updatedFields: any = {
                        $inc: { amountRaised: (paymentData.amount_total/100) } // Increment the amountRaised by the payment amount
                    };

                    if (!isInvestor) {
                        updatedFields.$addToSet = { investors: user_id }; // Add the user to the investors array if not already present
                    }

                    // Perform the update operation
                    await collection.updateOne(
                        { _id: campaign._id }, // Match the campaign by its ID
                        updatedFields // Apply the updates
                    );

                    console.log(`Campaign for session ${sessionId} updated successfully!`);
                } else {
                    console.log(`No campaign found for session ${sessionId}`);
                }
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
