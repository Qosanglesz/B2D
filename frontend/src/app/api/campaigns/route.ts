// app/api/campaigns/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { FundraisingCampaign } from '../../../components/types/type_fundraisingCampaign';
import { WithId, Document } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db("Campaign");
    const collection = database.collection("fundraising_campaign");
    
    const campaignsData = await collection.find({}).toArray();
    
    const campaigns: FundraisingCampaign[] = campaignsData.map((campaign: WithId<Document>): FundraisingCampaign => ({
      _id: campaign._id.toString(),
      id: campaign.id,  // Convert ObjectId to string
      name: campaign.name as string,
      goal: campaign.goal as number,
      raised: campaign.raised as number,
      status: campaign.status as string,
      description: campaign.description as string,
      urlPicture: campaign.urlPicture as string,
      companyName: campaign.companyName as string,
      website: campaign.website as string,
      founderName: campaign.founderName as string,
      email: campaign.email as string,
      linkedInProfile: campaign.linkedInProfile as string,
      companyStage: campaign.companyStage as string,
      industry: campaign.industry as string,
      sector: campaign.sector as string,
      amountRaised: campaign.amountRaised as number,
      targetAmount: campaign.targetAmount as number,
      teamSize: campaign.teamSize as number,
      headquartersLocation: campaign.headquartersLocation as string,
      productAvailable: campaign.productAvailable as boolean,
      location: campaign.location as string,
      incorporationDate: campaign.incorporationDate as string,
      investors: campaign.investors as string[],
      companyNumber: campaign.companyNumber as string,
      companyVision: campaign.companyVision as string,
      endInDate: campaign.endInDate as string,
    }));
    // console.log("Fetched campaigns:", campaigns);
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ message: 'Error fetching campaigns', error }, { status: 500 });
  }
}

