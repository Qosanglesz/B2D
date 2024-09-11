import React from "react";

interface BusinessStageSectorProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BusinessStageSector: React.FC<BusinessStageSectorProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Business Stage & Sector</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Company Stage:</span>
        <input
          type="text"
          name="companyStage"
          value={formData.companyStage}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Industry:</span>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Industry</option>
          {/* Add other options here */}
        </select>
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Sector:</span>
        <input
          type="text"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
    </div>
  );
};

export default BusinessStageSector;