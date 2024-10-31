// app/api/payment/coinbase/route.ts

// import { CoinbaseController } from '@/controller/coinbaseAPI/coinbaseController';

// export async function POST(request: Request) {
//     const controller = CoinbaseController.getInstance();
//     return controller.createCharge(request);
// }

// export async function GET(request: Request) {
//     const controller = CoinbaseController.getInstance();
//     return controller.getChargeStatus(request);
// }

// src/app/api/payment/coinbase/route.ts
import { NextResponse } from 'next/server';
import { CoinbaseController } from '@/controller/coinbaseAPI/coinbaseController';

export async function POST(request: Request) {
    try {
        const controller = CoinbaseController.getInstance();
        return controller.createCharge(request);
    } catch (error: any) {
        // console.error('Create charge error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create charge' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const controller = CoinbaseController.getInstance();
        return controller.getChargeStatus(request);
    } catch (error: any) {
        // console.error('Get charge status error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get charge status' },
            { status: 500 }
        );
    }
}