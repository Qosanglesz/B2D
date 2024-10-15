import { ObjectId } from 'mongodb';

export interface FundraisingCampaign {
    _id?: ObjectId;
    id : number;
    name: string;
    status: string;
    description: string;
    urlPicture: string;
    pictureFiles: [];
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