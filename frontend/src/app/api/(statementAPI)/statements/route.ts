import { NextResponse } from 'next/server';
import { StatementController } from '@/apiController/statementAPI/statementController';

const statementController = new StatementController();

export async function GET(): Promise<NextResponse> {
    return statementController.getStatements();
}