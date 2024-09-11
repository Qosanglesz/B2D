import React from 'react';

interface CampaignDetailProps {
    campaign: any; // You can define a more specific type if needed
}

const CompanyInformation: React.FC<CampaignDetailProps> = ({ campaign }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4">
            <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Company Detail</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Location:</strong> {campaign.businessOverview.location}</p>
                    <p><strong>Website:</strong> <a href={`https://${campaign.businessOverview.website}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline">{campaign.businessOverview.website}</a>
                    </p>
                    <p><strong>Sectors:</strong> {campaign.businessOverview.sectors.join(", ")}</p>
                    <p><strong>Company Number:</strong> {campaign.businessOverview.companyNumber}</p>
                    <p><strong>Incorporation Date:</strong> {campaign.businessOverview.incorporationDate}</p>
                    <p><strong>Company Vision:</strong> {campaign.businessOverview.vision}</p>
                </div>
            </div>
        </div>
    );
};


export default CompanyInformation;
