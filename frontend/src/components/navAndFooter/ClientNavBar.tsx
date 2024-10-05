// components/ClientNavBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';

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

const ClientNavBar: React.FC<ClientNavBarProps> = ({name, isAuth, links, user}) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">
                    <Link href="/home">{name}</Link>
                </div>

                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href={links.home} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
                    <Link href={links.about} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">About</Link>
                    <Link href={links.campaigns} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Campaigns</Link>
                    <Link href={links.contact} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
                    {isAuth ? (
                        <>
                            <Link href={links.profile} className="flex items-center text-white hover:bg-gray-700 px-3 py-2 rounded-md">
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
                            </Link>
                            <Link href={links.portfolio} className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">Portfolio</Link>
                            <Link href={links.logout} className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md">Logout</Link>
                        </>
                    ) : (
                        <Link href={links.signIn} className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md">Sign in</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ClientNavBar;