
// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { ObjectId } from "mongodb";
// import { useRouter } from "next/navigation";
// import { Spinner, Tabs, Tab } from "@nextui-org/react";
// import Image from 'next/image';
// import { FaCalendarCheck } from "react-icons/fa";
// import { GrStatusGood } from "react-icons/gr";
// import { FaCalendarPlus } from "react-icons/fa6";
// import { FaBitcoin } from "react-icons/fa";
// import { AiFillDollarCircle } from "react-icons/ai";
// import { IoIosBusiness } from "react-icons/io";
// import { GrTransaction } from "react-icons/gr";
// import { RiBillFill } from "react-icons/ri";
// import { FaSearch } from "react-icons/fa";

// interface UserStatements {
//     _id?: ObjectId;
//     statement_id: string;
//     user_id: string;
//     campaign_id: string;
//     campaignName: string;
//     amount: number;
//     session_id: string;
//     date: string;
//     successAt: string;
//     status: string;
// }

// interface CryptoTransaction {
//     userId: string;
//     campaignId: string;
//     chargeId: string;
//     chargeCode: string;
//     amount: number;
//     currency: string;
//     paymentMethod: string;
//     paymentProvider: string;
//     status: 'created' | 'pending' | 'completed' | 'failed' | 'delayed' | 'resolved';
//     metadata: {
//         campaignName: string;
//         companyName: string;
//         chargeCode: string;
//         userEmail?: string;
//     };
//     charge?: {
//         id: string;
//         code: string;
//         name: string;
//         description: string;
//         hosted_url: string;
//         created_at: string;
//         expires_at: string;
//         pricing: {
//             local: { amount: string; currency: string };
//             bitcoin?: { amount: string; currency: string };
//             ethereum?: { amount: string; currency: string };
//         };
//         payments?: Array<{
//             network: string;
//             transaction_id: string;
//             status: string;
//             value: {
//                 local: { amount: string; currency: string };
//                 crypto: { amount: string; currency: string };
//             };
//         }>;
//         timeline: Array<{
//             status: string;
//             time: string;
//         }>;
//     };
//     paymentDetails?: {
//         network?: string;
//         transaction_id?: string;
//         status?: string;
//         value?: any;
//     };
//     createdAt: Date;
//     updatedAt: Date;
//     completedAt?: Date;
//     failureReason?: string;
//     delayReason?: string;
// }

// const ITEMS_PER_PAGE = 10;

// export default function Home() {
//     const router = useRouter();
//     const { user, isLoading: userLoading } = useUser();
//     const [userStatements, setUserStatements] = useState<UserStatements[]>([]);
//     const [cryptoTransactions, setCryptoTransactions] = useState<CryptoTransaction[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [cryptoCurrentPage, setCryptoCurrentPage] = useState(1);
//     const [selectedTab, setSelectedTab] = useState("statements");

//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortConfig, setSortConfig] = useState<{
//         key: string;
//         direction: 'asc' | 'desc' | null;
//     }>({ key: '', direction: null });

//     const [isEditing, setIsEditing] = useState(false);
//     const [name, setName] = useState<string | undefined>(undefined);
//     const [nickname, setNickname] = useState<string | undefined>(undefined);

//         // Sorting and filtering functions
//     const getNestedValue = (obj: any, path: string) => {
//         return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//     };

//     const filterData = <T extends any>(data: T[], query: string): T[] => {
//         if (!query) return data;
        
//         return data.filter((item) => {
//             return Object.values(item).some((value) => {
//                 if (typeof value === 'object' && value !== null) {
//                     return Object.values(value).some((v) => 
//                         String(v).toLowerCase().includes(query.toLowerCase())
//                     );
//                 }
//                 return String(value).toLowerCase().includes(query.toLowerCase());
//             });
//         });
//     };

//     const sortData = <T extends any>(data: T[], sortConfig: { key: string; direction: 'asc' | 'desc' | null }): T[] => {
//         if (!sortConfig.key || !sortConfig.direction) return data;

//         return [...data].sort((a, b) => {
//             let aValue = getNestedValue(a, sortConfig.key);
//             let bValue = getNestedValue(b, sortConfig.key);

//             if (typeof aValue === 'string') {
//                 aValue = aValue.toLowerCase();
//                 bValue = bValue.toLowerCase();
//             }

//             if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//             return 0;
//         });
//     };

//     const handleSort = (key: string) => {
//         setSortConfig((prevConfig) => ({
//             key,
//             direction: 
//                 prevConfig.key === key && prevConfig.direction === 'asc' 
//                     ? 'desc' 
//                     : 'asc',
//         }));
//     };

//     // Process and filter data
//     const filteredAndSortedInvestments = sortData(
//         filterData(userStatements, searchQuery),
//         sortConfig
//     );

//     // const totalPages = Math.ceil(userStatements.length / ITEMS_PER_PAGE);

//     // const currentInvestments = userStatements.slice(
//     //     (currentPage - 1) * ITEMS_PER_PAGE,
//     //     currentPage * ITEMS_PER_PAGE
//     // );

//     // const cryptoTotalPages = Math.ceil(cryptoTransactions.length / ITEMS_PER_PAGE);

//     // const currentCryptoTransactions = cryptoTransactions.slice(
//     //     (cryptoCurrentPage - 1) * ITEMS_PER_PAGE,
//     //     cryptoCurrentPage * ITEMS_PER_PAGE
//     // );

//     const currentInvestments = filteredAndSortedInvestments.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     const filteredAndSortedCryptoTransactions = sortData(
//         filterData(cryptoTransactions, searchQuery),
//         sortConfig
//     );

//     const currentCryptoTransactions = filteredAndSortedCryptoTransactions.slice(
//         (cryptoCurrentPage - 1) * ITEMS_PER_PAGE,
//         cryptoCurrentPage * ITEMS_PER_PAGE
//     );

//     const totalPages = Math.ceil(filteredAndSortedInvestments.length / ITEMS_PER_PAGE);
//     const cryptoTotalPages = Math.ceil(filteredAndSortedCryptoTransactions.length / ITEMS_PER_PAGE);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleCryptoPageChange = (page: number) => {
//         setCryptoCurrentPage(page);
//     };

//     const formatDate = (isoDate: string) => {
//         const date = new Date(isoDate);
//         return date.toLocaleString('en-GB', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit',
//             hour: '2-digit',
//             minute: '2-digit'
//         }).replace(',', '');
//     };

//     const fetchCryptoTransactions = async () => {
//         if (!user || userLoading) return;

//         try {
//             const response = await fetch('/api/payment/coinbase/transaction-crypto');
//             if (!response.ok) {
//                 throw new Error("Failed to fetch crypto transactions.");
//             }
//             const data = await response.json();
//             const userTransactions = data.filter((tx: CryptoTransaction) => tx.userId === user.sub);
//             setCryptoTransactions(userTransactions);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     useEffect(() => {
//         const fetchStatement = async () => {
//             if (!user || userLoading) return;

//             setLoading(true);
//             try {
//                 const user_id = user.sub;
//                 const response = await fetch(`/api/statement/byuserid/${user_id}`);

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch investment statements.");
//                 }
//                 const data: UserStatements[] = await response.json();
//                 setUserStatements(data);
//                 setName(user.name || undefined);
//                 setNickname(user.nickname || undefined);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStatement();
//     }, [user, userLoading]);

//     useEffect(() => {
//         if (selectedTab === "crypto") {
//             fetchCryptoTransactions();
//         }
//     }, [selectedTab, user]);

//     useEffect(() => {
//         // Reset pagination when switching tabs
//         if (selectedTab === "statements") {
//             setCurrentPage(1);
//         } else if (selectedTab === "crypto") {
//             setCryptoCurrentPage(1);
//         }
//     }, [selectedTab]);

//     const toggleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleSave = async () => {
//         const newData = {
//             name: name,
//             nickname: nickname,
//         }
//         const response = await fetch('/api/user/patch', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user_id: user?.sub,
//                 newData,
//             }),
//         });

//         const data = await response.json();
//         setIsEditing(false);
//         alert('User information lsaved! Please login again to get changed');
//         router.push("/api/auth/logout")
//     };

//     if (loading || userLoading) return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
//     if (error) return <p>Error: {error}</p>;

//     const totalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
//     const uniqueCampaigns = new Set(userStatements.map(item => item.campaignName));
//     const totalInvestedCampaigns = uniqueCampaigns.size;
//     const latestStatement = userStatements[userStatements.length - 1];

//     return (
//             <div className="min-h-screen">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div className="mx-auto bg-white shadow-md rounded-lg p-6 max-w-full grid grid-cols-3 gap-8">
//                         <div className="flex">
//                             <Image
//                                 className="w-36 h-36 rounded-full object-cover mx-auto"
//                                 src={user?.picture || '/default-profile.png'}
//                                 alt="Profile Picture"
//                                 height={300}
//                                 width={300}
//                             />
//                         </div>
        
//                         <div className="my-auto">
//                             {isEditing ? (
//                                 <>
//                                     <div className="grid grid-cols-2">
//                                         <div className="my-auto text-xl text-gray-800">
//                                             Name:
//                                         </div>
//                                         <input
//                                             type="text"
//                                             className="text-l font-semibold text-gray-800 border border-gray-300 py-2 rounded mx-auto"
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                             title="Name"
//                                             placeholder="Enter your name"
//                                         />
//                                         <div className="my-auto text-xl text-gray-800">
//                                             Nickname:
//                                         </div>
//                                         <input
//                                             type="text"
//                                             className="text-l text-gray-600 border border-gray-300 py-2 rounded mt-2 mx-auto"
//                                             value={nickname}
//                                             onChange={(e) => setNickname(e.target.value)}
//                                             title="Nickname"
//                                             placeholder="Enter your nickname"
//                                         />
//                                     </div>
//                                     <div className="flex mt-4">
//                                         <button
//                                             className="bg-green-500 text-white px-10 py-2 rounded mx-auto"
//                                             onClick={handleSave}
//                                         >Save
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
//                                     <p className="text-xl text-gray-600">{user?.email || 'No Email'}</p>
//                                     <p className="text-xl text-gray-600">{nickname}</p>
//                                     <p className="text-l text-gray-500 mt-4">
//                                         Last updated: {new Date(user?.updated_at || '').toLocaleDateString() || 'N/A'}
//                                     </p>
//                                     <button
//                                         className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
//                                         onClick={toggleEdit}
//                                     >
//                                         Edit
//                                     </button>
//                                 </>
//                             )}
//                         </div>
        
//                         <div></div>
//                     </div>
//                 </div>
        
//                 <div>
//                     <h1 className="text-3xl font-bold my-4 mx-3">User Investment Portfolio</h1>
        
//                     <div className="grid grid-cols-3 gap-4 mx-3 my-3">
//                         <div className="bg-white p-4 rounded-lg shadow">
//                             <h2 className="text-xl font-semibold">Total investment</h2>
//                             <p className="text-2xl">${totalAmount}</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg shadow">
//                             <h2 className="text-xl font-semibold">Total invested campaigns</h2>
//                             <p className="text-2xl">{totalInvestedCampaigns} Campaigns</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg shadow">
//                             <h2 className="text-xl font-semibold">Latest investment</h2>
//                             <p className="text-2xl">{latestStatement.amount} invested in {latestStatement.campaignName}</p>
//                         </div>
//                     </div>
//                 </div>
        
//                 <div className="mx-3 my-14">
//                     <div className="flex justify-between items-center mb-6">
//                         <div className="flex-1">
//                             <Tabs 
//                                 selectedKey={selectedTab}
//                                 onSelectionChange={(key) => setSelectedTab(key.toString())}
//                                 className="w-2/3"
//                             >
//                                 <Tab key="statements" title="Investment Statements" />
//                                 <Tab key="crypto" title="Crypto Transactions" />
//                             </Tabs>
//                         </div>
//                         <div className="relative w-1/3">
//                             <input
//                                 type="text"
//                                 placeholder="Search in table..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="w-full p-2 pl-8 border border-gray-300 rounded-lg"
//                             />
//                             <FaSearch className="absolute left-2 top-3 text-gray-400" />
//                         </div>
//                     </div>
        
//                     {selectedTab === "statements" ? (
//                         <div className="mt-4">
//                             <h2 className="text-2xl font-semibold mb-4">Investment Statements</h2>
//                             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                                 <thead className="bg-gray-200">
//                                     <tr>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('statement_id')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Statement ID 
//                                                 <RiBillFill className="ml-1"/>
//                                                 {sortConfig.key === 'statement_id' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div> 
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('campaignName')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Company Name
//                                                 <IoIosBusiness className="ml-1"/>
//                                                 {sortConfig.key === 'campaignName' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('amount')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Amount
//                                                 <AiFillDollarCircle className="ml-1"/>
//                                                 {sortConfig.key === 'amount' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>    
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('date')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Release Date
//                                                 <FaCalendarPlus className="ml-1"/>
//                                                 {sortConfig.key === 'date' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('successAt')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Success Date
//                                                 <FaCalendarCheck className="ml-1"/>
//                                                 {sortConfig.key === 'successAt' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('status')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Status
//                                                 <GrStatusGood className="ml-1"/>
//                                                 {sortConfig.key === 'status' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentInvestments.map((userStatement) => (
//                                         <tr key={userStatement._id?.toString()}>
//                                             <td className="py-2 px-4 border-b">{userStatement.statement_id}</td>
//                                             <td className="py-2 px-4 border-b">{userStatement.campaignName}</td>
//                                             <td className="py-2 px-4 border-b">${userStatement.amount}</td>
//                                             <td className="py-2 px-4 border-b">{formatDate(userStatement.date)}</td>
//                                             <td className="py-2 px-4 border-b">{formatDate(userStatement.successAt)}</td>
//                                             <td className="py-2 px-4 border-b">
//                                                 <span className={`px-2 py-1 rounded-full text-sm ${
//                                                     userStatement.status === 'open' ? 'bg-blue-100 text-blue-800' :
//                                                     userStatement.status === 'failed' ? 'bg-red-100 text-red-800' :
//                                                     userStatement.status === 'complete' ? 'bg-green-100 text-green-800' :
//                                                     'bg-gray-100 text-gray-800'
//                                                 }`}>
//                                                     {userStatement.status}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
        
//                             <div className="flex justify-center items-center space-x-2 mt-4">
//                                 <button
//                                     onClick={() => handlePageChange(currentPage - 1)}
//                                     disabled={currentPage === 1}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
//                                 >
//                                     Previous
//                                 </button>
        
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => handlePageChange(index + 1)}
//                                         className={`px-4 py-2 ${
//                                             currentPage === index + 1
//                                                 ? "bg-blue-500 text-white"
//                                                 : "bg-gray-200 text-gray-700"
//                                         } rounded-lg`}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
        
//                                 <button
//                                     onClick={() => handlePageChange(currentPage + 1)}
//                                     disabled={currentPage === totalPages}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="mt-4">
//                             <h2 className="text-2xl font-semibold mb-4">Crypto Transactions</h2>
//                             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                                 <thead className="bg-gray-200">
//                                     <tr>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('chargeId')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Transaction ID   
//                                                 <GrTransaction className="ml-1"/>
//                                                 {sortConfig.key === 'chargeId' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div> 
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('metadata.companyName')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Company Name
//                                                 <IoIosBusiness className="ml-1"/>
//                                                 {sortConfig.key === 'metadata.companyName' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('amount')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Amount
//                                                 <AiFillDollarCircle className="ml-1"/>
//                                                 {sortConfig.key === 'amount' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>    
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('currency')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Currency
//                                                 <FaBitcoin className="ml-1"/>
//                                                 {sortConfig.key === 'currency' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                             className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                             onClick={() => handleSort('paymentMethod')}
//                                         >
//                                             <div className="flex items-center">
//                                                 Payment Method
//                                                 <FaBitcoin className="ml-1"/>
//                                                 {sortConfig.key === 'paymentMethod' && (
//                                                     <span className="ml-1">
//                                                         {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </th>
//                                         <th 
//                                         className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                         onClick={() => handleSort('createdAt')}
//                                     >
//                                         <div className="flex items-center">
//                                             Created Date
//                                             <FaCalendarPlus className="ml-1"/>
//                                             {sortConfig.key === 'createdAt' && (
//                                                 <span className="ml-1">
//                                                     {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </th>
//                                     <th 
//                                         className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                         onClick={() => handleSort('updatedAt')}
//                                     >
//                                         <div className="flex items-center">
//                                             Updated Date
//                                             <FaCalendarCheck className="ml-1"/>
//                                             {sortConfig.key === 'updatedAt' && (
//                                                 <span className="ml-1">
//                                                     {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </th>
//                                     <th 
//                                         className="py-2 px-4 text-left cursor-pointer hover:bg-gray-300"
//                                         onClick={() => handleSort('status')}
//                                     >
//                                         <div className="flex items-center">
//                                             Status
//                                             <GrStatusGood className="ml-1"/>
//                                             {sortConfig.key === 'status' && (
//                                                 <span className="ml-1">
//                                                     {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentCryptoTransactions.map((transaction) => (
//                                     <tr key={transaction.chargeId}>
//                                         <td className="py-2 px-4 border-b">{transaction.chargeId}</td>
//                                         <td className="py-2 px-4 border-b">{transaction.metadata.companyName}</td>
//                                         <td className="py-2 px-4 border-b">${transaction.amount}</td>
//                                         <td className="py-2 px-4 border-b">{transaction.currency}</td>
//                                         <td className="py-2 px-4 border-b">{transaction.paymentMethod}</td>
//                                         <td className="py-2 px-4 border-b">
//                                             {formatDate(new Date(transaction.createdAt).toISOString())}
//                                         </td>
//                                         <td className="py-2 px-4 border-b">
//                                             {formatDate(new Date(transaction.updatedAt).toISOString())}
//                                         </td>
//                                         <td className="py-2 px-4 border-b">
//                                             <span className={`px-2 py-1 rounded-full text-sm ${
//                                                 transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
//                                                 transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                 transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
//                                                 transaction.status === 'created' ? 'bg-blue-100 text-blue-800' :
//                                                 'bg-gray-100 text-gray-800'
//                                             }`}>
//                                                 {transaction.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* Pagination controls for Crypto Transactions */}
//                         <div className="flex justify-center items-center space-x-2 mt-4">
//                             <button
//                                 onClick={() => handleCryptoPageChange(cryptoCurrentPage - 1)}
//                                 disabled={cryptoCurrentPage === 1}
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
//                             >
//                                 Previous
//                             </button>

//                             {Array.from({ length: cryptoTotalPages }, (_, index) => (
//                                 <button
//                                     key={index + 1}
//                                     onClick={() => handleCryptoPageChange(index + 1)}
//                                     className={`px-4 py-2 ${
//                                         cryptoCurrentPage === index + 1
//                                             ? "bg-blue-500 text-white"
//                                             : "bg-gray-200 text-gray-700"
//                                     } rounded-lg`}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}

//                             <button
//                                 onClick={() => handleCryptoPageChange(cryptoCurrentPage + 1)}
//                                 disabled={cryptoCurrentPage === cryptoTotalPages}
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { Spinner, Tabs, Tab } from "@nextui-org/react";
import { ObjectId } from "mongodb";

// Import components
import { ProfileCard } from "@/components/campaignComponents/profile/ProfileCard";
import { EditProfileForm } from "@/components/campaignComponents/profile/EditProfileForm";
import { PortfolioSummary } from "@/components/campaignComponents/profile/PortfolioSummary";
import { SearchBar } from "@/components/campaignComponents/profile/SearchBar";
import { InvestmentTable } from "@/components/campaignComponents/profile/InvestmentTable";
import { CryptoTable } from "@/components/campaignComponents/profile/CryptoTable";

import { UserProfile } from "@/components/campaignComponents/profile/UserProfile";

import Image from 'next/image';

// Import interfaces
// import { UserStatements, CryptoTransaction } from "@/types/interfaces";

export interface UserStatements {
    _id?: ObjectId;
    statement_id: string;
    user_id: string;
    campaign_id: string;
    campaignName: string;
    amount: number;
    session_id: string;
    date: string;
    successAt: string;
    status: string;
}

export interface CryptoTransaction {
    userId: string;
    campaignId: string;
    chargeId: string;
    chargeCode: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentProvider: string;
    status: 'created' | 'pending' | 'completed' | 'failed' | 'delayed' | 'resolved';
    metadata: {
        campaignName: string;
        companyName: string;
        chargeCode: string;
        userEmail?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ITEMS_PER_PAGE = 10;

export default function Home() {
    const router = useRouter();
    const { user, isLoading: userLoading } = useUser();
    
    // State management
    const [userStatements, setUserStatements] = useState<UserStatements[]>([]);
    const [cryptoTransactions, setCryptoTransactions] = useState<CryptoTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [cryptoCurrentPage, setCryptoCurrentPage] = useState(1);
    
    // UI states
    const [selectedTab, setSelectedTab] = useState("statements");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({ key: '', direction: null });
    
    // Profile editing states
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [nickname, setNickname] = useState<string | undefined>(undefined);

    // Utility functions
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

    type FilterableItem = UserStatements | CryptoTransaction;

    // Then modify the filterData function
    const filterData = <T extends FilterableItem>(data: T[], query: string): T[] => {
        if (!query) return data;
        
        const searchInObject = (obj: any): boolean => {
            return Object.entries(obj).some(([key, value]) => {
                // If the value is an object (including arrays), search recursively
                if (value && typeof value === 'object') {
                    return searchInObject(value);
                }
                // Convert the value to string and search
                return String(value).toLowerCase().includes(query.toLowerCase());
            });
        };
    
        return data.filter(item => searchInObject(item));
    };
    
    // Update the sortData function as well
    const sortData = <T extends FilterableItem>(data: T[]): T[] => {
        if (!sortConfig.key || !sortConfig.direction) return data;
    
        return [...data].sort((a, b) => {
            let aValue = getNestedValue(a, sortConfig.key);
            let bValue = getNestedValue(b, sortConfig.key);
    
            // Handle dates
            if (sortConfig.key.includes('date') || sortConfig.key.includes('At')) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            // Handle strings
            else if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
    
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };
    
    // Update the getNestedValue function to be more type-safe
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

    // Fetch user data and statements
    useEffect(() => {
        const fetchStatement = async () => {
            if (!user || userLoading) return;

            setLoading(true);
            try {
                const user_id = user.sub;
                const response = await fetch(`/api/statement/byuserid/${user_id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch investment statements.");
                }
                const data: UserStatements[] = await response.json();
                setUserStatements(data);
                setName(user.name || undefined);
                setNickname(user.nickname || undefined);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching statements:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatement();
    }, [user, userLoading]);

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

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleCryptoPageChange = (page: number) => setCryptoCurrentPage(page);
    const toggleEdit = () => setIsEditing(!isEditing);

    const handleSave = async () => {
        try {
            const newData = { name, nickname };
            const response = await fetch('/api/user/patch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user?.sub,
                    newData,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user data');
            }
    
            setIsEditing(false);
            alert('User information saved! Please login again to see changes');
            router.push("/api/auth/logout");
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Failed to save user information. Please try again.');
        }
    };

    // // Data fetching
    // useEffect(() => {
    //     const fetchStatement = async () => {
    //         if (!user || userLoading) return;

    //         setLoading(true);
    //         try {
    //             const response = await fetch(`/api/statement/byuserid/${user.sub}`);
    //             if (!response.ok) throw new Error("Failed to fetch investment statements.");
                
    //             const data: UserStatements[] = await response.json();
    //             setUserStatements(data);
    //             setName(user.name || undefined);
    //             setNickname(user.nickname || undefined);
    //         } catch (err: any) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchStatement();
    // }, [user, userLoading]);

    // useEffect(() => {
    //     const fetchCryptoTransactions = async () => {
    //         if (!user || userLoading || selectedTab !== "crypto") return;

    //         try {
    //             const response = await fetch('/api/payment/coinbase/transaction-crypto');
    //             if (!response.ok) throw new Error("Failed to fetch crypto transactions.");
                
    //             const data = await response.json();
    //             const userTransactions = data.filter((tx: CryptoTransaction) => tx.userId === user.sub);
    //             setCryptoTransactions(userTransactions);
    //         } catch (err: any) {
    //             setError(err.message);
    //         }
    //     };

    //     fetchCryptoTransactions();
    // }, [selectedTab, user, userLoading]);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!user || userLoading) return;

            setLoading(true);
            try {
                // Fetch statements
                const statementsResponse = await fetch(`/api/statement/byuserid/${user.sub}`);
                if (!statementsResponse.ok) {
                    throw new Error("Failed to fetch investment statements.");
                }
                const statementsData: UserStatements[] = await statementsResponse.json();
                setUserStatements(statementsData);

                // Fetch crypto transactions
                const cryptoResponse = await fetch('/api/payment/coinbase/transaction-crypto');
                if (!cryptoResponse.ok) {
                    throw new Error("Failed to fetch crypto transactions.");
                }
                const cryptoData = await cryptoResponse.json();
                const userCryptoTransactions = cryptoData.filter(
                    (tx: CryptoTransaction) => tx.userId === user.sub
                );
                setCryptoTransactions(userCryptoTransactions);

                // Set user profile data
                setName(user.name || undefined);
                setNickname(user.nickname || undefined);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [user, userLoading]);

    // Remove the separate useEffect for crypto transactions since we're fetching everything at once

    // Calculate portfolio summary data
    const completedCryptoTransactions = cryptoTransactions.filter(tx => tx.status === 'completed');
    const totalCryptoAmount = completedCryptoTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalTraditionalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const totalCombinedAmount = totalTraditionalAmount + totalCryptoAmount;

    const uniqueTraditionalCampaigns = new Set(userStatements.map(item => item.campaignName));
    const uniqueCryptoCampaigns = new Set(completedCryptoTransactions.map(tx => tx.metadata.campaignName));
    const totalUniqueCampaigns = new Set([
        ...Array.from(uniqueTraditionalCampaigns),
        ...Array.from(uniqueCryptoCampaigns)
    ]).size;

    const latestTraditionalStatement = userStatements.length > 0 
        ? userStatements.reduce((latest, current) => 
            new Date(current.date) > new Date(latest.date) ? current : latest
        )
        : null;

    const latestCryptoTransaction = completedCryptoTransactions.length > 0
        ? completedCryptoTransactions.reduce((latest, current) => 
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
        )
        : null;

    // Get the absolute latest transaction between both types
    const getLatestTransaction = () => {
        if (!latestTraditionalStatement && !latestCryptoTransaction) return null;
        if (!latestTraditionalStatement) return {
            amount: latestCryptoTransaction!.amount,
            campaignName: latestCryptoTransaction!.metadata.campaignName,
            type: 'crypto',
            date: new Date(latestCryptoTransaction!.createdAt)
        };
        if (!latestCryptoTransaction) return {
            amount: latestTraditionalStatement.amount,
            campaignName: latestTraditionalStatement.campaignName,
            type: 'traditional',
            date: new Date(latestTraditionalStatement.date)
        };

        const cryptoDate = new Date(latestCryptoTransaction.createdAt);
        const traditionalDate = new Date(latestTraditionalStatement.date);

        return cryptoDate > traditionalDate
            ? {
                amount: latestCryptoTransaction.amount,
                campaignName: latestCryptoTransaction.metadata.campaignName,
                type: 'crypto',
                date: cryptoDate
            }
            : {
                amount: latestTraditionalStatement.amount,
                campaignName: latestTraditionalStatement.campaignName,
                type: 'traditional',
                date: traditionalDate
            };
    };

    const latestOverallTransaction = getLatestTransaction();

    // Loading and error states
    if (loading || userLoading) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    }
    if (error) return <p>Error: {error}</p>;

    // Processed data
    const filteredAndSortedInvestments = sortData(filterData(userStatements, searchQuery));
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

    // Portfolio summary calculations
    const totalAmount = userStatements.reduce((sum, item) => sum + item.amount, 0);
    const uniqueCampaigns = new Set(userStatements.map(item => item.campaignName));
    const totalInvestedCampaigns = uniqueCampaigns.size;
    const latestStatement = userStatements[userStatements.length - 1];

    return (
        <div className="min-h-screen">
            <ProfileCard
                user={user}
                name={name}
                nickname={nickname}
                isEditing={isEditing}
                toggleEdit={toggleEdit}
                EditForm={
                    <EditProfileForm
                        name={name}
                        nickname={nickname}
                        setName={setName}
                        setNickname={setNickname}
                        handleSave={handleSave}
                    />
                }
            />

            <PortfolioSummary
                totalAmount={totalAmount}
                totalInvestedCampaigns={totalInvestedCampaigns}
                latestStatement={latestStatement}
                cryptoTransactions={cryptoTransactions}
            />

            <div className="mx-3 my-14">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1">
                        <Tabs 
                            selectedKey={selectedTab}
                            onSelectionChange={(key) => setSelectedTab(key.toString())}
                            className="w-2/3"
                        >
                            <Tab key="statements" title="Investment Statements" />
                            <Tab key="crypto" title="Crypto Transactions" />
                        </Tabs>
                    </div>
                    
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>

                {selectedTab === "statements" ? (
                    <InvestmentTable
                        statements={currentInvestments}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        formatDate={formatDate}
                    />
                ) : (
                    <CryptoTable
                        transactions={currentCryptoTransactions}
                        currentPage={cryptoCurrentPage}
                        totalPages={cryptoTotalPages}
                        onPageChange={handleCryptoPageChange}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        formatDate={formatDate}
                    />
                )}
            </div>
        </div>
    );
}
