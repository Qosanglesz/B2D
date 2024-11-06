// src/app/admin/transaction-crypto/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import TransactionTable from '@/components/adminComponents/adminCrypto/TransactionTable';
import { Input } from "@nextui-org/react";
import SearchIcon from "@/components/adminComponents/adminCrypto/SearchIcon";
import PaginationComponent from '@/components/adminComponents/adminCrypto/PaginationComponent'; // Import the new component

const TransactionCryptoPage: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
        key: 'chargeId',
        direction: 'asc',
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const transactionsPerPage = 10;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/payment/coinbase/transaction-crypto');
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                setTransactions(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const sortTransactions = (transactions: any[]) => {
        const sortedTransactions = [...transactions];

        if (sortConfig.key) {
            sortedTransactions.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            });
        }

        return sortedTransactions;
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const filteredTransactions = transactions.filter(transaction => {
        return (
            transaction.chargeId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.amount.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.currency.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.status.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedTransactions = sortTransactions(filteredTransactions);

    // Pagination logic
    const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
    const currentTransactions = sortedTransactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Loading transactions...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex items-center gap-2 text-red-500 text-lg">
                    <FiAlertCircle />
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between mb-4">
                <h1 className="text-4xl font-bold text-left text-blue-700">
                    Cryptocurrency Transactions
                </h1>
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <TransactionTable transactions={currentTransactions} onSort={handleSort} />
            </div>
            <PaginationComponent 
                totalPages={totalPages} 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
};

export default TransactionCryptoPage;