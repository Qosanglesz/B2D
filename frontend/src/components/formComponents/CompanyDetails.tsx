import React from 'react';
import {Campaign} from '@/types/Campaign';


interface CompanyDetailsProps {
    formData: Partial<Campaign>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({formData, handleChange, handleCheckboxChange}) => {
    return (
        <section className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="companyStage" value={formData.companyStage || ''} onChange={handleChange}
                       placeholder="Company Stage" className="p-2 border rounded"/>
                <input name="industry" value={formData.industry || ''} onChange={handleChange} placeholder="Industry"
                       className="p-2 border rounded"/>
                <input name="sector" value={formData.sector || ''} onChange={handleChange} placeholder="Sector"
                       className="p-2 border rounded"/>
                <input name="teamSize" type="number" value={formData.teamSize || ''} onChange={handleChange}
                       placeholder="Team Size" className="p-2 border rounded"/>
                <input name="headquartersLocation" value={formData.headquartersLocation || ''} onChange={handleChange}
                       placeholder="Headquarters Location" className="p-2 border rounded"/>
                <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location"
                       className="p-2 border rounded"/>
                <input name="incorporationDate" type="date" value={formData.incorporationDate || ''}
                       onChange={handleChange} placeholder="Incorporation Date" className="p-2 border rounded"/>
                <input name="companyNumber" value={formData.companyNumber || ''} onChange={handleChange}
                       placeholder="Company Number" className="p-2 border rounded"/>
            </div>
            <div className="mt-4">
                <label className="flex items-center">
                    <input
                        name="productAvailable"
                        type="checkbox"
                        checked={formData.productAvailable || false}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    Product Available
                </label>
            </div>
        </section>
    );
};

export default CompanyDetails;
