import { notFound } from 'next/navigation';
import UserAvatar from '@/components/adminComponents/adminUserManagement/UserAvatar';
import UserInfoGrid from '@/components/adminComponents/adminUserManagement/UserInfoGrid';
import {User} from '@/types/User';
import BackButton from "@/components/adminComponents/adminUserManagement/BackButton";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function fetchUser(userId: string): Promise<User | null> {
    try {
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
            }
        })
        const tokenData = await tokenResponse.json()

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`, {

            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                authorization: `Bearer ${tokenData.access_token}`,
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error('Failed to fetch user data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
    const user = await fetchUser(params.id);

    if (!user) {
        notFound();
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <UserAvatar name={user.name} picture={user.picture}/>
                    <UserInfoGrid user={user}/>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                    <BackButton/>
                </div>
            </div>
        </div>
    );
}