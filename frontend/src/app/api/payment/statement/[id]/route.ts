// import {NextRequest, NextResponse} from 'next/server';
// import clientPromise from '@/lib/mongodb';

// const DATABASE_NAME = "B2DVentureProject"
// const COLLECTION_NAME = "Statements"

// export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
//     try {
//         const {id} = params; // Extract the dynamic route parameter

//         const client = await clientPromise;
//         const db = client.db(DATABASE_NAME); // Use your database name
//         const collection = db.collection(COLLECTION_NAME); // Use your collection name

//         // Fetch the record with the specific 'statement_id'
//         const statement = await collection.findOne({statement_id: id});

//         // If no statement is found, return an appropriate response
//         if (!statement) {
//             return NextResponse.json({message: `Statement with id ${id} not found.`}, {status: 404});
//         }

//         return NextResponse.json(statement);
//     } catch (error: any) {
//         return NextResponse.json({message: error.message}, {status: 500});
//     }
// }
import { NextRequest, NextResponse } from 'next/server';
import { PaymentController } from '@/controller/paymentAPI/paymentController';

const paymentController = new PaymentController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;
    return paymentController.getStatement(id);
}
