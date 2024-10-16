import clientPromise from '@/lib/mongodb';
import {Campaign} from '@/types/Campaign';


const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Campaigns";

export class CampaignRepository {
    private async getCollection() {
        const client = await clientPromise;
        const database = client.db(DATABASE_NAME);
        return database.collection<Campaign>(COLLECTION_NAME);
    }

    async findById(id: number): Promise<Campaign | null> {
        const collection = await this.getCollection();
        return collection.findOne({id: id});
    }

    async update(id: number, updatedData: Partial<Campaign>): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.updateOne(
            {id: id},
            {$set: updatedData}
        );
        return result.matchedCount > 0;
    }

    async delete(id: number): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.deleteOne({id: id});
        return result.deletedCount > 0;
    }

    async getNextId(): Promise<number> {
        const collection = await this.getCollection();
        const lastCampaign = await collection.findOne({}, {sort: {id: -1}});
        return (lastCampaign?.id || 0) + 1;
    }

    async create(campaignData: Campaign) {
        const collection = await this.getCollection();
        return collection.insertOne(campaignData);
    }

    async getAllCampaigns(): Promise<Campaign[]> {
        const collection = await this.getCollection();
        return collection.find({}).toArray();
    }

    async updateCampaignFunding(campaignId: number, amount: number, userId: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.updateOne(
            {id: campaignId},
            {
                $inc: {amountRaised: amount},
                $addToSet: {investors: userId}
            }
        );
    }
}
