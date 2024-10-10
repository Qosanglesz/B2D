import { NextResponse } from 'next/server';
import { StatementController } from '@/components/apiComponents/statementAPI/statementController';

const statementController = new StatementController();

export async function GET(): Promise<NextResponse> {
    return statementController.getStatements();
}