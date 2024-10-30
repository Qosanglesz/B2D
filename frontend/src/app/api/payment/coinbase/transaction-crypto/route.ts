// src/app/api/payment/coinbase/transaction-crypto/route.ts
import { NextResponse } from 'next/server';
import { CoinbaseRepository } from '@/controller/coinbaseAPI/coinbaseRepository';

export async function GET() {
    const repository = new CoinbaseRepository();

    try {
        // Fetch all cryptocurrency transactions
        const transactions = await repository.getAllCryptoTransactions();

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching cryptocurrency transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}