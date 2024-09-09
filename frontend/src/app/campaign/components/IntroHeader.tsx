// frontend/src/app/campaign/components/IntroHeader.tsx

import React from 'react';

interface IntroHeaderInfo {
    logo: string;
    companyName: string;
    description: string;
    location: string;
}

const IntroHeader: React.FC<IntroHeaderInfo> = ({logo,
  companyName,
  description,
  location
}) => {
  return (
    <div className="flex items-center space-x-4">
      <img src={logo} alt={`${companyName} logo`} className="w-16 h-16 object-cover" />
      <div>
        <h2 className="text-4xl font-bold">{companyName}</h2>
        <p className="text-gray-800">{description}</p>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
  );
};

export default IntroHeader;
