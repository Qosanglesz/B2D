import React from "react";

interface FundraisingInfoProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FundraisingInfo: React.FC<FundraisingInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Fundraising Information</h3>
      <label className="block mb-2">
        <span className="text-gray-700">Amount Raised (so far):</span>
        <input
          type="number"
          name="fundraisingDetails.amountRaised"
          value={formData.fundingDetails.amountRaised}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Target Amount:</span>
        <input
          type="number"
          name="fundraisingDetails.targetAmount"
          value={formData.fundingDetails.targetAmount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
        />
      </label>
    </div>
  );
};

export default FundraisingInfo;