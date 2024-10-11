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

    async deleteStatement(id: string): Promise<NextResponse> {
        try {
            if (!id) {
                return NextResponse.json({ error: 'Invalid StatementID' }, { status: 400 });
            }

            if (!await this.repository.isStatusOpen(id)) {
                return NextResponse.json({ error: 'Cant delete complete statement' }, { status: 404 });
            }

            const result = await this.repository.delete(id);

            if (!result) {
                return NextResponse.json({ error: 'Statement not found' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Statement deleted successfully' }, { status: 200 });
        } catch (error) {
            console.error("Error deleting Statement:", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
}