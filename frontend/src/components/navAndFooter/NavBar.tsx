import React from 'react';

type NavBarProps = {
    name: string;
    isAuth: boolean;
    links: {
        home: string,
        about: string,
        campaigns: string,
        contact: string,
        signIn: string,
        logout: string,
        portfolio: string
    };
};

const NavBar: React.FC<NavBarProps> = ({name, isAuth, links}) => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white text-lg font-bold">
                        <a href="/home">{name}</a>
                    </div>

                    <div className="flex-1 mx-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href={links.home} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
                        <a href={links.about} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">About</a>
                        <a href={links.campaigns} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">campaigns</a>
                        <a href={links.contact} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contact</a>
                        {/*<a href={links.register}*/}
                        {/*   className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">Register</a>*/}
                        {isAuth ? (
                            <>
                                <a href={links.portfolio} className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">Portfolio</a>
                                <a href={links.logout} className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md">Logout</a>
                            </>
                        ) : (
                            <a href={links.signIn} className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md">Sign in</a>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
};

export default NavBar;