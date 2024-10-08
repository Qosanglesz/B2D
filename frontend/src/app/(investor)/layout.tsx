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
            about: 'https://github.com/Qosanglesz/B2D/wiki',
            campaigns: '/campaign',
            contact: 'https://github.com/Qosanglesz/B2D',
            signIn: '/api/auth/login',
            logout: '/api/auth/logout',
            portfolio: '/portfolio',
            profile: '/profile'
        },
        user: user
    };

    return (
        <html lang="en">
        <body>
        <NavBar {...navBarProps} />
        {children}
        <Footer/>
        </body>
        </html>
    );
}