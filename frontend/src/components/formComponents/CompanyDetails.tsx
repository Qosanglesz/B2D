// import React from 'react';
// import {Campaign} from '@/types/Campaign';


// interface CompanyDetailsProps {
//     formData: Partial<Campaign>;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const CompanyDetails: React.FC<CompanyDetailsProps> = ({formData, handleChange, handleCheckboxChange}) => {
//     return (
//         <section className="mb-6 bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-xl font-medium mb-2">Company Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input name="companyStage" value={formData.companyStage || ''} onChange={handleChange}
//                        placeholder="Company Stage" className="p-2 border rounded"/>
//                 <input name="industry" value={formData.industry || ''} onChange={handleChange} placeholder="Industry"
//                        className="p-2 border rounded"/>
//                 <input name="sector" value={formData.sector || ''} onChange={handleChange} placeholder="Sector"
//                        className="p-2 border rounded"/>
//                 <input name="teamSize" type="number" value={formData.teamSize || ''} onChange={handleChange}
//                        placeholder="Team Size" className="p-2 border rounded"/>
//                 <input name="headquartersLocation" value={formData.headquartersLocation || ''} onChange={handleChange}
//                        placeholder="Headquarters Location" className="p-2 border rounded"/>
//                 <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location"
//                        className="p-2 border rounded"/>
//                 <input name="incorporationDate" type="date" value={formData.incorporationDate || ''}
//                        onChange={handleChange} placeholder="Incorporation Date" className="p-2 border rounded"/>
//                 <input name="companyNumber" value={formData.companyNumber || ''} onChange={handleChange}
//                        placeholder="Company Number" className="p-2 border rounded"/>
//             </div>
//             <div className="mt-4">
//                 <label className="flex items-center">
//                     <input
//                         name="productAvailable"
//                         type="checkbox"
//                         checked={formData.productAvailable || false}
//                         onChange={handleCheckboxChange}
//                         className="mr-2"
//                     />
//                     Product Available
//                 </label>
//             </div>
//         </section>
//     );
// };

// export default CompanyDetails;
// CompanyDetails.tsx
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Campaign } from '@/types/Campaign';
import { 
  Building2, 
  Factory, 
  Layers, 
  Users, 
  MapPin, 
  Map, 
  Calendar, 
  Hash,
  Package
} from "lucide-react";

interface CompanyDetailsProps {
    formData: Partial<Campaign>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSectorChange: (value: string) => void; // Add this line
  }

type SectorOption = {
    value: string;
    label: string;
};
  
const sectorOptions: SectorOption[] = [
    { value: "Software Development", label: "Software Development" },
    { value: "Artificial Intelligence and Machine Learning", label: "Artificial Intelligence and Machine Learning" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "SaaS (Software as a Service)", label: "SaaS (Software as a Service)" },
    { value: "Medical Devices", label: "Medical Devices" },
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Telemedicine", label: "Telemedicine" },
    { value: "Health and Wellness Apps", label: "Health and Wellness Apps" },
    { value: "FinTech (Financial Technology)", label: "FinTech (Financial Technology)" },
    { value: "Blockchain and Cryptocurrency", label: "Blockchain and Cryptocurrency" },
    { value: "Investment Platforms", label: "Investment Platforms" },
    { value: "Microfinance", label: "Microfinance" },
    { value: "EdTech (Education Technology)", label: "EdTech (Education Technology)" },
    { value: "Online Learning Platforms", label: "Online Learning Platforms" },
    { value: "Skill Development Services", label: "Skill Development Services" },
    { value: "Virtual and Augmented Reality for Education", label: "Virtual and Augmented Reality for Education" },
    { value: "Online Marketplaces", label: "Online Marketplaces" },
    { value: "Direct-to-Consumer Brands", label: "Direct-to-Consumer Brands" },
    { value: "Subscription Services", label: "Subscription Services" },
    { value: "Logistics and Supply Chain Solutions", label: "Logistics and Supply Chain Solutions" },
    { value: "Renewable Energy (Solar, Wind, Hydro)", label: "Renewable Energy (Solar, Wind, Hydro)" },
    { value: "Green Technology", label: "Green Technology" },
    { value: "Waste Management Solutions", label: "Waste Management Solutions" },
    { value: "Carbon Offsetting Platforms", label: "Carbon Offsetting Platforms" },
    { value: "AgriTech (Smart Farming Solutions)", label: "AgriTech (Smart Farming Solutions)" },
    { value: "Sustainable Food Production", label: "Sustainable Food Production" },
    { value: "Food Delivery Services", label: "Food Delivery Services" },
    { value: "Alternative Proteins", label: "Alternative Proteins" },
    { value: "Game Development", label: "Game Development" },
    { value: "Streaming Platforms", label: "Streaming Platforms" },
    { value: "Content Creation Tools", label: "Content Creation Tools" },
    { value: "Digital Marketing Agencies", label: "Digital Marketing Agencies" },
    { value: "PropTech (Property Technology)", label: "PropTech (Property Technology)" },
    { value: "Smart Building Solutions", label: "Smart Building Solutions" },
    { value: "Real Estate Investment Platforms", label: "Real Estate Investment Platforms" },
    { value: "Modular Construction", label: "Modular Construction" },
    { value: "Electric Vehicles (EV)", label: "Electric Vehicles (EV)" },
    { value: "Autonomous Driving", label: "Autonomous Driving" },
    { value: "Logistics Optimization Software", label: "Logistics Optimization Software" },
    { value: "Ride-Sharing Platforms", label: "Ride-Sharing Platforms" },
    { value: "Sustainable Fashion", label: "Sustainable Fashion" },
    { value: "Personal Care and Wellness", label: "Personal Care and Wellness" },
    { value: "Jewelry and Accessories", label: "Jewelry and Accessories" },
    { value: "Niche Apparel", label: "Niche Apparel" },
    { value: "Travel Tech (Booking Platforms)", label: "Travel Tech (Booking Platforms)" },
    { value: "Eco-Tourism Ventures", label: "Eco-Tourism Ventures" },
    { value: "Hotel Management Software", label: "Hotel Management Software" },
    { value: "Experience-Based Travel", label: "Experience-Based Travel" },
    { value: "Social Enterprises", label: "Social Enterprises" },
    { value: "Crowdfunding Platforms for Social Causes", label: "Crowdfunding Platforms for Social Causes" },
    { value: "Community Development Projects", label: "Community Development Projects" },
    { value: "Charity and Volunteer Coordination", label: "Charity and Volunteer Coordination" },
];

const CompanyDetails: React.FC<CompanyDetailsProps> = ({formData, handleChange, handleCheckboxChange, handleSectorChange}) => {
  return (
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Details
              </CardTitle>
          </CardHeader>
          <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="companyStage" className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Company Stage
                        </Label>
                        <div className="relative">
                            <Input
                                id="companyStage"
                                name="companyStage"
                                value={formData.companyStage || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Building2 className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="industry" className="flex items-center gap-2">
                            <Factory className="w-4 h-4" />
                            Industry
                        </Label>
                        <div className="relative">
                            <Input
                                id="industry"
                                name="industry"
                                value={formData.industry || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Factory className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                            <Label htmlFor="sector" className="flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                Sector
                            </Label>
                            <Select
                                value={formData.sector || ''}
                                onValueChange={handleSectorChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a sector" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px] overflow-y-auto">
                                    {sectorOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    <div className="space-y-2">
                        <Label htmlFor="teamSize" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Size
                        </Label>
                        <div className="relative">
                            <Input
                                id="teamSize"
                                name="teamSize"
                                type="number"
                                value={formData.teamSize || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Users className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="headquartersLocation" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Headquarters Location
                        </Label>
                        <div className="relative">
                            <Input
                                id="headquartersLocation"
                                name="headquartersLocation"
                                value={formData.headquartersLocation || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <MapPin className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-2">
                            <Map className="w-4 h-4" />
                            Location
                        </Label>
                        <div className="relative">
                            <Input
                                id="location"
                                name="location"
                                value={formData.location || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Map className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="incorporationDate" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Incorporation Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="incorporationDate"
                                name="incorporationDate"
                                type="date"
                                value={formData.incorporationDate || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Calendar className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyNumber" className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Company Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="companyNumber"
                                name="companyNumber"
                                value={formData.companyNumber || ''}
                                onChange={handleChange}
                                className="pl-8"
                            />
                            <Hash className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="productAvailable"
                                name="productAvailable"
                                checked={formData.productAvailable || false}
                                onCheckedChange={(checked) => 
                                    handleCheckboxChange({
                                        target: { 
                                            name: 'productAvailable', 
                                            checked: checked as boolean 
                                        }
                                    } as any)
                                }
                            />
                            <Label htmlFor="productAvailable" className="flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Product Available
                            </Label>
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>
  );
};

export default CompanyDetails;