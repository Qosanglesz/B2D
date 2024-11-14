// InvestmentTable.tsx
import React from 'react';
import { RiBillFill } from "react-icons/ri";
import { IoIosBusiness } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCalendarPlus, FaCalendarCheck } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { TablePagination } from './TablePagination';
import { ObjectId } from "mongodb";

interface UserStatement {
    _id?: ObjectId;
    statement_id: string;
    campaignName: string;
    amount: number;
    date: string;
    successAt: string;
    status: string;
}

interface InvestmentTableProps {
    statements: UserStatement[];
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

export const InvestmentTable = ({
    statements,
    currentPage,
    totalPages,
    onPageChange,
    sortConfig,
    onSort,
    formatDate
}: InvestmentTableProps) => {
    const columns = [
        { key: 'statement_id', label: 'ID', fullLabel: 'Statement ID', icon: RiBillFill },
        { key: 'campaignName', label: 'Company', fullLabel: 'Company Name', icon: IoIosBusiness },
        { key: 'amount', label: 'Amount', fullLabel: 'Amount', icon: AiFillDollarCircle },
        { key: 'date', label: 'Release', fullLabel: 'Release Date', icon: FaCalendarPlus },
        { key: 'successAt', label: 'Success', fullLabel: 'Success Date', icon: FaCalendarCheck },
        { key: 'status', label: 'Status', fullLabel: 'Status', icon: GrStatusGood }
    ];

    const getStatusStyle = (status: string) => {
        const styles = {
            open: 'bg-blue-100 text-blue-800',
            failed: 'bg-red-100 text-red-800',
            complete: 'bg-green-100 text-green-800',
            default: 'bg-gray-100 text-gray-800'
        };
        return styles[status as keyof typeof styles] || styles.default;
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-4">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Investment Statements</h2>
                
                {/* Mobile View */}
                <div className="sm:hidden">
                    {statements.map((statement) => (
                        <div 
                            key={statement._id?.toString()} 
                            className="bg-white rounded-lg shadow-md p-4 mb-4"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{statement.campaignName}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(statement.status)}`}>
                                    {statement.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ID:</span>
                                    <span>{statement.statement_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Amount:</span>
                                    <span className="font-semibold">${statement.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Release Date:</span>
                                    <span>{formatDate(statement.date)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Success Date:</span>
                                    <span>{formatDate(statement.successAt)}</span>
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
                            {statements.map((statement) => (
                                <tr 
                                    key={statement._id?.toString()}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-4 whitespace-nowrap">{statement.statement_id}</td>
                                    <td className="py-3 px-4">{statement.campaignName}</td>
                                    <td className="py-3 px-4">${statement.amount}</td>
                                    <td className="py-3 px-4">{formatDate(statement.date)}</td>
                                    <td className="py-3 px-4">{formatDate(statement.successAt)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(statement.status)}`}>
                                            {statement.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {statements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No investment statements found
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