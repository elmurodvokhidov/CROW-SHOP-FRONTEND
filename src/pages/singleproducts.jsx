import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import rasm from "../components/download (3).jpg"; 

export default function ProductPage() {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to cart`);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="container mx-auto p-4 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <div className="flex justify-center">
                        <img
                            src={rasm} 
                            alt="Product"
                            className="max-w-[600px] h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            Basic hooded sweatshirt in pink
                        </h1>
                        <p className="text-2xl font-bold text-red-600 mb-2">$15.50</p>
                        <p className="line-through text-gray-500 text-lg">$31.00</p>

                        <div className="my-4 flex items-center">
                            <span className="text-yellow-400"><FaStar /></span>
                            <span className="ml-1 text-lg">4.5 (130 reviews)</span>
                        </div>

                        <div className="my-4">
                            <label className="block mb-2 text-gray-700">Size:</label>
                            <select className="w-full lg:w-1/2 p-2 border border-gray-300 rounded">
                                <option>Select Size</option>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                        </div>

                        <div className="flex items-center my-4 space-x-4">
                            <input
                                type="number"
                                className="w-16 p-2 border border-gray-300 rounded text-center"
                                value={quantity}
                                min="1"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center space-x-2"
                                onClick={handleAddToCart}
                            >
                                <HiOutlineShoppingCart />
                                <span>Add to basket</span>
                            </button>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <button className="bg-blue-500 text-white p-2 rounded">Visa</button>
                            <button className="bg-yellow-500 text-white p-2 rounded">MasterCard</button>
                            <button className="bg-blue-600 text-white p-2 rounded">PayPal</button>
                        </div>
                    </div>
                </div>

              
            </div>
        </div>
    );
}
