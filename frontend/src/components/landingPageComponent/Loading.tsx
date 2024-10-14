// /src/components/landingPageComponents/Loading.tsx

import React from 'react';
import { Spinner } from '@nextui-org/react';


// Props interface for LoadingError component
interface LoadingErrorProps {
    // loading: indicates if data is still being loaded
    // error: error message to display, if any
    loading: boolean;
    // error: string | null;
}


// LoadingError component handles showing a loading spinner or an error message
export const LoadingError: React.FC<LoadingErrorProps> = ({ loading }) => {

    // Display spinner when loading is true
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Spinner size="lg" />

                {/* Loading text added here */}
                <span className="mt-4 text-lg text-gray-400">
                    Loading, please wait...
                </span>
            </div>
        );
    }

    // // Display error message when error is present
    // if (error) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    //                 <strong className="font-bold">Error: </strong>
    //                 <span className="block sm:inline">{error}</span>
    //             </div>
    //         </div>
    //     );
    // }

    // Return null when there's no loading or error (nothing to render)
    return null;

};
