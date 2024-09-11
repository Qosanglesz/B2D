import React from 'react';
import IntroHeader from '../components/IntroHeader';
import CampaignDetail from '../components/BodyBusinessDetail';
import BodyText from '../components/BodyText';
// import {campaignData} from '../components/TempCampaignData';

// Static mock json data from ChatGPT
const campaignData = {
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
  }
};

const CampaignPage: React.FC = () => {

    // Static for mock, as it should be dynamic to the user's selected Campaign
    const selectedCampaign = campaignData.bower;

    return (
        <div>
            <IntroHeader 
                logo={selectedCampaign.logo}
                companyName={selectedCampaign.companyName}
                description={selectedCampaign.description}
            />
            <CampaignDetail campaignData={selectedCampaign.campaignData} />
            <BodyText/>
        </div>
    );
};

export default CampaignPage;