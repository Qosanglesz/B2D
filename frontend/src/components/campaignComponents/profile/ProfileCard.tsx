import Image from 'next/image';
import { User } from '@auth0/nextjs-auth0';

interface ProfileCardProps {
    user: User | undefined;
    name: string | undefined;
    nickname: string | undefined;
    isEditing: boolean;
    toggleEdit: () => void;
    EditForm: React.ReactNode;
}

export const ProfileCard = ({ 
    user, 
    name, 
    nickname, 
    isEditing, 
    toggleEdit,
    EditForm 
}: ProfileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="mx-auto bg-white shadow-md rounded-lg p-6 max-w-full grid grid-cols-3 gap-8">
                <div className="flex">
                    <Image
                        className="w-36 h-36 rounded-full object-cover mx-auto"
                        src={user?.picture || '/default-profile.png'}
                        alt="Profile Picture"
                        height={300}
                        width={300}
                    />
                </div>

                <div className="my-auto">
                    {isEditing ? (
                        EditForm
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                            <p className="text-xl text-gray-600">{user?.email || 'No Email'}</p>
                            <p className="text-xl text-gray-600">{nickname}</p>
                            <p className="text-l text-gray-500 mt-4">
                                Last updated: {new Date(user?.updated_at || '').toLocaleDateString() || 'N/A'}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                                onClick={toggleEdit}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
                <div></div>
            </div>
        </div>
    );
};