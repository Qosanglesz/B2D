// import React from 'react';
// import {Campaign} from '@/types/Campaign';

// interface CampaignDetailsProps {
//     formData: Partial<Campaign>;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// const CampaignDetails: React.FC<CampaignDetailsProps> = ({formData, handleChange}) => {
//     return (
//         <section className="mb-6 bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-xl font-medium mb-2">Campaign Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                     name="targetAmount"
//                     type="number"
//                     value={formData.targetAmount || ''}
//                     onChange={handleChange}
//                     placeholder="Target Amount"
//                     className="p-2 border rounded"
//                 />
//                 <input
//                     name="amountRaised"
//                     type="number"
//                     value={formData.amountRaised || ''}
//                     onChange={handleChange}
//                     placeholder="Amount Raised"
//                     className="p-2 border rounded"
//                 />
//                 <label htmlFor="status" className="sr-only">Status</label>
//                 <select
//                     id="status"
//                     name="status"
//                     value={formData.status || ''}
//                     onChange={handleChange}
//                     className="p-2 border rounded"
//                 >
//                     <option value="">Select Status</option>
//                     <option value="Active">Active</option>
//                     <option value="Closed">Closed</option>
//                 </select>
//                 <input
//                     name="endInDate"
//                     type="date"
//                     value={formData.endInDate || ''}
//                     onChange={handleChange}
//                     placeholder="End Date"
//                     className="p-2 border rounded"
//                 />
//             </div>
//         </section>
//     );
// };

// export default CampaignDetails;

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Campaign } from '@/types/Campaign';
import { 
  Target, 
  DollarSign, 
  ActivitySquare, 
  Calendar 
} from "lucide-react";

interface CampaignDetailsProps {
  formData: Partial<Campaign>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({formData, handleChange}) => {
  return (
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Campaign Details
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="targetAmount" className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Target Amount
                      </Label>
                      <div className="relative">
                          <Input
                              id="targetAmount"
                              name="targetAmount"
                              type="number"
                              value={formData.targetAmount || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="amountRaised" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Amount Raised
                      </Label>
                      <div className="relative">
                          <Input
                              id="amountRaised"
                              name="amountRaised"
                              type="number"
                              value={formData.amountRaised || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="status" className="flex items-center gap-2">
                          <ActivitySquare className="w-4 h-4" />
                          Status
                      </Label>
                      <Select
                          value={formData.status || ''}
                          onValueChange={(value) => 
                              handleChange({
                                  target: { name: 'status', value }
                              } as any)
                          }
                      >
                          <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="endInDate" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          End Date
                      </Label>
                      <div className="relative">
                          <Input
                              id="endInDate"
                              name="endInDate"
                              type="date"
                              value={formData.endInDate || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <Calendar className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>
  );
};

export default CampaignDetails;