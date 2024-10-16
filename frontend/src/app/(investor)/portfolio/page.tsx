"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Image from 'next/image';

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
    const router = useRouter();
    const { user, isLoading: userLoading } = useUser();
    const [userStatements, setUserStatements] = useState<UserStatements[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [nickname, setNickname] = useState<string | undefined>(undefined);

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
        }).replace(',', '');
    };

    useEffect(() => {
        const fetchStatement = async () => {
            if (!user || userLoading) return;

            setLoading(true);
            try {
                const user_id = user.sub;
                const response = await fetch(`/api/statement/byuserid/${user_id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch investment statements.");
                }
                const data: UserStatements[] = await response.json();
                setUserStatements(data);
                setName(user.name || undefined);
                setNickname(user.nickname || undefined);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatement();
    }, [user, userLoading]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        const newData = {
            name: name,
            nickname: nickname,
        }
        const response = await fetch('/api/user/patch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user?.sub,
                newData,
            }),
        });

        const data = await response.json();
        setIsEditing(false);
        alert('User information saved! Please login again to get changed');
        router.push("/api/auth/logout")
    };

    if (loading || userLoading) return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    if (error) return <p>Error: {error}</p>;

    const totalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const uniqueCampaigns = new Set(userStatements.map(item => item.campaignName));
    const totalInvestedCampaigns = uniqueCampaigns.size;
    const latestStatement = userStatements[userStatements.length - 1]

    return (
        <div className="min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="mx-auto bg-white shadow-md rounded-lg p-6 max-w-full grid grid-cols-3 gap-8">
                    <div className="flex">
                        <Image
                            className="w-36 h-36 rounded-full object-cover mx-auto"
                            src={user?.picture || '/default-profile.png'}
                            alt="Profile Picture"
                            height={300}
                            width={300}
                        />
                    </div>

                    <div className="my-auto">
                        {isEditing ? (
                            <>
                                <div className="grid grid-cols-2">
                                    <div className="my-auto text-xl text-gray-800">
                                        Name:
                                    </div>
                                    <input
                                        type="text"
                                        className="text-l font-semibold text-gray-800 border border-gray-300 py-2 rounded mx-auto"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        title="Name"
                                        placeholder="Enter your name"
                                    />
                                    <div className="my-auto text-xl text-gray-800">
                                        Nickname:
                                    </div>
                                    <input
                                        type="text"
                                        className="text-l text-gray-600 border border-gray-300 py-2 rounded mt-2 mx-auto"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        title="Nickname"
                                        placeholder="Enter your nickname"
                                    />
                                </div>
                                <div className="flex mt-4">
                                    <button
                                        className="bg-green-500 text-white px-10 py-2 rounded mx-auto"
                                        onClick={handleSave}
                                    >Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                                <p className="text-xl text-gray-600">{user?.email || 'No Email'}</p>
                                <p className="text-xl text-gray-600">{nickname}</p>
                                <p className="text-l text-gray-500 mt-4">
                                    Last updated: {new Date(user?.updated_at || '').toLocaleDateString() || 'N/A'}
                                </p>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                                    onClick={toggleEdit}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>

                    <div></div>
                </div>
            </div>

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
                        {currentInvestments.map((userStatement) => (
                            <tr key={userStatement._id?.toString()}>
                                <td className="py-2 px-4 border-b">{userStatement.statement_id}</td>
                                <td className="py-2 px-4 border-b">{userStatement.campaignName}</td>
                                <td className="py-2 px-4 border-b">${userStatement.amount}</td>
                                <td className="py-2 px-4 border-b">{formatDate(userStatement.date)}</td>
                                <td className="py-2 px-4 border-b">{formatDate(userStatement.successAt)}</td>
                                <td className="py-2 px-4 border-b">{userStatement.status}</td>
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

                    {Array.from({ length: totalPages }, (_, index) => (
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