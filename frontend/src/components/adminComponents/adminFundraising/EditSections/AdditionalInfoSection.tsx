// // components/EditSections/AdditionalInfoSection.tsx

// import React from 'react';
// import { Campaign } from '@/types/Campaign';

// interface SectionProps {
//   campaign: Campaign;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
// }

// const AdditionalInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Additional Information</h2>
//       <div>
//         <label className="block mb-1">Team Size:</label>
//         <input
//           type="number"
//           name="teamSize"
//           value={campaign.teamSize}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Headquarters Location:</label>
//         <input
//           type="text"
//           name="headquartersLocation"
//           value={campaign.headquartersLocation}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Product Available:</label>
//         <select
//           name="productAvailable"
//           value={campaign.productAvailable.toString()}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       </div>
//       <div>
//         <label className="block mb-1">Location:</label>
//         <input
//           type="text"
//           name="location"
//           value={campaign.location}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Incorporation Date:</label>
//         <input
//           type="date"
//           name="incorporationDate"
//           value={campaign.incorporationDate.split('T')[0]}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Company Vision:</label>
//         <input
//           type="date"
//           name="End In Date"
//           value={campaign.endInDate.split('T')[0]}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Investors (comma-separated):</label>
//         <input
//           type="text"
//           name="investors"
//           value={campaign.investors.join(', ')}
//           onChange={(e) => {
//             const modifiedEvent = {
//               ...e,
//               target: {
//                 ...e.target,
//                 value: e.target.value.split(', ')
//               }
//             } as unknown as React.ChangeEvent<HTMLInputElement>;
//             onChange(modifiedEvent);
//           }}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Company Number:</label>
//         <input
//           type="text"
//           name="companyNumber"
//           value={campaign.companyNumber}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Company Vision:</label>
//         <textarea
//           name="companyVision"
//           value={campaign.companyVision}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default AdditionalInfoSection;

// components/adminComponents/adminFundraising/EditSections/AdditionalInfoSection.tsx
import React from 'react';
import { Campaign } from '@/types/Campaign';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SectionProps {
  campaign: Campaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
      <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                      id="teamSize"
                      type="number"
                      name="teamSize"
                      value={campaign.teamSize}
                      onChange={onChange}
                      placeholder="Enter team size"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="headquartersLocation">Headquarters Location</Label>
                  <Input
                      id="headquartersLocation"
                      name="headquartersLocation"
                      value={campaign.headquartersLocation}
                      onChange={onChange}
                      placeholder="Enter headquarters location"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="productAvailable">Product Available</Label>
                  <Select
                      name="productAvailable"
                      value={campaign.productAvailable.toString()}
                      onValueChange={(value) => {
                          onChange({
                              target: { name: 'productAvailable', value }
                          } as any)
                      }}
                  >
                      <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                      id="location"
                      name="location"
                      value={campaign.location}
                      onChange={onChange}
                      placeholder="Enter location"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="incorporationDate">Incorporation Date</Label>
                  <Input
                      id="incorporationDate"
                      type="date"
                      name="incorporationDate"
                      value={campaign.incorporationDate.split('T')[0]}
                      onChange={onChange}
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="endInDate">End Date</Label>
                  <Input
                      id="endInDate"
                      type="date"
                      name="endInDate"
                      value={campaign.endInDate.split('T')[0]}
                      onChange={onChange}
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="investors">Investors</Label>
                  <Input
                      id="investors"
                      name="investors"
                      value={campaign.investors.join(', ')}
                      onChange={onChange}
                      placeholder="Enter investors (comma-separated)"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="companyNumber">Company Number</Label>
                  <Input
                      id="companyNumber"
                      name="companyNumber"
                      value={campaign.companyNumber}
                      onChange={onChange}
                      placeholder="Enter company number"
                  />
              </div>

              <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyVision">Company Vision</Label>
                  <Textarea
                      id="companyVision"
                      name="companyVision"
                      value={campaign.companyVision}
                      onChange={onChange}
                      placeholder="Enter company vision"
                      rows={4}
                  />
              </div>
          </div>
      </div>
  );
};

export default AdditionalInfoSection;