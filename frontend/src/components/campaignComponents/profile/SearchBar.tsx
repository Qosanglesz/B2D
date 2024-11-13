import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi"; // Added for filter icon
import { IoClose } from "react-icons/io5"; // Added for close/clear icon

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <div className="relative w-full sm:w-[320px] md:w-[380px] lg:w-[440px]"> {/* Fixed width for different screens */}
            <div className="flex items-center">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search in table..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-9 pr-4 border border-gray-300 rounded-lg 
                                 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 placeholder-gray-400
                                 transition-all duration-200"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                                      text-sm" />
                </div>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full
                                 transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <IoClose className="text-lg" />
                    </button>
                )}
            </div>
            
            {searchQuery && (
                <div className="absolute left-0 top-full mt-1 text-xs text-gray-500">
                    Showing results for &quot;{searchQuery}&quot;
                </div>
            )}
        </div>
    );
};

// Optional: Enhanced SearchBar with filter
export const SearchBarEnhanced = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <div className="relative w-full sm:w-[320px] md:w-[380px] lg:w-[440px]">
            <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search in table..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-9 pr-4 
                                 border border-gray-300 rounded-lg
                                 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 placeholder-gray-400
                                 shadow-sm hover:shadow-md
                                 transition-all duration-200"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 
                                      text-gray-400 text-sm" />
                    
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2
                                     text-gray-400 hover:text-gray-600
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full
                                     transition-colors duration-200"
                            aria-label="Clear search"
                        >
                            <IoClose className="text-lg" />
                        </button>
                    )}
                </div>

                <button
                    className="flex items-center gap-1 px-3 py-2
                             text-gray-600 hover:text-gray-800
                             border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition-colors duration-200"
                >
                    <FiFilter className="w-4 h-4" />
                    <span className="text-sm">Filter</span>
                </button>
            </div>

            {searchQuery && (
                <div className="absolute left-0 top-full mt-1 text-xs text-gray-500">
                    Showing results for &quot;{searchQuery}&quot;
                </div>
            )}
        </div>
    );
};