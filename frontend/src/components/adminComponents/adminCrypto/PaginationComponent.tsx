// src/components/adminComponents/adminCrypto/PaginationComponent.tsx
import React from 'react';
import { Pagination } from "@nextui-org/react";

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            {totalPages > 1 && (
                <Pagination
                    total={totalPages}
                    initialPage={currentPage}
                    onChange={onPageChange}
                />
            )}
        </div>
    );
};

export default PaginationComponent;