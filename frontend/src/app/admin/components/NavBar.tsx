import React from 'react';
import Link from 'next/link';
import UserManagement from './UserManagement';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin">
          <span className="text-2xl font-bold cursor-pointer">B2D VENTURE ADMIN</span>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/admin/dashboard">
              <span className="hover:text-gray-400 cursor-pointer">Dashboard</span>
            </Link>
          </li>
          {/* <li>
            <Link href="#">
              <span className="hover:text-gray-400 cursor-pointer">Investors</span>
            </Link>
          </li> */}
          <li>
            <Link href="/admin/fundraising">
              <span className="hover:text-gray-400 cursor-pointer">Fundraising</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/user">
              <span className="hover:text-gray-400 cursor-pointer">User Management</span>
            </Link>
          </li>
        </ul>
        <div>
          <Link href="#">
            <span className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
