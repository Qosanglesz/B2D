import {NextRequest, NextResponse} from 'next/server';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = "B2DVentureProject"
const COLLECTION_NAME = "Statements"

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const {id} = params;
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);
        const statement = await collection.find({user_id: id}).toArray();

        if (!statement) {
            return NextResponse.json({message: `Statement with user_id ${id} not found.`}, {status: 404});
        }

        return NextResponse.json(statement);
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}
