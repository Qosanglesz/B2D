import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = parseInt(params.id, 10); // Convert string to number
  
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const client = await clientPromise;
  const database = client.db("Campaign");
  const collection = database.collection<FundraisingCampaign>("fundraising_campaign");
  
  const campaign = await collection.findOne({ id: id });
  
  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  return NextResponse.json(campaign);
}