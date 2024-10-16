// components/EditSections/BasicInfoSection.tsx

import React from 'react';
import { Campaign } from '@/types/Campaign';

interface SectionProps {
  campaign: Campaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
      {/* <div>
        <label className="block mb-1">URL Picture:</label>
        <input
          type="text"
          name="urlPicture"
          value={campaign.pictureFiles[0].url as string}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div> */}
      <div>
        <label className="block mb-1">Status:</label>
        <select
          name="status"
          value={campaign.status.toString()}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="true">Active</option>
          <option value="false">Closed</option>
        </select>
    </div>
    </div>
    
  );
};

export default BasicInfoSection;