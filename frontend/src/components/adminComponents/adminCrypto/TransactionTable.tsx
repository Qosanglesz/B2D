// src/components/adminComponents/adminCrypto/TransactionTable.tsx
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const TransactionTable: React.FC<{ transactions: any[], onSort: (key: string) => void }> = ({ transactions, onSort }) => {
    return (
        <Table isStriped aria-label="Cryptocurrency Transactions">
            <TableHeader>
                <TableColumn onClick={() => onSort('chargeId')} className="cursor-pointer">Charge ID</TableColumn>
                <TableColumn onClick={() => onSort('amount')} className="cursor-pointer">Amount</TableColumn>
                <TableColumn onClick={() => onSort('currency')} className="cursor-pointer">Currency</TableColumn>
                <TableColumn onClick={() => onSort('status')} className="cursor-pointer">Status</TableColumn>
                <TableColumn onClick={() => onSort('createdAt')} className="cursor-pointer">Created At</TableColumn>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={transaction.chargeId}>
                        <TableCell>{transaction.chargeId}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.currency}</TableCell>
                        <TableCell className={`font-semibold ${transaction.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.status}
                        </TableCell>
                        <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TransactionTable;
