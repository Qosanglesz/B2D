interface EditProfileFormProps {
    name: string | undefined;
    nickname: string | undefined;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    handleSave: () => void;
}

export const EditProfileForm = ({
    name = '',
    nickname = '',
    setName,
    setNickname,
    handleSave
}: EditProfileFormProps) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="my-auto text-xl text-gray-800">
                    Name:
                </div>
                <input
                    type="text"
                    className="text-l font-semibold text-gray-800 border border-gray-300 py-2 px-3 rounded w-full"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    title="Name"
                    placeholder="Enter your name"
                />
                <div className="my-auto text-xl text-gray-800">
                    Nickname:
                </div>
                <input
                    type="text"
                    className="text-l text-gray-600 border border-gray-300 py-2 px-3 rounded w-full"
                    value={nickname || ''}
                    onChange={(e) => setNickname(e.target.value)}
                    title="Nickname"
                    placeholder="Enter your nickname"
                />
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors duration-200"
                    onClick={() => window.location.reload()}
                >
                    Cancel
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors duration-200"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
