import { Suspense } from 'react';
import UserManagement from "@/components/adminComponents/adminUserManagement/UserManagement";
import {LoadingError} from "@/components/homeComponents/LoadingError";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function fetchUsers() {
    try {
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/accesstoken`, {
            method: "GET",
            headers: {
                accesstokenapikey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY || "",
            },
            cache: 'no-store'
        });
        const tokenData = await tokenResponse.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?_t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                authorization: `Bearer ${tokenData.access_token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export default async function Page() {
    const users = await fetchUsers();

    return (
        <Suspense fallback={<LoadingError loading={true} error={null} />}>
            <UserManagement initialUsers={users} />
        </Suspense>
    );
}