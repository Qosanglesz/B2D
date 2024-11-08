// interface EditProfileFormProps {
//     name: string | undefined;
//     nickname: string | undefined;
//     setName: (name: string) => void;
//     setNickname: (nickname: string) => void;
//     handleSave: () => void;
// }

// export const EditProfileForm = ({
//     name,
//     nickname,
//     setName,
//     setNickname,
//     handleSave
// }: EditProfileFormProps) => {
//     return (
//         <>
//             <div className="grid grid-cols-2">
//                 <div className="my-auto text-xl text-gray-800">
//                     Name:
//                 </div>
//                 <input
//                     type="text"
//                     className="text-l font-semibold text-gray-800 border border-gray-300 py-2 rounded mx-auto"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     title="Name"
//                     placeholder="Enter your name"
//                 />
//                 <div className="my-auto text-xl text-gray-800">
//                     Nickname:
//                 </div>
//                 <input
//                     type="text"
//                     className="text-l text-gray-600 border border-gray-300 py-2 rounded mt-2 mx-auto"
//                     value={nickname}
//                     onChange={(e) => setNickname(e.target.value)}
//                     title="Nickname"
//                     placeholder="Enter your nickname"
//                 />
//             </div>
//             <div className="flex mt-4">
//                 <button
//                     className="bg-green-500 text-white px-10 py-2 rounded mx-auto"
//                     onClick={handleSave}
//                 >
//                     Save
//                 </button>
//             </div>
//         </>
//     );
// };

interface EditProfileFormProps {
    name: string;
    nickname: string;
    setName: (name: string) => void;
    setNickname: (nickname: string) => void;
    handleSave: () => void;
    isUpdating: boolean;
}

export const EditProfileForm = ({
    name,
    nickname,
    setName,
    setNickname,
    handleSave,
    isUpdating
}: EditProfileFormProps) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="my-auto text-xl text-gray-800">
                    Name:
                </div>
                <input
                    type="text"
                    className="text-l font-semibold text-gray-800 border border-gray-300 py-2 px-3 rounded w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isUpdating}
                    title="Name"
                    placeholder="Enter your name"
                />
                <div className="my-auto text-xl text-gray-800">
                    Nickname:
                </div>
                <input
                    type="text"
                    className="text-l text-gray-600 border border-gray-300 py-2 px-3 rounded w-full"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={isUpdating}
                    title="Nickname"
                    placeholder="Enter your nickname"
                />
            </div>
            <div className="flex mt-4">
                <button
                    className={`${
                        isUpdating 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white px-10 py-2 rounded mx-auto transition-colors duration-200`}
                    onClick={handleSave}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};