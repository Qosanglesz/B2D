'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {Campaign} from '@/types/Campaign';

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

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    if (!campaign) return <div className="flex justify-center items-center h-screen">No campaign data found</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full text-center">
                <h1 className="text-3xl font-bold mb-6">{campaign.name}</h1>

                {/* Image */}
                <div className="mb-8 relative w-64 h-64 mx-auto">
                    <Image
                        src={campaign.pictureFiles[0].url as string}
                        alt={campaign.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Company information */}
                <div className="space-y-2 mb-8">
                    <p><strong>Description:</strong> {campaign.description}</p>
                    <p><strong>Status:</strong> {campaign.status ? 'Active' : 'Closed'}</p>
                    <p><strong>Company Name:</strong> {campaign.companyName}</p>
                    <p><strong>Website:</strong> <a href={campaign.website} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline">{campaign.website}</a></p>
                    <p><strong>Founder:</strong> {campaign.founderName}</p>
                    <p><strong>Email:</strong> {campaign.email}</p>
                    <p><strong>LinkedIn:</strong> <a href={campaign.linkedInProfile} target="_blank"
                                                     rel="noopener noreferrer"
                                                     className="text-blue-500 hover:underline">{campaign.linkedInProfile}</a>
                    </p>
                    <p><strong>Company Stage:</strong> {campaign.companyStage}</p>
                    <p><strong>Industry:</strong> {campaign.industry}</p>
                    <p><strong>Sector:</strong> {campaign.sector}</p>
                    <p><strong>Amount Raised:</strong> ${campaign.amountRaised.toLocaleString()}</p>
                    <p><strong>Target Amount:</strong> ${campaign.targetAmount.toLocaleString()}</p>
                    <p><strong>Team Size:</strong> {campaign.teamSize}</p>
                    <p><strong>Headquarters:</strong> {campaign.headquartersLocation}</p>
                    <p><strong>Product Available:</strong> {campaign.productAvailable ? 'Yes' : 'No'}</p>
                    <p><strong>Location:</strong> {campaign.location}</p>
                    <p><strong>Incorporation Date:</strong> {new Date(campaign.incorporationDate).toLocaleDateString()}
                    </p>
                    <p><strong>Campaign End Date:</strong> {new Date(campaign.endInDate).toLocaleDateString()}</p>
                    <p><strong>Investors:</strong> {campaign.investors.join(', ')}</p>
                    <p><strong>Company Number:</strong> {campaign.companyNumber}</p>
                    <p><strong>Company Vision:</strong> {campaign.companyVision}</p>
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