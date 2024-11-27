// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import { Campaign } from '@/types/Campaign';
// import EditCampaignForm from '@/components/adminComponents/adminFundraising/EditCampaignForm';

// export default function EditCampaignClient({
//     initialCampaign,
//     campaignId
// }: {
//     initialCampaign: Campaign,
//     campaignId: string
// }) {
//     const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
//     const router = useRouter();

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//         const {name, value} = e.target;
//         setCampaign((prev) => {
//             if (name === 'investors') {
//                 return {...prev, [name]: value.split(',').map((item) => item.trim())};
//             }
//             if (name === 'productAvailable' || name === 'status') {
//                 return {...prev, [name]: value === 'true'};
//             }
//             // Keep number fields as strings during input
//             if (name === 'amountRaised' || name === 'targetAmount' || name === 'teamSize') {
//                 return {...prev, [name]: value};
//             }
//             return {...prev, [name]: value};
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
//                 method: "GET",
//                 headers: {
//                     accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
//                 }
//             })
//             const tokenData = await tokenResponse.json()

//             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${campaignId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     authorization: `Bearer ${tokenData.access_token}`,
//                 },
//                 body: JSON.stringify(campaign),
//             });

//             if (!response.ok) throw new Error('Failed to update campaign');
//             router.push(`/admin/fundraising/${campaignId}`);
//         } catch (err) {
//             console.error('Error updating campaign', err);
//             // Optional: Add error handling UI
//         }
//     };

//     return (
//         <EditCampaignForm
//             campaign={campaign}
//             onSubmit={handleSubmit}
//             onChange={handleChange}
//         />
//     );
// }

// components/adminComponents/adminFundraising/EditSections/EditCampaignClient.tsx
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
      const { name, value } = e.target;
      setCampaign((prev) => {
          if (name === 'investors') {
              return { ...prev, [name]: value.split(',').map((item) => item.trim()) };
          }
          if (name === 'productAvailable' || name === 'status') {
              return { ...prev, [name]: value === 'true' };
          }
          if (name === 'amountRaised' || name === 'targetAmount' || name === 'teamSize') {
              return { ...prev, [name]: value };
          }
          return { ...prev, [name]: value };
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      try {
          const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
              method: "GET",
              headers: {
                  accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
              }
          });
          const tokenData = await tokenResponse.json();

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign/${campaignId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${tokenData.access_token}`,
              },
              body: JSON.stringify(campaign),
          });

          if (!response.ok) throw new Error('Failed to update campaign');

          setSuccess('Campaign updated successfully');
          // Optional: Add a small delay before navigation to show the success message
          setTimeout(() => {
              router.push(`/admin/fundraising/${campaignId}`);
          }, 1500);

      } catch (err) {
          console.error('Error updating campaign', err);
          setError('Failed to update campaign. Please try again.');
      }
  };

  return (
      <div>
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
              </div>
          )}
          {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{success}</span>
              </div>
          )}
          <EditCampaignForm
              campaign={campaign}
              onSubmit={handleSubmit}
              onChange={handleChange}
          />
      </div>
  );
}