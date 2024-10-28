// "use client"

// import React, {useEffect} from "react";
// import axios from "axios";


// interface SuccessProps {
//     params: { id: string };
// }

// const Success: React.FC<SuccessProps> = ({params}) => {
//     const {id: statementId} = params;

//     useEffect(() => {
//         const deleteOpenStatus = async () => {
//             try {
//                 const response = await axios.delete(
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/api/statement/${statementId}`
//                 );

//             } catch (error) {
//                 console.error("Failed to fetch payment status:", error);

//             }
//         };

//         deleteOpenStatus();
//     }, [statementId]);

//     return (
//         <div className="min-h-screen flex justify-center items-center">
//             <div className="text-center">
//                 <h1 className="text-5xl font-bold text-red-600 mb-4">
//                     Payment fail!
//                 </h1>
//                 <p className="text-lg text-gray-700 mb-2">
//                     Try to re create payment request.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Success;
// src/app/payment/cancel/[id]/page.tsx
'use client';

import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface CancelProps {
    params: { id: string };
}

const Cancel: React.FC<CancelProps> = ({ params }) => {
    const { id: statementId } = params;
    const searchParams = useSearchParams();
    const provider = searchParams.get('provider'); // 'stripe' or 'coinbase'

    useEffect(() => {
        const handleCancelledPayment = async () => {
            try {
                if (provider === 'coinbase') {
                    // Handle Coinbase cancellation
                    await axios.post(
                        `/api/payment/coinbase/cancel`,
                        { chargeId: statementId }
                    );
                } else {
                    // Your existing Stripe cancellation logic
                    await axios.delete(
                        `/api/statement/${statementId}`
                    );
                }
            } catch (error) {
                console.error("Failed to handle cancelled payment:", error);
            }
        };

        handleCancelledPayment();
    }, [statementId, provider]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">
                    Payment Failed!
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    Try to recreate payment request.
                </p>
            </div>
        </div>
    );
};

export default Cancel;