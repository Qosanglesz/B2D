'use client';

import React from 'react';
import Image from 'next/image';
import {UserProfile} from '@auth0/nextjs-auth0/client';


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
        <nav className="bg-gray-800 fixed py-4 top-0 w-full z-10">

            <div className="max-w-7xl px-4 mx-auto flex items-center justify-between h-full">
                <div className="text-white text-lg font-bold">
                    <a href="/home">{name}</a>
                </div>

                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <a href={links.home} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
                    <a href={links.about} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">About</a>
                    <a href={links.campaigns}
                       className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Campaigns</a>
                    <a href={links.contact} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contact</a>
                    {isAuth ? (
                        <>
                            <a href={links.portfolio}
                               className="flex items-center text-white hover:bg-gray-700 px-3 py-2 rounded-md">
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
                            <a href={links.logout}
                               className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md">Logout</a>
                        </>
                    ) : (
                        <a href={links.signIn}
                           className="text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md ml-auto">Sign
                            in</a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ClientNavBar;
