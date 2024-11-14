import React from "react";
import CampaignList from "@/components/campaignComponents/CampaignList";
import { Campaign } from '@/types/Campaign';


async function fetchCampaigns(): Promise<Campaign[]> {

    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    })
    const tokenData = await tokenResponse.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`, {
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
    }
    return response.json();
}

export default async function CampaignPage() {
    let campaigns: Campaign[] = [];
    let error: string | null = null;

    try {
        campaigns = await fetchCampaigns();
    } catch (err) {
        if (err instanceof Error) {
            error = err.message;
        } else {
            error = "An unknown error occurred";
        }
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-bold w-full sm:w-auto text-center sm:text-left mb-6">
                Live Opportunities
            </h1>
            {/* ส่งข้อมูลแคมเปญและ error ไปยัง Client Component */}
            <CampaignList campaigns={campaigns} error={error} />
        </div>
    );
}
