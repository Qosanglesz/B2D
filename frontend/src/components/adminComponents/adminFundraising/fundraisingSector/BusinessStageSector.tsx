import React from 'react';

interface BusinessStageSectorProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BusinessStageSector: React.FC<BusinessStageSectorProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Business Stage & Sector</h3>
    
    <label className="block mb-2">
      <span className="text-gray-700">Company Stage</span>
      <input
        type="text"
        name="companyStage"
        value={formData.companyStage}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Company Stage"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Industry</span>
      <select
        name="industry"
        value={formData.industry}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
      >
        <option value="">Select Industry</option>
        <option value="Consumer Goods & Retail">Consumer Goods & Retail</option>
        <option value="Services">Services</option>
        <option value="Fintech & Finance">Fintech & Finance</option>
        <option value="Transportation">Transportation</option>
        <option value="Manufacturing & Industrials">Manufacturing & Industrials</option>
        <option value="Health & Wellness">Health & Wellness</option>
        <option value="Aerospace">Aerospace</option>
        <option value="Media">Media</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Edtech & Education">Edtech & Education</option>
        <option value="Cannabis">Cannabis</option>
        <option value="Arts & Entertainment">Arts & Entertainment</option>
        <option value="Travel & Hospitality">Travel & Hospitality</option>
        <option value="Energy">Energy</option>
        <option value="Gaming">Gaming</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Food & Drinks">Food & Drinks</option>
        <option value="Technology">Technology</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Real Estate">Real Estate</option>
        <option value="Fashion">Fashion</option>
      </select>
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Sector</span>
      <input
        type="text"
        name="sector"
        value={formData.sector}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Sector"
      />
    </label>
    
  </div>
);

export default BusinessStageSector;