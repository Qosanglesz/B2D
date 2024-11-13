// CryptoTable.tsx
import React from 'react';
import { GrTransaction, GrStatusGood } from "react-icons/gr";
import { IoIosBusiness } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";
import { TablePagination } from './TablePagination';

interface CryptoTransaction {
    chargeId: string;
    metadata: {
        companyName: string;
    };
    amount: number;
    currency: string;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}

interface CryptoTableProps {
    transactions: CryptoTransaction[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    sortConfig: {
        key: string;
        direction: 'asc' | 'desc' | null;
    };
    onSort: (key: string) => void;
    formatDate: (date: string) => string;
}

export const CryptoTable = ({
    transactions,
    currentPage,
    totalPages,
    onPageChange,
    sortConfig,
    onSort,
    formatDate
}: CryptoTableProps) => {
    const columns = [
        { key: 'chargeId', label: 'ID', fullLabel: 'Transaction ID', icon: GrTransaction },
        { key: 'metadata.companyName', label: 'Company', fullLabel: 'Company Name', icon: IoIosBusiness },
        { key: 'amount', label: 'Amount', fullLabel: 'Amount', icon: AiFillDollarCircle },
        { key: 'currency', label: 'Currency', fullLabel: 'Currency', icon: FaBitcoin },
        { key: 'paymentMethod', label: 'Method', fullLabel: 'Payment Method', icon: FaBitcoin },
        { key: 'createdAt', label: 'Created', fullLabel: 'Created Date', icon: FaCalendarPlus },
        { key: 'updatedAt', label: 'Updated', fullLabel: 'Updated Date', icon: FaCalendarCheck },
        { key: 'status', label: 'Status', fullLabel: 'Status', icon: GrStatusGood }
    ];

    const getStatusStyle = (status: string) => {
        const styles = {
            completed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800',
            created: 'bg-blue-100 text-blue-800',
            default: 'bg-gray-100 text-gray-800'
        };
        return styles[status as keyof typeof styles] || styles.default;
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-4">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Crypto Transactions</h2>

                {/* Mobile View */}
                <div className="sm:hidden">
                    {transactions.map((transaction) => (
                        <div 
                            key={transaction.chargeId} 
                            className="bg-white rounded-lg shadow-md p-4 mb-4"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{transaction.metadata.companyName}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(transaction.status)}`}>
                                    {transaction.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transaction ID:</span>
                                    <span className="truncate ml-2 max-w-[150px]">{transaction.chargeId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Amount:</span>
                                    <span>{transaction.amount} {transaction.currency}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span>{transaction.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <span>{formatDate(new Date(transaction.createdAt).toISOString())}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Updated:</span>
                                    <span>{formatDate(new Date(transaction.updatedAt).toISOString())}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                {columns.map(({ key, fullLabel, icon: Icon }) => (
                                    <th 
                                        key={key}
                                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-300 transition-colors"
                                        onClick={() => onSort(key)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{fullLabel}</span>
                                            <Icon className="text-gray-600"/>
                                            {sortConfig.key === key && (
                                                <span className="ml-1">
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <tr 
                                    key={transaction.chargeId}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-4 whitespace-nowrap">{transaction.chargeId}</td>
                                    <td className="py-3 px-4">{transaction.metadata.companyName}</td>
                                    <td className="py-3 px-4">{transaction.amount}</td>
                                    <td className="py-3 px-4">{transaction.currency}</td>
                                    <td className="py-3 px-4">{transaction.paymentMethod}</td>
                                    <td className="py-3 px-4">{formatDate(new Date(transaction.createdAt).toISOString())}</td>
                                    <td className="py-3 px-4">{formatDate(new Date(transaction.updatedAt).toISOString())}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No crypto transactions found
                    </div>
                ) : (
                    <div className="mt-4">
                        <TablePagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};