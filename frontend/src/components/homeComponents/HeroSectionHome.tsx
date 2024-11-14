import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";

interface HeroSectionProps {
    registerLink: string;
}

const HeroSectionHome: React.FC<HeroSectionProps> = ({ registerLink }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    
    const slides = [
        // First Slide
        {
            bgImage: "bg-[url('/images/shibuya.jpg')]",
            content: (
                <Card className="w-full h-full bg-transparent shadow-none">
                    <CardBody className="flex flex-col items-center justify-center text-white text-center">
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                                Smart Fundraising Platforms
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                                Redefining investment by merging private markets with cutting-edge Web3 technologies.
                                Empowering businesses, connecting customers.
                            </p>
                            <Button
                                as="a"
                                href={registerLink}
                                className="mt-6 sm:mt-10"
                                color="default"
                                variant="shadow"
                                size="lg"
                            >
                                Get Started
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ),
        },
        // Second Slide
        {
            bgImage: "bg-[url('/images/movie_bg.jpeg')]",
            content: (
                <Card className="w-full h-full bg-transparent shadow-none">
                    <CardBody className="relative flex flex-col justify-center items-center text-white">
                        <div className="absolute inset-0 bg-purple-900/30 mix-blend-multiply" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                                Invest in the Future of Innovation
                            </h1>
                            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-3xl mx-auto">
                                Join B2D Venture to discover groundbreaking startups and fuel the next generation of
                                entrepreneurs.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Button
                                    as="a"
                                    href="/home"
                                    color="danger"
                                    variant="ghost"
                                    size="lg"
                                >
                                    Start Investing
                                </Button>
                                <Button
                                    as="a"
                                    href="/home"
                                    color="danger"
                                    variant="ghost"
                                    size="lg"
                                >
                                    Browse Startups
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ),
        },
        // Third Slide
        {
            bgImage: "bg-[url('/images/top-tower.jpg')]",
            content: (
                <Card className="w-full h-full bg-transparent shadow-none">
                    <CardBody className="flex flex-col items-center justify-center text-white text-center">
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                                Connecting Investors
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                                Experience seamless connections with cutting-edge technology.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            ),
        },
        // Fourth Slide
        {
            bgImage: "bg-[url('/images/street.jpg')]",
            content: (
                <Card className="w-full h-full bg-transparent shadow-none">
                    <CardBody className="flex flex-col items-center justify-center text-white text-center">
                        <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                                Innovative Solutions
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                                Explore our platform and discover new opportunities.
                            </p>
                        </div>
                    </CardBody>
                </Card>
            ),
        },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative h-[calc(100vh-64px)] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0 max-w-[1920px] mx-auto">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        } ${slide.bgImage} bg-cover bg-center bg-no-repeat`}
                    >
                        {slide.content}
                    </div>
                ))}
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <Button
                        key={index}
                        className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                            currentSlide === index
                                ? 'bg-white'
                                : 'bg-white/50 hover:bg-white'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSectionHome;