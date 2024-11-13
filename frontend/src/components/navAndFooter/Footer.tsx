import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="w-full bg-gray-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold text-lg mb-4">B2DVenture</h3>
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            Empowering investors with comprehensive tools and insights for better investment decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                            {/* <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </Link> */}
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/Qosanglesz/B2D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                            {/* <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a> */}
                            {/* <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a> */}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()} B2DVenture. All rights reserved.
                        </p>
                        {/* <div className="mt-4 md:mt-0 flex space-x-4">
                            <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Cookies
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;