'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Menu, X } from 'lucide-react';

type ClientNavBarProps = {
    name: string;
    isAuth: boolean;
    links: {
        home: string,
        about: string,
        campaigns: string,
        contact: string,
        signIn: string,
        logout: string,
        portfolio: string,
        profile: string
    };
    user?: UserProfile;
};

const ClientNavBar: React.FC<ClientNavBarProps> = ({ name, isAuth, links, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 fixed top-0 w-full z-50 shadow-lg">
            <div className="max-w-6xl px-4 mx-auto">
                {/* Main Navigation Bar */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <a href="/home" className="text-white text-lg font-bold">
                            {name}
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a href={links.home} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                            Home
                        </a>
                        <a href={links.about} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                            About
                        </a>
                        <a href={links.campaigns} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                            Campaigns
                        </a>
                        <a href={links.contact} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                            Contact
                        </a>
                        {isAuth ? (
                            <>
                                <a href={links.portfolio} className="flex items-center text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                                    {user && user.picture && (
                                        <Image
                                            src={user.picture}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-full mr-2"
                                        />
                                    )}
                                    <span>{user?.name || 'Profile'}</span>
                                </a>
                                <a href={links.logout} className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition-colors">
                                    Logout
                                </a>
                            </>
                        ) : (
                            <a href={links.signIn} className="text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md transition-colors">
                                Sign in
                            </a>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div 
                    className={`lg:hidden absolute left-0 right-0 bg-gray-800 shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
                    style={{ top: '64px' }} // Adjust based on your navbar height
                >
                    <div className="px-2 py-3 space-y-1 border-t border-gray-700">
                        <a href={links.home} className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md transition-colors">
                            Home
                        </a>
                        <a href={links.about} className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md transition-colors">
                            About
                        </a>
                        <a href={links.campaigns} className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md transition-colors">
                            Campaigns
                        </a>
                        <a href={links.contact} className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md transition-colors">
                            Contact
                        </a>
                        {isAuth ? (
                            <>
                                <a href={links.portfolio} className="flex items-center text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                                    {user && user.picture && (
                                        <Image
                                            src={user.picture}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="rounded-full mr-2"
                                        />
                                    )}
                                    <span>{user?.name || 'Profile'}</span>
                                </a>
                                <a href={links.logout} className="text-white bg-red-600 hover:bg-red-700 block px-3 py-2 rounded-md transition-colors">
                                    Logout
                                </a>
                            </>
                        ) : (
                            <a href={links.signIn} className="text-white bg-green-600 hover:bg-green-500 block px-3 py-2 rounded-md transition-colors">
                                Sign in
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ClientNavBar;