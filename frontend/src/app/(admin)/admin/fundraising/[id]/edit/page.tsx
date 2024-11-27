// import React from 'react';
// import { notFound } from 'next/navigation';
// import Link from 'next/link';

// import { Campaign } from '@/types/Campaign';
// import EditCampaignClient from "@/components/adminComponents/adminFundraising/EditSections/EditCampaignClient";

// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';

// // Server-side data fetching function
// async function fetchCampaign(id: string): Promise<Campaign | null> {
//     try {
//         const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
//             method: "GET",
//             headers: {
//                 accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
//             }
//         })
//         const tokenData = await tokenResponse.json()
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${id}`, {
//             cache: "no-store",
//             headers: {
//                 authorization: `Bearer ${tokenData.access_token}`,
//             }
//         });

//         if (!response.ok) {
//             return null;
//         }

//         return response.json();
//     } catch (error) {
//         console.error('Failed to fetch campaign:', error);
//         return null;
//     }
// }

// export default async function EditCampaignPage({ params }: { params: { id: string } }) {
//     const campaign = await fetchCampaign(params.id);

//     if (!campaign) {
//         notFound();
//     }

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//             <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full">
//                 <h1 className="text-3xl font-bold mb-6 text-center">Edit Campaign</h1>

//                 <EditCampaignClient
//                     initialCampaign={campaign}
//                     campaignId={params.id}
//                 />

//                 <div className="mt-4 text-center">
//                     <a href={`/admin/fundraising/${params.id}`}>
//                         <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
//                             Cancel
//                         </button>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }

// app/admin/fundraising/[id]/edit/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditCampaignClient from "@/components/adminComponents/adminFundraising/EditSections/EditCampaignClient";
import { Campaign } from '@/types/Campaign';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function fetchCampaign(id: string): Promise<Campaign | null> {
  try {
      const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
          method: "GET",
          headers: {
              accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
          }
      });
      const tokenData = await tokenResponse.json();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${id}`, {
          cache: "no-store",
          headers: {
              authorization: `Bearer ${tokenData.access_token}`,
          }
      });

      if (!response.ok) {
          return null;
      }

      return response.json();
  } catch (error) {
      console.error('Failed to fetch campaign:', error);
      return null;
  }
}

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const campaign = await fetchCampaign(params.id);

  if (!campaign) {
      notFound();
  }

  return (
      <div className="container mx-auto py-10 px-4">
          <Card className="max-w-5xl mx-auto">
              <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center">
                      Edit Campaign
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <EditCampaignClient
                      initialCampaign={campaign}
                      campaignId={params.id}
                  />
              </CardContent>
          </Card>
      </div>
  );
}