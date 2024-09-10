'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initialCampaigns, FundraisingCampaign } from '../../../../components/FundraisingCampaigns';
import CompanyInformation from '../components/CompanyInformation';
import BusinessStageSector from '../components/BusinessStageSector';
import FundraisingInformation from '../components/FundraisingInformation';
import TeamInformation from '../components/TeamInformation';
import ProductAvailability from '../components/ProductAvailability';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params }: PageProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);
  const campaignId = Number(params.id);
  const [formData, setFormData] = useState<FundraisingCampaign | null>(null);

  useEffect(() => {
    const campaign = campaigns.find((campaign: FundraisingCampaign) => campaign.id === campaignId);
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaignId, campaigns]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value, type } = e.target;
      const newValue = type === 'radio' ? value === 'true' : value;
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      const updatedCampaigns = campaigns.map(c =>
        c.id === campaignId ? formData : c
      );
      setCampaigns(updatedCampaigns);
      router.push(`/admin/fundraising/${campaignId}`);
    }
  };

  if (!formData) {
    return <div className="text-center text-red-500">Campaign not found or has been deleted</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Edit Campaign: {formData.name}</h2>
          <CompanyInformation formData={formData} handleInputChange={handleInputChange} />
          <BusinessStageSector formData={formData} handleInputChange={handleInputChange} />
          <FundraisingInformation formData={formData} handleInputChange={handleInputChange} />
          <TeamInformation formData={formData} handleInputChange={handleInputChange} />
          <ProductAvailability formData={formData} handleInputChange={handleInputChange} />

          <button
            onClick={handleSave}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => router.push(`/admin/fundraising/${campaignId}`)}
            className="mt-6 ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}