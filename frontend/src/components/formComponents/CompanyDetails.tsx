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
    { value: "software_development", label: "Software Development" },
    { value: "ai_ml", label: "Artificial Intelligence and Machine Learning" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "saas", label: "SaaS (Software as a Service)" },
    { value: "medical_devices", label: "Medical Devices" },
    { value: "biotechnology", label: "Biotechnology" },
    { value: "telemedicine", label: "Telemedicine" },
    { value: "health_wellness_apps", label: "Health and Wellness Apps" },
    { value: "fintech", label: "FinTech (Financial Technology)" },
    { value: "blockchain_crypto", label: "Blockchain and Cryptocurrency" },
    { value: "investment_platforms", label: "Investment Platforms" },
    { value: "microfinance", label: "Microfinance" },
    { value: "edtech", label: "EdTech (Education Technology)" },
    { value: "online_learning", label: "Online Learning Platforms" },
    { value: "skill_development", label: "Skill Development Services" },
    { value: "vr_ar_education", label: "Virtual and Augmented Reality for Education" },
    { value: "online_marketplaces", label: "Online Marketplaces" },
    { value: "dtc_brands", label: "Direct-to-Consumer Brands" },
    { value: "subscription_services", label: "Subscription Services" },
    { value: "logistics_supply_chain", label: "Logistics and Supply Chain Solutions" },
    { value: "renewable_energy", label: "Renewable Energy (Solar, Wind, Hydro)" },
    { value: "green_technology", label: "Green Technology" },
    { value: "waste_management", label: "Waste Management Solutions" },
    { value: "carbon_offsetting", label: "Carbon Offsetting Platforms" },
    { value: "agritech", label: "AgriTech (Smart Farming Solutions)" },
    { value: "sustainable_food", label: "Sustainable Food Production" },
    { value: "food_delivery", label: "Food Delivery Services" },
    { value: "alternative_proteins", label: "Alternative Proteins" },
    { value: "game_development", label: "Game Development" },
    { value: "streaming_platforms", label: "Streaming Platforms" },
    { value: "content_creation", label: "Content Creation Tools" },
    { value: "digital_marketing", label: "Digital Marketing Agencies" },
    { value: "proptech", label: "PropTech (Property Technology)" },
    { value: "smart_building", label: "Smart Building Solutions" },
    { value: "real_estate_platforms", label: "Real Estate Investment Platforms" },
    { value: "modular_construction", label: "Modular Construction" },
    { value: "electric_vehicles", label: "Electric Vehicles (EV)" },
    { value: "autonomous_driving", label: "Autonomous Driving" },
    { value: "logistics_optimization", label: "Logistics Optimization Software" },
    { value: "ride_sharing", label: "Ride-Sharing Platforms" },
    { value: "sustainable_fashion", label: "Sustainable Fashion" },
    { value: "personal_care", label: "Personal Care and Wellness" },
    { value: "jewelry_accessories", label: "Jewelry and Accessories" },
    { value: "niche_apparel", label: "Niche Apparel" },
    { value: "travel_tech", label: "Travel Tech (Booking Platforms)" },
    { value: "eco_tourism", label: "Eco-Tourism Ventures" },
    { value: "hotel_management", label: "Hotel Management Software" },
    { value: "experience_travel", label: "Experience-Based Travel" },
    { value: "social_enterprises", label: "Social Enterprises" },
    { value: "crowdfunding", label: "Crowdfunding Platforms for Social Causes" },
    { value: "community_development", label: "Community Development Projects" },
    { value: "charity_volunteer", label: "Charity and Volunteer Coordination" },
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