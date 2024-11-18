import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Campaign} from '@/types/Campaign';
import DeleteCampaignButton from "@/components/adminComponents/adminFundraising/DeleteCampaignButton";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getCampaign(id: string): Promise<Campaign> {

    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
        method: "GET",
        headers: {
            accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
        }
    })
    const tokenData = await tokenResponse.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${id}`, {
        cache: 'no-store', // Disable caching to always get fresh data
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch campaign data');
    }

    return response.json();
}

export default async function CampaignDetails({params,}: {
    params: { id: string };
}) {
    const campaign = await getCampaign(params.id);

    return (
        <div>
            <div>
                <div className="mx-auto bg-white overflow-hidden p-8 space-y-6">
                    {/* Campaign Title */}
                    <h1 className="text-4xl font-extrabold text-gray-900 text-center">
                        {campaign.name}
                    </h1>

                    {/* Image */}
                    <div className="relative max-w-4xl h-64 mx-auto mb-6">
                        <Image
                            src={campaign.pictureFiles[0].url as string}
                            alt={campaign.name}
                            fill
                            className="rounded-lg shadow-lg object-cover"
                            priority
                        />
                    </div>

                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mx-auto max-w-7xl">
                        <p>
                            <span className="font-semibold text-gray-800">Description:</span>{' '}
                            {campaign.description}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Status:</span>
                            <span
                                className={`ml-2 inline-block px-2 py-1 text-sm rounded-full ${
                                    campaign.status
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                {campaign.status ? 'Active' : 'Closed'}
              </span>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Company Name:</span>{' '}
                            {campaign.companyName}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Website:</span>
                            <a
                                href={campaign.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {campaign.website}
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Founder:</span>{' '}
                            {campaign.founderName}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Email:</span>{' '}
                            {campaign.email}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">LinkedIn:</span>
                            <a
                                href={campaign.linkedInProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {campaign.linkedInProfile}
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Company Stage:</span>{' '}
                            {campaign.companyStage}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Industry:</span>{' '}
                            {campaign.industry}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Sector:</span>{' '}
                            {campaign.sector}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Amount Raised:</span> $
                            {campaign.amountRaised.toLocaleString()}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Target Amount:</span> $
                            {campaign.targetAmount.toLocaleString()}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Team Size:</span>{' '}
                            {campaign.teamSize}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Headquarters:</span>{' '}
                            {campaign.headquartersLocation}
                        </p>
                        <p>
              <span className="font-semibold text-gray-800">
                Product Available:
              </span>{' '}
                            {campaign.productAvailable ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Location:</span>{' '}
                            {campaign.location}
                        </p>
                        <p>
              <span className="font-semibold text-gray-800">
                Incorporation Date:
              </span>{' '}
                            {new Date(campaign.incorporationDate).toLocaleDateString()}
                        </p>
                        <p>
              <span className="font-semibold text-gray-800">
                Campaign End Date:
              </span>{' '}
                            {new Date(campaign.endInDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Company Number:</span>{' '}
                            {campaign.companyNumber}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Company Vision:</span>{' '}
                            {campaign.companyVision}
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
                    <DeleteCampaignButton campaignId={campaign.id as string}/>
                </div>
            </div>
        </div>
    );
}