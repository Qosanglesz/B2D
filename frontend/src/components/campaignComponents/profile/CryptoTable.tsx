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
        { key: 'chargeId', label: 'Transaction ID', icon: GrTransaction },
        { key: 'metadata.companyName', label: 'Company Name', icon: IoIosBusiness },
        { key: 'amount', label: 'Amount', icon: AiFillDollarCircle },
        { key: 'currency', label: 'Currency', icon: FaBitcoin },
        { key: 'paymentMethod', label: 'Payment Method', icon: FaBitcoin },
        { key: 'createdAt', label: 'Created Date', icon: FaCalendarPlus },
        { key: 'updatedAt', label: 'Updated Date', icon: FaCalendarCheck },
        { key: 'status', label: 'Status', icon: GrStatusGood }
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
        <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Crypto Transactions</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map(({ key, label, icon: Icon }) => (
                            <th 
                                key={key}
                                className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
                                onClick={() => onSort(key)}
                            >
                                <div className="flex items-center">
                                    {label}
                                    <Icon className="ml-1"/>
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
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.chargeId}>
                            <td className="py-2 px-4 border-b">
                                {transaction.chargeId}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {transaction.metadata.companyName}
                            </td>
                            <td className="py-2 px-4 border-b">
                                ${transaction.amount}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {transaction.currency}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {transaction.paymentMethod}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {formatDate(new Date(transaction.createdAt).toISOString())}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {formatDate(new Date(transaction.updatedAt).toISOString())}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    getStatusStyle(transaction.status)
                                }`}>
                                    {transaction.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {transactions.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                    No crypto transactions found
                </div>
            ) : (
                <TablePagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};