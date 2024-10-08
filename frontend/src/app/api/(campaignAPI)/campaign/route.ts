import { NextRequest, NextResponse } from 'next/server';
import { CampaignController } from '@/components/apiComponents/campaignAPI/campaignController';

const campaignController = new CampaignController();

export async function POST(request: NextRequest) {
    const formData = await request.json();
    return campaignController.createCampaign(formData);
}