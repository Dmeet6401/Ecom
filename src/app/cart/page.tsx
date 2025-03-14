"use client";
import React, { useEffect, useState } from 'react';
import CartCard from '../../components/CartCard';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CartItem {
    productId: string;
    quantity: number;
    product: {
        _id: string;
        name: string;
        imageSrc: string;
        price: number;
    };
}
const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const totalAmount = cartItems.reduce((acc, item) => {
            if (item.product) {
                return acc + (item.quantity * item.product.price);
            }
            return acc;
        }, 0);
        setTotal(totalAmount);
    }, [cartItems]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                const data = response.data || [];
                
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const router = useRouter();

    return (
        <>
            <Navbar />
            <section className="bg-white py-8 antialiased dark:bg-white md:py-15">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h2 className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-900 sm:text-2xl">Shopping Cart</h2>
                    </div>
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    item.product && (
                                        <CartCard
                                            id={item.product._id}
                                            key={item.product._id}
                                            imageSrc={item.product.imageSrc}
                                            name={item.product.name}
                                            quantity={item.quantity}
                                            price={item.product.price}
                                        />

                                    )
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 xl:w-1/4">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                {cartItems.map((item) => (
                                    item.product && (
                                        <div key={item.product._id} className="flex justify-between mb-2">
                                            <span>{item.product.name} x {item.quantity}</span>
                                            <span>₹{item.quantity * item.product.price}</span>
                                        </div>
                                    )
                                ))}
                                <div className="flex justify-between mb-2 font-bold">
                                    <span>Total Amount:</span>
                                    <span>₹{total}</span>
                                </div>
                                <button 
                                    onClick={() => router.push(`/checkout?${total}`)} 
                                    type="button" className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
