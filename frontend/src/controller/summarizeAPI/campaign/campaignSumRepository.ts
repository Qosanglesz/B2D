import clientPromise from '@/lib/mongodb';
import {Campaign} from '@/types/Campaign';


const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Campaigns";

export class CampaignSumRepository {
    private async getCollection() {
        const client = await clientPromise;
        const database = client.db(DATABASE_NAME);
        return database.collection<Campaign>(COLLECTION_NAME);
    }

    async getTotalCompanies(): Promise<number> {
        const collection = await this.getCollection();
        return collection.countDocuments();
    }

    async getTotalFundsRaised(): Promise<number> {
        const collection = await this.getCollection();
        const aggregationResult = await collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalFundsRaised: {$sum: "$amountRaised"}
                }
            }
        ]).toArray();

        return aggregationResult[0]?.totalFundsRaised || 0;
    }
}
