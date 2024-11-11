interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const TablePagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}: TablePaginationProps) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 ${
                        currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } rounded-lg`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};