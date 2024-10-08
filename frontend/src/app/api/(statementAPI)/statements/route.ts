import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';


const DATABASE_NAME = "payment"
const COLLECTION_NAME = "statement"

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME); // Use your database name
        const collection = db.collection(COLLECTION_NAME); // Use your collection name
        const statements = await collection.find({}).toArray();
        return NextResponse.json(statements);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
