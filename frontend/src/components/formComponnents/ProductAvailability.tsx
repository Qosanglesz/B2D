import React from "react";

interface ProductAvailabilityProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ProductAvailability: React.FC<ProductAvailabilityProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-2">Product Availability</h3>
      <div className="flex items-center mb-2">
        <label className="block text-gray-700 mr-4">
          <input
            type="radio"
            name="productAvailable"
            value="true"
            checked={formData.productAvailable === true}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="block text-gray-700">
          <input
            type="radio"
            name="productAvailable"
            value="false"
            checked={formData.productAvailable === false}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
      </div>
    </div>
  );
};

export default ProductAvailability;