// app/campaigns/page.tsx

// import { FundraisingCampaign } from '../types/types';

// import clientPromise from '../lib/mongodb';
import { FundraisingCampaign } from '../types/type_fundraisingCampaign';
import clientPromise from '../../lib/mongodb';
import { WithId, Document } from 'mongodb';

async function getCampaigns(): Promise<FundraisingCampaign[]> {
  const client = await clientPromise;
  const database = client.db("Campaign");
  const collection = database.collection("fundraising_campaign");
  
  const campaigns = await collection.find({}).toArray();
  
  return campaigns.map((campaign: WithId<Document>): FundraisingCampaign => ({
    _id: campaign._id.toString(),
    id: campaign.id,
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
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div>
      <h1>Fundraising Campaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            {campaign.name} - Goal: ${campaign.goal}, Raised: ${campaign.raised}
          </li>
        ))}
      </ul>
    </div>
  );
}