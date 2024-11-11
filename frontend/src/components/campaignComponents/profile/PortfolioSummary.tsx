import { ObjectId } from "mongodb";

interface PortfolioSummaryProps {
    totalAmount: number;
    totalInvestedCampaigns: number;
    latestStatement: {
        amount: number;
        campaignName: string;
    };
    cryptoTransactions: CryptoTransaction[];
}
export interface CryptoTransaction {
    userId: string;
    campaignId: string;
    chargeId: string;
    chargeCode: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentProvider: string;
    status: 'created' | 'pending' | 'completed' | 'failed' | 'delayed' | 'resolved';
    metadata: {
        campaignName: string;
        companyName: string;
        chargeCode: string;
        userEmail?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface UserStatements {
    _id?: ObjectId;
    statement_id: string;
    user_id: string;
    campaign_id: string;
    campaignName: string;
    amount: number;
    session_id: string;
    date: string;
    successAt: string;
    status: string;
}

export const PortfolioSummary = ({
    totalAmount,
    totalInvestedCampaigns,
    latestStatement,
    cryptoTransactions
}: PortfolioSummaryProps) => {
    // Calculate crypto statistics
    const completedCryptoTransactions = cryptoTransactions.filter(tx => tx.status === 'completed' || 'complete');
    const totalCryptoAmount = completedCryptoTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const uniqueCryptoCampaigns = new Set(completedCryptoTransactions.map(tx => tx.metadata.campaignName));
    const latestCryptoTransaction = completedCryptoTransactions.length > 0 
        ? completedCryptoTransactions.reduce((latest, current) => 
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
          )
        : null;

    // Combined totals
    const totalInvestmentAmount = totalAmount + totalCryptoAmount;
    const totalCampaigns = new Set([
        ...Array.from(uniqueCryptoCampaigns),
        ...(Array.isArray(totalInvestedCampaigns) ? totalInvestedCampaigns : [totalInvestedCampaigns])
    ]).size;

    return (
        <div>
            <h1 className="text-3xl font-bold my-4 mx-3">Investment Portfolio Summary</h1>
            <div className="grid grid-cols-3 gap-4 mx-3 my-3">
                {/* Total Investments */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Investments</h2>
                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-blue-600">${totalInvestmentAmount.toFixed(2)}</p>
                        <div className="text-sm text-gray-600">
                            <p>Traditional: ${totalAmount.toFixed(2)}</p>
                            <p>Crypto: ${totalCryptoAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Campaign Statistics */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Campaign Statistics</h2>
                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-green-600">{totalCampaigns}</p>
                        <div className="text-sm text-gray-600">
                            <p>Traditional: {totalInvestedCampaigns}</p>
                            <p>Crypto: {uniqueCryptoCampaigns.size}</p>
                        </div>
                    </div>
                </div>

                {/* Latest Investments */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Latest Investments</h2>
                    <div className="space-y-3">
                        {latestStatement && (
                            <div className="border-b pb-2">
                                <p className="font-semibold">Traditional</p>
                                <p className="text-sm text-gray-600">
                                    ${latestStatement.amount} in {latestStatement.campaignName}
                                </p>
                            </div>
                        )}
                        {latestCryptoTransaction && (
                            <div>
                                <p className="font-semibold">Crypto</p>
                                <p className="text-sm text-gray-600">
                                    ${latestCryptoTransaction.amount} in {latestCryptoTransaction.metadata.campaignName}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};