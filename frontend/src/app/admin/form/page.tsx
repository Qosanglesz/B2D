"use client";

import React, { useState } from 'react';

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

interface BusinessFormData {
  basicInfo: {
    name: string;
    industry: string;
    description: string;
  };
  founderDetails: {
    background: string;
    contact: string;
  };
  locationAndOrigin: {
    location: string;
    origin: string;
  };
  purposeAndMarket: {
    purpose: string;
    targetMarket: string;
  };
  fundraisingDetails: {
    fundGoal: number;
    accumulatedFunds: number;
    minimumPaycheck: number;
  };
  [key: string]: any;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BusinessFormData>({
    basicInfo: {
      name: '',
      industry: '',
      description: '',
    },
    founderDetails: {
      background: '',
      contact: '',
    },
    locationAndOrigin: {
      location: '',
      origin: '',
    },
    purposeAndMarket: {
      purpose: '',
      targetMarket: '',
    },
    fundraisingDetails: {
      fundGoal: 0,
      accumulatedFunds: 0,
      minimumPaycheck: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name.split('.')[0]]: {
        ...prevData[name.split('.')[0]],
        [name.split('.')[1]]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Business Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Basic Info</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Name:</span>
              <input type="text" name="basicInfo.name" value={formData.basicInfo.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Industry:</span>
              <input type="text" name="basicInfo.industry" value={formData.basicInfo.industry} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Description:</span>
              <textarea name="basicInfo.description" value={formData.basicInfo.description} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Founder Details</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Background:</span>
              <textarea name="founderDetails.background" value={formData.founderDetails.background} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Contact Information:</span>
              <input type="text" name="founderDetails.contact" value={formData.founderDetails.contact} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Location & Origin</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Location:</span>
              <input type="text" name="locationAndOrigin.location" value={formData.locationAndOrigin.location} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Origin:</span>
              <input type="text" name="locationAndOrigin.origin" value={formData.locationAndOrigin.origin} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Purpose & Market</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Purpose:</span>
              <textarea name="purposeAndMarket.purpose" value={formData.purposeAndMarket.purpose} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Target Market:</span>
              <textarea name="purposeAndMarket.targetMarket" value={formData.purposeAndMarket.targetMarket} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Fundraising Details</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Fund Goal:</span>
              <input type="number" name="fundraisingDetails.fundGoal" value={formData.fundraisingDetails.fundGoal} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Accumulated Funds:</span>
              <input type="number" name="fundraisingDetails.accumulatedFunds" value={formData.fundraisingDetails.accumulatedFunds} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Minimum Paycheck:</span>
              <input type="number" name="fundraisingDetails.minimumPaycheck" value={formData.fundraisingDetails.minimumPaycheck} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
            </label>
          </div>

          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
