'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Campaign } from '@/types/Campaign';
import EditCampaignForm from '@/components/adminComponents/adminFundraising/EditCampaignForm';

export default function EditCampaignClient({
    initialCampaign,
    campaignId
}: {
    initialCampaign: Campaign,
    campaignId: string
}) {
    const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setCampaign((prev) => {
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

        try {
            const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
                method: "GET",
                headers: {
                    accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
                }
            })
            const tokenData = await tokenResponse.json()

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${campaignId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData.access_token}`,
                },
                body: JSON.stringify(campaign),
            });

            if (!response.ok) throw new Error('Failed to update campaign');
            router.push(`/admin/fundraising/${campaignId}`);
        } catch (err) {
            console.error('Error updating campaign', err);
            // Optional: Add error handling UI
        }
    };

    return (
        <EditCampaignForm
            campaign={campaign}
            onSubmit={handleSubmit}
            onChange={handleChange}
        />
    );
}