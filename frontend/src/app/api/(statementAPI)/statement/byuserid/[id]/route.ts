import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db("payment");
        const collection = db.collection("statement");
        const statement = await collection.find({ user_id: id }).toArray();

        if (!statement) {
            return NextResponse.json({ message: `Statement with user_id ${id} not found.` }, { status: 404 });
        }

        return NextResponse.json(statement);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
