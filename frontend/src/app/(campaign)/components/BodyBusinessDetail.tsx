import React from 'react';

interface CampaignDetailProps {
    campaignData: any; // You can define a more specific type if needed
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignData }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4">
            <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Campaign Overview</h2>
                <p><strong>Location:</strong> {campaignData.businessOverview.location}</p>
                <p><strong>Website:</strong> <a href={`https://${campaignData.businessOverview.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{campaignData.businessOverview.website}</a></p>
                <p><strong>Sectors:</strong> {campaignData.businessOverview.sectors.join(", ")}</p>
                <p><strong>Company Number:</strong> {campaignData.businessOverview.companyNumber}</p>
                <p><strong>Incorporation Date:</strong> {campaignData.businessOverview.incorporationDate}</p>
            </div>
            <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Investment Summary</h2>
                <p><strong>Type:</strong> {campaignData.investmentSummary.type}</p>
                <p><strong>Valuation:</strong> {campaignData.investmentSummary.valuation}</p>
                <p><strong>Equity Offered:</strong> {campaignData.investmentSummary.equityOffered}</p>
                <p><strong>Share Price:</strong> {campaignData.investmentSummary.sharePrice}</p>
                <p><strong>Tax Relief:</strong> {campaignData.investmentSummary.taxRelief}</p>
            </div>
        </div>
    );
};

export default CampaignDetail;
