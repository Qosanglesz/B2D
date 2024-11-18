import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import TransactionTableWrapper from '@/components/adminComponents/adminTransactions/TransactionTableWrapper';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getAccessToken() {
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    });
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}

async function getTransactions(accessToken: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/coinbase/transaction-crypto`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch Transactions');
    }

    return response.json();
}

export default async function TransactionCryptoPage() {
    try {
        const accessToken = await getAccessToken();
        const transactions = await getTransactions(accessToken);
        
        return (
            <div className="p-6 min-h-screen">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold text-left text-blue-700">
                        Cryptocurrency Transactions
                    </h1>
                </div>
                <TransactionTableWrapper transactions={transactions} />
            </div>
        );
    } catch (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex items-center gap-2 text-red-500 text-lg">
                    <FiAlertCircle />
                    Error: Failed to load transactions
                </div>
            </div>
        );
    }
}