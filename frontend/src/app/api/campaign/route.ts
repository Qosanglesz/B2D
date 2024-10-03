// app/api/campaign/route.ts

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BusinessFormData } from '../../../components/types/BusinessFormData';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Campaign");
    const collection = db.collection("fundraising_campaign");

    // Parse the request body
    const formData: BusinessFormData = await request.json();

    // Validate required fields
    const requiredFields: (keyof BusinessFormData)[] = [
      'companyName', 'website', 'founderName', 'email', 'linkedinProfile',
      'companyStage', 'industry', 'sector', 'fundingDetails', 'teamSize',
      'headquarters', 'productAvailable'
    ];

    for (const field of requiredFields) {
      if (field === 'fundingDetails') {
        if (!formData.fundingDetails?.amountRaised || !formData.fundingDetails?.targetAmount) {
          return NextResponse.json({ error: `Missing required field: fundingDetails` }, { status: 400 });
        }
      } else if (!formData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Prepare campaign data
    const campaignData = {
      ...formData,
      status: 'Active',
      createdAt: new Date().toISOString(),
      amountRaised: formData.fundingDetails.amountRaised,
      targetAmount: formData.fundingDetails.targetAmount,
    };

    // Generate a new numeric id
    const lastCampaign = await collection.findOne({}, { sort: { id: -1 } });
    const newId = (lastCampaign?.id || 0) + 1;
    campaignData.id = newId;

    // Insert the new campaign
    const result = await collection.insertOne(campaignData);

    if (result.acknowledged) {
      return NextResponse.json({ 
        message: 'Campaign created successfully', 
        campaignId: result.insertedId,
        id: newId
      }, { status: 201 });
    } else {
      throw new Error('Failed to insert campaign');
    }

  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}