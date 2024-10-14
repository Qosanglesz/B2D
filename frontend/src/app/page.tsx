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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13 and above
import Head from 'next/head';
import HeroSection from '../components/landingPageComponent/HeroSection';
import { Spinner } from '@nextui-org/react';
import NavBar from '@/components/navAndFooter/NavBar';
import { LoadingError } from '../components/landingPageComponent/Loading'; // Import the LoadingError component

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to /home after a short delay
            router.push('/home');
            setLoading(false); // Set loading to false after redirect
        }, 100); // Adjust the delay as needed

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [router]);

    return (
        <>
            <Head>
                <title>B2D Venture - Your Startup Investment Platform</title>
                <meta name="description" content="Invest in the next big startup or bring your business idea to life with B2D Venture." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Show LoadingError component while waiting for the redirect */}
            <LoadingError loading={loading} />
            
            {/* Main content can still be rendered if needed */}
            {!loading && (
                <main>
                  <div className="flex flex-col justify-center items-center h-screen">
                    <Spinner size="lg" />

                    {/* Loading text added here */}
                    <span className="mt-4 text-lg text-gray-400">
                      Loading, please wait...
                    </span>
                  </div>
                </main>
            )}
        </>
    );
}
