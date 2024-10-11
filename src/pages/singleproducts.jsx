import { useState } from "react";
import { FaStar, FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import rasm1 from "../img/download (3).jpg";
import rasm2 from "../img/download (2).jpg";
import rasm3 from "../img/download (3).jpg";
import rasm4 from "../img/download (3).jpg";
import rasm5 from "../img/download (3).jpg";
import rasm6 from "../img/download (3).jpg";
import visa from "../img/visa.png";
import pay from "../img/pay-pal.png";
import master from "../img/master-card.png";
export default function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(rasm1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showSizeChart, setShowSizeChart] = useState(false);

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to cart`);
    };

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const toggleSizeChart = () => {
        setShowSizeChart(!showSizeChart);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="container mx-auto p-4 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    {/* Image Section */}
                    <div className="flex flex-col items-center">
                        <img
                            src={mainImage}
                            alt="Product"
                            className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg"
                        />

                        {/* Thumbnail images */}
                        <div className="flex space-x-2 mt-4 overflow-x-auto max-w-full lg:max-w-none scrollbar-thin scrollbar-thumb-gray-400">
                            {[rasm1, rasm2, rasm3, rasm4, rasm5, rasm6].map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-300"
                                    onClick={() => handleThumbnailClick(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            Basic hooded sweatshirt in pink
                        </h1>
                        <div className="flex items-center mb-4 mt-8">
                            <p className="text-2xl font-bold text-red-600 mr-4">$15.50</p>
                            <p className="line-through text-gray-500 text-lg">$31.00</p>
                            <p className="bg-red-500 text-white px-2 py-1 ml-4 rounded">-50%</p>
                        </div>

                        <div className="my-4 flex items-center mt-8">
                            <div className="flex text-yellow-400">
                                {[...Array(4)].map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                                <FaStar className="text-white" />
                            </div>
                            <span className="ml-2 text-lg">4.5 (130 reviews)</span>
                        </div>

                        <div className="my-4">
                            <label className="block mb-2 text-gray-700 mt-8">Color:</label>
                            <div className="flex space-x-4">
                                {['pink', 'black', 'gray', 'blue', 'green'].map(color => (
                                    <span
                                        key={color}
                                        className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer ${color === selectedColor ? 'ring-2 ring-blue-500' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></span>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="my-4">
                            <label className="block mb-2 text-gray-700 mt-8">Size:</label>
                            <div className="overflow-x-auto">
                                <div className="flex space-x-3.5 min-w-max">
                                    {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button
                                            key={size}
                                            className={`p-2 border rounded ${size === selectedSize ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border-gray-300`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <button
                            className="w-full lg:w-1/2 p-2 bg-green-500 text-white rounded flex items-center justify-center mt-8"
                            onClick={toggleSizeChart}
                        >
                            <FaRegCalendarCheck className="mr-2" />
                            Size Chart
                        </button>

                        {/* Size Chart Modal */}
                        {showSizeChart && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 mt-8">
                                <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
                                    <h3 className="text-lg font-semibold mb-2">Size Chart</h3>
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th>Country</th>
                                                <th>XXS</th>
                                                <th>XS</th>
                                                <th>S</th>
                                                <th>M</th>
                                                <th>L</th>
                                                <th>XL</th>
                                                <th>XXL</th>
                                                <th>XXXL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Uzbekistan</td>
                                                <td>44</td>
                                                <td>46</td>
                                                <td>48</td>
                                                <td>50</td>
                                                <td>52</td>
                                                <td>54</td>
                                                <td>56</td>
                                                <td>58</td>
                                            </tr>
                                            <tr>
                                                <td>UK</td>
                                                <td>32</td>
                                                <td>34</td>
                                                <td>36</td>
                                                <td>38</td>
                                                <td>40</td>
                                                <td>42</td>
                                                <td>44</td>
                                                <td>46</td>
                                            </tr>
                                            <tr>
                                                <td>US</td>
                                                <td>32</td>
                                                <td>34</td>
                                                <td>36</td>
                                                <td>38</td>
                                                <td>40</td>
                                                <td>42</td>
                                                <td>44</td>
                                                <td>46</td>
                                            </tr>
                                            <tr>
                                                <td>EU/FR</td>
                                                <td>38</td>
                                                <td>40</td>
                                                <td>42</td>
                                                <td>44</td>
                                                <td>46</td>
                                                <td>48</td>
                                                <td>50</td>
                                                <td>52</td>
                                            </tr>
                                            <tr>
                                                <td>IT</td>
                                                <td>42</td>
                                                <td>44</td>
                                                <td>46</td>
                                                <td>48</td>
                                                <td>50</td>
                                                <td>52</td>
                                                <td>54</td>
                                                <td>56</td>
                                            </tr>
                                            <tr>
                                                <td>Bel aylanmasi (duym)</td>
                                                <td>26-27</td>
                                                <td>28-29</td>
                                                <td>30-31</td>
                                                <td>32-33</td>
                                                <td>34-35</td>
                                                <td>36-37</td>
                                                <td>38-39</td>
                                                <td>40-41</td>
                                            </tr>
                                            <tr>
                                                <td>Ko'krak aylanmasi (sm)</td>
                                                <td>88</td>
                                                <td>92</td>
                                                <td>96</td>
                                                <td>100</td>
                                                <td>104</td>
                                                <td>108</td>
                                                <td>112</td>
                                                <td>116</td>
                                            </tr>
                                            <tr>
                                                <td>Bel aylanmasi (sm)</td>
                                                <td>78</td>
                                                <td>82</td>
                                                <td>84</td>
                                                <td>88</td>
                                                <td>92</td>
                                                <td>96</td>
                                                <td>100</td>
                                                <td>104</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button
                                        className="mt-8 p-2 bg-blue-500 text-white rounded"
                                        onClick={toggleSizeChart}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
                            <button
                                className="p-4 bg-green-500 text-white rounded flex items-center justify-center w-full md:w-auto"
                                onClick={handleAddToCart}
                            >
                                <HiOutlineShoppingCart className="mr-2" />
                                Add to Basket
                            </button>
                            <button
                                className="p-4 bg-red-500 text-white rounded flex items-center justify-center w-full md:w-[165px]"
                            >
                                <AiOutlineHeart className="mr-2" />
                                Favorite
                            </button>
                        </div>

                        <div className="grid grid-cols-2  mt-8 md:grid-cols-6 md:gap-6">
                            <img
                                src={master}
                                alt="MasterCard"
                                className="w-[100px] h-auto"
                            />
                            <img
                                src={pay}
                                alt="PayPal"
                                className="w-[100px] h-auto"
                            />
                            <img
                                src={visa}
                                alt="Visa"
                                className="w-[100px] h-auto md:col-span-1 md:self-center md:justify-self-center"
                            />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
