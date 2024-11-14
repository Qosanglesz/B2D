import {Campaign} from '@/types/Campaign';
import {LoadingError} from '@/components/homeComponents/LoadingError';
import {CampaignGrid} from '@/components/homeComponents/CampaignGrid';
import {ViewAllButton} from '@/components/homeComponents/ViewAllButton';
import HeroSectionHome from '@/components/homeComponents/HeroSectionHome';
import FeatureCards from '@/components/homeComponents/FeatureCards';
import {cn} from "@/lib/utils";

const links = {
    getStarted: "/api/auth/login",
    viewAll: "/campaign",
};


export default async function Home() {
    let campaigns: Campaign[] = [];
    let error: string | null = null;

    try {
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || ""
            }
        });

        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok || !tokenData.access_token) {
            throw new Error("Failed to retrieve access token");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaigns`, {
            headers: {
                authorization: `Bearer ${tokenData.access_token}`
            },
            cache: "no-store"
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

    const randomCampaigns = campaigns
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    return (
        <>
            <LoadingError loading={false} error={error}/>
            {!error && (
                <>
                    <HeroSectionHome registerLink={links.getStarted}/>
                    <div className="max-w-7xl mx-auto">
                        <FeatureCards/>
                        <div className="space-y-2 md:space-y-4">

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
                        <CampaignGrid campaigns={randomCampaigns}/>
                        <ViewAllButton viewAllLink={links.viewAll}/>
                    </div>
                </>
            )}
        </>
    );
}
