import React from 'react';
import {Campaign} from '@/types/Campaign';
import {UploadDropzone} from "@/components/uploadThing/uploadthing";
import {UploadThingPictureFile} from "@/types/UploadThingPictureFile";


interface AdditionalInformationProps {
    formData: Partial<Campaign>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleInvestorsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUploadFile: (response: UploadThingPictureFile[]) => void;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
                                                                         formData,
                                                                         handleChange,
                                                                         handleInvestorsChange,
                                                                         handleUploadFile
                                                                     }) => {
    return (
        <section className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Additional Information</h3>
            <textarea name="description" value={formData.description || ''} onChange={handleChange}
                      placeholder="Description" className="p-2 border rounded w-full h-24 mb-4"/>
            <textarea name="companyVision" value={formData.companyVision || ''} onChange={handleChange}
                      placeholder="Company Vision" className="p-2 border rounded w-full h-24 mb-4"/>
            {/*<input name="urlPicture" value={formData.urlPicture || ''} onChange={handleChange} placeholder="URL Picture" className="p-2 border rounded w-full mb-4" />*/}
            <h4 className="font-medium mb-2">Campaign Pictures</h4>
            <UploadDropzone endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                handleUploadFile(res as UploadThingPictureFile[]);
                                alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                            }}/>
        </section>
    );
};

export default AdditionalInformation;
