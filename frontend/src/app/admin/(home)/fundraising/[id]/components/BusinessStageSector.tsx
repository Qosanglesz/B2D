import React from 'react';

interface BusinessStageSectorProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BusinessStageSector: React.FC<BusinessStageSectorProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Business Stage & Sector</h3>
    <input
      type="text"
      name="companyStage"
      value={formData.companyStage}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Company Stage"
    />
    <select
      name="industry"
      value={formData.industry}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
    >
      <option value="">Select Industry</option>
      {/* Add more options as needed */}
    </select>
    <input
      type="text"
      name="sector"
      value={formData.sector}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Sector"
    />
  </div>
);

export default BusinessStageSector;