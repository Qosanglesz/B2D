import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
    async function Profile() {
        const session = await getSession();
        const user = session?.user;

        return (
            <div className="mx-auto bg-white shadow-md rounded-lg p-6 min-h-screen max-w-full">
                {/* Profile Picture */}
                <div className="flex">
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={user?.picture || '/default-profile.png'}
                    />
                </div>

                {/* User Info */}
                <div className="mt-4">
                    {/* Name */}
                    <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'No Name'}</h2>

                    {/* Email */}
                    <p className="text-gray-600 mt-1">{user?.email || 'No Email'}</p>

                    {/* Nickname */}
                    <p className="text-gray-600 mt-1">@{user?.nickname || 'No Nickname'}</p>

                    {/* Last Update */}
                    <p className="text-gray-500 mt-4 text-sm">
                        Last updated: {new Date(user?.updated_at || '').toLocaleDateString() || 'N/A'}
                    </p>
                </div>
            </div>
        );
    }
);
