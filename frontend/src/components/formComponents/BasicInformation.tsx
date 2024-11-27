// import React from 'react';
// import {Campaign} from '@/types/Campaign';


// interface BasicInformationProps {
//     formData: Partial<Campaign>;
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const BasicInformation: React.FC<BasicInformationProps> = ({formData, handleChange}) => {
//     return (
//         <section className="mb-6 bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-xl font-medium mb-2">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Campaign Name"
//                        className="p-2 border rounded"/>
//                 <input name="companyName" value={formData.companyName || ''} onChange={handleChange}
//                        placeholder="Company Name" className="p-2 border rounded"/>
//                 <input name="founderName" value={formData.founderName || ''} onChange={handleChange}
//                        placeholder="Founder Name" className="p-2 border rounded"/>
//                 <input name="email" type="email" value={formData.email || ''} onChange={handleChange}
//                        placeholder="Email" className="p-2 border rounded"/>
//                 <input name="website" value={formData.website || ''} onChange={handleChange} placeholder="Website"
//                        className="p-2 border rounded"/>
//                 <input name="linkedInProfile" value={formData.linkedInProfile || ''} onChange={handleChange}
//                        placeholder="LinkedIn Profile" className="p-2 border rounded"/>
//             </div>
//         </section>
//     );
// };

// export default BasicInformation;
// BasicInformation.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  HandCoins, 
  Building2,
  Building, 
  User, 
  Mail, 
  Globe, 
  Linkedin 
} from "lucide-react";

import { Campaign } from '@/types/Campaign';

interface BasicInformationProps {
  formData: Partial<Campaign>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({formData, handleChange}) => {
  return (
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Basic Information
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                          <HandCoins className="w-4 h-4" />
                          Campaign Name
                      </Label>
                      <div className="relative">
                          <Input
                              id="name"
                              name="name"
                              value={formData.name || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <HandCoins className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="companyName" className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Company Name
                      </Label>
                      <div className="relative">
                          <Input
                              id="companyName"
                              name="companyName"
                              value={formData.companyName || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <Building2 className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="founderName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Founder Name
                      </Label>
                      <div className="relative">
                          <Input
                              id="founderName"
                              name="founderName"
                              value={formData.founderName || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <User className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                      </Label>
                      <div className="relative">
                          <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <Mail className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Website
                      </Label>
                      <div className="relative">
                          <Input
                              id="website"
                              name="website"
                              value={formData.website || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <Globe className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="linkedInProfile" className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile
                      </Label>
                      <div className="relative">
                          <Input
                              id="linkedInProfile"
                              name="linkedInProfile"
                              value={formData.linkedInProfile || ''}
                              onChange={handleChange}
                              className="pl-8"
                          />
                          <Linkedin className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>
  );
};

export default BasicInformation;