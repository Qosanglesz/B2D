import React from "react";
import CampaignContent from "@/components/campaignComponents/CampaignContent";
import {Campaign} from '@/types/Campaign';

interface CampaignProps {
    params: { id: string };
}

async function fetchCampaign(campaignId: string): Promise<Campaign> {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    })
    const tokenData = await tokenResponse.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${campaignId}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campaign data");
    }
    return response.json();
}

export default async function CampaignPage({params}: CampaignProps) {
    const campaignId = params.id;

    let campaign: Campaign | null = null;
    let error: string | null = null;

    try {
        campaign = await fetchCampaign(campaignId);
    } catch (err) {
        error = "Error fetching campaign data";
        console.error(err);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <CampaignContent campaign={campaign} error={error}/>
            </div>
        </div>
    );
}
