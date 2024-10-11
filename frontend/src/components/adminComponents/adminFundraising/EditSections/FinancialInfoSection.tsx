// components/EditSections/FinancialInfoSection.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/Campaign';

interface SectionProps {
  campaign: FundraisingCampaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FinancialInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Financial Information</h2>
      <div>
        <label className="block mb-1">Amount Raised:</label>
        <input
          type="number"
          name="amountRaised"
          value={campaign.amountRaised}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Target Amount:</label>
        <input
          type="number"
          name="targetAmount"
          value={campaign.targetAmount}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default FinancialInfoSection;