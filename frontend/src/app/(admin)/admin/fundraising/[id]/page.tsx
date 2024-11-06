'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {Campaign} from '@/types/Campaign';
import {LoadingError} from "@/components/homeComponents/LoadingError";

export default function CampaignDetails({params}: { params: { id: string } }) {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`/api/campaign/${params.id}`);
                if (!response.ok) throw new Error('Failed to fetch campaign data');
                const data = await response.json();
                setCampaign(data);
            } catch (err) {
                setError('Error fetching campaign data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaign();
    }, [params.id]);

    const handleDelete = async () => {
        if (!campaign) return;

        const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/campaign/${campaign.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete campaign');
            }

            // Campaign deleted successfully, redirect to the campaign list page
            router.push('/admin/fundraising');
        } catch (err) {
            console.error('Error deleting campaign:', err);
            setError('Failed to delete campaign. Please try again.');
        }
    };

    if (isLoading) return <LoadingError loading={isLoading} error={error}/>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    if (!campaign) return <div className="flex justify-center items-center h-screen">No campaign data found</div>;

    return (
        <div>
            <div>
                <div className="mx-auto bg-white overflow-hidden p-8 space-y-6">
                    {/* Campaign Title */}
                    <h1 className="text-4xl font-extrabold text-gray-900 text-center">{campaign.name}</h1>

                    {/* Image */}
                    <div className="relative max-w-4xl h-64 mx-auto mb-6">
                        <Image
                            src={campaign.pictureFiles[0].url as string}
                            alt={campaign.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mx-auto max-w-7xl">
                        <p><span className="font-semibold text-gray-800">Description:</span> {campaign.description}</p>
                        <p><span className="font-semibold text-gray-800">Status:</span>
                            <span
                                className={`ml-2 inline-block px-2 py-1 text-sm rounded-full ${campaign.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {campaign.status ? 'Active' : 'Closed'}
                            </span>
                        </p>
                        <p><span className="font-semibold text-gray-800">Company Name:</span> {campaign.companyName}</p>
                        <p><span className="font-semibold text-gray-800">Website:</span>
                            <a href={campaign.website} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:underline">
                                {campaign.website}
                            </a>
                        </p>
                        <p><span className="font-semibold text-gray-800">Founder:</span> {campaign.founderName}</p>
                        <p><span className="font-semibold text-gray-800">Email:</span> {campaign.email}</p>
                        <p><span className="font-semibold text-gray-800">LinkedIn:</span>
                            <a href={campaign.linkedInProfile} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 hover:underline">
                                {campaign.linkedInProfile}
                            </a>
                        </p>
                        <p><span className="font-semibold text-gray-800">Company Stage:</span> {campaign.companyStage}
                        </p>
                        <p><span className="font-semibold text-gray-800">Industry:</span> {campaign.industry}</p>
                        <p><span className="font-semibold text-gray-800">Sector:</span> {campaign.sector}</p>
                        <p><span
                            className="font-semibold text-gray-800">Amount Raised:</span> ${campaign.amountRaised.toLocaleString()}
                        </p>
                        <p><span
                            className="font-semibold text-gray-800">Target Amount:</span> ${campaign.targetAmount.toLocaleString()}
                        </p>
                        <p><span className="font-semibold text-gray-800">Team Size:</span> {campaign.teamSize}</p>
                        <p><span
                            className="font-semibold text-gray-800">Headquarters:</span> {campaign.headquartersLocation}
                        </p>
                        <p><span
                            className="font-semibold text-gray-800">Product Available:</span> {campaign.productAvailable ? 'Yes' : 'No'}
                        </p>
                        <p><span className="font-semibold text-gray-800">Location:</span> {campaign.location}</p>
                        <p><span
                            className="font-semibold text-gray-800">Incorporation Date:</span> {new Date(campaign.incorporationDate).toLocaleDateString()}
                        </p>
                        <p><span
                            className="font-semibold text-gray-800">Campaign End Date:</span> {new Date(campaign.endInDate).toLocaleDateString()}
                        </p>
                        <p><span className="font-semibold text-gray-800">Company Number:</span> {campaign.companyNumber}
                        </p>
                        <p><span className="font-semibold text-gray-800">Company Vision:</span> {campaign.companyVision}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                    <Link href={`/admin/fundraising/${campaign.id}/edit`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>

                {/* Display error message if there's an error */}
                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}