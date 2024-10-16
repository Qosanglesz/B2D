import {ObjectId} from "mongodb";
import { User } from "./User";

export interface Statement {
    _id?: ObjectId;
    statement_id: string;
    user_id: string;
    campaign_id: number;
    campaignName: string;
    amount: number;
    session_id: string;
    date: string;
    successAt: string;
    status: string;
}

export interface StatementWithUser extends Statement {
    user: User | null;
}