import React from 'react';
import IntroHeader from '@/components/campaignComponents/IntroHeader';
import CompanyInformation from '@/components/campaignComponents/CompanyInformation';
import {mockCampaignsData} from "@/components/campaignComponents/TempCampaignData";

const campaign_example = {
  logo: "https://picsum.photos/200/300",
  photo: "https://picsum.photos/2000/2000",
  companyName: "Bower",
  description: "Bower runs a smartphone app where consumer brands reward their customers for recycling their packages.",
  startDate: "20 Feb 2024",
  endDate: "30 Feb 2024",
  fundsRaised: 395288,
  targetAmount: 475000,
  investors: 258,
  businessOverview: {
    location: "Stockholm, Sweden",
    website: "getbower.com",
    sectors: "Technologies",
    companyNumber: "559009-0378",
    incorporationDate: "27 Mar 2015",
    vision: "To revolutionize global recycling by empowering consumers and businesses with innovative, accessible technology—building a sustainable future where every package is responsibly recycled and rewarded."
  }
};

const campaign = mockCampaignsData.campaigns[0];

export default function home() {
  return (
      <div className="min-h-screen p-8 w-full">
        {/* Header Section */}
        <IntroHeader
            logo={campaign.logo}
            companyName={campaign.companyName}
            description={campaign.description}
        />

        {/* CampaignCardOld Summary */}
        <div className="grid grid-cols-2 gap-6 m-4">
          <div className="">
            <img
                src={campaign.photo}
                alt="Company logo"
                className="w-full h-48 lg:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-gray-800 mb-4">
              Funds Raised: ${campaign.fundsRaised}
            </p>
            <p className="text-2xl text-gray-600 mb-2">
              Target: ${campaign.targetAmount}
            </p>
            <p className="text-xl text-gray-500 mb-4">
              {campaign.investors} Investors
            </p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
              Invest Now
            </button>
            <p className="text-xl text-gray-500 mt-4">End in {campaign.endDate}</p>
          </div>
        </div>

        {/* CampaignCardOld Details */}
        <div className="mt-12">
          <CompanyInformation campaign={campaign}/>
        </div>
      </div>
  );
}
