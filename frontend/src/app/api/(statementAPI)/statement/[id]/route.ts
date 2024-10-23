import {NextRequest, NextResponse} from "next/server";
import { StatementController } from '@/controller/statementAPI/statementController';

const statementController = new StatementController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;

    return NextResponse.json({message: "This Endpoint not available"});
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;

    return statementController.deleteStatement(id);
}