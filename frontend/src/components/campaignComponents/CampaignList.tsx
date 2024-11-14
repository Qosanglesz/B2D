"use client";

import React, {useState} from "react";
import {Campaign} from "@/types/Campaign";
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import {Search} from "lucide-react";
import {Pagination, Input} from "@nextui-org/react";

interface CampaignListProps {
    campaigns: Campaign[];
    error: string | null;
}

const ITEMS_PER_PAGE = 9;

export default function CampaignList({campaigns, error}: CampaignListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter campaigns based on the search term
    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    return (
        <>
            {/* Search Box */}
            <div className="flex justify-end mb-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search className="text-default-400 w-4 h-4"/>}
                    size="sm"
                    classNames={{
                        base: "w-full sm:max-w-[180px]",
                        inputWrapper: "h-8 bg-default-100",
                    }}
                    variant="bordered"
                />
            </div>

            {/* Error Display */}
            {error && (
                <div className="text-center text-red-500 py-4">
                    {error}
                </div>
            )}

            {/* Campaign Cards Display */}
            {filteredCampaigns.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                        {currentCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id as string} campaign={campaign}/>
                        ))}
                    </div>

                    {/* Pagination Controls */}
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
    );
}
