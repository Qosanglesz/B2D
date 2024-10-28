// app/api/payment/coinbase/controllers/CoinbaseController.ts

import { NextResponse } from 'next/server';
import { CoinbaseService} from '@/controller/coinbaseAPI/coinbaseService';
import { RequestBody } from '@/types/payment';

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

    private validateRequestBody(body: RequestBody) {
        const { user, campaign, amount } = body;
        if (!user?.sub || !campaign?._id || !amount) {
            throw new Error('Missing required fields');
        }
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
    }

    public async handleCreateCharge(request: Request) {
        try {
            const body: RequestBody = await request.json();
            this.validateRequestBody(body);
            const result = await this.coinbaseService.createCharge(body);
            return NextResponse.json(result);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async handleGetChargeStatus(request: Request) {
        try {
            const { searchParams } = new URL(request.url);
            const chargeId = searchParams.get('chargeId');

            if (!chargeId) {
                return NextResponse.json(
                    { error: 'Charge ID is required' },
                    { status: 400 }
                );
            }

            const result = await this.coinbaseService.getChargeStatus(chargeId);
            return NextResponse.json(result);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown) {
        console.error('Coinbase Commerce error:', error);
        
        if (error instanceof Error) {
            if (error.message.includes('API Key')) {
                return NextResponse.json(
                    { 
                        error: 'Configuration error',
                        details: 'Invalid API key'
                    },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { 
                    error: 'Payment processing error',
                    details: error.message
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                error: 'Internal server error',
                details: 'An unexpected error occurred'
            },
            { status: 500 }
        );
    }
}