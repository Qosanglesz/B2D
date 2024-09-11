
"use client";

import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
  lastLogin: string;
}

const initialUsers: User[] = [
  // Sample data, replace with real data from your API
  {
    id: 1,
    name: 'Admin User',
    role: 'Administrator',
    lastLogin: '2024-09-08',
  },
  // Add more sample users as needed
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return (
    <div className="p-6 min-h-screen"> 
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Role</th>
              <th className="py-2 px-4 border-b text-center">Last Login</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.role}</td>
                <td className="py-2 px-4 border-b text-center">{user.lastLogin}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
