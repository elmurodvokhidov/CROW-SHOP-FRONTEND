import { FaApple, FaChevronLeft, FaChevronRight, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { MdArrowRightAlt, MdOutlineLocalShipping, MdSecurity } from "react-icons/md";
import playmarket from '../assets/img/playmarket.svg'
import insta1 from '../assets/img/insta-1.png'
import insta2 from '../assets/img/insta-2.png'
import insta3 from '../assets/img/insta-3.png'
import blog1 from '../assets/img/blog1.png'
import blog2 from '../assets/img/blog2.png'
import Indepth from '../assets/img/brand/InDepth.png'
import Higher from '../assets/img/brand/Higher.png'
import Sentinal from '../assets/img/brand/Sentinal.png'
import National from '../assets/img/brand/National.png'
import ForSale from '../assets/img/brand/For Sale.png'
import DelMar from '../assets/img/brand/Del Mar.png'
import Message from '../assets/img/andsection.png'
import { FcOnlineSupport } from "react-icons/fc";
import { RiSecurePaymentFill } from "react-icons/ri";

export default function Home() {
    const products = [
        { id: 1, name: "Black and white sport cap", price: 18.15, image: "../../src/assets/img/cap.png", rating: 4.5 },
        { id: 2, name: "Metal bridge sunglasses", price: 89.95, image: "../../src/assets/img/sunglases.png", rating: 5 },
        { id: 3, name: "Green baby romper", price: 20.40, image: "../../src/assets/img/dress.png", rating: 4 },
        { id: 4, name: "Mid-rise slim cropped fit jeans", price: 40.00, image: "../../src/assets/img/jeans.png", rating: 4.5 },
        { id: 5, name: "Red dangle earrings", price: 29.95, image: "../../src/assets/img/molchoq.png", rating: 5 },
        { id: 6, name: "Baby shoes with laces", price: 30.60, image: "../../src/assets/img/crosovka.png", rating: 4.5 },
        // Add more products if needed for demonstration
    ];

    const categories = [
        { id: 1, name: "Caps" },
        { id: 2, name: "Accessories" },
        { id: 3, name: "Clothing" },
        { id: 4, name: "Jewelry" },
        { id: 5, name: "Footwear" },
        { id: 6, name: "Outerwear" }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // Number of products per page set to 2

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    const calculateTimeLeft = () => {
        const futureDate = new Date("2024-10-11T00:00:00"); // Bu yerda maqsadli sanani o'rnating
        const now = new Date();
        const difference = futureDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);

    // // Fetch categories from the backend API
    // const fetchCategories = async () => {
    //     try {
    //         const response = await api.get('/categories'); // Adjust this endpoint based on your backend API
    //         if (response.data) {
    //             setCategories(response.data); // Assuming response.data contains an array of categories
    //         } else {
    //             console.error("Unexpected response structure:", response);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching categories:", error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // Fetch categories on component mount
    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    return (
        <div className="">
            {/* Header Section */}
            <div className="section_1">
                <div className="w-full h-9 bg-[#17696A] flex justify-center gap-12 text-white">
                    <h2 className="text-[12px] flex gap-1 items-center"><FaChevronLeft />Up to 70% Off.</h2>
                    <Link to="/" className="text-1xl flex gap-4 items-center">
                        Shop our latest sale styles <FaChevronRight />
                    </Link>
                </div>
            </div>
            <div>
                <Slider />
            </div>

            {/* Category Section */}
            <div className="pt-20">
                <div className="section_2  pad">
                    <section className="container flex justify-center pt-5 ">
                        <div className="relative">
                            <div className="flex flex-wrap space-x-4 no-scrollbar justify-center">
                                {/* Category */}
                                <a href="shop-catalog.html" className="flex-shrink-0 text-center">
                                    <div className="image-inner mb-3 rounded overflow-hidden w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-large transform transition-transform duration-300 hover:scale-105">
                                        <img src="../../src/assets/img/women.png" alt="Women’s" className="w-full h-auto" />
                                    </div>
                                    <h3 className="text-lg mb-1">Women’s</h3>
                                </a>

                                {/* Category */}
                                <a href="shop-catalog.html" className="flex-shrink-0 text-center">
                                    <div className="image-inner mb-3 rounded overflow-hidden w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-large transform transition-transform duration-300 hover:scale-105">
                                        <img src="../../src/assets/img/men.png" alt="Men’s" className="w-full h-auto" />
                                    </div>
                                    <h3 className="text-lg mb-1">Men’s</h3>
                                </a>

                                {/* Category */}
                                <a href="shop-catalog.html" className="flex-shrink-0 text-center">
                                    <div className="image-inner mb-3 rounded overflow-hidden w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-large transform transition-transform duration-300 hover:scale-105">
                                        <img src="../../src/assets/img/kids.png" alt="Kids'" className="w-full h-auto" />
                                    </div>
                                    <h3 className="text-lg mb-1">Kids'</h3>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* New Arrivals Section */}
            <div className="pt-24 pb-24">
                <div className="section_3 pad ">
                    <div className="container mx-auto">
                        <h2 className="text-center text-3xl font-bold mb-5">New arrivals</h2>
                        <p className="text-center mb-2">Check out our latest arrivals for the upcoming season</p>
                        <p className="text-center text-blue-600 mb-10">
                            <Link to="/collection" className="underline">See the collection here</Link>
                        </p>

                        {/* Product Slider with Pagination */}
                        <div className="relative w-full overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    Previous
                                </button>
                                <p>Page {currentPage} of {Math.ceil(products.length / productsPerPage)}</p>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                                    className={`px-4 py-2 bg-gray-200 rounded ${currentPage === Math.ceil(products.length / productsPerPage) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    Next
                                </button>
                            </div>

                            {/* Updated Product Display */}
                            <div className="newarrival flex justify-between flex-wrap gap-4">
                                {currentProducts.map((product) => (
                                    <div key={product.id} className="flex flex-col items-center">
                                        <div className="p-4">
                                            <div className="mb-3 rounded overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                                            <div className="flex justify-center gap-1">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <span key={i} className={i < product.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ads and sales Section */}
            <div className="section_4 flex gap-2 flex-col w-full pad">
                <div className=" flex gap-2 flex-wrap ">
                    <div className="mens flex flex-col gap-5 p-16 w-[735px] h-[500px] rounded-md">
                        <h3 className="h-5 text-[#1E212C] font-bold">Summer Collections
                        </h3 >
                        <h1 className="text-2xl font-black w-[362px] text-[#1E212C]">Sale Up to 70%
                        </h1>
                        <button className="salebutton">Explore new prices</button>
                    </div>
                    <div className="stay flex flex-col justify-between p-16 w-[1109px] h-[500px] rounded-md">
                        <div className="flex flex-col gap-5">
                            <h3 className="h-5 text-[#1E212C] font-bold">Deal of the week</h3>
                            <h1 className="text-2xl font-black w-[362px] text-[#1E212C]">Stay Warm With Our New Sweaters</h1>
                            <button className="salebutton">Shop now</button>
                        </div>
                        <div className="flex items-center gap-5">
                            <h1 className=" hours"> {timeLeft.days || 0} <span> days</span></h1> <h1 className="hours">{timeLeft.hours || 0} <span>hours</span></h1> <h1 className="hours">{timeLeft.minutes || 0} <span>minutes</span></h1> <h1 className="hours">{timeLeft.seconds || 0} <span>seconds</span></h1>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="newcollection w-[1109px] h-[500px] rounded-md">
                        <div className=" flex flex-col gap-5 p-16 w-[735px] h-[500px] rounded-md">
                            <h3 className="h-5 text-[#1E212C] font-bold">New collection
                            </h3 >
                            <h1 className="text-2xl font-black w-[362px] text-[#1E212C]">Shoes & Bags
                                autumn / winter 2020
                            </h1>
                            <button className="salebutton flex items-center justify-center gap-4">See offers <MdArrowRightAlt className="text-xl" /></button>
                        </div>
                    </div>
                    <div className="delivey flex justify-between gap-9 rounded-md  bg-[#E5E8ED] w-[735px] h-[500px]">
                        <div className="w-full del ">
                            <div className="p-16 flex flex-col gap-5">
                                <h3 className="h-5 text-[#1E212C] font-bold">For All new Email Subscribers
                                </h3 >
                                <h1 className="text-2xl font-black  text-[#1E212C]">Get 5% Off & Free Delivery
                                </h1>
                                <div>
                                    <label htmlFor="input">Email</label>
                                    <div className="w-[360px]">
                                        <input type="text" placeholder="Your working email" className="p-[8px] outline-none" />
                                        <button className="bg-[#17696A] p-[8px] text-[#fff] text-[14px]">Subscribe</button>
                                    </div>
                                </div>
                                <p className="w-[360px] text-[#424551]">
                                    *Sign up to be the first to hear about exclusive deals, special offers and upcoming collections.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top categories Section */}
            <div>
                <div className="w-full my-10">
                    <h2 className="text-center text-2xl font-semibold mb-6">Popular Categories</h2>

                    <div className="flex justify-around flex-wrap">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.id} className="flex flex-col hover:scale-125 hover:transition-all items-center mb-4 w-[150px]">
                                    <div className="w-[100px] h-[100px] mb-2 rounded-full overflow-hidden">
                                        {/* Add category-specific images */}
                                        <img
                                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNCqqcTy07dEVFyqdfUUxUC0s7GD2-jKQEQ&s`}
                                            alt={category.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="text-center text-lg font-medium">{category.name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No categories available</p>
                        )}
                    </div>

                    <h2 className="text-center text-2xl font-semibold my-10">Popular Products</h2>
                    <div className="flex justify-around flex-wrap">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="flex flex-col items-center mb-4 w-[150px]">
                                    <div className="w-[200px] h-[200px] mb-2 rounded overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="text-center text-lg font-medium">{product.name}</p>
                                    <p className="text-center text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                    <p className="text-center text-sm text-yellow-500">Rating: {product.rating}</p>
                                    <p className="text-center text-sm text-gray-400">Category: {product.category}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Ads Mobile app Section*/}
            <div className="bg-[#1E212C] w-full h-[300px] flex justify-evenly items-center pad">
                <div className="pt-20 shopping">

                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-2xl w-[500px]">Enjoy mobile shopping with our Createx Store App!</h1>
                    <div className="flex gap-4">
                        <main className="bg-[#424551] flex items-center gap-2 p-3 rounded-md text-white">
                            <FaApple className="text-4xl text-white" />
                            <h1><span>Download on the</span> <br /> App Store</h1>
                        </main>
                        <main className="bg-[#424551] flex items-center gap-2 p-3 rounded-md text-white">
                            <img src={playmarket} alt="playmarket" />
                            <h1><span>GET IT ON</span> <br />Google Play</h1>
                        </main>
                    </div>
                </div>
            </div>

            {/* Service Section */}
            <div className="flex justify-evenly items-center pt-20">
                <div className="flex flex-col gap-5 items-center">
                    <MdOutlineLocalShipping className="text-5xl text-[#17696A]" />
                    <main className="flex flex-col gap-5 items-center text-xl">
                        <h1 className="text-[#1E212C] font-bold">Fast Worldwide Shipping</h1>
                        <p>Get free shipping over $250</p>
                    </main>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <FcOnlineSupport className="text-5xl text-[#17696A]" />
                    <main className="flex flex-col gap-5 items-center text-xl">
                        <h1 className="text-[#1E212C] font-bold">24/7 Customer Support</h1>
                        <p>Friendly 24/7 customer support</p>
                    </main>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <MdSecurity className="text-5xl text-[#17696A]" />
                    <main className="flex flex-col gap-5 items-center text-xl">
                        <h1 className="text-[#1E212C] font-bold">Money Back Guarantee</h1>
                        <p>We return money within 30 days</p>
                    </main>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <RiSecurePaymentFill className="text-5xl text-[#17696A]" />
                    <main className="flex flex-col gap-5 items-center text-xl">
                        <h1 className="text-[#1E212C] font-bold">Secure Online Payment</h1>
                        <p>Accept all major credit cards</p>
                    </main>
                </div>
            </div>

            {/* Follow Instagram Section */}
            <div className="pt-20 flex justify-evenly">
                <div className="flex flex-col justify-evenly items-start gap-3">
                    <h3>Follow us on Instagram</h3>
                    <h1 className="font-bold text-xl">@createx_store</h1>
                    <button className="salebutton flex items-center"><FaInstagram /> Follow Instagram</button>
                </div>
                <div className="flex gap-9">
                    <img src={insta1} alt="insta1" />
                    <img src={insta2} alt="insta2" />
                    <img src={insta3} alt="insta3" />
                </div>
            </div>

            {/* Fashion Blog Section */}
            <div className="flex flex-col gap-4  pt-14 pl-20 pr-24">
                <div className="flex justify-between pad">
                    <h1 className="text-3xl font-black">Fashion blog</h1>
                    <button className="salebutton">View blog</button>
                </div>
                <div className="flex flex-wrap pt-14 justify-between pad">
                    <div className="w-[600px] bg-[#F4F5F6]">
                        <img src={blog1} alt="" />
                        <div className="p-4 flex flex-col gap-4 ">
                            <h3 className="font-bold text-xl hover:text-[#17696A]">Bag Trends for Summer 2020</h3>
                            <p className="text-[#787A80]">Fashion | August 24, 2020 | No comments</p>
                            <p className="font-normal text-[#424551]">Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer bibendum turpis convallis...</p>
                        </div>
                    </div>
                    <div className="w-[600px] bg-[#F4F5F6]">
                        <img src={blog2} alt="" />
                        <div className="p-4 flex flex-col gap-4 ">
                            <h3 className="font-bold text-xl hover:text-[#17696A]">Top 10 of This Season’s Hottest Sneakers</h3>
                            <p className="text-[#787A80] clas">Lifestyle | August 24, 2020 | No comments</p>
                            <p className="font-normal text[#424551]">Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer bibendum turpis convallis...</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Section */}
            <div className="flex justify-between flex-wrap  pt-14 pl-20 pr-24">
                <img src={Indepth} alt={Indepth} />
                <img src={Higher} alt={Higher} />
                <img src={Sentinal} alt={Sentinal} />
                <img src={National} alt={National} />
                <img src={ForSale} alt={ForSale} />
                <img src={DelMar} alt={DelMar} />
            </div>

            {/* End Subscription Section */}
            <section class="bg-gray-100 py-14  pl-20 pr-24">
                <div class="container mx-auto pt-4 pb-6 px-6">
                    <div class="flex flex-col md:flex-row items-center">
                        <form class="md:w-1/2 xl:w-2/5 space-y-6" novalidate>
                            <h2 class="text-4xl font-bold mb-4">Subscribe for updates</h2>
                            <p class="text-gray-600 text-lg mb-6">Subscribe for exclusive early sale access and new arrivals.</p>

                            <div class="flex space-x-4 mb-4">
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" class="form-checkbox text-indigo-600" id="s-women" />
                                    <label for="s-women" class="text-gray-700">Women</label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" class="form-checkbox text-indigo-600" id="s-men" />
                                    <label for="s-men" class="text-gray-700">Men</label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" class="form-checkbox text-indigo-600" id="s-girls" checked />
                                    <label for="s-girls" class="text-gray-700">Girls</label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input type="checkbox" class="form-checkbox text-indigo-600" id="s-boys" />
                                    <label for="s-boys" class="text-gray-700">Boys</label>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <label for="s-email" class="block text-lg font-medium text-gray-700">Email</label>
                                <div class="flex">
                                    <input type="email" id="s-email" class="flex-grow form-input rounded-l-lg border-gray-300" placeholder="Your working email" required />
                                    <button type="submit" class="bg-teal-600 text-white px-6 py-3 rounded-r-lg">Subscribe</button>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                <input type="checkbox" id="s-agree" class="form-checkbox text-indigo-600" />
                                <label for="s-agree" class="text-gray-700">I agree to receive communications from Createx Store.</label>
                            </div>
                        </form>

                        <div class="hidden md:block md:w-1/2 xl:w-3/5 mt-8 md:mt-0">
                            <div class="ml-auto max-w-md">
                                <img src={Message} class="block" alt="Illustration" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
