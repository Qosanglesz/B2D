// app/api/payment/coinbase/transaction/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CoinbaseRepository } from '@/controller/coinbaseAPI/coinbaseRepository';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chargeId = searchParams.get('chargeId');
  
  if (!chargeId) {
    return NextResponse.json({ error: 'Charge ID is required' }, { status: 400 });
  }

  try {
    const repository = new CoinbaseRepository();
    const transaction = await repository.findTransactionByChargeId(chargeId);
    
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}