"use client"

import {getSession} from '@auth0/nextjs-auth0';
import Image from 'next/image';


export default async function Profile() {
    const session = await getSession();

    const user = session?.user;
    return   (
        <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl min-h-screen">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            {user && (
                <div className="flex flex-col items-center md:flex-row md:items-start">
                    {user.picture && (
                        <div className="mb-4 md:mr-6 md:mb-0">
                            <Image
                                src={user.picture}
                                alt="Profile"
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                        </div>
                    )}
                    <div>
                        <p className="text-xl mb-2"><strong>Name:</strong> {user.name}</p>
                        <p className="text-xl mb-2"><strong>Email:</strong> {user.email}</p>
                        <p className="text-xl mb-2"><strong>Nickname:</strong> {user.nickname}</p>
                        {user.updated_at && (
                            <p className="text-xl mb-2">
                                <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}