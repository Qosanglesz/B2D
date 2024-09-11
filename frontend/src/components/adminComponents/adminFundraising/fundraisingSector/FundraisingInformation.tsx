import React from 'react';

interface FundraisingInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FundraisingInformation: React.FC<FundraisingInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Fundraising Information</h3>
    <input
      type="number"
      name="amountRaised"
      value={formData.amountRaised}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Amount Raised"
    />
    <input
      type="number"
      name="targetAmount"
      value={formData.targetAmount}
      onChange={handleInputChange}
      className="block w-full mb-4 p-2 border rounded-lg"
      placeholder="Target Amount"
    />
  </div>
);

export default FundraisingInformation;