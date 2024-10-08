import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("payment"); // Use your database name
        const collection = db.collection("statement"); // Use your collection name
        const statements = await collection.find({}).toArray();
        return NextResponse.json(statements);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
