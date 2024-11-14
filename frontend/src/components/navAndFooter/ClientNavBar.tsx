'use client';

import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Menu } from 'lucide-react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react";
import Link from 'next/link';

type ClientNavBarProps = {
    name: string;
    isAuth: boolean;
    links: {
        home: string,
        about: string,
        campaigns: string,
        contact: string,
        signIn: string,
        logout: string,
        portfolio: string,
        profile: string
    };
    user?: UserProfile;
};

const ClientNavBar: React.FC<ClientNavBarProps> = ({ name, isAuth, links, user }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { name: "Home", href: links.home },
        { name: "About", href: links.about },
        { name: "Campaigns", href: links.campaigns },
        { name: "Contact", href: links.contact },
    ];

    return (
        <Navbar 
            isBordered 
            isMenuOpen={isMenuOpen} 
            onMenuOpenChange={setIsMenuOpen}
            className="bg-gray-800"
        >
            {/* Left section with brand */}
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                />
                <NavbarBrand>
                    <Link href="/home" className="text-white text-lg font-bold">
                        {name}
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Right section with menu items and avatar */}
            <NavbarContent justify="end" className="gap-4">
                {/* Menu items */}
                <div className="hidden sm:flex items-center gap-4">
                    {menuItems.map((item) => (
                        <NavbarItem key={item.name}>
                            <Link 
                                href={item.href}
                                className="text-white hover:text-gray-300"
                            >
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>

                {/* Auth section */}
                {isAuth ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                src={user?.picture || undefined}
                                name={user?.name || "User"}
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions">
                            <DropdownItem key="profile" href={links.portfolio}>
                                <div className="flex items-center gap-2">
                                    <span>{user?.name || 'Profile'}</span>
                                </div>
                            </DropdownItem>
                            <DropdownItem 
                                key="logout" 
                                href={links.logout}
                                className="text-danger"
                                color="danger"
                            >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <NavbarItem>
                        <Button
                            as={Link}
                            href={links.signIn}
                            color="success"
                            variant="shadow"
                        >
                            Sign In
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>

            {/* Mobile menu */}
            <NavbarMenu className="bg-gray-800">
                {menuItems.map((item) => (
                    <NavbarMenuItem key={item.name}>
                        <Link
                            href={item.href}
                            className="text-white hover:text-gray-300 w-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {isAuth && (
                    <>
                        <NavbarMenuItem>
                            <Link
                                href={links.portfolio}
                                className="text-white hover:text-gray-300 w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link
                                href={links.logout}
                                className="text-red-500 hover:text-red-400 w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Logout
                            </Link>
                        </NavbarMenuItem>
                    </>
                )}
            </NavbarMenu>
        </Navbar>
    );
};

export default ClientNavBar;