import React from 'react';

interface CompanyInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Company Information</h3>
    <label className="block mb-2">
      <span className="text-gray-700">Company Name</span>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="Company Name"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Website</span>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="Website"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Founder</span>
      <input
        type="text"
        name="founderName"
        value={formData.founderName}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Founder Name"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Email</span>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Email"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">LinkedIn Profile</span>
        <input
          type="text"
          name="linkedInProfile"
          value={formData.linkedInProfile}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="LinkedIn Profile"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Phone Number</span>
        <input
          type="text"
          name="linkedInProfile"
          value={formData.companyNumber}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="LinkedIn Profile"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Company Location</span>
        <input
          type="text"
          name="linkedInProfile"
          value={formData.location}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="LinkedIn Profile"
        />
    </label>
    
    <label className="block mb-2">
      <span className="text-gray-700">Company Vision</span>
        <input
          type="text"
          name="companyName"
          value={formData.companyVision}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="Company Name"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Incorporation Date</span>
        <input
          type="text"
          name="companyName"
          value={formData.incorporationDate}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="Company Name"
        />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">End In Date</span>
        <input
          type="text"
          name="companyName"
          value={formData.endInDate}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded-lg"
          placeholder="Company Name"
        />
    </label>
  </div>
  
);

export default CompanyInformation;