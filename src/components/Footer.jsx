import { useState } from "react";
import { FaGooglePlay, FaAppStore, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function Footer() {
    // State to manage accordion
    const [isOpen, setIsOpen] = useState({
        help: false,
        shop: false,
        contact: false,
        download: false
    });

    const toggleAccordion = (section) => {
        setIsOpen(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className="w-full bg-gray-900 text-white">
            <footer className="py-10">
                <div className="container mx-auto w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%]">
                    {/* 600px dan katta ekranlar uchun normal ko'rinish */}
                    <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        {/* HELP Section */}
                        <div>
                            <h3 className="font-bold mb-4">HELP</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-400">Delivery & returns</a></li>
                                <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                                <li><a href="#" className="hover:text-gray-400">Track order</a></li>
                                <li><a href="#" className="hover:text-gray-400">Contacts</a></li>
                                <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                            </ul>
                        </div>

                        {/* SHOP Section */}
                        <div>
                            <h3 className="font-bold mb-4">SHOP</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-400">New arrivals</a></li>
                                <li><a href="#" className="hover:text-gray-400">Trending now</a></li>
                                <li><a href="#" className="hover:text-gray-400">Sales</a></li>
                                <li><a href="#" className="hover:text-gray-400">Brands</a></li>
                            </ul>
                        </div>

                        {/* GET IN TOUCH Section */}
                        <div>
                            <h3 className="font-bold mb-4">GET IN TOUCH</h3>
                            <p>Call: (605) 505-0218</p>
                            <p>Email: hello@vortex.com</p>
                            <div className="mt-4 space-x-3">
                                <a href="#" className="hover:text-gray-400"><FaFacebook className="inline-block h-6 w-6" /></a>
                                <a href="#" className="hover:text-gray-400"><FaTwitter className="inline-block h-6 w-6" /></a>
                                <a href="#" className="hover:text-gray-400"><FaInstagram className="inline-block h-6 w-6" /></a>
                                <a href="#" className="hover:text-gray-400"><FaYoutube className="inline-block h-6 w-6" /></a>
                            </div>
                        </div>

                        {/* DOWNLOAD OUR APP Section */}
                        <div>
                            <h3 className="font-bold mb-4">DOWNLOAD OUR APP</h3>
                            <div className="flex justify-center sm:justify-start items-center space-x-2">
                                <FaAppStore className="text-2xl" />
                                <FaGooglePlay className="text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* 600px va kichik ekranlar uchun accordion uslubi */}
                    <div className="sm:hidden text-center">
                        {/* HELP Section */}
                        <div>
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('help')}>
                                <h3 className="font-bold mb-4">HELP</h3>
                                {isOpen.help ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                            </div>
                            {isOpen.help && (
                                <ul className="space-y-2 text-left ml-4">
                                    <li><a href="#" className="hover:text-gray-400">Delivery & returns</a></li>
                                    <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Track order</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Contacts</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                                </ul>
                            )}
                        </div>

                        {/* SHOP Section */}
                        <div>
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('shop')}>
                                <h3 className="font-bold mb-4">SHOP</h3>
                                {isOpen.shop ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                            </div>
                            {isOpen.shop && (
                                <ul className="space-y-2 text-left ml-4">
                                    <li><a href="#" className="hover:text-gray-400">New arrivals</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Trending now</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Sales</a></li>
                                    <li><a href="#" className="hover:text-gray-400">Brands</a></li>
                                </ul>
                            )}
                        </div>

                        {/* GET IN TOUCH Section */}
                        <div>
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('contact')}>
                                <h3 className="font-bold mb-4">GET IN TOUCH</h3>
                                {isOpen.contact ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                            </div>
                            {isOpen.contact && (
                                <div className="text-left ml-4">
                                    <p>Call: (605) 505-0218</p>
                                    <p>Email: hello@vortex.com</p>
                                </div>
                            )}
                        </div>

                        {/* DOWNLOAD OUR APP Section */}
                        <div>
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAccordion('download')}>
                                <h3 className="font-bold mb-4">DOWNLOAD OUR APP</h3>
                                {isOpen.download ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                            </div>
                            {isOpen.download && (
                                <div className="flex justify-start ml-4 items-center space-x-2">
                                    <FaAppStore className="text-2xl" />
                                    <FaGooglePlay className="text-2xl" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 600px da ijtimoiy media ikonkalari */}
                <div className="sm:hidden flex justify-center space-x-4 mt-8">
                    <FaFacebook className="text-2xl" />
                    <FaTwitter className="text-2xl" />
                    <FaInstagram className="text-2xl" />
                    <FaYoutube className="text-2xl" />
                </div>

                {/* Footer Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="container mx-auto w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%] flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm">
                        <p className="text-center">© All rights reserved. Made with by Creation Studio</p>
                        <a href="#" className="hover:text-gray-400 text-center mt-2 sm:mt-0">Go to top</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
