interface PortfolioSummaryProps {
    totalAmount: number;
    totalInvestedCampaigns: number;
    latestStatement: {
        amount: number;
        campaignName: string;
    };
}

export const PortfolioSummary = ({
    totalAmount,
    totalInvestedCampaigns,
    latestStatement
}: PortfolioSummaryProps) => {
    return (
        <div>
            <h1 className="text-3xl font-bold my-4 mx-3">User Investment Portfolio</h1>
            <div className="grid grid-cols-3 gap-4 mx-3 my-3">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total investment</h2>
                    <p className="text-2xl">${totalAmount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total invested campaigns</h2>
                    <p className="text-2xl">{totalInvestedCampaigns} Campaigns</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Latest investment</h2>
                    <p className="text-2xl">{latestStatement.amount} invested in {latestStatement.campaignName}</p>
                </div>
            </div>
        </div>
    );
};