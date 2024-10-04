// components/EditSections/AdditionalInfoSection.tsx

import React from 'react';
import { FundraisingCampaign } from '@/components/types/type_fundraisingCampaign';

interface SectionProps {
  campaign: FundraisingCampaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AdditionalInfoSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Additional Information</h2>
      <div>
        <label className="block mb-1">Team Size:</label>
        <input
          type="number"
          name="teamSize"
          value={campaign.teamSize}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Headquarters Location:</label>
        <input
          type="text"
          name="headquartersLocation"
          value={campaign.headquartersLocation}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Product Available:</label>
        <select
          name="productAvailable"
          value={campaign.productAvailable.toString()}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Location:</label>
        <input
          type="text"
          name="location"
          value={campaign.location}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Incorporation Date:</label>
        <input
          type="date"
          name="incorporationDate"
          value={campaign.incorporationDate.split('T')[0]}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Company Vision:</label>
        <input
          type="date"
          name="End In Date"
          value={campaign.endInDate.split('T')[0]}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Investors (comma-separated):</label>
        <input
          type="text"
          name="investors"
          value={campaign.investors.join(', ')}
          onChange={(e) => {
            const modifiedEvent = {
              ...e,
              target: {
                ...e.target,
                value: e.target.value.split(', ')
              }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onChange(modifiedEvent);
          }}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Company Number:</label>
        <input
          type="text"
          name="companyNumber"
          value={campaign.companyNumber}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Company Vision:</label>
        <textarea
          name="companyVision"
          value={campaign.companyVision}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;