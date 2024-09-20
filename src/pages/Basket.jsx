import React, { useState } from 'react';

const CheckoutPage = () => {
    const [promoCode, setPromoCode] = useState('');
    const [quantities, setQuantities] = useState([1, 1, 1]); // For storing quantities of each item
    const [shippingPrice, setShippingPrice] = useState(15.00); // Default shipping price

    // Function to handle quantity increment
    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    // Function to handle quantity decrement
    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) {
            newQuantities[index] -= 1;
            setQuantities(newQuantities);
        }
    };

    // Function to handle shipping price change
    const handleShippingChange = (price) => {
        setShippingPrice(price);
    };

    // Calculate subtotal
    const subtotal = (19.99 * quantities.reduce((a, b) => a + b, 0)).toFixed(2);

    // Calculate total price
    const total = (parseFloat(subtotal) + shippingPrice).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-100 p-5 md:p-10">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-gray-900 p-6 border-b">Checkout</h1>

                {/* Item Review */}
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">1. Item Review</h2>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row justify-between items-center border rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4"
                            >
                                <div className="flex items-center space-x-4 w-full md:w-auto">
                                    <img
                                        src={`https://via.placeholder.com/100x100?text=Item${idx + 1}`}
                                        alt="item"
                                        className="w-24 h-24 object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-lg">Item name {idx + 1}</h3>
                                        <p className="text-sm text-gray-500">Color: Blue, Size: M</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDecrement(idx)}
                                            className="px-2 py-1 bg-gray-300 rounded text-black"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 border rounded">{quantities[idx]}</span>
                                        <button
                                            onClick={() => handleIncrement(idx)}
                                            className="px-2 py-1 bg-gray-300 rounded text-black"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-red-600 font-bold">$19.99</p>
                                    <button className="text-blue-500 border border-blue-500 rounded px-2 py-1">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-right font-bold mt-4">Subtotal: ${subtotal}</p>
                </div>


                {/* Shipping & Billing Address */}
                <div className="p-6 border-t">
                    <h2 className="text-xl font-bold mb-4">2. Shipping & Billing Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="Last Name" className="border p-2 rounded w-full" />
                        <input type="email" placeholder="Email" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="Phone Number" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="Country" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="City" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="Address" className="border p-2 rounded w-full" />
                        <input type="text" placeholder="ZIP Code" className="border p-2 rounded w-full" />
                    </div>
                </div>

                {/* Shipping Method */}
                <div className="p-6 border-t">
                    <h2 className="text-xl font-bold mb-4">3. Shipping Method</h2>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="shipping"
                                className="mr-2"
                                onChange={() => handleShippingChange(15)}
                                defaultChecked
                            />
                            Courier Delivery (1-3 days) - $15.00
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="shipping"
                                className="mr-2"
                                onChange={() => handleShippingChange(0)}
                            />
                            Pick-up - Free
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="shipping"
                                className="mr-2"
                                onChange={() => handleShippingChange(8)}
                            />
                            Postal Service (5-10 days) - $8.00
                        </label>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="p-6 border-t">
                    <h2 className="text-xl font-bold mb-4">4. Payment Method</h2>
                    <div className="space-y-4">
                        <label className="flex items-center">
                            <input type="radio" name="payment" className="mr-2" /> Credit Card
                        </label>
                        <div className="flex space-x-4">
                            <input type="text" placeholder="Card Number" className="border p-2 rounded w-full" />
                            <input type="text" placeholder="CVC" className="border p-2 rounded w-1/3" />
                        </div>
                        <label className="flex items-center">
                            <input type="radio" name="payment" className="mr-2" /> PayPal
                        </label>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="p-6 border-t">
                    <h2 className="text-xl font-bold mb-4">5. Additional Information (Optional)</h2>
                    <textarea
                        className="border p-2 rounded w-full"
                        placeholder="Any special instructions?"
                    ></textarea>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 border-t text-right">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <p>${subtotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping:</p>
                            <p>${shippingPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount:</p>
                            <p>$0.00</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p>Total:</p>
                            <p>${total}</p>
                        </div>
                    </div>
                    <button className="bg-green-500 text-white px-6 py-2 rounded">Complete Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
