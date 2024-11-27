// import React from 'react';
// import {Campaign} from '@/types/Campaign';
// import {UploadDropzone} from "@/components/uploadThing/uploadthing";
// import {UploadThingPictureFile} from "@/types/UploadThingPictureFile";


// interface AdditionalInformationProps {
//     formData: Partial<Campaign>;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//     handleInvestorsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleUploadFile: (response: UploadThingPictureFile[]) => void;
// }

// const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
//                                                                          formData,
//                                                                          handleChange,
//                                                                          handleInvestorsChange,
//                                                                          handleUploadFile
//                                                                      }) => {
//     return (
//         <section className="mb-6 bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-xl font-medium mb-2">Additional Information</h3>
//             <textarea name="description" value={formData.description || ''} onChange={handleChange}
//                       placeholder="Description" className="p-2 border rounded w-full h-24 mb-4"/>
//             <textarea name="companyVision" value={formData.companyVision || ''} onChange={handleChange}
//                       placeholder="Company Vision" className="p-2 border rounded w-full h-24 mb-4"/>
//             {/*<input name="urlPicture" value={formData.urlPicture || ''} onChange={handleChange} placeholder="URL Picture" className="p-2 border rounded w-full mb-4" />*/}
//             <h4 className="font-medium mb-2">Campaign Pictures</h4>
//             <UploadDropzone endpoint="imageUploader"
//                             onClientUploadComplete={(res) => {
//                                 // Do something with the response
//                                 handleUploadFile(res as UploadThingPictureFile[]);
//                                 alert("Upload Completed");
//                             }}
//                             onUploadError={(error: Error) => {
//                                 // Do something with the error.
//                                 alert(`ERROR! ${error.message}`);
//                             }}/>
//         </section>
//     );
// };

// export default AdditionalInformation;

import React from 'react';
import { Campaign } from '@/types/Campaign';
import { UploadDropzone } from "@/components/uploadThing/uploadthing";
import { UploadThingPictureFile } from "@/types/UploadThingPictureFile";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { FileText, Eye, Image as ImageIcon } from "lucide-react";
import Image from 'next/image';
import { ClientUploadedFileData } from 'uploadthing/types';

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
  const onUploadComplete = (res: ClientUploadedFileData<any>[]) => {
      // Convert the ClientUploadedFileData to UploadThingPictureFile
      const convertedFiles: UploadThingPictureFile[] = res.map(file => ({
          name: String(file.name),
          size: file.size,
          key: String(file.key),
          lastModified: file.lastModified || Date.now(),
          serverData: null,
          url: String(file.url),
          appUrl: String(file.url), // Using the same URL as appUrl
          customId: null,
          type: String(file.type || 'image/*'),
          fileHash: String(file.key) // Using key as fileHash, adjust if needed
      }));

      // Handle the file upload
      handleUploadFile(convertedFiles);

      // Show success message
      toast.success("Upload completed successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
  };

  const onUploadError = (error: Error) => {
      toast.error(`Upload failed: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
  };

  return (
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Additional Information
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="description" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Description
                      </Label>
                      <Textarea
                          id="description"
                          name="description"
                          value={formData.description || ''}
                          onChange={handleChange}
                          className="min-h-[96px] resize-y"
                          placeholder="Enter campaign description..."
                      />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="companyVision" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Company Vision
                      </Label>
                      <Textarea
                          id="companyVision"
                          name="companyVision"
                          value={formData.companyVision || ''}
                          onChange={handleChange}
                          className="min-h-[96px] resize-y"
                          placeholder="Enter company vision..."
                      />
                  </div>

                  <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Campaign Pictures
                      </Label>
                      <div className="border rounded-lg p-4 bg-gray-50">
                          <UploadDropzone
                              endpoint="imageUploader"
                              onClientUploadComplete={onUploadComplete}
                              onUploadError={onUploadError}
                          />
                      </div>
                  </div>

                  {formData.pictureFiles && formData.pictureFiles.length > 0 && (
                      <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                              <ImageIcon className="w-4 h-4" />
                              Uploaded Images
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {formData.pictureFiles.map((file, index) => (
                                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                      <Image 
                                          src={file.url.toString()}
                                          alt={`Uploaded image ${index + 1}`}
                                          fill
                                          className="object-cover"
                                          sizes="(max-width: 768px) 50vw, 33vw"
                                      />
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          </CardContent>
      </Card>
  );
};

export default AdditionalInformation;