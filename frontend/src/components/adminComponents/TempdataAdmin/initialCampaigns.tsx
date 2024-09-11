import { FundraisingCampaign } from './FundraisingCampaign';

export const initialCampaigns: FundraisingCampaign[] = [
  {
    id: 1,
    name: 'Tech Innovation',
    goal: 500000,
    raised: 200000,
    status: 'Active',
    description: 'A tech startup focused on innovation.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Tech Innovators Inc.',
    website: 'https://techinnovators.com',
    founderName: 'Alice Smith',
    email: 'alice@techinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/alicesmith',
    companyStage: 'Growth',
    industry: 'Technology',
    sector: 'Software',
    amountRaised: 200000,
    targetAmount: 500000,
    teamSize: 50,
    headquartersLocation: 'San Francisco, CA',
    productAvailable: true,
    location: 'San Francisco, CA', // New field
    incorporationDate: '2020-01-15', // New field
    investors: ['Investor A', 'Investor B'], // New field
    companyNumber: '123456789', // New field
    companyVision: 'To innovate and lead in technology.', // New field
    endInDate: '2025-12-31' // New field
  },
  {
    id: 2,
    name: 'Green Energy',
    goal: 300000,
    raised: 150000,
    status: 'Active',
    description: 'A startup focused on renewable energy solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Green Energy Solutions',
    website: 'https://greenenergy.com',
    founderName: 'Bob Johnson',
    email: 'bob@greenenergy.com',
    linkedInProfile: 'https://linkedin.com/in/bobjohnson',
    companyStage: 'Startup',
    industry: 'Energy',
    sector: 'Renewable',
    amountRaised: 150000,
    targetAmount: 300000,
    teamSize: 30,
    headquartersLocation: 'Austin, TX',
    productAvailable: true,
    location: 'Austin, TX', // New field
    incorporationDate: '2021-03-10', // New field
    investors: ['Investor C'], // New field
    companyNumber: '987654321', // New field
    companyVision: 'To create sustainable energy solutions.', // New field
    endInDate: '2026-05-15' // New field
  },
  {
    id: 3,
    name: 'AI Startups',
    goal: 400000,
    raised: 220000,
    status: 'Active',
    description: 'A startup focused on AI solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'AI Innovators',
    website: 'https://aiinnovators.com',
    founderName: 'Charlie Brown',
    email: 'charlie@aiinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/charliebrown',
    companyStage: 'Seed',
    industry: 'Artificial Intelligence',
    sector: 'Machine Learning',
    amountRaised: 220000,
    targetAmount: 400000,
    teamSize: 20,
    headquartersLocation: 'New York, NY',
    productAvailable: false,
    location: 'New York, NY', // New field
    incorporationDate: '2022-07-20', // New field
    investors: ['Investor D', 'Investor E'], // New field
    companyNumber: '112233445', // New field
    companyVision: 'To lead in AI innovation.', // New field
    endInDate: '2027-08-30' // New field
  },
  {
    id: 4,
    name: 'FinTech Solutions',
    goal: 600000,
    raised: 450000,
    status: 'Closed',
    description: 'A startup focused on financial technology solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'FinTech Innovators',
    website: 'https://fintechinnovators.com',
    founderName: 'Dana White',
    email: 'dana@fintechinnovators.com',
    linkedInProfile: 'https://linkedin.com/in/danawhite',
    companyStage: 'Expansion',
    industry: 'Finance',
    sector: 'FinTech',
    amountRaised: 450000,
    targetAmount: 600000,
    teamSize: 100,
    headquartersLocation: 'Chicago, IL',
    productAvailable: true,
    location: 'Chicago, IL', // New field
    incorporationDate: '2019-11-05', // New field
    investors: ['Investor F'], // New field
    companyNumber: '556677889', // New field
    companyVision: 'To revolutionize financial services.', // New field
    endInDate: '2024-10-10' // New field
  },
  {
    id: 5,
    name: 'Education Platforms',
    goal: 500000,
    raised: 320000,
    status: 'Active',
    description: 'A startup focused on online education platforms.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'EduTech Solutions',
    website: 'https://edutech.com',
    founderName: 'Eve Adams',
    email: 'eve@edutech.com',
    linkedInProfile: 'https://linkedin.com/in/evadams',
    companyStage: 'Growth',
    industry: 'Education',
    sector: 'E-Learning',
    amountRaised: 320000,
    targetAmount: 500000,
    teamSize: 40,
    headquartersLocation: 'Boston, MA',
    productAvailable: true,
    location: 'Boston, MA', // New field
    incorporationDate: '2020-02-25', // New field
    investors: ['Investor G', 'Investor H'], // New field
    companyNumber: '998877665', // New field
    companyVision: 'To enhance learning through technology.', // New field
    endInDate: '2025-12-01' // New field
  },
  {
    id: 6,
    name: 'Smart Cities',
    goal: 700000,
    raised: 500000,
    status: 'Active',
    description: 'A startup focused on smart city solutions.',
    urlPicture: "https://picsum.photos/200/300",
    companyName: 'Smart City Innovators',
    website: 'https://smartcity.com',
    founderName: 'Frank Green',
    email: 'frank@smartcity.com',
    linkedInProfile: 'https://linkedin.com/in/frankgreen',
    companyStage: 'Mature',
    industry: 'Urban Development',
    sector: 'Smart Cities',
    amountRaised: 500000,
    targetAmount: 700000,
    teamSize: 150,
    headquartersLocation: 'Los Angeles, CA',
    productAvailable: true,
    location: 'Los Angeles, CA', // New field
    incorporationDate: '2018-09-15', // New field
    investors: ['Investor I'], // New field
    companyNumber: '223344556', // New field
    companyVision: 'To create sustainable urban environments.', // New field
    endInDate: '2026-11-30' // New field
  }
];