import clientPromise from '@/lib/mongodb';
import { FundraisingCampaign } from '@/components/types/Campaign';

const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Campaigns";

export class CampaignRepository {
    private async getCollection() {
        const client = await clientPromise;
        const database = client.db(DATABASE_NAME);
        return database.collection<FundraisingCampaign>(COLLECTION_NAME);
    }

    async findById(id: string): Promise<FundraisingCampaign | null> {
        const collection = await this.getCollection();
        return collection.findOne({ id: id });
    }

    async update(id: string, updatedData: Partial<FundraisingCampaign>): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.updateOne(
            { id: id },
            { $set: updatedData }
        );
        return result.matchedCount > 0;
    }

    async delete(id: string): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.deleteOne({ id: id });
        return result.deletedCount > 0;
    }

    async getNextId(): Promise<string> {
        const collection = await this.getCollection();
        const lastCampaign = await collection.findOne({}, {sort: {id: -1}});
        const lastId = lastCampaign?.id || '0';
        return (parseInt(lastId) + 1).toString();
    }

    async create(campaignData: FundraisingCampaign) {
        const collection = await this.getCollection();
        return collection.insertOne(campaignData);
    }

    async getAllCampaigns(): Promise<FundraisingCampaign[]> {
        const collection = await this.getCollection();
        return collection.find({}).toArray();
    }

    async updateCampaignFunding(campaignId: string, amount: number, userId: string): Promise<void> {
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