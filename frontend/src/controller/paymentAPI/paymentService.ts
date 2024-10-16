import Stripe from 'stripe';


export class PaymentService {
    private stripe: Stripe;
    private endpointSecret: string;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
        this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    }

    async createCheckoutSession(campaignName: string, amount: number, statementId: string): Promise<Stripe.Checkout.Session> {
        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: campaignName,
                        },
                        unit_amount: amount * 100, // Convert dollars to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/${statementId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel/${statementId}`,
        });
    }

    verifyWebhookSignature(body: string, signature: string | null): Stripe.Event {
        if (this.endpointSecret && signature) {
            return this.stripe.webhooks.constructEvent(body, signature, this.endpointSecret);
        } else {
            return JSON.parse(body);
        }
    }
}
