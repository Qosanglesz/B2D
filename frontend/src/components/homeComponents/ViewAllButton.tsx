import React from 'react';
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react"; // Import icon for better visual

interface ViewAllButtonProps {
    viewAllLink: string;
    label?: string; // Optional custom label
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
    viewAllLink,
    label = "View All" // Default label
}) => {
    return (
        <div className="flex justify-center py-6 sm:py-8 md:py-10">
            <Button
                as="a"
                href={viewAllLink}
                size="lg"
                variant="shadow"
                color="primary"
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
                endContent={
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                }
            >
                <span className="relative z-10 font-medium text-base sm:text-lg">
                    {label}
                </span>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white/20 to-transparent" />
            </Button>
        </div>
    );
};

// Alternative version with more elaborate styling
export const ViewAllButtonAlt: React.FC<ViewAllButtonProps> = ({
    viewAllLink,
    label = "View All"
}) => {
    return (
        <div className="flex justify-center py-6 sm:py-8 md:py-10">
            <Button
                as="a"
                href={viewAllLink}
                size="lg"
                variant="bordered"
                className="group relative px-8 py-6 overflow-hidden bg-background/5 backdrop-blur-sm border-primary/30 hover:border-primary transition-all duration-300"
                endContent={
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                }
            >
                {/* Animated background effect */}
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-primary/20 to-primary/5 transition-transform duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 font-medium text-base sm:text-lg">
                    {label}
                </span>
            </Button>
        </div>
    );
};

// Usage example with custom styles
export const ViewAllButtonCustom: React.FC<ViewAllButtonProps> = ({
    viewAllLink,
    label = "View All"
}) => {
    return (
        <div className="flex justify-center py-6 sm:py-8 md:py-10">
            <Button
                as="a"
                href={viewAllLink}
                size="lg"
                radius="full"
                className="group bg-gradient-to-tr from-primary to-primary-600 text-white shadow-lg hover:shadow-primary/50 transition-all duration-300"
                endContent={
                    <div className="bg-white/20 rounded-full p-1 ml-2">
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                }
            >
                <span className="font-medium text-base sm:text-lg px-2">
                    {label}
                </span>
            </Button>
        </div>
    );
};