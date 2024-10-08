'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

import {FundraisingCampaign} from '@/components/types/type_fundraisingCampaign';
import EditCampaignForm from '@/components/adminComponents/adminFundraising/EditCampaignForm';

export default function EditCampaignPage({params}: { params: { id: string } }) {
    const [campaign, setCampaign] = useState<FundraisingCampaign | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`/api/campaign/${params.id}`);
                if (!response.ok) throw new Error('Failed to fetch campaign data');
                const data: FundraisingCampaign = await response.json();
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setCampaign((prev) => {
            if (!prev) return null;
            if (name === 'investors') {
                return {...prev, [name]: value.split(',').map((item) => item.trim())};
            }
            if (name === 'productAvailable' || name === 'status') {
                return {...prev, [name]: value === 'true'};
            }
            // Keep number fields as strings during input
            if (name === 'amountRaised' || name === 'targetAmount' || name === 'teamSize') {
                return {...prev, [name]: value};
            }
            return {...prev, [name]: value};
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaign) return;

        try {
            const response = await fetch(`/api/campaign/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaign),
            });

            if (!response.ok) throw new Error('Failed to update campaign');

            router.push(`/admin/fundraising/${params.id}`);
        } catch (err) {
            setError('Error updating campaign');
            console.error(err);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    if (!campaign) return <div className="flex justify-center items-center h-screen">No campaign data found</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Campaign</h1>

                <EditCampaignForm
                    campaign={campaign}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                />

                <div className="mt-4 text-center">
                    <Link href={`/admin/fundraising/${params.id}`}>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}