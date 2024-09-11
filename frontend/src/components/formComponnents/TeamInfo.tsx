import React from "react";

interface TeamInfoProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Team Information</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Team Size:</span>
        <input
          type="number"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Headquarters Location:</span>
        <input
          type="text"
          name="headquarters"
          value={formData.headquarters}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
    </div>
  );
};

export default TeamInfo;