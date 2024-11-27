// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function DeleteCampaignButton({ campaignId }: { campaignId: string }) {
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();

//     const handleDelete = async () => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
//         if (!confirmDelete) return;

//         try {
//             const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
//                 method: "GET",
//                 headers: {
//                     accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
//                 }
//             })
//             const tokenData = await tokenResponse.json()

//             const response = await fetch(`/api/campaign/${campaignId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     authorization: `Bearer ${tokenData.access_token}`,
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete campaign');
//             }

//             // Campaign deleted successfully, redirect to the campaign list page
//             router.push('/admin/fundraising');
//         } catch (err) {
//             console.error('Error deleting campaign:', err);
//             setError('Failed to delete campaign. Please try again.');
//         }
//     };

//     return (
//         <>
//             <button
//                 onClick={handleDelete}
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Delete
//             </button>
//             {error && <div className="mt-4 text-red-500">{error}</div>}
//         </>
//     );
// }

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Trash2 } from "lucide-react";

export default function DeleteCampaignButton({ campaignId }: { campaignId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleDelete = async () => {
      setIsLoading(true);
      setError(null);

      try {
          const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
              method: "GET",
              headers: {
                  accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
              }
          });
          const tokenData = await tokenResponse.json();

          const response = await fetch(`/api/campaign/${campaignId}`, {
              method: 'DELETE',
              headers: {
                  authorization: `Bearer ${tokenData.access_token}`,
              }
          });

          if (!response.ok) {
              throw new Error('Failed to delete campaign');
          }

          onClose(); // Close the modal
          router.push('/admin/fundraising');
          router.refresh();
      } catch (err) {
          console.error('Error deleting campaign:', err);
          setError('Failed to delete campaign. Please try again.');
      } finally {
          setIsLoading(false);
      }
  };

  return (
      <>
          <Button
              color="danger"
              variant="flat"
              onPress={onOpen}
              startContent={<Trash2 size={20} />}
          >
              Delete
          </Button>

          <Modal 
              isOpen={isOpen} 
              onClose={onClose}
              backdrop="blur"
          >
              <ModalContent>
                  {(onClose) => (
                      <>
                          <ModalHeader className="flex flex-col gap-1">
                              Confirm Deletion
                          </ModalHeader>
                          <ModalBody>
                              <p>
                                  Are you sure you want to delete this campaign? 
                                  This action cannot be undone.
                              </p>
                              {error && (
                                  <p className="text-danger">
                                      {error}
                                  </p>
                              )}
                          </ModalBody>
                          <ModalFooter>
                              <Button 
                                  color="default" 
                                  variant="light" 
                                  onPress={onClose}
                              >
                                  Cancel
                              </Button>
                              <Button
                                  color="danger"
                                  variant="flat"
                                  onPress={handleDelete}
                                  isLoading={isLoading}
                              >
                                  Delete Campaign
                              </Button>
                          </ModalFooter>
                      </>
                  )}
              </ModalContent>
          </Modal>
      </>
  );
}