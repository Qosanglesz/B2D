import React from 'react';
import { FundraisingCampaign } from '@/components/types/Campaign';

interface AdditionalInformationProps {
  formData: Partial<FundraisingCampaign>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleInvestorsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ formData, handleChange, handleInvestorsChange }) => {
  return (
    <section className="mb-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Additional Information</h3>
      <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" className="p-2 border rounded w-full h-24 mb-4" />
      <textarea name="companyVision" value={formData.companyVision || ''} onChange={handleChange} placeholder="Company Vision" className="p-2 border rounded w-full h-24 mb-4" />
      <input name="urlPicture" value={formData.urlPicture || ''} onChange={handleChange} placeholder="URL Picture" className="p-2 border rounded w-full mb-4" />
      <div>
        <h4 className="font-medium mb-2">Investors</h4>
        <input 
          name="investors" 
          value={formData.investors?.join(', ') || ''} 
          onChange={handleInvestorsChange} 
          placeholder="Investors (comma-separated)" 
          className="p-2 border rounded w-full"
        />
      </div>
    </section>
  );
};

export default AdditionalInformation;