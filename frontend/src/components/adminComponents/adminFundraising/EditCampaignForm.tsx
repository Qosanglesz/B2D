// import React from 'react';
// import { Campaign } from '@/types/Campaign';
// import BasicInfoSection from './EditSections/BasicInfoSection';
// import CompanyDetailsSection from './EditSections/CompanyDetailsSection';
// import FinancialInfoSection from './EditSections/FinancialInfoSection';
// import AdditionalInfoSection from './EditSections/AdditionalInfoSection';


// interface EditCampaignFormProps {
//   campaign: Campaign;
//   onSubmit: (e: React.FormEvent) => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
// }

// const EditCampaignForm: React.FC<EditCampaignFormProps> = ({ campaign, onSubmit, onChange }) => {
//   return (
//     <form onSubmit={onSubmit} className="space-y-8">
//       <BasicInfoSection campaign={campaign} onChange={onChange} />
//       <CompanyDetailsSection campaign={campaign} onChange={onChange} />
//       <FinancialInfoSection campaign={campaign} onChange={onChange} />
//       <AdditionalInfoSection campaign={campaign} onChange={onChange} />

//       <div className="flex justify-center space-x-4 mt-6">
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditCampaignForm;

// components/adminComponents/adminFundraising/EditCampaignForm.tsx
import React from 'react';
import { Campaign } from '@/types/Campaign';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoSection from './EditSections/BasicInfoSection';
import CompanyDetailsSection from './EditSections/CompanyDetailsSection';
import FinancialInfoSection from './EditSections/FinancialInfoSection';
import AdditionalInfoSection from './EditSections/AdditionalInfoSection';

interface EditCampaignFormProps {
  campaign: Campaign;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EditCampaignForm: React.FC<EditCampaignFormProps> = ({ campaign, onSubmit, onChange }) => {
  return (
      <form onSubmit={onSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="company">Company Details</TabsTrigger>
                  <TabsTrigger value="financial">Financial Info</TabsTrigger>
                  <TabsTrigger value="additional">Additional Info</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                  <TabsContent value="basic">
                      <Card>
                          <CardContent className="pt-6">
                              <BasicInfoSection campaign={campaign} onChange={onChange} />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="company">
                      <Card>
                          <CardContent className="pt-6">
                              <CompanyDetailsSection campaign={campaign} onChange={onChange} />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="financial">
                      <Card>
                          <CardContent className="pt-6">
                              <FinancialInfoSection campaign={campaign} onChange={onChange} />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="additional">
                      <Card>
                          <CardContent className="pt-6">
                              <AdditionalInfoSection campaign={campaign} onChange={onChange} />
                          </CardContent>
                      </Card>
                  </TabsContent>
              </div>
          </Tabs>

          <div className="flex justify-center space-x-4">
              <Button type="submit" size="lg">
                  Save Changes
              </Button>
              <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
              >
                  Cancel
              </Button>
          </div>
      </form>
  );
};

export default EditCampaignForm;