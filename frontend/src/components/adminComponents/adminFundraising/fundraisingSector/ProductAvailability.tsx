import React from 'react';

interface ProductAvailabilityProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductAvailability: React.FC<ProductAvailabilityProps> = ({ formData, handleInputChange }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">Product Availability</h3>
    <div className="flex items-center">
      <label className="mr-2">Product Available:</label>
      <input
        type="radio"
        name="productAvailable"
        value="true"
        checked={formData.productAvailable === true}
        onChange={handleInputChange}
        className="mr-2"
      />
      Yes
      <input
        type="radio"
        name="productAvailable"
        value="false"
        checked={formData.productAvailable === false}
        onChange={handleInputChange}
        className="ml-4 mr-2"
      />
      No
    </div>
  </div>
);

export default ProductAvailability;