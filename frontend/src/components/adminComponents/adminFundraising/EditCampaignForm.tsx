// components/EditCampaignForm.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';
import BasicInfoSection from './EditSections/BasicInfoSection';
import CompanyDetailsSection from './EditSections/CompanyDetailsSection';
import FinancialInfoSection from './EditSections/FinancialInfoSection';
import AdditionalInfoSection from './EditSections/AdditionalInfoSection';

interface EditCampaignFormProps {
  campaign: FundraisingCampaign;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EditCampaignForm: React.FC<EditCampaignFormProps> = ({ campaign, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <BasicInfoSection campaign={campaign} onChange={onChange} />
      <CompanyDetailsSection campaign={campaign} onChange={onChange} />
      <FinancialInfoSection campaign={campaign} onChange={onChange} />
      <AdditionalInfoSection campaign={campaign} onChange={onChange} />

      <div className="flex justify-center space-x-4 mt-6">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditCampaignForm;