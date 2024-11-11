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
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Investment Statements</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        {/* Header columns with sort functionality */}
                        {[
                            { key: 'statement_id', label: 'Statement ID', icon: RiBillFill },
                            { key: 'campaignName', label: 'Company Name', icon: IoIosBusiness },
                            { key: 'amount', label: 'Amount', icon: AiFillDollarCircle },
                            { key: 'date', label: 'Release Date', icon: FaCalendarPlus },
                            { key: 'successAt', label: 'Success Date', icon: FaCalendarCheck },
                            { key: 'status', label: 'Status', icon: GrStatusGood }
                        ].map(({ key, label, icon: Icon }) => (
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
                    {statements.map((statement) => (
                        <tr key={statement._id?.toString()}>
                            <td className="py-2 px-4 border-b">{statement.statement_id}</td>
                            <td className="py-2 px-4 border-b">{statement.campaignName}</td>
                            <td className="py-2 px-4 border-b">${statement.amount}</td>
                            <td className="py-2 px-4 border-b">{formatDate(statement.date)}</td>
                            <td className="py-2 px-4 border-b">{formatDate(statement.successAt)}</td>
                            <td className="py-2 px-4 border-b">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    statement.status === 'open' ? 'bg-blue-100 text-blue-800' :
                                    statement.status === 'failed' ? 'bg-red-100 text-red-800' :
                                    statement.status === 'complete' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {statement.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <TablePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};