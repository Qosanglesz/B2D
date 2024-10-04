import { ObjectId } from 'mongodb';

export interface FundraisingCampaign {
    _id?: ObjectId;
    // _id: string;  // Ensure this is a string
    id : number;
    name: string;
    // goal: number;
    // raised: number;
    status: string;
    description: string;
    urlPicture: string;
    companyName: string;
    website: string;
    founderName: string;
    email: string;
    linkedInProfile: string;
    companyStage: string;
    industry: string;
    sector: string;
    amountRaised: number;
    targetAmount: number;
    teamSize: number;
    headquartersLocation: string;
    productAvailable: boolean;
    location: string;
    incorporationDate: string;
    investors: string[];
    companyNumber: string;
    companyVision: string;
    endInDate: string; 
}