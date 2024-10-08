import {NextRequest, NextResponse} from 'next/server';
import clientPromise from '@/lib/mongodb';
import {FundraisingCampaign} from '@/components/types/type_fundraisingCampaign';


const DATABASE_NAME = "B2DVentureProject"
const COLLECTION_NAME = "Campaigns"

export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } }
): Promise<NextResponse> {
    const id = parseInt(params.id, 10); // Convert string to number

    if (isNaN(id)) {
        return NextResponse.json({error: 'Invalid ID'}, {status: 400});
    }

    const client = await clientPromise;
    const database = client.db(DATABASE_NAME);
    const collection = database.collection<FundraisingCampaign>(COLLECTION_NAME);

    const campaign = await collection.findOne({id: id});

    if (!campaign) {
        return NextResponse.json({error: 'Campaign not found'}, {status: 404});
    }

    return NextResponse.json(campaign);
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10); // Convert string to number
        const updatedData: Partial<FundraisingCampaign> = await request.json();

        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const collection = db.collection<FundraisingCampaign>(COLLECTION_NAME);

        // Remove _id from updatedData if it exists
        delete updatedData._id;
        delete updatedData.id; // Also remove id from updatedData to prevent overwriting

        const result = await collection.updateOne(
            {id: id}, // Use the numeric id field
            {$set: updatedData}
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({error: 'Campaign not found'}, {status: 404});
        }

        return NextResponse.json({message: 'Campaign updated successfully'}, {status: 200});
    } catch (error) {
        console.error("Error updating campaign:", error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }): Promise<NextResponse> {
    try {
        const id = parseInt(params.id, 10); // Convert string to number

        if (isNaN(id)) {
            return NextResponse.json({error: 'Invalid ID'}, {status: 400});
        }

        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const collection = db.collection<FundraisingCampaign>(COLLECTION_NAME);

        const result = await collection.deleteOne({id: id});

        if (result.deletedCount === 0) {
            return NextResponse.json({error: 'Campaign not found'}, {status: 404});
        }

        return NextResponse.json({message: 'Campaign deleted successfully'}, {status: 200});
    } catch (error) {
        console.error("Error deleting campaign:", error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}