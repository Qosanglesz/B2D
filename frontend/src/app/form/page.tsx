"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

interface BusinessFormData {
  companyName: string;
  website: string;
  founderName: string;
  email: string;
  linkedinProfile: string;
  companyStage: string;
  industry: string;
  sector: string;
  fundingDetails: {
    amountRaised: number;
    targetAmount: number;
  };
  teamSize: number;
  headquarters: string;
  productAvailable: boolean;
  [key: string]: any;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BusinessFormData>({
    companyName: "",
    website: "",
    founderName: "",
    email: "",
    linkedinProfile: "",
    companyStage: "",
    industry: "",
    sector: "",
    fundingDetails: {
      amountRaised: 0,
      targetAmount: 0,
    },
    teamSize: 0,
    headquarters: "",
    productAvailable: false,
  });

  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        productAvailable: value === "true",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name.includes(".") ? name.split(".")[0] : name]: name.includes(".")
          ? {
              ...prevData[name.split(".")[0]],
              [name.split(".")[1]]: type === "checkbox" ? checked : value,
            }
          : type === "checkbox"
          ? checked
          : value,
      }));
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  //   router.push('/home');
  // };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Apply for Funding</h2>
        <div className="space-y-6">
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

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Fundraising Information</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Amount Raised (so far):</span>
              <input
                type="number"
                name="fundraisingDetails.amountRaised"
                value={formData.fundingDetails.amountRaised}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Target Amount:</span>
              <input
                type="number"
                name="fundraisingDetails.targetAmount"
                value={formData.fundingDetails.targetAmount}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </label>
          </div>

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
  
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Product Availability</h3>
              <div className="flex items-center mb-2">
                <label className="block text-gray-700 mr-4">
                  <input
                    type="radio"
                    name="productAvailable"
                    value="true"
                    checked={formData.productAvailable === true}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="block text-gray-700">
                  <input
                    type="radio"
                    name="productAvailable"
                    value="false"
                    checked={formData.productAvailable === false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
  
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push('/form/success')}
            >
              Submit
            </button>
          </div>
      </div>
    );
  };
  
  export default BusinessForm;
  
