'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

import {Campaign} from '@/types/Campaign';
import BasicInformation from '@/components/formComponents/BasicInformation';
import CompanyDetails from '@/components/formComponents/CompanyDetails';
import CampaignDetails from '@/components/formComponents/CampaignDetails';
import AdditionalInformation from '@/components/formComponents/AdditionalInformation';
import {UploadThingPictureFile} from '@/types/UploadThingPictureFile';
import { v4 as uuidv4 } from 'uuid';

const FundraisingCampaignForm: React.FC = () => {
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

    const handleUploadFile = (response : UploadThingPictureFile[]) => {
        const files = response;
        setFormData(prev=> ({...prev, pictureFiles: files}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log(formData)
            const response = await fetch('/api/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save campaign');
            router.push('/admin/form/success'); // Redirect to success page
        } catch (err) {
            setError('Error saving campaign');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">New Fundraising Campaign</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <BasicInformation formData={formData} handleChange={handleChange}/>
            <CompanyDetails formData={formData} handleChange={handleChange}
                            handleCheckboxChange={handleCheckboxChange}/>
            <CampaignDetails formData={formData} handleChange={handleChange}/>
            <AdditionalInformation formData={formData} handleChange={handleChange}
                                   handleInvestorsChange={handleInvestorsChange} handleUploadFile={handleUploadFile}/>

            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Campaign'}
                </button>
            </div>
        </form>
    );
};

export default FundraisingCampaignForm;
