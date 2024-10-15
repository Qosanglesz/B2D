// import React from "react";

// interface CampaignProps {
//     picture: string;
//     logo: string;
//     companyName: string;
//     description: string;
//     currentRaised: number;
//     fundTarget: number;
//     amountOfInvestors: number;
//     location: string;
// }

// const CampaignCardOld: React.FC<CampaignProps> = ({
//                                                picture,
//                                                logo,
//                                                companyName,
//                                                description,
//                                                currentRaised,
//                                                fundTarget,
//                                                amountOfInvestors,
//                                                location
//                                            }) => {
//     return (
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <img src={picture} alt={`${companyName} picture`} className="w-full h-48 object-cover" />
//             <div className="p-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                     <img src={logo} alt={`${companyName} logo`} className="w-16 h-16 rounded-full object-cover" />
//                     <div>
//                         <h2 className="text-2xl font-bold">{companyName}</h2>
//                         <p className="text-gray-600">{location}</p>
//                     </div>
//                 </div>
//                 <p className="text-gray-800 mb-4">{description}</p>
//                 <div className="mb-4">
//                     <div className="flex justify-between mb-2">
//                         <span className="text-gray-600">Current Raised:</span>
//                         <span className="font-semibold">${currentRaised.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between mb-2">
//                         <span className="text-gray-600">Fund Target:</span>
//                         <span className="font-semibold">${fundTarget.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-gray-600">Amount of Investors:</span>
//                         <span className="font-semibold">{amountOfInvestors}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CampaignCardOld;
