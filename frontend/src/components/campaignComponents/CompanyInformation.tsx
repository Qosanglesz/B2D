import React from 'react';
import { FundraisingCampaign } from '@/types/Campaign';

interface CampaignDetailProps {
  campaign: FundraisingCampaign;
}

const CompanyInformation: React.FC<CampaignDetailProps> = ({ campaign }) => {
  return (
    <div className="p-6 border-2 border-gray-300 rounded-lg">
      <h2 className="text-5xl font-bold text-gray-900 mb-8">Company Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <p><strong>Founder Name:</strong> {campaign.founderName || 'N/A'}</p>
          <p><strong>Email:</strong> {campaign.email || 'N/A'}</p>
          <p><strong>Company Stage:</strong> {campaign.companyStage || 'N/A'}</p>
          <p><strong>Industry:</strong> {campaign.industry || 'N/A'}</p>
          <p><strong>Location:</strong> {campaign.location || 'N/A'}</p>
          <p><strong>Team Size:</strong> {campaign.teamSize || 'N/A'}</p>
          <p><strong>Product Available:</strong> {campaign.productAvailable ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex flex-col space-y-4">
          <p><strong>LinkedIn Profile:</strong> {campaign.linkedInProfile ? (
            <a href={campaign.linkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {campaign.linkedInProfile}
            </a>
          ) : 'N/A'}</p>
          <p><strong>Sectors:</strong> {campaign.sector || 'N/A'}</p>
          <p><strong>Headquarters Location:</strong> {campaign.headquartersLocation || 'N/A'}</p>
          <p><strong>Website:</strong> {campaign.website ? (
            <a href={`https://${campaign.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {campaign.website}
            </a>
          ) : 'N/A'}</p>
          <p><strong>Company Number:</strong> {campaign.companyNumber || 'N/A'}</p>
          <p><strong>Incorporation Date:</strong> 
            {campaign.incorporationDate ? new Date(campaign.incorporationDate).toLocaleDateString() : 'N/A'}
          </p>
          <p><strong>Company Vision:</strong> {campaign.companyVision || 'N/A'}</p>
          <p><strong>End Date:</strong> 
            {campaign.endInDate ? new Date(campaign.endInDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
