export interface FundraisingCampaign {
    id: number;
    name: string;
    goal: number;
    raised: number;
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
    location: string; // New field
    incorporationDate: string; // New field
    investors: string[]; // New field
    companyNumber: string; // New field
    companyVision: string; // New field
    endInDate: string; // New field
  }