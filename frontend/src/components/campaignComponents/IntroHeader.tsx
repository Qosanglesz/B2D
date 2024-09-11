// frontend/src/app/campaign/components/IntroHeader.tsx

import React from 'react';

interface IntroHeaderInfo {
    logo: string;
    companyName: string;
    description: string;
}

const IntroHeader: React.FC<IntroHeaderInfo> = ({ logo, companyName, description }) => {
  return (
    <div className="p-6 mb-5 mt-8">
      <div className="flex items-center space-x-4">
        <img src={logo} alt={`${companyName} logo`} className="w-16 h-16 object-cover rounded-full border border-gray-300" />
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{companyName}</h2>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
