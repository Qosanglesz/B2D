// app/profile/ClientWrapper.tsx
"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { SearchBar } from "@/components/campaignComponents/profile/SearchBar";
import { InvestmentTable } from "@/components/campaignComponents/profile/InvestmentTable";
import { CryptoTable } from "@/components/campaignComponents/profile/CryptoTable";

const ITEMS_PER_PAGE = 10;

const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
};

interface Props {
    statements: any[];
    cryptoTransactions: any[];
    hasStatements: boolean;
}

export default function ClientWrapper({ statements, cryptoTransactions, hasStatements }: Props) {
    // State management
    const [selectedTab, setSelectedTab] = useState("statements");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cryptoCurrentPage, setCryptoCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({ key: '', direction: null });

    // Filtering and sorting logic
    const filterData = (data: any[], query: string) => {
        if (!query) return data;

        const searchInObject = (obj: any): boolean => {
            return Object.entries(obj).some(([key, value]) => {
                if (value && typeof value === 'object') {
                    return searchInObject(value);
                }
                return String(value).toLowerCase().includes(query.toLowerCase());
            });
        };

        return data.filter(item => searchInObject(item));
    };

    const getNestedValue = (obj: any, path: string): any => {
        try {
            return path.split('.').reduce((acc, part) => {
                if (acc === null || acc === undefined) return '';
                return acc[part];
            }, obj);
        } catch (error) {
            console.error(`Error getting nested value for path: ${path}`, error);
            return '';
        }
    };

    const sortData = (data: any[]): any[] => {
        if (!sortConfig.key || !sortConfig.direction) return data;

        return [...data].sort((a, b) => {
            let aValue = getNestedValue(a, sortConfig.key);
            let bValue = getNestedValue(b, sortConfig.key);

            if (sortConfig.key.includes('date') || sortConfig.key.includes('At')) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            else if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Event handlers
    const handleSort = (key: string) => {
        setSortConfig((prevConfig) => ({
            key,
            direction:
                prevConfig.key === key && prevConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        }));
    };

    // Process data
    const filteredAndSortedInvestments = sortData(filterData(statements, searchQuery));
    const filteredAndSortedCryptoTransactions = sortData(filterData(cryptoTransactions, searchQuery));

    const currentInvestments = filteredAndSortedInvestments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const currentCryptoTransactions = filteredAndSortedCryptoTransactions.slice(
        (cryptoCurrentPage - 1) * ITEMS_PER_PAGE,
        cryptoCurrentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredAndSortedInvestments.length / ITEMS_PER_PAGE);
    const cryptoTotalPages = Math.ceil(filteredAndSortedCryptoTransactions.length / ITEMS_PER_PAGE);

    return (
        <div className="py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full sm:w-auto">
                    <Tabs
                        selectedKey={selectedTab}
                        onSelectionChange={(key) => setSelectedTab(key.toString())}
                        className="max-w-full sm:max-w-md"
                    >
                        <Tab key="statements" title="Investment Statements" />
                        <Tab key="crypto" title="Crypto Transactions" />
                    </Tabs>
                </div>

                <div className="w-full sm:w-auto">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                {selectedTab === "statements" ? (
                    !hasStatements ? (
                        <Card className="w-full shadow-sm">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="rounded-full bg-gray-50 p-3 mb-4">
                                    <AlertCircle className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No Statement Found
                                </h3>
                                <p className="text-sm text-gray-500 text-center max-w-md">
                                    You have not made any traditional investments yet.
                                    {cryptoTransactions.length > 0 && (
                                        <span className="block mt-2">
                                            Check out your crypto transactions in the Crypto tab.
                                        </span>
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <InvestmentTable
                            statements={currentInvestments}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            formatDate={formatDate}
                        />
                    )
                ) : (
                    <CryptoTable
                        transactions={currentCryptoTransactions}
                        currentPage={cryptoCurrentPage}
                        totalPages={cryptoTotalPages}
                        onPageChange={setCryptoCurrentPage}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        formatDate={formatDate}
                    />
                )}
            </div>
        </div>
    );
}