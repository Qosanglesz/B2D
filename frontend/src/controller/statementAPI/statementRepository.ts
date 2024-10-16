import {Collection, InsertOneResult} from 'mongodb';
import clientPromise from "@/lib/mongodb";


const DATABASE_NAME = "B2DVentureProject";
const COLLECTION_NAME = "Statements";

export interface StatementData {
    statement_id: string;
    user_id: string;
    campaign_id: number;
    campaignName: string;
    amount: number;
    session_id: string;
    date: string;
    successAt: string | null;
    status: string;
}

export class StatementRepository {
    private collectionPromise: Promise<Collection<StatementData>>;


    constructor() {
        this.collectionPromise = this.initializeCollection();
    }

    private async initializeCollection(): Promise<Collection<StatementData>> {
        try {
            const client = await clientPromise;
            const db = client.db(DATABASE_NAME);
            return db.collection<StatementData>(COLLECTION_NAME);
        } catch (err) {
            console.error("Failed to initialize MongoDB collection", err);
            throw err;
        }
    }

    private async getCollection(): Promise<Collection<StatementData>> {
        return this.collectionPromise;
    }

    async insertStatement(data: StatementData): Promise<InsertOneResult<StatementData>> {
        const collection = await this.getCollection();
        return collection.insertOne(data);
    }

    async findStatementById(statementId: string): Promise<StatementData | null> {
        const collection = await this.getCollection();
        return collection.findOne({statement_id: statementId});
    }

    async updateStatementStatus(sessionId: string, status: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.updateOne(
            {session_id: sessionId},
            {$set: {status: status, successAt: new Date().toJSON()}}
        );
    }

    async findStatementBySessionId(sessionId: string): Promise<StatementData | null> {
        const collection = await this.getCollection();
        return collection.findOne({session_id: sessionId});
    }

    async findByUserId(userId: string): Promise<StatementData[]> {
        const collection = await this.getCollection();
        return collection.find({user_id: userId}).toArray();
    }

    async findAll(): Promise<StatementData[]> {
        const collection = await this.getCollection();
        return collection.find({}).toArray();
    }

    async delete(statementId: string): Promise<boolean> {
        const collection = await this.getCollection();
        const result = await collection.deleteOne({statement_id: statementId});
        return result.deletedCount > 0;
    }

    async isStatusOpen(statementId: string): Promise<boolean> {
        const collection = await this.getCollection();
        const statement = await collection.findOne({statement_id: statementId});
        return !!(statement && statement.status === "open");
    }

    async findBetweenDates(startDate: Date, endDate: Date): Promise<StatementData[]> {
        const collection = await this.getCollection();
        return collection.find({
            date: {
                $gte: startDate.toISOString(),
                $lte: endDate.toISOString()
            }
        }).toArray();
    }
}
