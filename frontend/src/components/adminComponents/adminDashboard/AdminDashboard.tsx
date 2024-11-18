import { Metadata } from "next";
import React from "react";
import DashboardData from "@/types/DashboardData";
import InvestmentGraph from "./InvestmentGraph";
import StatementCountGraph from "./StatementCountGraph";
import InvestmentPieChart from "./InvestmentPieChart";
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

async function fetchToken() {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        },
    });
    return await tokenResponse.json();
}

async function fetchData(endpoint: string) {
    const tokenData = await fetchToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return await response.json();
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Admin Dashboard",
    };
}

export default async function AdminDashboardPage() {
    try {
        const [dashboardData, investmentData, statementCountData, investmentTopData, cryptoSummary] =
            await Promise.all([
                fetchData("/api/summarizeCampaigns"),
                fetchData("/api/investment-last-7-days"),
                fetchData("/api/statement-count-last-7-days"),
                fetchData("/api/top5Campaigns"),
                fetchData("/api/payment/coinbase/crypto-sum"),
            ]);

        return (
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
                        <p className="text-2xl">${cryptoSummary.summary.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Combined Total</h2>
                        <p className="text-2xl">
                            ${(
                            dashboardData.totalFundsRaised + cryptoSummary.summary.totalAmount
                        ).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Crypto Transaction Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Total Crypto Transactions</h2>
                        <p className="text-2xl">{cryptoSummary.summary.totalTransactions}</p>
                        <p className="text-sm text-gray-500">
                            Avg: ${cryptoSummary.summary.averageTransactionAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Completed Transactions</h2>
                        <p className="text-2xl text-green-600">
                            {cryptoSummary.summary.completedTransactions}
                        </p>
                        <p className="text-sm text-gray-500">
                            {(
                                (cryptoSummary.summary.completedTransactions /
                                    cryptoSummary.summary.totalTransactions) *
                                100
                            ).toFixed(1)}
                            %
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Pending Transactions</h2>
                        <p className="text-2xl text-yellow-600">
                            {cryptoSummary.summary.pendingTransactions}
                        </p>
                        <p className="text-sm text-gray-500">
                            {(
                                (cryptoSummary.summary.pendingTransactions /
                                    cryptoSummary.summary.totalTransactions) *
                                100
                            ).toFixed(1)}
                            %
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Failed Transactions</h2>
                        <p className="text-2xl text-red-600">
                            {cryptoSummary.summary.failedTransactions}
                        </p>
                        <p className="text-sm text-gray-500">
                            {(
                                (cryptoSummary.summary.failedTransactions /
                                    cryptoSummary.summary.totalTransactions) *
                                100
                            ).toFixed(1)}
                            %
                        </p>
                    </div>
                </div>

                {/* Existing graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Investment Over Last 7 Days</h2>
                        <div className="bg-white p-4 rounded-lg shadow" style={{ height: "400px" }}>
                            <InvestmentGraph data={investmentData} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Number of Statements Over Last 7 Days</h2>
                        <div className="bg-white p-4 rounded-lg shadow" style={{ height: "400px" }}>
                            <StatementCountGraph data={statementCountData} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">Top 5 Investments</h2>
                        <div className="bg-white p-4 rounded-lg shadow h-[400px] flex justify-center">
                            <InvestmentPieChart data={investmentTopData} className="h-96" />
                        </div>
                    </section>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading admin dashboard:", error);
        return <LoadingError loading={false} error="Error loading admin dashboard" />;
    }
}
