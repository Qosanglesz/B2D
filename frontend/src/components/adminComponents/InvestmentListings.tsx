
// "use client";

// import React, { useState } from 'react';

// interface Investor {
//   id: number;
//   name: string;
//   investmentHistory: string;
//   portfolio: string;
// }

// const initialInvestors: Investor[] = [
//   // Sample data, replace with real data from your API
//     {
//         id: 1,
//         name: 'Chaiyawut Thengket',
//         investmentHistory: 'Invested in Tech and Health.',
//         portfolio: 'Tech, Health, Real Estate',
//     },
//     {
//         id: 2,
//         name: 'Meng Thengket',
//         investmentHistory: 'Invested in Food and Tech.',
//         portfolio: 'Food, Tech, Real Estate',
//     },
//     {
//         id: 3,
//         name: 'Peach Thengket',
//         investmentHistory: 'Invested in Tech and Health.',
//         portfolio: 'Tech, Health, Real Estate',
//     },
//   // Add more sample investors as needed
// ];

// const InvestorListings: React.FC = () => {
//   const [investors, setInvestors] = useState<Investor[]>(initialInvestors);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Investor Listings</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-center">Name</th>
//               <th className="py-2 px-4 border-b text-center">Investment History</th>
//               <th className="py-2 px-4 border-b text-center">Portfolio</th>
//               <th className="py-2 px-4 border-b text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {investors.map(investor => (
//               <tr key={investor.id}>
//                 <td className="py-2 px-4 border-b text-center">{investor.name}</td>
//                 <td className="py-2 px-4 border-b text-center">{investor.investmentHistory}</td>
//                 <td className="py-2 px-4 border-b text-center">{investor.portfolio}</td>
//                 <td className="py-2 px-4 border-b text-center">
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InvestorListings;
