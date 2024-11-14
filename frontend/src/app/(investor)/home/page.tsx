
// /src/app/(investor)/home/page.tsx

// Use client-side rendering for this page
'use client';

import React, { useEffect, useState } from "react";
import { Campaign } from '@/types/Campaign';
import Header from "@/components/homeComponents/Header";
import { LoadingError } from '@/components/homeComponents/LoadingError'; // Import the LoadingError component
import { CampaignGrid } from '@/components/homeComponents/CampaignGrid'; // Import the CampaignGrid component
import { ViewAllButton } from '@/components/homeComponents/ViewAllButton'; // Import the ViewAllButton component
import HeroSectionHome from '@/components/homeComponents/HeroSectionHome'; // Import HeroSectionHome component
import FeatureCards from '@/components/homeComponents/FeatureCards'; // Import FeatureCards component
import { cn } from "@/lib/utils";
import { FaDollarSign } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BiTime } from "react-icons/bi";

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


                        {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-4 md:py-8 text-center">
                            Fundraising Campaigns
                        </h1> */}

                        <div className="space-y-2 md:space-y-4">
                        {/* Heading */}
                            <h1 
                                className={cn(
                                "text-2xl sm:text-3xl md:text-4xl font-bold",
                                "py-4 md:py-8",
                                "text-center md:text-left",
                                "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                                )}
                            >
                                Fundraising Campaigns
                            </h1>
                        </div>

                        {/* Render the campaign grid with random campaigns */}

                        <CampaignGrid campaigns={randomCampaigns} />
                        <ViewAllButton viewAllLink={links.viewAll} />
                    </div>
                </>
            )}
        </>
    );
}
