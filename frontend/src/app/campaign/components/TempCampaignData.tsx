// campaignsData.tsx

// Define the Campaign interface
export interface Campaign {
  logo: string;
  photo: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  fundsRaised: number;
  targetAmount: number;
  investors: number;
  businessOverview: {
    location: string;
    website: string;
    sectors: string;
    companyNumber: string;
    incorporationDate: string;
    vision: string;
  };
}

// Define the CampaignsData interface (which is just an array of Campaign)
export interface CampaignsData {
  campaigns: Campaign[];
}

// Create mock data for CampaignsData
export const mockCampaignsData: CampaignsData = {
  campaigns: [
    {
      logo: "https://picsum.photos/200/300",
      photo: "https://picsum.photos/2000/2000",
      companyName: "Tech Innovators Ltd.",
      description: "A cutting-edge technology company focused on AI solutions.",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      fundsRaised: 1500000,
      targetAmount: 3000000,
      investors: 450,
      businessOverview: {
        location: "New York, USA",
        website: "https://techinnovators.com",
        sectors: "Technology, AI",
        companyNumber: "123456789",
        incorporationDate: "2015-06-10",
        vision: "Revolutionizing the world with AI innovations.",
      },
    },
    {
      logo: "https://picsum.photos/200/300",
      photo: "https://picsum.photos/2000/2000",
      companyName: "EcoGreen Solutions",
      description: "A renewable energy company providing eco-friendly solutions.",
      startDate: "2023-04-01",
      endDate: "2023-10-15",
      fundsRaised: 900000,
      targetAmount: 2000000,
      investors: 300,
      businessOverview: {
        location: "London, UK",
        website: "https://ecogreen.com",
        sectors: "Renewable Energy, Sustainability",
        companyNumber: "987654321",
        incorporationDate: "2018-03-20",
        vision: "Creating a sustainable future through innovative energy solutions.",
      },
    },
    {
      logo: "https://picsum.photos/200/300",
      photo: "https://picsum.photos/2000/2000",
      companyName: "Health First Pharmaceuticals",
      description: "Developing life-saving pharmaceutical products.",
      startDate: "2023-05-10",
      endDate: "2024-02-28",
      fundsRaised: 5000000,
      targetAmount: 7000000,
      investors: 800,
      businessOverview: {
        location: "Berlin, Germany",
        website: "https://healthfirst.com",
        sectors: "Pharmaceuticals, Healthcare",
        companyNumber: "112233445",
        incorporationDate: "2012-11-25",
        vision: "Innovating medicine to improve lives worldwide.",
      },
    },
  ],
};
