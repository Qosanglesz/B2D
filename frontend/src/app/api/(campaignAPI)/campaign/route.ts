import {NextRequest, NextResponse} from 'next/server';
import clientPromise from '@/lib/mongodb';
import {FundraisingCampaign} from '@/components/types/type_fundraisingCampaign';


const DATABASE_NAME = "Campaign"
const COLLECTION_NAME = "fundraising_campaign"


export async function POST(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const collection = db.collection<FundraisingCampaign>(COLLECTION_NAME);

        // Parse the request body
        const formData: Partial<FundraisingCampaign> = await request.json();

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
        const lastCampaign = await collection.findOne({}, {sort: {id: -1}});
        const newId = (lastCampaign?.id || 0) + 1;

        // Calculate end date (10 years from now)
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 10);

        // Prepare campaign data
        const campaignData: FundraisingCampaign = {
            id: newId,
            name: formData.companyName || '',
            status: 'Active',
            description: formData.description || '',
            urlPicture: formData.urlPicture || '',
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
        const result = await collection.insertOne(campaignData);

        if (result.acknowledged) {
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