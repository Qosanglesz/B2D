import React from 'react';
import {UserProfile} from '@auth0/nextjs-auth0/client';
import ClientNavBar from './ClientNavBar';


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
        portfolio: string,
        profile: string
    };
    user?: UserProfile;
};

const NavBar: React.FC<NavBarProps> = ({name, isAuth, links, user}) => {
    return (
        <ClientNavBar name={name} isAuth={isAuth} links={links} user={user}/>
    );
};

export default NavBar;
