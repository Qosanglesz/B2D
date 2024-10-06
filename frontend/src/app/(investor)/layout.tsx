// "use client";

// import { useUser } from "@auth0/nextjs-auth0/client";
// import NavBar from "../../components/navAndFooter/NavBar";
// import Footer from "@/components/navAndFooter/Footer";

// const links = {
//     home: "/home",
//     about: "https://github.com/Qosanglesz/B2D/wiki",
//     campaigns: "/campaign",
//     contact: "https://github.com/Qosanglesz/B2D",
//     signIn: "/api/auth/login",
//     logout: "/api/auth/logout",
//     portfolio: "/portfolio",
//     profile: '/profile'  // Add this line
// };

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//     const { user } = useUser();

//     return (
//         <>
//             <NavBar name={"B2DVenture"} links={links} isAuth={!!user} />
//                 {children}
//             <Footer />
//         </>
//     );
// }
// app/layout.tsx
// import { UserProvider } from '@auth0/nextjs-auth0/client';
// import NavBar from '@/components/navAndFooter/NavBar';
// import Footer from "@/components/navAndFooter/Footer";

// export default function RootLayout({ children } : { children: React.ReactNode }) {
//   const links = {
//     home: '/',
//     about: '/about',
//     campaigns: '/campaigns',
//     contact: '/contact',
//     signIn: '/api/auth/login',
//     logout: '/api/auth/logout',
//     portfolio: '/portfolio',
//     profile: '/profile'  // Add this line
//   };

//   return (
//         <NavBar name={"B2DVenture"} links={links} isAuth={!!user} />
//           {children}
//         <Footer />
//   )
// }
// app/layout.tsx or any page file
import { getSession } from '@auth0/nextjs-auth0';
import NavBar from '@/components/navAndFooter/NavBar';
import Footer from '@/components/navAndFooter/Footer';

import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
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
        <Footer />
      </body>
    </html>
  );
}