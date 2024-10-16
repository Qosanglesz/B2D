import React from 'react';
import {Spinner} from '@nextui-org/react';


// Props interface for LoadingError component
interface LoadingErrorProps {
    loading: boolean;
}


// LoadingError component handles showing a loading spinner or an error message
export const LoadingError: React.FC<LoadingErrorProps> = ({loading}) => {

    // Display spinner when loading is true
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Spinner size="lg"/>

                {/* Loading text added here */}
                <span className="mt-4 text-lg text-gray-400">
                    Loading, please wait...
                </span>
            </div>
        );
    }

    return null;

};
