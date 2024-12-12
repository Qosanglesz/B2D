import {NextResponse} from 'next/server';
import {CampaignRepository} from '@/controller/campaignAPI/campaignRepository';
import {Campaign} from '@/types/Campaign';


export class CampaignController {
    private repository: CampaignRepository;

    constructor() {
        this.repository = new CampaignRepository();
    }

    async getCampaign(id: String): Promise<NextResponse> {
        if (!id) {
            return NextResponse.json({error: 'Invalid ID'}, {status: 400});
        }

        const campaign = await this.repository.findById(id);

        if (!campaign) {
            return NextResponse.json({error: 'Campaign not found'}, {status: 404});
        }

        return NextResponse.json(campaign);
    }

    async updateCampaign(id: String, updatedData: Partial<Campaign>): Promise<NextResponse> {
        try {
            // Remove _id and id from updatedData to prevent overwriting
            delete updatedData._id;
            delete updatedData.id;

            const result = await this.repository.update(id, updatedData);

            if (!result) {
                return NextResponse.json({error: 'Campaign not found'}, {status: 404});
            }

            return NextResponse.json({message: 'Campaign updated successfully'}, {status: 200});
        } catch (error) {
            console.error("Error updating campaign:", error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }

    async deleteCampaign(id: String): Promise<NextResponse> {
        try {
            if (!id) {
                return NextResponse.json({error: 'Invalid ID'}, {status: 400});
            }

            const result = await this.repository.delete(id);

            if (!result) {
                return NextResponse.json({error: 'Campaign not found'}, {status: 404});
            }

            return NextResponse.json({message: 'Campaign deleted successfully'}, {status: 200});
        } catch (error) {
            console.error("Error deleting campaign:", error);
            return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
        }
    }

    async createCampaign(formData: Partial<Campaign>): Promise<NextResponse> {
        try {
            // Validate required fields
            const requiredFields: (keyof Campaign)[] = [
                'companyName', 'website', 'founderName', 'email', 'linkedInProfile',
                'companyStage', 'industry', 'sector', 'amountRaised', 'targetAmount',
                'teamSize', 'headquartersLocation', 'productAvailable',
            ];

            for (const field of requiredFields) {
                if (!formData[field]) {
                    return NextResponse.json({error: `Missing required field: ${field}`}, {status: 400});
                }
            }

            const campaignData: Campaign = <Campaign>{
                id: formData.id,
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
                endInDate: formData.endInDate,
            };

            // Insert the new campaign
            const result = await this.repository.create(campaignData);

            if (result) {
                return NextResponse.json({
                    message: 'Campaign created successfully',
                    campaignId: result.insertedId,
                    id: formData.id
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
            return NextResponse.json({message: 'Error fetching campaigns', error}, {status: 500});
        }
    }
}
