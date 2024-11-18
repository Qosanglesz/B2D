// src\app\(investor)\layout.tsx

import {getSession} from '@auth0/nextjs-auth0';
import NavBar from '@/components/navAndFooter/NavBar';
import Footer from '@/components/navAndFooter/Footer';

import {ReactNode} from 'react';

export default async function Layout({children}: { children: ReactNode }) {
    const session = await getSession();
    const user = session?.user;

    const navBarProps = {
        name: 'B2D VENTURE',
        isAuth: !!user,
        links: {
            home: '/home',
            about: '/about',
            campaigns: '/campaign',
            contact: 'contact',
            signIn: '/api/auth/login',
            logout: '/api/auth/logout',
            portfolio: '/portfolio',
            profile: '/profile'
        },
        user: user
    };

    return (
        <div>

        <NavBar {...navBarProps} />
            {/* Add offset to fixed Navbar */}
            <div>
                {children}
            </div>
        <Footer/>

        </div>
    );
}