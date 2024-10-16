import React from 'react';
import {Campaign} from '@/types/Campaign';


interface BasicInformationProps {
    formData: Partial<Campaign>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({formData, handleChange}) => {
    return (
        <section className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Campaign Name"
                       className="p-2 border rounded"/>
                <input name="companyName" value={formData.companyName || ''} onChange={handleChange}
                       placeholder="Company Name" className="p-2 border rounded"/>
                <input name="founderName" value={formData.founderName || ''} onChange={handleChange}
                       placeholder="Founder Name" className="p-2 border rounded"/>
                <input name="email" type="email" value={formData.email || ''} onChange={handleChange}
                       placeholder="Email" className="p-2 border rounded"/>
                <input name="website" value={formData.website || ''} onChange={handleChange} placeholder="Website"
                       className="p-2 border rounded"/>
                <input name="linkedInProfile" value={formData.linkedInProfile || ''} onChange={handleChange}
                       placeholder="LinkedIn Profile" className="p-2 border rounded"/>
            </div>
        </section>
    );
};

export default BasicInformation;
