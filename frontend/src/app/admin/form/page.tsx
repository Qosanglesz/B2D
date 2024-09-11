'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CompanyInfo from '../../../components/formComponnents/CompanyInfo';
import BusinessStageSector from '../../../components/formComponnents/BusinessStageSector';
import FundraisingInfo from '../../../components/formComponnents/FundraisingInfo'
import TeamInfo from '../../../components/formComponnents/TeamInfo';
import ProductAvailability from '../../../components/formComponnents/ProductAvailability';

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

  const router = useRouter();

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
    // <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Apply for Funding</h2>
      <div className="space-y-6">
        <CompanyInfo formData={formData} handleChange={handleChange} />
        <BusinessStageSector formData={formData} handleChange={handleChange} />
        <FundraisingInfo formData={formData} handleChange={handleChange} />
        <TeamInfo formData={formData} handleChange={handleChange} />
        <ProductAvailability formData={formData} handleChange={handleChange} />
        <button  onClick={() => router.push('form/success')}
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BusinessForm;