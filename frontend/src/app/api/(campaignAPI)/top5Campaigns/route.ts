// app/api/campaigns/top/route.ts
import { NextResponse } from 'next/server';
import { CampaignRepository } from '@/controller/campaignAPI/campaignRepository'; // Adjust the import path as necessary

const campaignRepository = new CampaignRepository();

export async function GET() {
    try {
        const campaigns = await campaignRepository.getAllCampaigns();
        const topCampaigns = campaigns
            .sort((a, b) => b.amountRaised - a.amountRaised) // Sort by amount raised in descending order
            .slice(0, 5) // Get top 5 campaigns
            .map(({ id, name, amountRaised }) => ({ id, name, amountRaised })); // Select only the required fields
        return NextResponse.json(topCampaigns);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
    }
}