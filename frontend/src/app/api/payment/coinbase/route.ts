// app/api/payment/coinbase/route.ts

import { CoinbaseController } from '@/controller/coinbaseAPI/coinbaseController';

export async function POST(request: Request) {
    const controller = CoinbaseController.getInstance();
    return controller.handleCreateCharge(request);
}

export async function GET(request: Request) {
    const controller = CoinbaseController.getInstance();
    return controller.handleGetChargeStatus(request);
}