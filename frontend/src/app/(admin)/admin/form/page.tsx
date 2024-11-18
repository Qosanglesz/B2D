import React from 'react';
import FundraisingCampaignFormClient from "@/components/formComponents/FundraisingCampaignFormClient";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getAccessToken() {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    });
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}

export default async function FundraisingCampaignFormPage() {
    const accessToken = await getAccessToken();

    return (
        <div className="container mx-auto px-4 py-8">
            <FundraisingCampaignFormClient accessToken={accessToken} />
        </div>
    );
}