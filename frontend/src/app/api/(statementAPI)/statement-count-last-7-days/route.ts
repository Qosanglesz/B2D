// app/api/statement-count-last-7-days/route.ts

import { NextResponse } from 'next/server';
import { StatementController } from '@/apiController/statementAPI/statementController';

export async function GET() {
  const controller = new StatementController();
  return controller.getStatementCountLast7Days();
}