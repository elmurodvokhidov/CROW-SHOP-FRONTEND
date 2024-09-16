import { useState } from "react";
import { FaGooglePlay, FaAppStore, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function Footer() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="w-full bg-gray-900 text-white">
            <footer className="py-10">
                <div className="container mx-auto w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {/* HELP Section */}
                        <div className="relative">
                            <h3
                                className="font-bold mb-4 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleSection('help')}
                            >
                                HELP
                                {/* Show arrows only for screens 600px and below */}
                                <div className="block sm:hidden ml-2">
                                    {openSection === 'help' ? (
                                        <HiChevronUp className="text-lg sm:text-xl" />
                                    ) : (
                                        <HiChevronDown className="text-lg sm:text-xl" />
                                    )}
                                </div>
                            </h3>
                            {/* Show the content only if openSection is 'help' OR screen is larger than 600px */}
                            <ul
                                className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'help' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    } sm:max-h-full sm:opacity-100`}
                            >
                                <li><a href="#" className="hover:text-gray-400">Delivery & returns</a></li>
                                <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                                <li><a href="#" className="hover:text-gray-400">Track order</a></li>
                                <li><a href="#" className="hover:text-gray-400">Contacts</a></li>
                                <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                            </ul>
                        </div>

                        {/* SHOP Section */}
                        <div className="relative">
                            <h3
                                className="font-bold mb-4 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleSection('shop')}
                            >
                                SHOP
                                <div className="block sm:hidden ml-2">
                                    {openSection === 'shop' ? (
                                        <HiChevronUp className="text-lg sm:text-xl" />
                                    ) : (
                                        <HiChevronDown className="text-lg sm:text-xl" />
                                    )}
                                </div>
                            </h3>
                            <ul
                                className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'shop' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    } sm:max-h-full sm:opacity-100`}
                            >
                                <li><a href="#" className="hover:text-gray-400">New arrivals</a></li>
                                <li><a href="#" className="hover:text-gray-400">Trending now</a></li>
                                <li><a href="#" className="hover:text-gray-400">Sales</a></li>
                                <li><a href="#" className="hover:text-gray-400">Brands</a></li>
                            </ul>
                        </div>

                        {/* GET IN TOUCH Section */}
                        <div className="relative">
                            <h3
                                className="font-bold mb-4 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleSection('contact')}
                            >
                                GET IN TOUCH
                                <div className="block sm:hidden ml-2">
                                    {openSection === 'contact' ? (
                                        <HiChevronUp className="text-lg sm:text-xl" />
                                    ) : (
                                        <HiChevronDown className="text-lg sm:text-xl" />
                                    )}
                                </div>
                            </h3>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'contact' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    } sm:max-h-full sm:opacity-100`}
                            >
                                <p className="mb-2">Call: (605) 505-0218</p>
                                <p className="mb-4">Email: hello@vortex.com</p>
                                <div className="flex space-x-3">
                                    <a href="#" className="hover:text-gray-400"><FaFacebook className="h-6 w-6" /></a>
                                    <a href="#" className="hover:text-gray-400"><FaTwitter className="h-6 w-6" /></a>
                                    <a href="#" className="hover:text-gray-400"><FaInstagram className="h-6 w-6" /></a>
                                    <a href="#" className="hover:text-gray-400"><FaYoutube className="h-6 w-6" /></a>
                                    <a href="#" className="hover:text-gray-400"><FaPinterest className="h-6 w-6" /></a>
                                </div>
                            </div>
                        </div>

                        {/* DOWNLOAD OUR APP Section */}
                        <div className="relative">
                            <h3
                                className="font-bold mb-4 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleSection('app')}
                            >
                                DOWNLOAD OUR APP
                                <div className="block sm:hidden ml-2">
                                    {openSection === 'app' ? (
                                        <HiChevronUp className="text-lg sm:text-xl" />
                                    ) : (
                                        <HiChevronDown className="text-lg sm:text-xl" />
                                    )}
                                </div>
                            </h3>

                            <div className="flex  justify-between  sm:flex-wrap items-center justify-center space-x-0 sm:space-x-3">
                                <div className="flex items-center space-x-2">
                                    <FaAppStore className="h-10 w-10" />
                                    <span>App Store</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                                    <FaGooglePlay className="h-10 w-10" />
                                    <span>Google Play</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-700 mt-8 pt-4">
                        <div className="relative w-full overflow-hidden">
                            <div className="absolute whitespace-nowrap animate-marquee">
                                <p className="text-center text-sm">+999 (94) 007 8504</p>
                            </div>
                        </div>
                        <div className="container mx-auto flex flex-col items-center sm:flex-row justify-between text-sm mt-4">
                            <p className="hidden sm:block text-left mb-2">© All rights reserved. Made with by Creation Studio</p>
                            <a
                                href="#"
                                className="hover:text-gray-400 text-center sm:text-right"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToTop();
                                }}
                            >
                                Go to top
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
