"use client"
import React, { useState } from "react";
import {useUser} from "@auth0/nextjs-auth0/client";

interface InvestmentStatement {
    id: number;
    companyName: string;
    amount: number;
    date: string;
    paymentMethod: string;
}

const investments: InvestmentStatement[] = [
    { id: 1, companyName: "Startup Inc.", amount: 100, date: "2023-09-01", paymentMethod: "Credit Card" },
    { id: 2, companyName: "Startup Inc.", amount: 50, date: "2023-08-15", paymentMethod: "Bank Transfer" },
    { id: 3, companyName: "Startup Inc.", amount: 100, date: "2023-09-01", paymentMethod: "Credit Card" },
    { id: 4, companyName: "Startup Inc.", amount: 50, date: "2023-08-15", paymentMethod: "Bank Transfer" },
    { id: 5, companyName: "Startup Inc.", amount: 150, date: "2023-08-01", paymentMethod: "PayPal" },
    { id: 6, companyName: "Startup Inc.", amount: 100, date: "2023-09-01", paymentMethod: "Credit Card" },
    { id: 7, companyName: "Startup Inc.", amount: 50, date: "2023-08-15", paymentMethod: "Bank Transfer" },
    { id: 8, companyName: "Startup Inc.", amount: 150, date: "2023-08-01", paymentMethod: "PayPal" },
    { id: 9, companyName: "Startup Inc.", amount: 100, date: "2023-09-01", paymentMethod: "Credit Card" },
    { id: 10, companyName: "Startup Inc.", amount: 50, date: "2023-08-15", paymentMethod: "Bank Transfer" },
    { id: 11, companyName: "Startup Inc.", amount: 150, date: "2023-08-01", paymentMethod: "PayPal" },
];

const ITEMS_PER_PAGE = 10;

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(investments.length / ITEMS_PER_PAGE);

    const currentInvestments = investments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen">
            <div>
                <h1 className="text-3xl font-bold my-4 mx-3 ">User Investment Portfolio</h1>

                <div className="grid grid-cols-3 gap-4 mx-3 my-3">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Total investment</h2>
                        <p className="text-2xl">$200000</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Total invested companies</h2>
                        <p className="text-2xl">11 companies</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Latest investment</h2>
                        <p className="text-2xl">$100 invested in Kasetsart University</p>
                    </div>
                </div>
            </div>

            <div className="mx-3 my-14 ">
                <h2 className="text-2xl font-semibold my-4">Investment Statements</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Company Name</th>
                        <th className="py-2 px-4 text-left">Amount</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Payment Method</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentInvestments.map((investment) => (
                        <tr key={investment.id}>
                        <td className="py-2 px-4 border-b">{investment.id}</td>
                            <td className="py-2 px-4 border-b">{investment.companyName}</td>
                            <td className="py-2 px-4 border-b">${investment.amount}</td>
                            <td className="py-2 px-4 border-b">{investment.date}</td>
                            <td className="py-2 px-4 border-b">{investment.paymentMethod}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 ${
                                currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } rounded-lg`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
