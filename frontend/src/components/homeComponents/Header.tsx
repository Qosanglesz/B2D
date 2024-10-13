import React from "react";

interface HeaderProps {
    registerLink: string,
}

const Header: React.FC<HeaderProps> = ({ registerLink }) => {
    return (
        // Use Flexbox to center content
        <header className="bg-gray-900 text-white h-[500px] flex flex-col justify-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Smart Fundraising Platforms
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Redefining investment by merging private markets with cutting-edge Web3 technologies. Empowering
                    businesses, connecting customers.
                </p>
            </div>
            <div className="text-center pt-10">
                <a href={registerLink} className="text-xl text-white bg-gray-400 hover:bg-gray-500 py-3 px-5 rounded-lg">Get Started</a>
            </div>
        </header>
    );
};

export default Header;
