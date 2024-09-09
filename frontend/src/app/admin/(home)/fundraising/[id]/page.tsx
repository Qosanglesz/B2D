'use client';

import React, { useState } from 'react';
import { initialCampaigns, FundraisingCampaign } from '../../../components/FundraisingCampaigns';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(initialCampaigns);
  const campaignId = Number(params.id);
  const campaign = campaigns.find((campaign: FundraisingCampaign) => campaign.id === campaignId);

  // State for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FundraisingCampaign | null>(campaign || null);

  const handleDelete = () => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      const updatedCampaigns = campaigns.map(c =>
        c.id === campaignId ? formData : c
      );
      setCampaigns(updatedCampaigns);
      setIsEditing(false);
    }
  };

  if (!campaign) {
    return <div>Campaign not found or has been deleted</div>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={formData?.urlPicture || ''}
            alt={formData?.name}
            className="w-64 h-64 mx-auto object-cover mb-6 rounded-lg"
          />
          {isEditing ? (
            <div>
              {/* Edit Form */}
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border rounded-lg"
                placeholder="Campaign Name"
              />
              <textarea
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border rounded-lg"
                placeholder="Campaign Description"
              />
              <input
                type="number"
                name="goal"
                value={formData?.goal}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border rounded-lg"
                placeholder="Goal Amount"
              />
              <input
                type="number"
                name="raised"
                value={formData?.raised}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border rounded-lg"
                placeholder="Raised Amount"
              />
              <select
                name="status"
                value={formData?.status}
                onChange={handleInputChange}
                className="block w-full mb-4 p-2 border rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* Display Campaign Info */}
              <h2 className="text-4xl font-bold mb-4">{formData?.name}</h2>
              <p className="text-lg mb-2">{formData?.description}</p>
              <p className="text-xl font-semibold">Goal: {formData?.goal.toLocaleString()}</p>
              <p className="text-xl font-semibold">Raised: {formData?.raised.toLocaleString()}</p>
              <p className={`text-xl font-semibold mt-4 ${formData?.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {formData?.status}
              </p>

              {/* Edit Button */}
              <button
                onClick={handleEditToggle}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Campaign
              </button>
            </div>
          )}

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Delete Campaign
          </button>
        </div>
      </section>
    </div>
  );
}
