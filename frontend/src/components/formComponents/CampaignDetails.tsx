import React from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface CampaignDetailsProps {
  formData: Partial<FundraisingCampaign>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ formData, handleChange }) => {
  return (
    <section className="mb-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Campaign Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          name="targetAmount" 
          type="number" 
          value={formData.targetAmount || ''} 
          onChange={handleChange} 
          placeholder="Target Amount" 
          className="p-2 border rounded" 
        />
        <input 
          name="amountRaised" 
          type="number" 
          value={formData.amountRaised || ''} 
          onChange={handleChange} 
          placeholder="Amount Raised" 
          className="p-2 border rounded" 
        />
        <select
          name="status"
          value={formData.status || ''}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
        <input 
          name="endInDate" 
          type="date" 
          value={formData.endInDate || ''} 
          onChange={handleChange} 
          placeholder="End Date" 
          className="p-2 border rounded" 
        />
      </div>
    </section>
  );
};

export default CampaignDetails;