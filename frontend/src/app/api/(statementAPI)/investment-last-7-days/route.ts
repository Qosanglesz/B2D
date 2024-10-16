import { NextResponse } from 'next/server';
import { StatementController } from '@/controller/statementAPI/statementController';

export async function GET() {
  const controller = new StatementController();
  return controller.getInvestmentLast7Days();
}