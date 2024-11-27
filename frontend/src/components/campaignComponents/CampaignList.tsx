// "use client";

// import React, {useState} from "react";
// import {Campaign} from "@/types/Campaign";
// import CampaignCard from "@/components/campaignComponents/CampaignCard";
// import {Search} from "lucide-react";
// import {Pagination, Input} from "@nextui-org/react";

// interface CampaignListProps {
//     campaigns: Campaign[];
//     error: string | null;
// }

// const ITEMS_PER_PAGE = 9;

// export default function CampaignList({campaigns, error}: CampaignListProps) {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     // Filter campaigns based on the search term
//     const filteredCampaigns = campaigns.filter((campaign) =>
//         campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

//     return (
//         <>
//             {/* Search Box */}
//             <div className="flex justify-end mb-6">
//                 <Input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     startContent={<Search className="text-default-400 w-4 h-4"/>}
//                     size="sm"
//                     classNames={{
//                         base: "w-full sm:max-w-[180px]",
//                         inputWrapper: "h-8 bg-default-100",
//                     }}
//                     variant="bordered"
//                 />
//             </div>

//             {/* Error Display */}
//             {error && (
//                 <div className="text-center text-red-500 py-4">
//                     {error}
//                 </div>
//             )}

//             {/* Campaign Cards Display */}
//             {filteredCampaigns.length > 0 ? (
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                         {currentCampaigns.map((campaign) => (
//                             <CampaignCard key={campaign.id as string} campaign={campaign}/>
//                         ))}
//                     </div>

//                     {/* Pagination Controls */}
//                     {totalPages > 1 && (
//                         <div className="flex justify-center mt-6">
//                             <Pagination
//                                 total={totalPages}
//                                 page={currentPage}
//                                 onChange={setCurrentPage}
//                                 showControls
//                                 color="primary"
//                                 variant="bordered"
//                                 classNames={{
//                                     wrapper: "gap-2",
//                                     item: "w-8 h-8",
//                                 }}
//                             />
//                         </div>
//                     )}

//                     {/* Results Counter */}
//                     <div className="text-center mt-4 text-sm text-default-500">
//                         Showing {startIndex + 1} to {Math.min(endIndex, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
//                     </div>
//                 </>
//             ) : (
//                 <div className="text-center py-10">
//                     <p className="text-lg text-gray-600">
//                         No campaigns found matching your search.
//                     </p>
//                 </div>
//             )}
//         </>
//     );
// }
"use client";

import React, {useState} from "react";
import {Campaign} from "@/types/Campaign";
import CampaignCard from "@/components/campaignComponents/CampaignCard";
import {Search} from "lucide-react";
import {Pagination, Input, Select, SelectItem} from "@nextui-org/react";

interface CampaignListProps {
  campaigns: Campaign[];
  error: string | null;
}

const ITEMS_PER_PAGE = 9;

const SECTORS = [
    { label: "All Sectors", value: "all" },
    { label: "Software Development", value: "Software Development" },
    { label: "Artificial Intelligence and Machine Learning", value: "Artificial Intelligence and Machine Learning" },
    { label: "Cybersecurity", value: "Cybersecurity" },
    { label: "SaaS (Software as a Service)", value: "SaaS (Software as a Service)" },
    { label: "Medical Devices", value: "Medical Devices" },
    { label: "Biotechnology", value: "Biotechnology" },
    { label: "Telemedicine", value: "Telemedicine" },
    { label: "Health and Wellness Apps", value: "Health and Wellness Apps" },
    { label: "FinTech (Financial Technology)", value: "FinTech (Financial Technology)" },
    { label: "Blockchain and Cryptocurrency", value: "Blockchain and Cryptocurrency" },
    { label: "Investment Platforms", value: "Investment Platforms" },
    { label: "Microfinance", value: "Microfinance" },
    { label: "EdTech (Education Technology)", value: "EdTech (Education Technology)" },
    { label: "Online Learning Platforms", value: "Online Learning Platforms" },
    { label: "Skill Development Services", value: "Skill Development Services" },
    { label: "Virtual and Augmented Reality for Education", value: "Virtual and Augmented Reality for Education" },
    { label: "Online Marketplaces", value: "Online Marketplaces" },
    { label: "Direct-to-Consumer Brands", value: "Direct-to-Consumer Brands" },
    { label: "Subscription Services", value: "Subscription Services" },
    { label: "Logistics and Supply Chain Solutions", value: "Logistics and Supply Chain Solutions" },
    { label: "Renewable Energy (Solar, Wind, Hydro)", value: "Renewable Energy (Solar, Wind, Hydro)" },
    { label: "Green Technology", value: "Green Technology" },
    { label: "Waste Management Solutions", value: "Waste Management Solutions" },
    { label: "Carbon Offsetting Platforms", value: "Carbon Offsetting Platforms" },
    { label: "AgriTech (Smart Farming Solutions)", value: "AgriTech (Smart Farming Solutions)" },
    { label: "Sustainable Food Production", value: "Sustainable Food Production" },
    { label: "Food Delivery Services", value: "Food Delivery Services" },
    { label: "Alternative Proteins", value: "Alternative Proteins" },
    { label: "Game Development", value: "Game Development" },
    { label: "Streaming Platforms", value: "Streaming Platforms" },
    { label: "Content Creation Tools", value: "Content Creation Tools" },
    { label: "Digital Marketing Agencies", value: "Digital Marketing Agencies" },
    { label: "PropTech (Property Technology)", value: "PropTech (Property Technology)" },
    { label: "Smart Building Solutions", value: "Smart Building Solutions" },
    { label: "Real Estate Investment Platforms", value: "Real Estate Investment Platforms" },
    { label: "Modular Construction", value: "Modular Construction" },
    { label: "Electric Vehicles (EV)", value: "Electric Vehicles (EV)" },
    { label: "Autonomous Driving", value: "Autonomous Driving" },
    { label: "Logistics Optimization Software", value: "Logistics Optimization Software" },
    { label: "Ride-Sharing Platforms", value: "Ride-Sharing Platforms" },
    { label: "Sustainable Fashion", value: "Sustainable Fashion" },
    { label: "Personal Care and Wellness", value: "Personal Care and Wellness" },
    { label: "Jewelry and Accessories", value: "Jewelry and Accessories" },
    { label: "Niche Apparel", value: "Niche Apparel" },
    { label: "Travel Tech (Booking Platforms)", value: "Travel Tech (Booking Platforms)" },
    { label: "Eco-Tourism Ventures", value: "Eco-Tourism Ventures" },
    { label: "Hotel Management Software", value: "Hotel Management Software" },
    { label: "Experience-Based Travel", value: "Experience-Based Travel" },
    { label: "Social Enterprises", value: "Social Enterprises" },
    { label: "Crowdfunding Platforms for Social Causes", value: "Crowdfunding Platforms for Social Causes" },
    { label: "Community Development Projects", value: "Community Development Projects" },
    { label: "Charity and Volunteer Coordination", value: "Charity and Volunteer Coordination" },
    { label: "Car", value: "Car"}
];

export default function CampaignList({campaigns, error}: CampaignListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSector, setSelectedSector] = useState<string>("all"); // Default to "all"
    const [currentPage, setCurrentPage] = useState(1);
  
    // Filter campaigns based on the search term and selected sector
    const filteredCampaigns = campaigns.filter((campaign) => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSector = selectedSector === "all" || campaign.sector === selectedSector;
        return matchesSearch && matchesSector;
    });
  
    // Pagination calculations
    const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);
  
    return (
        <>
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6">
                <Select
                    label="Filter by Sector"
                    selectedKeys={[selectedSector]}
                    className="w-full sm:max-w-[300px]"
                    onChange={(e) => {
                        setSelectedSector(e.target.value);
                        setCurrentPage(1);
                    }}
                    variant="bordered"
                    size="sm"
                >
                    {SECTORS.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                            {sector.label}
                        </SelectItem>
                    ))}
                </Select>
  
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
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
                        No campaigns found matching your criteria.
                    </p>
                </div>
            )}
        </>
    );
}
