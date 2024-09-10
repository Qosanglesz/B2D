import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-300 to-indigo-800 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20 bg-[url('../../public/images/landing.jpeg')]"
        // style={{
        //   backgroundImage: "url('../../public/images/hero.jpeg')"
        // }}
      >
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
          Invest in the Future of Innovation
        </h1>
        <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
          Join B2D Venture to discover groundbreaking startups and fuel the next generation of entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <button className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex-shrink-0 rounded-full hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500'>
            <a href="/home" className="btn-primary">
              Start Investing
            </a>
          </button>
          <button className='bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex-shrink-0 rounded-full hover:bg-indigo-400 active:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500'>
            <a href="/home" className="btn-secondary">
              Browse Startups
            </a>
          </button>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 px-4 space-x-4 overflow-x-auto">
        {['500+ Startups', '$50M+ Invested', '100K+ Investors'].map((feature, index) => (
          <div key={index} className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex-shrink-0">
            <p className="text-white font-semibold">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;