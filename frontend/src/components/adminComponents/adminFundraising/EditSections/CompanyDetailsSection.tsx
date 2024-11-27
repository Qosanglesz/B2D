// // components/EditSections/CompanyDetailsSection.tsx

// import React from 'react';
// import { Campaign } from '@/types/Campaign';

// interface SectionProps {
//   campaign: Campaign;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
// }

// const CompanyDetailsSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Company Details</h2>
//       <div>
//         <label className="block mb-1">Company Name:</label>
//         <input
//           type="text"
//           name="companyName"
//           value={campaign.companyName}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Website:</label>
//         <input
//           type="text"
//           name="website"
//           value={campaign.website}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Founder Name:</label>
//         <input
//           type="text"
//           name="founderName"
//           value={campaign.founderName}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={campaign.email}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">LinkedIn Profile:</label>
//         <input
//           type="text"
//           name="linkedInProfile"
//           value={campaign.linkedInProfile}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Company Stage:</label>
//         <input
//           type="text"
//           name="companyStage"
//           value={campaign.companyStage}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Industry:</label>
//         <input
//           type="text"
//           name="industry"
//           value={campaign.industry}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Sector:</label>
//         <input
//           type="text"
//           name="sector"
//           value={campaign.sector}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default CompanyDetailsSection;

// components/adminComponents/adminFundraising/EditSections/CompanyDetailsSection.tsx
import React from 'react';
import { Campaign } from '@/types/Campaign';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
  
  const SECTORS = [
    "Software Development",
    "Artificial Intelligence and Machine Learning",
    "Cybersecurity",
    "SaaS (Software as a Service)",
    "Medical Devices",
    "Biotechnology",
    "Telemedicine",
    "Health and Wellness Apps",
    "FinTech (Financial Technology)",
    "Blockchain and Cryptocurrency",
    "Investment Platforms",
    "Microfinance",
    "EdTech (Education Technology)",
    "Online Learning Platforms",
    "Skill Development Services",
    "Virtual and Augmented Reality for Education",
    "Online Marketplaces",
    "Direct-to-Consumer Brands",
    "Subscription Services",
    "Logistics and Supply Chain Solutions",
    "Renewable Energy (Solar, Wind, Hydro)",
    "Green Technology",
    "Waste Management Solutions",
    "Carbon Offsetting Platforms",
    "AgriTech (Smart Farming Solutions)",
    "Sustainable Food Production",
    "Food Delivery Services",
    "Alternative Proteins",
    "Game Development",
    "Streaming Platforms",
    "Content Creation Tools",
    "Digital Marketing Agencies",
    "PropTech (Property Technology)",
    "Smart Building Solutions",
    "Real Estate Investment Platforms",
    "Modular Construction",
    "Electric Vehicles (EV)",
    "Autonomous Driving",
    "Logistics Optimization Software",
    "Ride-Sharing Platforms",
    "Sustainable Fashion",
    "Personal Care and Wellness",
    "Jewelry and Accessories",
    "Niche Apparel",
    "Travel Tech (Booking Platforms)",
    "Eco-Tourism Ventures",
    "Hotel Management Software",
    "Experience-Based Travel",
    "Social Enterprises",
    "Crowdfunding Platforms for Social Causes",
    "Community Development Projects",
    "Charity and Volunteer Coordination"
];
  
interface SectionProps {
  campaign: Campaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


const CompanyDetailsSection: React.FC<SectionProps> = ({ campaign, onChange }) => {

    const handleSectorChange = (value: string) => {
        onChange({
            target: { name: 'sector', value }
        } as React.ChangeEvent<HTMLSelectElement>);
    };
    return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    name="companyName"
                    value={campaign.companyName}
                    onChange={onChange}
                    placeholder="Enter company name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                    id="website"
                    name="website"
                    value={campaign.website}
                    onChange={onChange}
                    placeholder="Enter website URL"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="founderName">Founder Name</Label>
                <Input
                    id="founderName"
                    name="founderName"
                    value={campaign.founderName}
                    onChange={onChange}
                    placeholder="Enter founder name"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={campaign.email}
                    onChange={onChange}
                    placeholder="Enter email address"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
                <Input
                    id="linkedInProfile"
                    name="linkedInProfile"
                    value={campaign.linkedInProfile}
                    onChange={onChange}
                    placeholder="Enter LinkedIn profile URL"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="companyStage">Company Stage</Label>
                <Input
                    id="companyStage"
                    name="companyStage"
                    value={campaign.companyStage}
                    onChange={onChange}
                    placeholder="Enter company stage"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                    id="industry"
                    name="industry"
                    value={campaign.industry}
                    onChange={onChange}
                    placeholder="Enter industry"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select
                    name="sector"
                    value={campaign.sector}
                    onValueChange={handleSectorChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {SECTORS.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                                {sector}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  );
};

export default CompanyDetailsSection;