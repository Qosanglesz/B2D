import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';

interface ProfileCardProps {
    user: UserProfile | undefined;
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
                            EditForm
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