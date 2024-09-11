import React from 'react';

interface CompanyInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Company Information</h3>
    <input
      type="text"
      name="companyName"
      value={formData.companyName}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Company Name"
    />
    <input
      type="text"
      name="website"
      value={formData.website}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Website"
    />
    <input
      type="text"
      name="founderName"
      value={formData.founderName}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Founder Name"
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Email"
    />
    <input
      type="text"
      name="linkedInProfile"
      value={formData.linkedInProfile}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="LinkedIn Profile"
    />
  </div>
);

export default CompanyInformation;