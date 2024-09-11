import React from 'react';

interface TeamInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TeamInformation: React.FC<TeamInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Team Information</h3>
    <label className="block mb-2">
      <span className="text-gray-700">Team Size</span>
      <input
        type="number"
        name="teamSize"
        value={formData.teamSize}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Team Size"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Headquarters Location</span>
      <input
        type="text"
        name="headquartersLocation"
        value={formData.headquartersLocation}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Headquarters Location"
      />
    </label>

  </div>
);

export default TeamInformation;