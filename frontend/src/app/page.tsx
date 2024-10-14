// // /src/app/page.tsx

// import Head from 'next/head';
// import HeroSection from '../components/landingPageComponent/HeroSection';


// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>B2D Venture - Your Startup Investment Platform</title>
//         <meta name="description" content="Invest in the next big startup or bring your business idea to life with B2D Venture." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <HeroSection />
//         {/* Add other sections of your landing page here */}
//       </main>
//     </>
//   );
// }

// /src/app/page.tsx

"use client"; // Indicate this is a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13 and above
import { Spinner } from '@nextui-org/react';


export default function Home() {
    const router = useRouter();

    // Redirect to /home
    useEffect(() => {
        // Redirect immediately
        router.push('/home');
    }, [router]);

    // Show loading spinner
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Spinner size="lg" />
            {/* Loading text */}
            <span className="mt-4 text-lg text-gray-400">
                Loading, please wait...
            </span>
        </div>
    );
}

