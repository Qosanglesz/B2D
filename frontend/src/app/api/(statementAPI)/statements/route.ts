import { NextResponse } from 'next/server';
import { StatementController } from '@/controller/statementAPI/statementController';

const statementController = new StatementController();

export const dynamic = 'force-dynamic'
export async function GET(): Promise<NextResponse> {
    return statementController.getStatements();
}