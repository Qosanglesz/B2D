import { NextResponse } from 'next/server';
import { CampaignController } from '@/components/apiComponents/campaignAPI/campaignController';

const campaignController = new CampaignController();

export async function GET(): Promise<NextResponse> {
    return campaignController.getAllCampaigns();
}