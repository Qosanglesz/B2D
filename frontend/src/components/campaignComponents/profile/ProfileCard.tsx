"use client"

import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import {useState} from "react";
import {EditProfileForm} from "@/components/campaignComponents/profile/EditProfileForm";
import {useRouter} from "next/navigation";

interface ProfileCardProps {
    user: UserProfile | undefined;
}

export const ProfileCard = ({
    user,
}: ProfileCardProps) => {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState<string | undefined>(user?.name);
    const [nickname, setNickname] = useState<string | undefined>(user?.nickname);
    const toggleEdit = () => setIsEditing(!isEditing);

    const handleSave = async () => {
        try {
            const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
                method: "GET",
                headers: {
                    accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
                }
            })
            const tokenData = await tokenResponse.json()

            const newData = { name, nickname };
            const response = await fetch('/api/user/patch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData.access_token}`,

                },
                body: JSON.stringify({
                    user_id: user?.sub,
                    newData,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user data');
            }

            setIsEditing(false);
            alert('User information saved! Please login again to see changes');
            router.push("/api/auth/logout");
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Failed to save user information. Please try again.');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="flex-shrink-0">
                        <Image
                            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover"
                            src={user?.picture || '/default-profile.png'}
                            alt="Profile Picture"
                            height={300}
                            width={300}
                        />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                        {isEditing ? (
                            <EditProfileForm name={name} nickname={nickname} setName={setName} setNickname={setNickname} handleSave={handleSave}/>
                        ) : (
                            <>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{name}</h2>
                                <p className="text-lg sm:text-xl text-gray-600">{user?.email || 'No Email'}</p>
                                <p className="text-lg sm:text-xl text-gray-600">{nickname}</p>
                                <p className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-4">
                                    Last updated: {new Date(user?.updated_at || '').toLocaleDateString() || 'N/A'}
                                </p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 sm:mt-4 rounded transition-colors duration-200"
                                    onClick={toggleEdit}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};