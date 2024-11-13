'use client';

import React, { useEffect, useState } from "react";
import { LoadingError } from '@/components/campaignComponents/LoadingError';
import { Campaign } from '@/types/Campaign';
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import { Search } from "lucide-react"; // Optional: for search icon

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

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
                    Live Opportunities
                </h1>

                {/* Search Box */}
                <div className="w-full sm:w-auto min-w-[200px] sm:min-w-[300px] relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <LoadingError loading={loading} error={error}/>

            {!loading && !error && (
                <>
                    {filteredCampaigns.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredCampaigns.map((campaign) => (
                                <CampaignCard 
                                    key={campaign.id as string} 
                                    campaign={campaign}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-lg text-gray-600">
                                No campaigns found matching your search.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}