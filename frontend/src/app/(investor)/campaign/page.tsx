'use client';

import React, { useEffect, useState } from "react";
import { LoadingError } from '@/components/campaignComponents/LoadingError';
import { Campaign } from '@/types/Campaign';
import CampaignCard from "@/components/campaignComponents/CampaignCard";


export default function CampaignPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/campaigns', {
                    cache: "no-store",
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch campaigns');
                }

                const data: Campaign[] = await response.json();
                setCampaigns(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    // Filter campaigns by search term
    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="campaign-list container max-w-6xl px-4 mx-auto py-8 min-h-screen">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    Live Opportunities
                </h1>

                <div className="">
                    <input
                        type="text"
                        placeholder="Search.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <LoadingError loading={loading} error={error}/>

            {!loading && !error && (
                <div className="grid grid-cols-3 gap-4">
                    {filteredCampaigns.length > 0 ? (
                        filteredCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign}/>
                        ))
                    ) : (
                        <p>No campaigns found</p>
                    )}
                </div>
            )}
        </div>
    );
}
