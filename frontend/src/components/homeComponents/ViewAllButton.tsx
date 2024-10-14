// /src/components/homeComponents/ViewAllButton.tsx

import React from 'react';


// Define the props expected by the ViewAllButton component
interface ViewAllButtonProps {
    // viewAllLink: Link for the "View All" button
    viewAllLink: string;
}


// ViewAllButton component that renders a button linking to the "View All" page
export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ viewAllLink }) => {

    return (
        <div className="text-center py-10">
            {/* Render a button that navigates to the viewAllLink when clicked */}
            <a
                href={viewAllLink}
                className="text-xl text-white bg-gray-800 hover:bg-gray-900 py-3 px-7 rounded-lg"
            >
                View All
            </a>
        </div>
    );
    
};
