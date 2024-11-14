'use client';

import React, { useEffect, useState } from "react";
import { LoadingError } from '@/components/campaignComponents/LoadingError';
import { Campaign } from '@/types/Campaign';
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import { Search } from "lucide-react";
import { Pagination, Input } from "@nextui-org/react";

const ITEMS_PER_PAGE = 9;

export default function CampaignPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

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

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold w-full sm:w-auto text-center sm:text-left">
                    Live Opportunities
                </h1>
                
                {/* Search Box - Full width on mobile, right-aligned on desktop */}
                <div className="w-full sm:w-auto">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startContent={
                            <Search className="text-default-400 w-4 h-4" />
                        }
                        size="sm"
                        classNames={{
                            base: "w-full sm:max-w-[180px] sm:ml-auto",
                            inputWrapper: "h-8 bg-default-100",
                        }}
                        variant="bordered"
                    />
                </div>
            </div>

            <LoadingError loading={loading} error={error}/>

            {!loading && !error && (
                <>
                    {filteredCampaigns.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                {currentCampaigns.map((campaign) => (
                                    <CampaignCard 
                                        key={campaign.id as string} 
                                        campaign={campaign}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6">
                                    <Pagination
                                        total={totalPages}
                                        page={currentPage}
                                        onChange={setCurrentPage}
                                        showControls
                                        color="primary"
                                        variant="bordered"
                                        classNames={{
                                            wrapper: "gap-2",
                                            item: "w-8 h-8",
                                        }}
                                    />
                                </div>
                            )}

                            {/* Results Counter */}
                            <div className="text-center mt-4 text-sm text-default-500">
                                Showing {startIndex + 1} to {Math.min(endIndex, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
                            </div>
                        </>
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
