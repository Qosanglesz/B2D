'use client';

import { useState } from 'react';
import {Input} from "@nextui-org/react";
import SearchIcon from "@/components/adminComponents/adminCrypto/SearchIcon";
import TransactionTable from "@/components/adminComponents/adminCrypto/TransactionTable";
import PaginationComponent from "@/components/adminComponents/adminCrypto/PaginationComponent";

export default function TransactionTableWrapper({ transactions }: { transactions: any[] }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
        key: 'chargeId',
        direction: 'asc',
    });
    const transactionsPerPage = 10;

    // Sorting function
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

    // Sort handler
    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    // Filtering
    const filteredTransactions = transactions.filter(transaction =>
        ['chargeId', 'amount', 'currency', 'status'].some(key =>
            transaction[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Sorting
    const sortedTransactions = sortTransactions(filteredTransactions);

    // Pagination
    const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);
    const currentTransactions = sortedTransactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );

    return (
        <>
            <Input
                classNames={{
                    base: "max-w-full sm:max-w-[10rem] h-10 mb-4",
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
            <TransactionTable
                transactions={currentTransactions}
                onSort={handleSort}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}