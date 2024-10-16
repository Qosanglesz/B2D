// components/EditSections/CompanyDetailsSection.tsx

import React from 'react';
import { FundraisingCampaign } from '@/types/Campaign';

interface SectionProps {
  campaign: FundraisingCampaign;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CompanyDetailsSection: React.FC<SectionProps> = ({ campaign, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Company Details</h2>
      <div>
        <label className="block mb-1">Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={campaign.companyName}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Website:</label>
        <input
          type="text"
          name="website"
          value={campaign.website}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Founder Name:</label>
        <input
          type="text"
          name="founderName"
          value={campaign.founderName}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={campaign.email}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">LinkedIn Profile:</label>
        <input
          type="text"
          name="linkedInProfile"
          value={campaign.linkedInProfile}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Company Stage:</label>
        <input
          type="text"
          name="companyStage"
          value={campaign.companyStage}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Industry:</label>
        <input
          type="text"
          name="industry"
          value={campaign.industry}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Sector:</label>
        <input
          type="text"
          name="sector"
          value={campaign.sector}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default CompanyDetailsSection;