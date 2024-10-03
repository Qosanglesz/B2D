// app/api/campaigns/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';


export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db("Campaign");
    const collection = database.collection<FundraisingCampaign>("fundraising_campaign");
    
    const campaigns = await collection.find({}).toArray();
    console.log("Fetched campaigns:", campaigns);
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ message: 'Error fetching campaigns', error }, { status: 500 });
  }
}