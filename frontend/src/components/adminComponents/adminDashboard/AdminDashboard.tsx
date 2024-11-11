'use client';

import React, { useState, useEffect } from 'react';
import DashboardData from '@/types/DashboardData';
import InvestmentGraph from './InvestmentGraph';
import StatementCountGraph from './StatementCountGraph';
import InvestmentPieChart from './InvestmentPieChart'; // Ensure this import is correct
import { LoadingError } from "@/components/homeComponents/LoadingError";

interface InvestmentData {
    date: string;
    amount: number;
}

interface StatementCountData {
    date: string;
    count: number;
}

interface CryptoSummary {
    totalTransactions: number;
    totalAmount: number;
    completedTransactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    averageTransactionAmount: number;
    cryptoCurrencies: {
        currency: string;
        count: number;
        totalAmount: number;
    }[];
}

interface CryptoSummaryResponse {
    message: string;
    summary: {
        totalTransactions: number;
        totalAmount: number;
        completedTransactions: number;
        pendingTransactions: number;
        failedTransactions: number;
        averageTransactionAmount: number;
        cryptoCurrencies: {
            currency: string;
            count: number;
            totalAmount: number;
        }[];
    };
}

const AdminDashboard: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        totalCompanies: 0,
        totalFundsRaised: 0,
    });

    const [investmentData, setInvestmentData] = useState<InvestmentData[]>([]);
    const [statementCountData, setStatementCountData] = useState<StatementCountData[]>([]);
    const [investmentTopData, setInvestmentTopData] = useState<{ id: string; name: string; amountRaised: number }[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [cryptoSummary, setCryptoSummary] = useState<CryptoSummary>({
        totalTransactions: 0,
        totalAmount: 0,
        completedTransactions: 0,
        pendingTransactions: 0,
        failedTransactions: 0,
        averageTransactionAmount: 0,
        cryptoCurrencies: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                fetchDashboardData(),
                fetchInvestmentData(),
                fetchStatementCountData(),
                fetchInvestmentTopData(),
                fetchCryptoSummary(), 
            ]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/summarizeCampaigns');
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }
            const data = await response.json();
            setDashboardData(data);
        } catch (err) {
            setError('Error fetching dashboard data. Please try again later.');
            console.error(err);
        }
    };

    const fetchInvestmentData = async () => {
        try {
            const response = await fetch('/api/investment-last-7-days');
            if (!response.ok) {
                throw new Error('Failed to fetch investment data');
            }
            const data = await response.json();
            setInvestmentData(data);
        } catch (err) {
            setError('Error fetching investment data. Please try again later.');
            console.error(err);
        }
    };

    const fetchStatementCountData = async () => {
        try {
            const response = await fetch('/api/statement-count-last-7-days');
            if (!response.ok) {
                throw new Error('Failed to fetch statement count data');
            }
            const data = await response.json();
            setStatementCountData(data);
        } catch (err) {
            setError('Error fetching statement count data. Please try again later.');
            console.error(err);
        }
    };

    const fetchInvestmentTopData = async () => {
        try {
            const response = await fetch('/api/top5Campaigns'); // Ensure this endpoint is correct
            if (!response.ok) {
                throw new Error('Failed to fetch top investment data');
            }
            const data = await response.json();
            setInvestmentTopData(data);
        } catch (err) {
            setError('Error fetching top investment data. Please try again later.');
            console.error(err);
        }
    };

    const fetchCryptoSummary = async () => {
        try {
            const response = await fetch('/api/payment/coinbase/crypto-sum');
            if (!response.ok) {
                throw new Error('Failed to fetch crypto summary data');
            }
            const data: CryptoSummaryResponse = await response.json();
            setCryptoSummary(data.summary); // Set only the summary part of the response
        } catch (err) {
            setError('Error fetching crypto summary data. Please try again later.');
            console.error(err);
        }
    };

    if (isLoading) return <LoadingError loading={isLoading} error={error} />;
    if (error) return <div>{error}</div>;

    return (
        // <div className="p-6 min-h-screen">
        //     <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        //         <div className="bg-white p-4 rounded-lg shadow">
        //             <h2 className="text-xl font-semibold">Total Companies</h2>
        //             <p className="text-2xl">{dashboardData.totalCompanies}</p>
        //         </div>
        //         <div className="bg-white p-4 rounded-lg shadow">
        //             <h2 className="text-xl font-semibold">Total Funds Raised</h2>
        //             <p className="text-2xl">${dashboardData.totalFundsRaised.toLocaleString()}</p>
        //         </div>
        //     </div>

        //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        //         <section>
        //             <h2 className="text-xl font-semibold mb-4">Investment Over Last 7 Days</h2>
        //             <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
        //                 <InvestmentGraph data={investmentData} />
        //             </div>
        //         </section>

        //         <section>
        //             <h2 className="text-xl font-semibold mb-4">Number of Statements Over Last 7 Days</h2>
        //             <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
        //                 <StatementCountGraph data={statementCountData} />
        //             </div>
        //         </section>

        //         <section>
        //             <h2 className="text-xl font-semibold mb-4">Top 5 Investments</h2>
        //             <div className="bg-white p-4 rounded-lg shadow h-[400px] flex justify-center">
        //                 <InvestmentPieChart data={investmentTopData} className='h-96'/>
        //             </div>
        //         </section>
        //     </div>
        // </div>
            <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            
            {/* Traditional Investment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Companies</h2>
                    <p className="text-2xl">{dashboardData.totalCompanies}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Funds Raised</h2>
                    <p className="text-2xl">${dashboardData.totalFundsRaised.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Crypto Amount</h2>
                    <p className="text-2xl">${cryptoSummary.totalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Combined Total</h2>
                    <p className="text-2xl">
                        ${(dashboardData.totalFundsRaised + cryptoSummary.totalAmount).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Crypto Transaction Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Total Crypto Transactions</h2>
                    <p className="text-2xl">{cryptoSummary.totalTransactions}</p>
                    <p className="text-sm text-gray-500">
                        Avg: ${cryptoSummary.averageTransactionAmount.toFixed(2)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Completed Transactions</h2>
                    <p className="text-2xl text-green-600">{cryptoSummary.completedTransactions}</p>
                    <p className="text-sm text-gray-500">
                        {((cryptoSummary.completedTransactions / cryptoSummary.totalTransactions) * 100).toFixed(1)}%
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Pending Transactions</h2>
                    <p className="text-2xl text-yellow-600">{cryptoSummary.pendingTransactions}</p>
                    <p className="text-sm text-gray-500">
                        {((cryptoSummary.pendingTransactions / cryptoSummary.totalTransactions) * 100).toFixed(1)}%
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Failed Transactions</h2>
                    <p className="text-2xl text-red-600">{cryptoSummary.failedTransactions}</p>
                    <p className="text-sm text-gray-500">
                        {((cryptoSummary.failedTransactions / cryptoSummary.totalTransactions) * 100).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Cryptocurrency Breakdown */}
            {/* <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Cryptocurrency Distribution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cryptoSummary.cryptoCurrencies.map((crypto) => (
                        <div key={crypto.currency} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{crypto.currency}</h3>
                            <p className="text-2xl">${crypto.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                                {crypto.count} transactions
                            </p>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Existing graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Investment Over Last 7 Days</h2>
                    <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
                        <InvestmentGraph data={investmentData} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Number of Statements Over Last 7 Days</h2>
                    <div className="bg-white p-4 rounded-lg shadow" style={{ height: '400px' }}>
                        <StatementCountGraph data={statementCountData} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Top 5 Investments</h2>
                    <div className="bg-white p-4 rounded-lg shadow h-[400px] flex justify-center">
                        <InvestmentPieChart data={investmentTopData} className='h-96'/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;