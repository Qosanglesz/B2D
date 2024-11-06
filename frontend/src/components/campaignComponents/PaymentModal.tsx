// src/components/PaymentModal.tsx
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tab, Tabs } from "@nextui-org/react";
import { Campaign } from '@/types/Campaign';
import Image from 'next/image';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaign: Campaign;
    investmentAmount: number;
    onStripePayment: () => Promise<void>;
    onCryptoPayment: () => Promise<void>;
}

export default function PaymentModal({
    isOpen,
    onClose,
    campaign,
    investmentAmount,
    onStripePayment,
    onCryptoPayment
}: PaymentModalProps) {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Choose Payment Method
                        </ModalHeader>
                        <ModalBody>
                            <Tabs aria-label="Payment options">
                                <Tab key="card" title="Card Payment">
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold">Pay with Credit/Debit Card</h3>
                                            <p className="text-sm text-gray-600">
                                                Secure payment processed by Stripe
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Image
                                                src="/images/visa.svg"
                                                alt="Visa"
                                                width={40}
                                                height={25}
                                            />
                                            <Image
                                                src="/images/mastercard.svg"
                                                alt="Mastercard"
                                                width={40}
                                                height={25}
                                            />
                                            <Image
                                                src="/images/amex.svg"
                                                alt="American Express"
                                                width={40}
                                                height={25}
                                            />
                                        </div>
                                        <Button
                                            color="primary"
                                            className="w-full"
                                            onClick={onStripePayment}
                                        >
                                            Pay ${investmentAmount.toFixed(2)} with Card
                                        </Button>
                                    </div>
                                </Tab>
                                <Tab key="crypto" title="Cryptocurrency">
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold">Pay with Cryptocurrency</h3>
                                            <p className="text-sm text-gray-600">
                                                Secure payment processed by Coinbase Commerce
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Image
                                                src="/images/ethereum.svg"
                                                alt="Ethereum"
                                                width={30}
                                                height={30}
                                            />
                                            <Image
                                                src="/images/usdc.svg"
                                                alt="USDC"
                                                width={30}
                                                height={30}
                                            />
                                            <Image
                                                src="/images/bitcoin.svg"
                                                alt="Bitcoin"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                        <Button
                                            color="primary"
                                            className="w-full"
                                            onClick={onCryptoPayment}
                                        >
                                            Pay ${investmentAmount.toFixed(2)} with Crypto
                                        </Button>
                                    </div>
                                </Tab>
                            </Tabs>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


