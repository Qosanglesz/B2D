"use client";

import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ObjectId} from "mongodb";

interface UserStatements {
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

const ITEMS_PER_PAGE = 10;

export default function Home() {
    const {user, isLoading: userLoading} = useUser(); // Fetch user data from Auth0
    const [userStatements, setUserStatements] = useState<UserStatements[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(userStatements.length / ITEMS_PER_PAGE);

    const currentInvestments = userStatements.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', ''); // Removes the comma for cleaner formatting
    };

    useEffect(() => {
        const fetchStatement = async () => {
            if (!user || userLoading) return; // Wait until user is available

            setLoading(true);
            try {
                console.log(user);
                const user_id = user.sub; // Access user ID (sub) from Auth0
                const response = await fetch(`/api/statement/byuserid/${user_id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch investment statements.");
                }
                const data: UserStatements[] = await response.json();
                setUserStatements(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatement();
    }, [user, userLoading]); // Depend on `user` and `userLoading`

    if (loading || userLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const totalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const uniqueCampaigns = new Set(userStatements.map(item => item.campaignName));
    const totalInvestedCampaigns = uniqueCampaigns.size;
    const latestStatement = userStatements[userStatements.length - 1]

    return (
        <div className="min-h-screen">
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

            <div className="mx-3 my-14">
                <h2 className="text-2xl font-semibold my-4">Investment Statements</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Statement ID</th>
                        <th className="py-2 px-4 text-left">Company Name</th>
                        <th className="py-2 px-4 text-left">Amount</th>
                        <th className="py-2 px-4 text-left">Release Date</th>
                        <th className="py-2 px-4 text-left">Success Date</th>
                        <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentInvestments.map((userStatements) => (
                        <tr key={userStatements._id?.toString()}>
                            <td className="py-2 px-4 border-b">{userStatements.statement_id}</td>
                            <td className="py-2 px-4 border-b">{userStatements.campaignName}</td>
                            <td className="py-2 px-4 border-b">${userStatements.amount}</td>
                            <td className="py-2 px-4 border-b">{formatDate(userStatements.date)}</td>
                            <td className="py-2 px-4 border-b">{formatDate(userStatements.successAt)}</td>
                            <td className="py-2 px-4 border-b">{userStatements.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 ${
                                currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } rounded-lg`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
