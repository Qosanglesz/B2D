import React from 'react';
import { Campaign } from '@/types/Campaign';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Users, MapPin, Calendar, Link2, Globe, Building, Target } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CampaignDetailProps {
  campaign: Campaign;
}

const CompanyInformation: React.FC<CampaignDetailProps> = ({ campaign }) => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold">Company Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="text-sm sm:text-base">Overview</TabsTrigger>
            <TabsTrigger value="details" className="text-sm sm:text-base">Details</TabsTrigger>
            <TabsTrigger value="contact" className="text-sm sm:text-base">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Company Stage Card */}
              <Card className="shadow-sm">
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Company Stage</p>
                  </div>
                  <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {campaign.companyStage || 'N/A'}
                  </p>
                </CardContent>
              </Card>

              {/* Team Size Card */}
              <Card className="shadow-sm">
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Team Size</p>
                  </div>
                  <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {campaign.teamSize || 'N/A'}
                  </p>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="shadow-sm sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Location</p>
                  </div>
                  <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {campaign.location || 'N/A'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Vision Section */}
            <Card className="shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Company Vision</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {campaign.companyVision || 'N/A'}
                </p>
              </CardContent>
            </Card>

            {/* Industry Tags */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Industries & Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {campaign.industry && (
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {campaign.industry}
                  </Badge>
                )}
                {campaign.sector && (
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {campaign.sector}
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 sm:space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm sm:text-base font-medium">Company Number</span>
                    </div>
                    <span className="text-sm sm:text-base ml-6 sm:ml-0">
                      {campaign.companyNumber || 'N/A'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm sm:text-base font-medium">Incorporation Date</span>
                    </div>
                    <span className="text-sm sm:text-base ml-6 sm:ml-0">
                      {campaign.incorporationDate 
                        ? new Date(campaign.incorporationDate).toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm sm:text-base font-medium">Headquarters</span>
                    </div>
                    <span className="text-sm sm:text-base ml-6 sm:ml-0">
                      {campaign.headquartersLocation || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 sm:space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm sm:text-base font-medium">Founder:</span>
                      </div>
                      <span className="text-sm sm:text-base ml-6 sm:ml-0">
                        {campaign.founderName || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm sm:text-base font-medium">Email:</span>
                      </div>
                      <span className="text-sm sm:text-base ml-6 sm:ml-0 break-all">
                        {campaign.email || 'N/A'}
                      </span>
                    </div>

                    {campaign.website && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm sm:text-base font-medium">Website:</span>
                        </div>
                        <a 
                          href={`https://${campaign.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base ml-6 sm:ml-0 text-primary hover:underline break-all"
                        >
                          {campaign.website}
                        </a>
                      </div>
                    )}

                    {campaign.linkedInProfile && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <div className="flex items-center space-x-2">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm sm:text-base font-medium">LinkedIn:</span>
                        </div>
                        <a 
                          href={campaign.linkedInProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base ml-6 sm:ml-0 text-primary hover:underline break-all"
                        >
                          View Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CompanyInformation;