'use client';

import React, { useState } from 'react';
import { StatementData } from '@/components/apiComponents/statementAPI/statementRepository';
import { Button } from "@nextui-org/react";

interface UserData {
  email: string;
  name: string;
}

interface StatementWithUser extends StatementData {
  user: UserData | null;
}

interface StatementsTableProps {
  initialStatements: StatementWithUser[];
}

type SortableColumns = keyof StatementWithUser | 'userName' | 'userEmail';

const ITEMS_PER_PAGE = 5;

export default function StatementsTable({ initialStatements }: StatementsTableProps) {
  const [statements] = useState<StatementWithUser[]>(initialStatements);
  const [sortColumn, setSortColumn] = useState<SortableColumns>('statement_id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column: SortableColumns) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStatements = [...statements].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortColumn) {
      case 'userName':
        aValue = a.user?.name || '';
        bValue = b.user?.name || '';
        break;
      case 'userEmail':
        aValue = a.user?.email || '';
        bValue = b.user?.email || '';
        break;
      default:
        aValue = a[sortColumn as keyof StatementWithUser];
        bValue = b[sortColumn as keyof StatementWithUser];
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredStatements = sortedStatements.filter((statement) => {
    const searchFields = [
      statement.statement_id,
      statement.user?.name,
      statement.user?.email,
      statement.campaignName,
    ];
    return searchFields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredStatements.length / ITEMS_PER_PAGE);
  const paginatedStatements = filteredStatements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderSortIndicator = (column: SortableColumns) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Statements</h1>
        <input
          type="text"
          placeholder="Search statement"
          className="p-2 border border-gray-300 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('statement_id')}>
                Statement ID{renderSortIndicator('statement_id')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('userName')}>
                User Name{renderSortIndicator('userName')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('userEmail')}>
                User Email{renderSortIndicator('userEmail')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('campaignName')}>
                Campaign Name{renderSortIndicator('campaignName')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('amount')}>
                Amount{renderSortIndicator('amount')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('date')}>
                Date{renderSortIndicator('date')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('status')}>
                Status{renderSortIndicator('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedStatements.map((statement) => (
              <tr key={statement.statement_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{statement.statement_id}</td>
                <td className="py-2 px-4 border-b">{statement.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{statement.user?.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{statement.campaignName}</td>
                <td className="py-2 px-4 border-b">${statement.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(statement.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{statement.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 mb-16 flex justify-between items-center">
        <div>
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredStatements.length)} of {filteredStatements.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            auto
            color="primary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            auto
            color="primary"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}