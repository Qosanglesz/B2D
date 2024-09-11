import React from 'react';
import IntroHeader from '../components/IntroHeader';
import CompanyInformation from '../components/CompanyInformation';

const campaignData = {
  bower: {
    logo: "https://picsum.photos/200/300",
    photo: "https://picsum.photos/1000/1000",
    companyName: "Bower",
    description: "Bower runs a smartphone app where consumer brands reward their customers for recycling their packages.",
    campaignData: {
      endDate: "30 Feb 2024",
      fundsRaised: "395,288",
      targetAmount: "475,000",
      investors: 258,
      businessOverview: {
        location: "Stockholm, Sweden",
        website: "getbower.com",
        sectors: ["SaaS/PaaS", "Digital", "Mixed B2B/B2C"],
        companyNumber: "559009-0378",
        incorporationDate: "27 Mar 2015",
        vision: "To revolutionize global recycling by empowering consumers and businesses with innovative, accessible technology—building a sustainable future where every package is responsibly recycled and rewarded."
      },
    }
  }
};

const CampaignPage: React.FC = () => {
  // Static for mock, as it should be dynamic to the user's selected Campaign
  const selectedCampaign = campaignData.bower;

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Header Section */}
        <IntroHeader
            logo={selectedCampaign.logo}
            companyName={selectedCampaign.companyName}
            description={selectedCampaign.description}
        />

        {/* Campaign Summary */}
        <div className="grid grid-cols-2 gap-6 m-4">
          <div className="">
            <img
                src={selectedCampaign.photo}
                alt="Company logo"
                className="w-full h-48 lg:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Funds Raised: ${selectedCampaign.campaignData.fundsRaised}
            </p>
            <p className="text-xl text-gray-600 mb-2">
              Target: ${selectedCampaign.campaignData.targetAmount}
            </p>
            <p className="text-lg text-gray-500 mb-4">
              {selectedCampaign.campaignData.investors} Investors
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
              Invest Now
            </button>
            <p className="text-lg text-gray-500 mt-8">End in {selectedCampaign.campaignData.endDate}</p>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="mt-12">
          <CompanyInformation campaignData={selectedCampaign.campaignData}/>
        </div>
      </div>
  );
};

export default CampaignPage;
