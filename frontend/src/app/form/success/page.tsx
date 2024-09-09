// src/app/success/page.tsx

import React from 'react';

const SuccessPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Success!</h2>
      <p className="text-lg">Your form has been submitted successfully. Thank you!</p>
      <div className="mt-4">
        <a href="/home" className="text-blue-600 hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
