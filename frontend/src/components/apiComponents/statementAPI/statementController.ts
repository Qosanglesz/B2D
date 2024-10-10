import { NextResponse } from 'next/server';
import { StatementRepository } from './statementRepository';

export class StatementController {
    private repository: StatementRepository;

    constructor() {
        this.repository = new StatementRepository();
    }

    async getStatements(userId?: string): Promise<NextResponse> {
        try {
            let statements;
            if (userId) {
                statements = await this.repository.findByUserId(userId);
                if (statements.length === 0) {
                    return NextResponse.json({ message: `Statement with user_id ${userId} not found.` }, { status: 404 });
                }
            } else {
                statements = await this.repository.findAll();
            }
            return NextResponse.json(statements);
        } catch (error: any) {
            console.error('Error in getStatements:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}