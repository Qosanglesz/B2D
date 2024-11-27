// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import {Campaign} from '@/types/Campaign';
// import DeleteCampaignButton from "@/components/adminComponents/adminFundraising/DeleteCampaignButton";

// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';

// async function getCampaign(id: string): Promise<Campaign> {

//     const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
//         method: "GET",
//         headers: {
//             accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
//         }
//     })
//     const tokenData = await tokenResponse.json()

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${id}`, {
//         cache: 'no-store', // Disable caching to always get fresh data
//         headers: {
//             authorization: `Bearer ${tokenData.access_token}`,
//         }
//     });

//     if (!response.ok) {
//         throw new Error('Failed to fetch campaign data');
//     }

//     return response.json();
// }

// export default async function CampaignDetails({params,}: {
//     params: { id: string };
// }) {
//     const campaign = await getCampaign(params.id);

//     return (
//         <div>
//             <div>
//                 <div className="mx-auto bg-white overflow-hidden p-8 space-y-6">
//                     {/* Campaign Title */}
//                     <h1 className="text-4xl font-extrabold text-gray-900 text-center">
//                         {campaign.name}
//                     </h1>

//                     {/* Image */}
//                     <div className="relative max-w-4xl h-64 mx-auto mb-6">
//                         <Image
//                             src={campaign.pictureFiles[0].url as string}
//                             alt={campaign.name}
//                             fill
//                             className="rounded-lg shadow-lg object-cover"
//                             priority
//                         />
//                     </div>

//                     {/* Company Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mx-auto max-w-7xl">
//                         <p>
//                             <span className="font-semibold text-gray-800">Description:</span>{' '}
//                             {campaign.description}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Status:</span>
//                             <span
//                                 className={`ml-2 inline-block px-2 py-1 text-sm rounded-full ${
//                                     campaign.status
//                                         ? 'bg-green-100 text-green-700'
//                                         : 'bg-red-100 text-red-700'
//                                 }`}
//                             >
//                 {campaign.status ? 'Active' : 'Closed'}
//               </span>
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Company Name:</span>{' '}
//                             {campaign.companyName}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Website:</span>
//                             <a
//                                 href={campaign.website}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline"
//                             >
//                                 {campaign.website}
//                             </a>
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Founder:</span>{' '}
//                             {campaign.founderName}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Email:</span>{' '}
//                             {campaign.email}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">LinkedIn:</span>
//                             <a
//                                 href={campaign.linkedInProfile}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline"
//                             >
//                                 {campaign.linkedInProfile}
//                             </a>
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Company Stage:</span>{' '}
//                             {campaign.companyStage}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Industry:</span>{' '}
//                             {campaign.industry}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Sector:</span>{' '}
//                             {campaign.sector}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Amount Raised:</span> $
//                             {campaign.amountRaised.toLocaleString()}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Target Amount:</span> $
//                             {campaign.targetAmount.toLocaleString()}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Team Size:</span>{' '}
//                             {campaign.teamSize}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Headquarters:</span>{' '}
//                             {campaign.headquartersLocation}
//                         </p>
//                         <p>
//               <span className="font-semibold text-gray-800">
//                 Product Available:
//               </span>{' '}
//                             {campaign.productAvailable ? 'Yes' : 'No'}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Location:</span>{' '}
//                             {campaign.location}
//                         </p>
//                         <p>
//               <span className="font-semibold text-gray-800">
//                 Incorporation Date:
//               </span>{' '}
//                             {new Date(campaign.incorporationDate).toLocaleDateString()}
//                         </p>
//                         <p>
//               <span className="font-semibold text-gray-800">
//                 Campaign End Date:
//               </span>{' '}
//                             {new Date(campaign.endInDate).toLocaleDateString()}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Company Number:</span>{' '}
//                             {campaign.companyNumber}
//                         </p>
//                         <p>
//                             <span className="font-semibold text-gray-800">Company Vision:</span>{' '}
//                             {campaign.companyVision}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-center space-x-4 my-4">
//                     <a href={`/admin/fundraising/${campaign.id}/edit`}>
//                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             Edit
//                         </button>
//                     </a>
//                     <DeleteCampaignButton campaignId={campaign.id as string}/>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/types/Campaign';
import DeleteCampaignButton from "@/components/adminComponents/adminFundraising/DeleteCampaignButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { Calendar, Globe, Linkedin, Mail, MapPin, Users, Building, Target, DollarSign, FileCog, Pencil, Trash2} from "lucide-react";

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
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch campaign data');
    }

    return response.json();
}

export default async function CampaignDetails({
    params,
}: {
    params: { id: string };
}) {
    const campaign = await getCampaign(params.id);

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="max-w-7xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">{campaign.name}</CardTitle>
                        <Badge variant={campaign.status ? "default" : "destructive"}>
                            {campaign.status ? 'Active' : 'Closed'}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Campaign Image */}
                    <div className="relative w-full h-[400px]">
                        <Image
                            src={campaign.pictureFiles[0].url as string}
                            alt={campaign.name}
                            fill
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>

                    {/* Description */}
                    <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-2">About the Campaign</h3>
                        <p className="text-gray-700">{campaign.description}</p>
                    </div>

                    <Separator />

                    {/* Company Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Company Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Company:</span> {campaign.companyName}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Website:</span>
                                    <a href={campaign.website} target="_blank" rel="noopener noreferrer" 
                                       className="text-blue-600 hover:underline">
                                        {campaign.website}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Team Size:</span> {campaign.teamSize}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Location:</span> {campaign.headquartersLocation}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Funding Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Funding Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Amount Raised:</span> 
                                    ${campaign.amountRaised.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Target:</span> 
                                    ${campaign.targetAmount.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">End Date:</span>
                                    {new Date(campaign.endInDate).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Founder:</span> {campaign.founderName}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Email:</span> {campaign.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">LinkedIn:</span>
                                    <a href={campaign.linkedInProfile} target="_blank" rel="noopener noreferrer"
                                       className="text-blue-600 hover:underline">
                                        Profile
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Additional Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Industry:</span> {campaign.industry}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Sector:</span> {campaign.sector}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Company Stage:</span> {campaign.companyStage}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Product Available:</span>
                                    {campaign.productAvailable ? 'Yes' : 'No'}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 pt-6">
                        <Link href={`/admin/fundraising/${campaign.id}/edit`}>
                            <Button 
                                variant="default"
                                className="font-semibold"
                                color="primary"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit Campaign
                            </Button>
                        </Link>
                        <DeleteCampaignButton campaignId={campaign.id as string} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}