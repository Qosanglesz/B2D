// src/components/apiComponents/statementAPI/statementController.ts

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

    async getStatementCountLast7Days(): Promise<NextResponse> {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 6); // 7 days including today

            const statements = await this.repository.findBetweenDates(startDate, endDate);

            const dailyCounts = new Map<string, number>();

            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                dailyCounts.set(date.toISOString().split('T')[0], 0);
            }

            statements.forEach(statement => {
                const date = statement.date.split('T')[0];
                const currentCount = dailyCounts.get(date) || 0;
                dailyCounts.set(date, currentCount + 1);
            });

            const statementCountData = Array.from(dailyCounts, ([date, count]) => ({ date, count }));

            return NextResponse.json(statementCountData);
        } catch (error: any) {
            console.error('Error in getStatementCountLast7Days:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
    
    async getInvestmentLast7Days(): Promise<NextResponse> {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 6); // 7 days including today

            const statements = await this.repository.findBetweenDates(startDate, endDate);

            const dailyTotals = new Map<string, number>();

            for (let i = 0; i < 7; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);
                dailyTotals.set(date.toISOString().split('T')[0], 0);
            }

            statements.forEach(statement => {
                const date = statement.date.split('T')[0];
                const currentTotal = dailyTotals.get(date) || 0;
                dailyTotals.set(date, currentTotal + statement.amount);
            });

            const investmentData = Array.from(dailyTotals, ([date, amount]) => ({ date, amount }));

            return NextResponse.json(investmentData);
        } catch (error: any) {
            console.error('Error in getInvestmentLast7Days:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}