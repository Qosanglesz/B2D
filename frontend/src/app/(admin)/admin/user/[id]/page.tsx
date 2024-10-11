// app/admin/user/[id]/page.tsx
"use client";

import React, {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import UserAvatar from '@/components/adminComponents/adminUserManagement/UserAvatar';
import UserInfoGrid from '@/components/adminComponents/adminUserManagement/UserInfoGrid';
import BackButton from '@/components/adminComponents/adminUserManagement/BackButton';
import LoadingSpinner from '@/components/adminComponents/adminUserManagement/LoadingSpinner';
import ErrorMessage from '@/components/adminComponents/adminUserManagement/ErrorMessage';
import {User} from '@/components/types/User';

const UserDetail: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('User not found');
                    }
                    throw new Error('Failed to fetch user data');
                }
                const userData: User = await response.json();
                setUser(userData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError((err as Error).message || 'Failed to load user data. Please try again later.');
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <LoadingSpinner/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!user) return <ErrorMessage message="User not found."/>;

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <UserAvatar name={user.name} picture={user.picture}/>
                    <UserInfoGrid user={user}/>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                    <BackButton onClick={() => router.push('/admin/user')}/>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;