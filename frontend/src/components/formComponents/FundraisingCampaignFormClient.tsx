'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { Campaign } from '@/types/Campaign';
import { UploadThingPictureFile } from '@/types/UploadThingPictureFile';

import BasicInformation from '@/components/formComponents/BasicInformation';
import CompanyDetails from '@/components/formComponents/CompanyDetails';
import CampaignDetails from '@/components/formComponents/CampaignDetails';
import AdditionalInformation from '@/components/formComponents/AdditionalInformation';

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";

interface FundraisingCampaignFormClientProps {
    accessToken: string;
}
const FundraisingCampaignFormClient: React.FC<FundraisingCampaignFormClientProps> = ({ accessToken }) => {
    const [formData, setFormData] = useState<Partial<Campaign>>({id: uuidv4()});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData(prev => ({...prev, [name]: checked}));
    };

    const handleInvestorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setFormData(prev => ({...prev, investors: value.split(', ')}));
    };

    const handleUploadFile = (response: UploadThingPictureFile[]) => {
        const files = response;
        setFormData(prev => ({...prev, pictureFiles: files}));
    }

    const handleSectorChange = (value: string) => {
        // Update your form state here
        setFormData(prev => ({
            ...prev,
            sector: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save campaign');
            router.push('/admin/form/success');
        } catch (err) {
            setError('Error saving campaign');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // return (
    //     <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
    //         <h2 className="text-2xl font-bold mb-4">New Fundraising Campaign</h2>

    //         {error && <div className="text-red-500 mb-4">{error}</div>}

    //         <BasicInformation formData={formData} handleChange={handleChange}/>
    //         <CompanyDetails 
    //             formData={formData} 
    //             handleChange={handleChange}
    //             handleCheckboxChange={handleCheckboxChange}
    //         />
    //         <CampaignDetails formData={formData} handleChange={handleChange}/>
    //         <AdditionalInformation 
    //             formData={formData} 
    //             handleChange={handleChange}
    //             handleInvestorsChange={handleInvestorsChange} 
    //             handleUploadFile={handleUploadFile}
    //         />

    //         <div className="flex justify-center mt-6">
    //             <button
    //                 type="submit"
    //                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //                 disabled={isLoading}
    //             >
    //                 {isLoading ? 'Saving...' : 'Save Campaign'}
    //             </button>
    //         </div>
    //     </form>
    // );
    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>New Fundraising Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
  
                    <div className="space-y-6">
                        <BasicInformation formData={formData} handleChange={handleChange} />
                        <CompanyDetails
                            formData={formData}
                            handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleSectorChange={handleSectorChange}
                        />
                        <CampaignDetails formData={formData} handleChange={handleChange} />
                        <AdditionalInformation 
                            formData={formData} 
                            handleChange={handleChange}
                            handleInvestorsChange={handleInvestorsChange} 
                            handleUploadFile={handleUploadFile}
                        />
                    </div>
  
                    <div className="flex justify-center mt-6">
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                        >
                            {isLoading ? 'Saving...' : 'Save Campaign'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};  

export default FundraisingCampaignFormClient;