import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
    const products = [
        {
            id: 1,
            name: "Black and white sport cap",
            price: 18.15,
            image: "../../src/assets/img/cap.png",
            rating: 4.5,
        },
        {
            id: 2,
            name: "Metal bridge sunglasses",
            price: 89.95,
            image: "../../src/assets/img/sunglases.png",
            rating: 5,
        },
        {
            id: 3,
            name: "Green baby romper",
            price: 20.40,
            image: "../../src/assets/img/dress.png",
            rating: 4,
        },
        {
            id: 4,
            name: "Mid-rise slim cropped fit jeans",
            price: 40.00,
            image: "../../src/assets/img/jeans.png",
            rating: 4.5,
        },
        {
            id: 5,
            name: "Red dangle earrings",
            price: 29.95,
            image: "../../src/assets/img/molchoq.png",
            rating: 5,
        },
        {
            id: 6,
            name: "Baby shoes with laces",
            price: 30.60,
            image: "../../src/assets/img/crosovka.png",
            rating: 4.5,
        },
    ];

    const itemsPerPage = 6; // Display 6 items per slide
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalSlides = Math.ceil(products.length / itemsPerPage); // Total number of slides

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === totalSlides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <div>
            <div className="section_1">
                <div className="w-full h-9 bg-[#17696A]  flex justify-center gap-12 text-white">

                    <h2 className="text-[12px] flex gap-1 items-center"> <FaChevronLeft />Up to 70% Off.</h2>
                    <Link to={'/'} className=" text-1xl flex gap-4 items-center">Shop our latest sale styles <FaChevronRight /></Link>

                </div>
                <div>
                    <Slider />
                </div>
            </div>
            <div className="section_2 pt-10">
                <section className="container flex justify-center pt-5 lg:pt-0">
                    <div className="relative">
                        <div className="flex flex-wrap space-x-4 no-scrollbar">
                            {/* Category */}
                            <a href="shop-catalog.html" className="flex-shrink-0 text-center">
                                <div className="image-inner mb-3 rounded overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                    <img
                                        src="../../src/assets/img/women.png"
                                        alt="Women’s"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-lg mb-1">Women’s</h3>
                            </a>

                            {/* Category */}
                            <a href="shop-catalog.html" className=" text-center">
                                <div className="image-inner mb-3 rounded overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                    <img
                                        src="../../src/assets/img/men.png"
                                        alt="Men’s"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-lg mb-1">Men’s</h3>
                            </a>

                            {/* Category */}
                            <a href="shop-catalog.html" className=" text-center">
                                <div className="image-inner mb-3 rounded overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                    <img
                                        src="../../src/assets/img/kids.png"
                                        alt="Kids'"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <h3 className="text-lg mb-1">Kids'</h3>
                            </a>
                        </div>
                    </div>
                </section>

            </div>
            <div className="section_3 pt-10">
                <div className="container mx-auto">
                    <h2 className="text-center text-3xl font-bold mb-5">New arrivals</h2>
                    <p className="text-center mb-2">Check out our latest arrivals for the upcoming season</p>
                    <p className="text-center text-blue-600 mb-10">
                        <Link to={'/collection'} className="underline">
                            See the collection here
                        </Link>
                    </p>

                    {/* Slider */}
                    <div className="relative w-full overflow-hidden">
                        <div
                            className="flex transition-transform ease-in-out duration-500"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {products.map((product, index) => (
                                <div key={index} className="min-w-1/6 px-4 text-center">
                                    <div className="bg-white rounded-lg shadow-md p-4">
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

                        {/* Slider Controls */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl bg-gray-300 px-2 py-1 rounded-full"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl bg-gray-300 px-2 py-1 rounded-full"
                        >
                            ›
                        </button>
                    </div>

                    {/* Slider Indicators */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalSlides }, (_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 mx-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
