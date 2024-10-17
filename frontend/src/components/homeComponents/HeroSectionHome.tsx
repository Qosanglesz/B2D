// src/components/homeComponents/HeroSectionHome.tsx

import React from 'react';
import {Carousel, Flowbite} from 'flowbite-react';
import type {CustomFlowbiteTheme} from 'flowbite-react';

interface HeroSectionProps {
    registerLink: string;
}

// Define the custom theme using the provided theme structure
const customTheme: CustomFlowbiteTheme = {
    carousel: {
        root: {
            base: "relative h-full w-full",
            // removed left and right arrow
            leftControl: "hidden",
            rightControl: "hidden"
        },
        indicators: {
            active: {
                off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                on: "bg-white dark:bg-gray-800"
            },
            base: "h-3 w-3 rounded-full",
            wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        item: {
            base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            wrapper: {
                off: "w-full flex-shrink-0 transform cursor-default snap-center",
                on: "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
        },
        control: {
            base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        },
        scrollContainer: {
            // Set overflow-hidden to prevent horizontal scrolling
            base: "flex h-full snap-mandatory overflow-hidden scroll-smooth",
            snap: "snap-x"
        }
    }
};

const HeroSectionHome: React.FC<HeroSectionProps> = ({registerLink}) => {
    return (
        <Flowbite theme={{theme: customTheme}}>
            <div className="h-[500px]">
                {/* 5000 = 5 seconds */}
                <Carousel slideInterval={5000}>
                    {/* First Slide */}
                    {/* Original Header Content */}
                    <div className="flex flex-col items-center h-[500px] bg-gray-900 text-white justify-center">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Smart Fundraising Platforms
                            </h1>
                            <p className="text-lg md:text-xl max-w-3xl mx-auto">
                                Redefining investment by merging private markets with cutting-edge Web3 technologies.
                                Empowering businesses, connecting customers.
                            </p>
                            <div className="pt-10">
                                <a
                                    href={registerLink}
                                    className="text-xl text-white bg-gray-400 hover:bg-gray-500 py-3 px-5 rounded-lg"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Second Slide */}
                    {/* Original Landing Page Content */}
                    <div className="relative h-full bg-gradient-to-r from-blue-300 to-indigo-800 overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20 bg-[url('../../public/images/landing.jpeg')]"
                        >
                        </div>

                        {/* Content Container */}
                        <div
                            className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
                                Invest in the Future of Innovation
                            </h1>
                            <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
                                Join B2D Venture to discover groundbreaking startups and fuel the next generation of
                                entrepreneurs.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                                <button
                                    className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex-shrink-0'>
                                    <a href="/home" className="btn-primary">
                                        Start Investing
                                    </a>
                                </button>
                                <button
                                    className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex-shrink-0'>
                                    <a href="/home" className="btn-secondary">
                                        Browse Startups
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Third Slide */}
                    <div className="flex flex-col items-center h-[500px] bg-gray-700 text-white justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold">Connecting Investors</h2>
                        <p className="mt-4 text-lg md:text-xl">
                            Experience seamless connections with cutting-edge technology.
                        </p>
                    </div>

                    {/* Fourth Slide */}
                    <div className="flex flex-col items-center h-[500px] bg-gray-600 text-white justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold">Innovative Solutions</h2>
                        <p className="mt-4 text-lg md:text-xl">
                            Explore our platform and discover new opportunities.
                        </p>
                    </div>
                </Carousel>
            </div>
        </Flowbite>
    );
};

export default HeroSectionHome;
