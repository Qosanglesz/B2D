import { Suspense } from 'react';
import FundraisingCampaigns from "@/components/adminComponents/adminFundraising/FundraisingCampaigns";
import { LoadingError } from "@/components/homeComponents/LoadingError";

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

async function getCampaigns(accessToken: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
    }

    return response.json();
}

export default async function Page() {
    const accessToken = await getAccessToken();
    const campaigns = await getCampaigns(accessToken);

    return (
        <Suspense fallback={<LoadingError loading={true} error={null} />}>
            <FundraisingCampaigns
                initialCampaigns={campaigns}
            />
        </Suspense>
    );
}