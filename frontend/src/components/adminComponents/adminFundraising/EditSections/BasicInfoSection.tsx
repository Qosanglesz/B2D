// // components/EditSections/BasicInfoSection.tsx

// import React from 'react';
// import { Campaign } from '@/types/Campaign';

// interface SectionProps {
//   campaign: Campaign;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
// }

// const BasicInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Basic Information</h2>
//       <div>
//         <label className="block mb-1">Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={campaign.name}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Description:</label>
//         <textarea
//           name="description"
//           value={campaign.description}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Status:</label>
//         <select
//           name="status"
//           value={campaign.status.toString()}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Status</option>
//           <option value="true">Active</option>
//           <option value="false">Closed</option>
//         </select>
//     </div>
//     </div>
    
//   );
// };

// export default BasicInfoSection;

// components/adminComponents/adminFundraising/EditSections/BasicInfoSection.tsx
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

const BasicInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
      <div className="space-y-6">
          <div className="grid gap-6">
              <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                      id="name"
                      name="name"
                      value={campaign.name}
                      onChange={onChange}
                      placeholder="Enter campaign name"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                      id="description"
                      name="description"
                      value={campaign.description}
                      onChange={onChange}
                      placeholder="Enter campaign description"
                      rows={4}
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                      name="status"
                      value={campaign.status.toString()}
                      onValueChange={(value) => {
                          onChange({
                              target: { name: 'status', value }
                          } as any)
                      }}
                  >
                      <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Closed</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </div>
      </div>
  );
};

export default BasicInfoSection;