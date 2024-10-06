import React from 'react';

interface CampaignDetailProps {
    campaign: any; // You can define a more specific type if needed
}

const CompanyInformation: React.FC<CampaignDetailProps> = ({ campaign }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4">
            <div className="flex-1 p-6 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Company Detail</h2>
                <div className="grid grid-cols-2 gap-4 p-10">
                    <p><strong>Location:</strong> {campaign.location}</p>
                    <p><strong>Website:</strong> <a href={`https://${campaign.website}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline">{campaign.website}</a>
                    </p>
                    <p><strong>Sectors:</strong> {campaign.sector}</p>
                    <p><strong>Company Number:</strong> {campaign.companyNumber}</p>
                    <p><strong>Incorporation Date:</strong> {new Date(campaign.incorporationDate).toLocaleDateString()}</p>
                    <p><strong>Company Vision:</strong> {campaign.companyVision}</p>
                </div>
            </div>
        </div>
    );
};
// new Date(campaign.endInDate).toLocaleDateString()

export default CompanyInformation;
