import { Campaign } from '@/types/Campaign';
import clientPromise from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Campaigns";

export class CampaignRepository {
    private async getCollection() {
        const client = await clientPromise;
        const database = client.db(DATABASE_NAME);
        return database.collection<Campaign>(COLLECTION_NAME);
    }

    // Validate if the ID is a valid UUIDv4
    private static validateUuid(id: string): boolean {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(id);
    }

    // Fetch campaign by ID with UUID validation
    async findById(id: string): Promise<Campaign | null> {
        if (!CampaignRepository.validateUuid(id)) {
            throw new Error('Invalid campaign ID');
        }
        const collection = await this.getCollection();
        return collection.findOne({ id: id });
    }

    // Update campaign with UUID validation and sanitized data
    async update(id: string, updatedData: Partial<Campaign>): Promise<boolean> {
        if (!CampaignRepository.validateUuid(id)) {
            throw new Error('Invalid campaign ID');
        }

        // Sanitize the updated data (remove malicious fields)
        const sanitizedData = { ...updatedData };
        delete sanitizedData._id; // Remove _id field to avoid overwriting the original ID
        delete sanitizedData.id; // Remove id field if it exists

        const collection = await this.getCollection();
        const result = await collection.updateOne({ id: id }, { $set: sanitizedData });
        return result.matchedCount > 0;
    }

    // Delete campaign with UUID validation
    async delete(id: string): Promise<boolean> {
        if (!CampaignRepository.validateUuid(id)) {
            throw new Error('Invalid campaign ID');
        }

        const collection = await this.getCollection();
        const result = await collection.deleteOne({ id: id });
        return result.deletedCount > 0;
    }

    // Create a new campaign with UUID and validation
    async create(campaignData: Campaign) {
        // Generate a UUIDv4 for the campaign ID
        campaignData.id = uuidv4();

        // Validate required fields (for example: companyName, website, etc.)
        if (!campaignData.companyName || !campaignData.website) {
            throw new Error('Missing required fields');
        }

        const collection = await this.getCollection();
        return collection.insertOne(campaignData);
    }

    // Get all campaigns
    async getAllCampaigns(): Promise<Campaign[]> {
        const collection = await this.getCollection();
        return collection.find({}).toArray();
    }

    // Update campaign funding, ensuring that the user ID and campaign ID are validated and sanitized
    async updateCampaignFunding(campaignId: string, amount: number, userId: string): Promise<void> {
        if (!CampaignRepository.validateUuid(campaignId) || !CampaignRepository.validateUuid(userId)) {
            throw new Error('Invalid campaign or user ID');
        }

        if (isNaN(amount) || amount <= 0) {
            throw new Error('Amount must be a valid positive number');
        }

        const collection = await this.getCollection();
        await collection.updateOne(
            { id: campaignId },
            {
                $inc: { amountRaised: amount },
                $addToSet: { investors: userId }
            }
        );
    }
}
