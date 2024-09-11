
// "use client";

// import React, { useState } from 'react';

// interface Business {
//   id: number;
//   name: string;
//   industry: string;
//   description: string;
//   founder: string;
//   location: string;
//   purpose: string;
//   fundraisingGoal: number;
//   accumulatedFunds: number;
// }

// const initialBusinesses: Business[] = [
//   // Sample data, replace with real data from your API
//     {
//     id: 1,
//     name: 'Toey Fundation',
//     industry: 'Tech',
//     description: 'A tech investment.',
//     founder: 'Toey',
//     location: 'Bangkok',
//     purpose: 'Innovate tech solutions.',
//     fundraisingGoal: 500000,
//     accumulatedFunds: 100000,
//     },
//     {
//         id: 2,
//         name: 'Meng Foundation',
//         industry: 'Food',
//         description: 'A food startup.',
//         founder: 'Meng',
//         location: 'Bangkok',
//         purpose: 'Create delicious food.',
//         fundraisingGoal: 1500000,
//         accumulatedFunds: 50000,
//     },
//     {
//         id : 3,
//         name: 'Peach Foundation',
//         industry: 'Tech',
//         description: 'A tech startup.',
//         founder: 'Peach',
//         location: 'Bangkok',
//         purpose: 'Innovate tech solutions.',
//         fundraisingGoal: 500000,
//         accumulatedFunds: 100000,
//     }
    
//   // Add more sample businesses as needed
// ];

// const BusinessListings: React.FC = () => {
//   const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Business Listings</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border b text-centerorder-g text-centerray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-center">Name</th>
//               <th className="py-2 px-4 border-b text-center">Industry</th>
//               <th className="py-2 px-4 border-b text-center">Description</th>
//               <th className="py-2 px-4 border-b text-center">Founder</th>
//               <th className="py-2 px-4 border-b text-center">Location</th>
//               <th className="py-2 px-4 border-b text-center">Purpose</th>
//               <th className="py-2 px-4 border-b text-center">Fundraising Goal</th>
//               <th className="py-2 px-4 border-b text-center">Accumulated Funds</th>
//               <th className="py-2 px-4 border-b text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {businesses.map(business => (
//               <tr key={business.id}>
//                 <td className="py-2 px-4 border-b text-center">{business.name}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.industry}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.description}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.founder}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.location}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.purpose}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.fundraisingGoal}</td>
//                 <td className="py-2 px-4 border-b text-center">{business.accumulatedFunds}</td>
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

// export default BusinessListings;
