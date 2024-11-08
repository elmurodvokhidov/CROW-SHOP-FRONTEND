import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch, CiHeart, CiShoppingCart, CiPhone, CiUser } from "react-icons/ci";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Service } from "../config/service";
import { useAuthToken } from "../hooks/useAuthToken";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const getToken = useAuthToken();
    const { fetchCategories } = Service(getToken);

    useEffect(() => {
        const fetchCategoriesFromBackend = async () => {
            try {
                const response = await fetchCategories();
                if (response) {
                    setCategories(response);
                } else {
                    console.error("Kutilmagan javob tuzilishi:", response);
                }
            } catch (error) {
                console.error("Kategoriyalarni yuklash xatosi:", error.message);
            }
        };

        fetchCategoriesFromBackend();
    }, []);

    useEffect(() => {
        if (Array.isArray(categories)) {
            setFilteredCategories(
                categories.filter((category) =>
                    category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [categories, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        // Add a slight delay before hiding the results to allow click events on the list items
        setTimeout(() => setIsInputFocused(false), 600);
    };

    return (
        <div className="sticky z-50 top-0 shadow-md shadow-[#2b324a15]">
            {/* Navbar Main Section */}
            <div className={`w-full bg-white flex justify-center gap-3`}>
                <div className="w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%] flex gap-2 justify-between items-center text-[#424551] leading-[26px] font-[700] text-[12px] md:text-[14px] py-4">
                    <NavLink to={"/"}>
                        <div className="font-bold text-2xl text-[#1E212C] flex items-center">
                            CREATRE
                            <span className="text-[#17696A]">X</span>
                        </div>
                    </NavLink>

                    <div className="hidden md:flex lg:gap-7 gap-5">
                        <NavLink to={"/products?type=women"}>Women</NavLink>
                        <NavLink to={"/products?type=men"}>Men</NavLink>
                        <NavLink to={"/products?type=girls"}>Girls</NavLink>
                        <NavLink to={"/products?type=boys"}>Boys</NavLink>
                        <NavLink className={"text-red-600"} to={"/products?type=sale"}>Sale</NavLink>
                    </div>

                    <div className="sm:flex items-center space-x-6 hidden sm:w-[55%] md:w-[28%]">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Kategoriyalarni qidirish..."
                                className="border font-thin border-gray-300 rounded-md px-4 py-2 w-[100%] outline-[#17696A]"
                                value={searchTerm}
                                onChange={handleSearch}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                            <CiSearch className="w-5 h-5 bg-white absolute right-3 top-2.5 text-[#1E212C] cursor-pointer" />
                            {/* Qidiruv natijalari */}
                            {isInputFocused && searchTerm && (
                                <div className="absolute top-[50px] custom-scroll left-1/2 transform -translate-x-1/2 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-[300px] overflow-y-auto z-10">
                                    <ul className="w-full p-4">
                                        {filteredCategories.length > 0 ? (
                                            filteredCategories.map((category) => (
                                                <li
                                                    onClick={() => {
                                                        window.location.href = `/products?category=${category.name.toLowerCase()}`;
                                                    }}
                                                    key={category._id} className="flex items-center px-2 gap-2 py-2 cursor-pointer hover:bg-gray-100">
                                                    <CiSearch className="text-[20px]" />
                                                    <p className="font-semibold">{category.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="px-4 py-2 font-semibold">Hech qanday kategoriya topilmadi</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-[5px] items-center">
                        <div>
                            <NavLink to={"/"} className={"flex items-center"}>
                                <CiHeart className="text-2xl" />
                                <span className="bg-white px-2 rounded-md">2</span>
                            </NavLink>
                        </div>

                        <div className="border-l border-gray-300 h-5"></div>

                        <div>
                            <NavLink to={"/basket"} className={"flex items-center"}>
                                <CiShoppingCart className="text-2xl" />
                                <span className="bg-[#03CEA4] text-white px-2 rounded-md">4</span>
                            </NavLink>
                        </div>
                        <div className="border-l border-gray-300 h-5"></div>
                        <div>
                            <SignedOut>
                                <SignInButton>
                                    <button className="text-2xl mt-[8px]">
                                        <CiUser />
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <div className="mt-[8px]">
                                    <UserButton />
                                </div>
                            </SignedIn>
                        </div>
                        <div className="border-l border-gray-300 h-5 md:hidden"></div>

                        <div className="md:hidden">
                            <HiMiniBars3CenterLeft className="text-2xl cursor-pointer" onClick={toggleMenu} />
                        </div>
                    </div>


                </div>
            </div>

            {/* Dropdown Menu for Small Screens */}
            <div onClick={toggleMenu}
                className={`fixed w-[100%] bg-white text-[#424551] flex flex-col items-start gap-1 px-4 md:hidden transition-all
                    ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                    duration-[1000ms] ease-in-out`}
            >
                <NavLink to={"/products?type=women"}>Women</NavLink>
                <NavLink to={"/products?type=men"}>Men</NavLink>
                <NavLink to={"/products?type=girls"}>Girls</NavLink>
                <NavLink to={"/products?type=boys"}>Boys</NavLink>
                <NavLink className={"text-red-600"} to={"/products?type=sale"}>Sale</NavLink>
            </div>

        </div>
    );
}
