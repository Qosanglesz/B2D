import React from "react";
import Image from "next/image";

interface UserProfileProps {
    user: any; // Replace with your User type
    isEditing: boolean;
    name: string | undefined;
    nickname: string | undefined;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    toggleEdit: () => void;
    handleSave: () => Promise<void>;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    user,
    isEditing,
    name,
    nickname,
    setName,
    setNickname,
    toggleEdit,
    handleSave,
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="mx-auto bg-white shadow-md rounded-lg p-6 max-w-full grid grid-cols-3 gap-8">
                <div className="flex">
                    <Image
                        className="w-36 h-36 rounded-full object-cover mx-auto"
                        src={user?.picture || "/default-profile.png"}
                        alt="Profile Picture"
                        height={300}
                        width={300}
                    />
                </div>

                <div className="my-auto">
                    {isEditing ? (
                        <>
                            <div className="grid grid-cols-2">
                                <div className="my-auto text-xl text-gray-800">Name:</div>
                                <input
                                    type="text"
                                    className="text-l font-semibold text-gray-800 border border-gray-300 py-2 rounded mx-auto"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    title="Name"
                                    placeholder="Enter your name"
                                />
                                <div className="my-auto text-xl text-gray-800">Nickname:</div>
                                <input
                                    type="text"
                                    className="text-l text-gray-600 border border-gray-300 py-2 rounded mt-2 mx-auto"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    title="Nickname"
                                    placeholder="Enter your nickname"
                                />
                            </div>
                            <div className="flex mt-4">
                                <button
                                    className="bg-green-500 text-white px-10 py-2 rounded mx-auto"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                            <p className="text-xl text-gray-600">{user?.email || "No Email"}</p>
                            <p className="text-xl text-gray-600">{nickname}</p>
                            <p className="text-l text-gray-500 mt-4">
                                Last updated: {new Date(user?.updated_at || "").toLocaleDateString() || "N/A"}
                            </p>
                            <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={toggleEdit}>
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