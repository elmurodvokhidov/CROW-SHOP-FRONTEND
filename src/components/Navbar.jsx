import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiSearch, CiHeart, CiShoppingCart, CiPhone } from "react-icons/ci";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <div className="sticky top-0 shadow-md shadow-[#2b324a15]">
            {/* Navbar Upper Section */}
            <div className="w-full bg-[#1E212C] flex justify-center">
                <div className="w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%] flex justify-between text-white leading-[21px] font-[400] text-[12px] md:text-[14px]">
                    <div className="flex items-center">
                        <span className="opacity-[60%] hidden lg:inline">Available 24/7 at </span>
                        <span className="lg:hidden inline "><CiPhone className="text-xl " /></span>
                        <span className="text-white"> +999 (77) 095 0025</span>
                    </div>

                    <div className="hidden sm:flex gap-3 opacity-[60%] md:gap-8">
                        <Link to={"/"}>Delivery & returns</Link>
                        <Link to={"/"}>Track order</Link>
                        <Link to={"/"}>Blog</Link>
                        <Link to={"/"}>Contacts</Link>
                    </div>

                    <div className="flex items-center gap-1 opacity-[60%]">
                        <FaRegUser className="" />
                        <div className="flex text-[14px]">
                            <p>Log in /</p>
                            <p>Register</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar Main Section */}
            <div className={`w-full bg-white flex justify-center gap-3`}>
                <div className="w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%] flex justify-between items-center text-[#424551] leading-[26px] font-[700] text-[12px] md:text-[14px] py-4">
                    <div className="font-bold text-2xl text-[#1E212C] flex items-center">
                        CREATRE
                        <span className="text-[#17696A]">X</span>
                    </div>

                    <div className="hidden md:flex lg:gap-7 gap-5">
                        <NavLink
                            to={"#"}
                            onMouseEnter={() => handleMouseEnter('Women')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Women
                        </NavLink>
                        <NavLink
                            to={"#"}
                            onMouseEnter={() => handleMouseEnter('Men')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Men
                        </NavLink>
                        <NavLink
                            to={"#"}
                            onMouseEnter={() => handleMouseEnter('Girls')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Girls
                        </NavLink>
                        <NavLink
                            to={"#"}
                            onMouseEnter={() => handleMouseEnter('Boys')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Boys
                        </NavLink>
                        <NavLink
                            className={"text-red-600"}
                            to={"#"}
                            onMouseEnter={() => handleMouseEnter('Sale')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Sale
                        </NavLink>
                    </div>

                    <div className="sm:flex items-center space-x-6 hidden sm:w-[55%] md:w-[28%]">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="border font-thin border-gray-300 rounded-md px-4 py-2 w-[100%] outline-[#17696A]"
                            />
                            <CiSearch className="w-5 h-5 absolute right-3 top-2.5 text-[#1E212C] cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex md:gap-2 gap-1 items-center">
                        <div>
                            <NavLink to={"/"} className={"flex items-center"}>
                                <CiHeart className="text-2xl" />
                                <span className="bg-white px-2 rounded-md">2</span>
                            </NavLink>
                        </div>

                        <div className="border-l border-gray-300 h-5"></div>

                        <div>
                            <NavLink to={"/"} className={"flex items-center"}>
                                <CiShoppingCart className="text-2xl" />
                                <span className="bg-[#03CEA4] text-white px-2 rounded-md">4</span>
                            </NavLink>
                        </div>
                        <div className="border-l border-gray-300 h-5 md:hidden"></div>

                        <div className="md:hidden">
                            <HiMiniBars3CenterLeft className="text-2xl cursor-pointer" onClick={toggleMenu} />
                        </div>
                        <div>
                            <SignedOut>
                                <SignInButton>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                        Sign In / up
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>

                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu for Small Screens */}
            <div
                className={`bg-white text-[#424551] flex flex-col items-start gap-1 px-4 md:hidden transition-all
                    ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                    duration-[1000ms] ease-in-out`}
            >
                <NavLink to={"#"}>Women</NavLink>
                <NavLink to={"#"}>Men</NavLink>
                <NavLink to={"#"}>Girls</NavLink>
                <NavLink to={"#"}>Boys</NavLink>
                <NavLink className={"text-red-600"} to={"#"}>Sale</NavLink>
            </div>

            {/* Modal */}
            {hoveredItem && (
                <div
                    className="w-[100%] absolute top-[95px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 border-t-[1px]"
                    onMouseEnter={() => setHoveredItem(hoveredItem)}
                    onMouseLeave={handleMouseLeave}
                >
                    <h3 className="text-lg font-semibold">{hoveredItem}</h3>
                    <p className="text-sm">Here are some details about {hoveredItem} category.</p>
                </div>
            )}
        </div>
    );
}
