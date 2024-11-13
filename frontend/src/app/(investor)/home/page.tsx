// src/app/page.tsx (หรือโฟลเดอร์ที่คุณเก็บหน้า home)
import React from "react";
import { Campaign } from "@/types/Campaign";
import { LoadingError } from "@/components/homeComponents/LoadingError";
import { CampaignGrid } from "@/components/homeComponents/CampaignGrid";
import { ViewAllButton } from "@/components/homeComponents/ViewAllButton";
import HeroSectionHome from "@/components/homeComponents/HeroSectionHome";
import FeatureCards from "@/components/homeComponents/FeatureCards";

// Define the links for authentication and viewing all campaigns
const links = {
    getStarted: "/api/auth/login", // Login link
    viewAll: "/campaign", // Link to view all campaigns
};

// ทำให้ฟังก์ชันนี้เป็น async เพื่อใช้การดึงข้อมูลแบบ SSR
export default async function Home() {
    let campaigns: Campaign[] = [];
    let error: string | null = null;

    try {
        // Fetch access token server-side
        const tokenResponse = await fetch(`http://localhost:3000/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || ""
            }
        });

        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok || !tokenData.access_token) {
            throw new Error("Failed to retrieve access token");
        }

        // Fetch campaigns using the access token
        const response = await fetch(`http://localhost:3000/api/campaigns`, {
            headers: {
                authorization: `Bearer ${tokenData.access_token}`
            },
            cache: "no-store" // ทำให้ข้อมูลใหม่ทุกครั้ง
        });

        if (!response.ok) {
            throw new Error("Failed to fetch campaigns");
        }

        campaigns = await response.json();
    } catch (err: unknown) {
        if (err instanceof Error) {
            error = err.message;
        } else {
            error = "An unknown error occurred";
        }
    }

    // Randomly shuffle the campaigns array and limit to 3 campaigns
    const randomCampaigns = campaigns
        .sort(() => Math.random() - 0.5) // Shuffle the campaigns
        .slice(0, 4);  // Take the first 4 shuffled campaigns

    return (
        <>
            <LoadingError loading={false} error={error} />
            {/* Only render the content below if no error */}
            {!error && (
                <>
                    <HeroSectionHome registerLink={links.getStarted} />
                    <div className="max-w-7xl mx-auto">
                        <FeatureCards />
                        <h1 className="text-4xl font-bold py-8">Fundraising Campaigns</h1>
                        <CampaignGrid campaigns={randomCampaigns} />
                        <ViewAllButton viewAllLink={links.viewAll} />
                    </div>
                </>
            )}
        </>
    );
}
