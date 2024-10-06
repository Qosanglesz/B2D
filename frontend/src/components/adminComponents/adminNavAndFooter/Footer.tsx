import React from 'react';

const AdminFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a> |{' '}
          <a href="/terms-of-service" className="hover:text-gray-400">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
