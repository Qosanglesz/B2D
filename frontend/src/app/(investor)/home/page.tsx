
import Header from "../../../components/homeComponents/Header";
import CampaignCard from "@/components/campaignComponents/CapaignCard";
import React from "react";
import {mockCampaignsData} from "@/components/campaignComponents/TempCampaignData";

const links = {
    getStarted: "/api/auth/login",
    viewAll: "/campaign",
}
export default function Home() {
  return(
      <>
          <Header registerLink={links.getStarted}/>
          <div>
              <h1 className="text-2xl font-bold ml-20 my-8">Fundraising Campaign</h1>
              <div className="grid grid-cols-4 mx-5 gap-4">
                  {mockCampaignsData.campaigns.map(campaign => (
                      <CampaignCard key={campaign.id} campaign={campaign}/>
                  ))}
              </div>
              <div className="text-center py-10">
                  <a href={links.viewAll} className="text-xl text-white bg-gray-800 hover:bg-gray-900 py-3 px-7 rounded-lg">View
                      All</a>
              </div>
          </div>
      </>
  );
}
