export interface BusinessFormData {
    companyName: string;
    website: string;
    founderName: string;
    email: string;
    linkedinProfile: string;
    companyStage: string;
    industry: string;
    sector: string;
    fundingDetails: {
      amountRaised: number;
      targetAmount: number;
    };
    teamSize: number;
    headquarters: string;
    productAvailable: boolean;
    [key: string]: any;
  }