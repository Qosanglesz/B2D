import React from 'react';

interface FundraisingInformationProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FundraisingInformation: React.FC<FundraisingInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Fundraising Information</h3>

    <label className="block mb-2">
      <span className="text-gray-700">Amount Raised</span>
      <input
        type="number"
        name="amountRaised"
        value={formData.amountRaised}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Amount Raised"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Target Amount</span>
      <input
        type="number"
        name="targetAmount"
        value={formData.targetAmount}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="Target Amount"
      />
    </label>

    <label className="block mb-2">
      <span className="text-gray-700">Investors</span>
      <input
        type="" // Can't be cause it relate to number of investors in investors array
        name="investors"
        value={formData.investors.length}
        onChange={handleInputChange}
        className="block w-full mb-4 p-2 border rounded-lg"
        placeholder="investors"
      />
    </label>
  </div>
);

export default FundraisingInformation;