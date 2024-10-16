import { NextResponse } from 'next/server';
import { CampaignRepository } from '@/controller/campaignAPI/campaignRepository';
import { FundraisingCampaign } from '@/types/Campaign';

export class CampaignController {
    private repository: CampaignRepository;

    constructor() {
        this.repository = new CampaignRepository();
    }

    async getCampaign(id: number): Promise<NextResponse> {
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const campaign = await this.repository.findById(id);

        if (!campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json(campaign);
    }

    async updateCampaign(id: number, updatedData: Partial<FundraisingCampaign>): Promise<NextResponse> {
        try {
            // Remove _id and id from updatedData to prevent overwriting
            delete updatedData._id;
            delete updatedData.id;

            const result = await this.repository.update(id, updatedData);

            if (!result) {
                return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Campaign updated successfully' }, { status: 200 });
        } catch (error) {
            console.error("Error updating campaign:", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

    async deleteCampaign(id: number): Promise<NextResponse> {
        try {
            if (isNaN(id)) {
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
            // Validate required fields
            const requiredFields: (keyof FundraisingCampaign)[] = [
                'companyName', 'website', 'founderName', 'email', 'linkedInProfile',
                'companyStage', 'industry', 'sector', 'amountRaised', 'targetAmount',
                'teamSize', 'headquartersLocation', 'productAvailable',
            ];

            for (const field of requiredFields) {
                if (!formData[field]) {
                    return NextResponse.json({error: `Missing required field: ${field}`}, {status: 400});
                }
            }

            // Generate a new numeric id
            const newId = await this.repository.getNextId();

            // Calculate end date (10 years from now)
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 10);

            // Prepare campaign data
            const campaignData: FundraisingCampaign = {
                id: newId,
                name: formData.companyName || '',
                status: 'Active',
                description: formData.description || '',
                pictureFiles: formData.pictureFiles || [],
                companyName: formData.companyName || '',
                website: formData.website || '',
                founderName: formData.founderName || '',
                email: formData.email || '',
                linkedInProfile: formData.linkedInProfile || '',
                companyStage: formData.companyStage || '',
                industry: formData.industry || '',
                sector: formData.sector || '',
                amountRaised: formData.amountRaised || 0,
                targetAmount: formData.targetAmount || 0,
                teamSize: formData.teamSize || 0,
                headquartersLocation: formData.headquartersLocation || '',
                productAvailable: formData.productAvailable || false,
                location: formData.location || formData.headquartersLocation || '',
                incorporationDate: formData.incorporationDate || new Date().toISOString(),
                investors: formData.investors || [],
                companyNumber: formData.companyNumber || '',
                companyVision: formData.companyVision || '',
                endInDate: endDate.toISOString(),
            };

            // Insert the new campaign
            const result = await this.repository.create(campaignData);

            if (result) {
                return NextResponse.json({
                    message: 'Campaign created successfully',
                    campaignId: result.insertedId,
                    id: newId
                }, {status: 201});
            } else {
                throw new Error('Failed to insert campaign');
            }

        } catch (error) {
            console.error("Error creating campaign:", error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }

    async getAllCampaigns(): Promise<NextResponse> {
        try {
            const campaigns = await this.repository.getAllCampaigns();
            return NextResponse.json(campaigns);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return NextResponse.json({ message: 'Error fetching campaigns', error }, { status: 500 });
        }
    }
}