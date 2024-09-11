export interface CampaignData {
    [key: string]: {
      logo: string;
      companyName: string;
      description: string;
      campaignData: {
        progress: number;
        daysLeft: number;
        fundsRaised: string;
        targetAmount: string;
        investors: number;
        businessOverview: {
          location: string;
          website: string;
          sectors: string[];
          companyNumber: string;
          incorporationDate: string;
        };
        investmentSummary: {
          type: string;
          valuation: string;
          equityOffered: string;
          sharePrice: string;
          taxRelief: string;
        };
        businessHighlights: {
          globalCustomers: string[];
          endorsements: string;
          aiSolution: string;
          topRatings: string;
        };
        keyFeatures: {
          secondaryMarket: boolean;
          nomineeInvestment: string;
          directInvestment: string;
        };
      };
    };
  }

export const campaignData: CampaignData = {
    bower: {
        logo: "https://picsum.photos/200/300",
        companyName: "Bower",
        description: "Bower runs a smartphone app where consumer brands reward their customers for recycling their packages.",
        campaignData: {
          progress: 83,
          daysLeft: 26,
          fundsRaised: "€395,288",
          targetAmount: "€475,000",
          investors: 258,
          businessOverview: {
            location: "Stockholm, Sweden",
            website: "getbower.com",
            sectors: ["SaaS/PaaS", "Digital", "Mixed B2B/B2C"],
            companyNumber: "559009-0378",
            incorporationDate: "27 Mar 2015"
          },
          investmentSummary: {
            type: "Equity",
            valuation: "€19.6M",
            equityOffered: "2.37%",
            sharePrice: "€10.17",
            taxRelief: "N/A"
          },
          businessHighlights: {
            globalCustomers: ["Nestlé", "Unilever", "P&G"],
            endorsements: "Endorsed by Apple's CEO Tim Cook",
            aiSolution: "AI solution co-built with support from Google.org",
            topRatings: "Top rated on App Store and Google Play in Finland, Sweden, Norway"
          },
          keyFeatures: {
            secondaryMarket: true,
            nomineeInvestment: "min. €20.34 +",
            directInvestment: "min. €100,000.00 +"
          }
        }
      },
    ecoTech: {
      logo: "https://picsum.photos/200/301",
      companyName: "EcoTech Solutions",
      description: "EcoTech develops innovative solar panel technology for residential and commercial use.",
      campaignData: {
        progress: 67,
        daysLeft: 18,
        fundsRaised: "£2,010,000",
        targetAmount: "£3,000,000",
        investors: 412,
        businessOverview: {
          location: "Bristol, UK",
          website: "ecotechsolutions.co.uk",
          sectors: ["CleanTech", "Hardware", "B2B"],
          companyNumber: "12345678",
          incorporationDate: "15 Sep 2018"
        },
        investmentSummary: {
          type: "Equity",
          valuation: "£25M",
          equityOffered: "12%",
          sharePrice: "£5.50",
          taxRelief: "EIS"
        },
        businessHighlights: {
          globalCustomers: ["Tesla Energy", "SolarCity", "Sunrun"],
          endorsements: "Featured in Forbes '30 Under 30' for Energy",
          aiSolution: "AI-powered energy optimization algorithms",
          topRatings: "Winner of CleanTech Innovator Award 2022"
        },
        keyFeatures: {
          secondaryMarket: false,
          nomineeInvestment: "min. £100 +",
          directInvestment: "min. £50,000 +"
        }
      }
    },
    healthPlus: {
      logo: "https://picsum.photos/200/302",
      companyName: "HealthPlus",
      description: "HealthPlus is a telemedicine platform connecting patients with healthcare professionals 24/7.",
      campaignData: {
        progress: 92,
        daysLeft: 3,
        fundsRaised: "\$4,600,000",
        targetAmount: "\$5,000,000",
        investors: 789,
        businessOverview: {
          location: "San Francisco, USA",
          website: "healthplusapp.com",
          sectors: ["HealthTech", "SaaS", "B2C"],
          companyNumber: "C3456789",
          incorporationDate: "02 Jan 2020"
        },
        investmentSummary: {
          type: "Convertible Note",
          valuation: "Cap \$50M",
          equityOffered: "N/A",
          sharePrice: "N/A",
          taxRelief: "N/A"
        },
        businessHighlights: {
          globalCustomers: ["Blue Cross", "UnitedHealth", "Cigna"],
          endorsements: "Backed by Y Combinator",
          aiSolution: "AI-driven symptom checker and triage system",
          topRatings: "#1 Medical App on App Store in 10 countries"
        },
        keyFeatures: {
          secondaryMarket: true,
          nomineeInvestment: "min. \$1,000 +",
          directInvestment: "min. \$250,000 +"
        }
      }
    }
  };

// Function to export the campaignData
export function TempCampaignData(): CampaignData {
    return campaignData;
}