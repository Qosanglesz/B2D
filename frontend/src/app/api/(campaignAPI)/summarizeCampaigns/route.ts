import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db("Campaign");
    const campaignCollection = database.collection<FundraisingCampaign>("fundraising_campaign");
    
    // Get total companies (assuming each campaign represents a unique company)
    const totalCompanies = await campaignCollection.countDocuments();

    // Get total investments (assuming each campaign represents an investment)
    // const totalInvestments = totalCompanies;

    // Get total funds raised
    const aggregationResult = await campaignCollection.aggregate([
      {
        $group: {
          _id: null,
          totalFundsRaised: { $sum: "$amountRaised" }
        }
      }
    ]).toArray();

    const totalFundsRaised = aggregationResult[0]?.totalFundsRaised || 0;

    const dashboardData = {
      totalCompanies,
    //   totalInvestments,
      totalFundsRaised
    };

    console.log("Dashboard data:", dashboardData);
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ message: 'Error fetching dashboard data', error }, { status: 500 });
  }
}