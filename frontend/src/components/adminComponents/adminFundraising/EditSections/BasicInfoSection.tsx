// components/EditSections/BasicInfoSection.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface SectionProps {
  campaign: FundraisingCampaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Basic Information</h2>
      <div>
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={campaign.name}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Description:</label>
        <textarea
          name="description"
          value={campaign.description}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">URL Picture:</label>
        <input
          type="text"
          name="urlPicture"
          value={campaign.urlPicture}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;