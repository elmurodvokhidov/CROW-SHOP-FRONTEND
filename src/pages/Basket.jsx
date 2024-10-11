import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);

// Card Payment Modal
const PaymentModal = ({ isOpen, onClose, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Create a payment method using Stripe
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            // Send the payment method to your server for processing
            const response = await axios.post('/api/orders', {
                paymentMethodId: paymentMethod.id,
                total,
            });

            if (response.data.success) {
                alert('Payment Successful!');
                onClose();
            } else {
                setError('Payment failed');
            }
        } catch (err) {
            setError('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Enter Payment Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardElement
                        className="p-3 bg-gray-100 rounded-lg border"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white font-bold rounded-lg transition duration-300 
                            ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}
                        `}
                    >
                        {loading ? 'Processing...' : 'Pay $' + total}
                    </button>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Cancel</button>
            </div>
        </div>
    );
};

const CheckoutPage = () => {
    const [promoCode, setPromoCode] = useState('');
    const [quantities, setQuantities] = useState([1, 1, 1]); // For storing quantities of each item
    const [shippingPrice, setShippingPrice] = useState(15.00); // Default shipping price
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Function to open payment modal
    const handleCompleteOrder = () => {
        setIsModalOpen(true);
    };

    return (
        <Elements stripe={stripePromise}>
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
                        {/* Add Address Fields */}
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
                        <button onClick={handleCompleteOrder} className="bg-green-500 text-white px-6 py-2 rounded">
                            Complete Order
                        </button>
                    </div>
                </div>

                {/* Payment Modal */}
                <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} total={total} />
            </div>
        </Elements>
    );
};

export default CheckoutPage;
