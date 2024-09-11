import React from "react";

interface CompanyInfoProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Company Information</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Company Name:</span>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Website:</span>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Founder Name:</span>
        <input
          type="text"
          name="founderName"
          value={formData.founderName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">LinkedIn Profile:</span>
        <input
          type="url"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
    </div>
  );
};

export default CompanyInfo;