import { NextResponse } from 'next/server';
import { CampaignController } from '@/controller/campaignAPI/campaignController';

const campaignController = new CampaignController();

export const dynamic = 'force-dynamic'
export async function GET(): Promise<NextResponse> {
    return campaignController.getAllCampaigns();
}