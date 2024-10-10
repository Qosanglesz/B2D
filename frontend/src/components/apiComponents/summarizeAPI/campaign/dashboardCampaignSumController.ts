import { NextResponse } from 'next/server';
import { CampaignSumRepository } from '@/components/apiComponents/summarizeAPI/campaign/campaignSumRepository';
import { Campaign } from '../../../campaignComponents/TempCampaignData';

export class DashboardCampaignSumController {
    private repository: CampaignSumRepository;

    constructor() {
        this.repository = new CampaignSumRepository();
    }

    async getDashboardData(): Promise<NextResponse> {
        try {
            const totalCompanies = await this.repository.getTotalCompanies();
            const totalFundsRaised = await this.repository.getTotalFundsRaised();

            const dashboardData = {
                totalCompanies,
                totalFundsRaised
            };

            console.log("Dashboard data:", dashboardData);
            return NextResponse.json(dashboardData);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return NextResponse.json({ message: 'Error fetching dashboard data', error }, { status: 500 });
        }
    }
}