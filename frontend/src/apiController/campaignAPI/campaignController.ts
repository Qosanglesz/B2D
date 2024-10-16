import { NextResponse } from 'next/server';
import { CampaignRepository } from '@/apiController/campaignAPI/campaignRepository';
import { FundraisingCampaign } from '@/components/types/Campaign';

export class CampaignController {
    private repository: CampaignRepository;

    constructor() {
        this.repository = new CampaignRepository();
    }

    async getCampaign(id: string): Promise<NextResponse> {
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const campaign = await this.repository.findById(id);

        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json(campaign);
    }

    async updateCampaign(id: string, updatedData: Partial<FundraisingCampaign>): Promise<NextResponse> {
        try {
            if (!id || typeof id !== 'string') {
                return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
            }

            // Remove _id and id from updatedData to prevent overwriting
            const { _id, id: _, ...safeUpdatedData } = updatedData;

            const result = await this.repository.update(id, safeUpdatedData);

            if (!result) {
                return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Campaign updated successfully' }, { status: 200 });
        } catch (error) {
            console.error("Error updating campaign:", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    async deleteCampaign(id: string): Promise<NextResponse> {
        try {
            if (!id || typeof id !== 'string') {
                return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
            }

            const result = await this.repository.delete(id);

            if (!result) {
                return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Campaign deleted successfully' }, { status: 200 });
        } catch (error) {
            console.error("Error deleting campaign:", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    async createCampaign(formData: Partial<FundraisingCampaign>): Promise<NextResponse> {
        try {
            const requiredFields: (keyof FundraisingCampaign)[] = [
                'companyName', 'website', 'founderName', 'email', 'linkedInProfile',
                'companyStage', 'industry', 'sector', 'amountRaised', 'targetAmount',
                'teamSize', 'headquartersLocation', 'productAvailable',
            ];

            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
            }

            const newId = await this.repository.getNextId();
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 10);

            const campaignData: FundraisingCampaign = {
                id: newId,
                name: formData.companyName || '',
                status: 'Active',
                description: formData.description || '',
                pictureFiles: formData.pictureFiles || [],
                companyName: formData.companyName!,
                website: formData.website!,
                founderName: formData.founderName!,
                email: formData.email!,
                linkedInProfile: formData.linkedInProfile!,
                companyStage: formData.companyStage!,
                industry: formData.industry!,
                sector: formData.sector!,
                amountRaised: formData.amountRaised!,
                targetAmount: formData.targetAmount!,
                teamSize: formData.teamSize!,
                headquartersLocation: formData.headquartersLocation!,
                productAvailable: formData.productAvailable!,
                location: formData.location || formData.headquartersLocation!,
                incorporationDate: formData.incorporationDate || new Date().toISOString(),
                investors: formData.investors || [],
                companyNumber: formData.companyNumber || '',
                companyVision: formData.companyVision || '',
                endInDate: endDate.toISOString(),
            };

            const result = await this.repository.create(campaignData);

            if (result.insertedId) {
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

    async getAllCampaigns(): Promise<NextResponse> {
        try {
            const campaigns = await this.repository.getAllCampaigns();
            return NextResponse.json(campaigns);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return NextResponse.json({ error: 'Error fetching campaigns' }, { status: 500 });
        }
    }
}