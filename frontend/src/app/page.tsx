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

"use client"; // Indicates this is a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13 and above
import Head from 'next/head';
import HeroSection from '../components/landingPageComponent/HeroSection';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      // Redirect to /home after the component mounts
      router.push('/home');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>B2D Venture - Your Startup Investment Platform</title>
        <meta name="description" content="Invest in the next big startup or bring your business idea to life with B2D Venture." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        {/* Add other sections of your landing page here */}
      </main>
    </>
  );
}
