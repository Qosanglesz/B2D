// // components/EditSections/FinancialInfoSection.tsx

// import React from 'react';
// import { Campaign } from '@/types/Campaign';

// interface SectionProps {
//   campaign: Campaign;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const FinancialInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Financial Information</h2>
//       <div>
//         <label className="block mb-1">Amount Raised:</label>
//         <input
//           type="number"
//           name="amountRaised"
//           value={campaign.amountRaised}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Target Amount:</label>
//         <input
//           type="number"
//           name="targetAmount"
//           value={campaign.targetAmount}
//           onChange={onChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default FinancialInfoSection;

// components/adminComponents/adminFundraising/EditSections/FinancialInfoSection.tsx
import React from 'react';
import { Campaign } from '@/types/Campaign';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SectionProps {
  campaign: Campaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FinancialInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
      <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                  <Label htmlFor="amountRaised">Amount Raised</Label>
                  <Input
                      id="amountRaised"
                      type="number"
                      name="amountRaised"
                      value={campaign.amountRaised}
                      onChange={onChange}
                      placeholder="Enter amount raised"
                  />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input
                      id="targetAmount"
                      type="number"
                      name="targetAmount"
                      value={campaign.targetAmount}
                      onChange={onChange}
                      placeholder="Enter target amount"
                  />
              </div>
          </div>
      </div>
  );
};

export default FinancialInfoSection;