import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <div className="relative w-1/3">
            <input
                type="text"
                placeholder="Search in table..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-lg"
            />
            <FaSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
    );
};