import { Collection } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Statements";

export class StatementRepository {
    private async getCollection(): Promise<Collection> {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        return db.collection(COLLECTION_NAME);
    }

    async findByUserId(userId: string) {
        const collection = await this.getCollection();
        return collection.find({ user_id: userId }).toArray();
    }

    async findAll() {
        const collection = await this.getCollection();
        return collection.find({}).toArray();
    }
}