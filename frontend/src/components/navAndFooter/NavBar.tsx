import React from 'react';

type NavBarProps = {
    name: string;
};

const NavBar: React.FC<NavBarProps> = ({ name}) => {
    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white text-lg font-bold">
                        <a href="#">{name}</a>
                    </div>

                    <div className="flex-1 mx-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</a>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">About</a>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Services</a>
                        <a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contact</a>
                        <a href="#"
                           className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">Register</a>
                        <a href="#"
                           className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md">Login</a>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default NavBar;