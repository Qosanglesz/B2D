// components/adminComponents/adminNavAndFooter/NavBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

const AdminNavBar: React.FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="bg-slate-100 text-black p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/admin">
          <span className="text-2xl font-bold cursor-pointer">B2D VENTURE ADMIN</span>
        </Link>
{/* 
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-200 text-black px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div> */}

        <div className="flex items-center space-x-6">
          <Link href="/admin/dashboard">
            <span className="hover:text-gray-600 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/admin/fundraising">
            <span className="hover:text-gray-600 cursor-pointer">Fundraising</span>
          </Link>
          <Link href="/admin/user">
            <span className="hover:text-gray-600 cursor-pointer">User Management</span>
          </Link>

          <div className="flex items-center space-x-2">
            {user && user.picture && (
              <Link href="/profile">
                <Image
                  src={user.picture}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                />
              </Link>
            )}
            <a
              href="/api/auth/logout"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;