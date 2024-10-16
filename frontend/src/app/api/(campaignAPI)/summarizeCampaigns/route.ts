import { NextResponse } from 'next/server';
import { DashboardCampaignSumController } from '@/controller/summarizeAPI/campaign/dashboardCampaignSumController';

const dashboardController = new DashboardCampaignSumController();

export async function GET(): Promise<NextResponse> {
    return dashboardController.getDashboardData();
}