// app/user-management/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import {LoadingError} from "@/components/homeComponents/LoadingError";

interface User {
  user_id: string;
  name: string;
  email: string;
  last_login: string;
}

type SortKey = 'name' | 'email' | 'last_login';

const USERS_PER_PAGE = 10;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
              'Cache-Control': 'no-cache'
          }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await response.json();
        
        const transformedUsers: User[] = usersData.map((user: any) => ({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          last_login: new Date(user.last_login).toLocaleString(),
        }));

        setUsers(transformedUsers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId: string) => {
    router.push(`/admin/user/${userId}`);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const sortedAndFilteredUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedAndFilteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = sortedAndFilteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <LoadingError loading={loading} error={error} />;
  }

  if (error) {
    return <div className="p-6 min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="w-1/3">
          <Input
            // clearable
            // bordered
            // fullWidth
            // color="primary"
            // size="lg"
            placeholder="Search user"
            // contentLeft={<SearchIcon />}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {['name', 'email', 'last_login'].map((key) => (
                <th 
                  key={key}
                  className="py-2 px-4 border-b text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(key as SortKey)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  {sortKey === key && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.user_id}>
                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">{user.last_login}</td>
                <td className="py-2 px-4 border-b text-center">
                  <Button 
                    color="primary" 
                    onClick={() => handleViewUser(user.user_id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {((currentPage - 1) * USERS_PER_PAGE) + 1} to {Math.min(currentPage * USERS_PER_PAGE, sortedAndFilteredUsers.length)} of {sortedAndFilteredUsers.length} users
        </div>
        <div className="flex space-x-2">
          <Button
            color="primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            color="primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchIcon = () => (
  <svg 
    className="w-5 h-5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);

export default UserManagement;