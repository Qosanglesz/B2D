import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-300">&copy; 2024 B2DVenture. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
