"use client";
import axios from 'axios';
import React , { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItemProps {
    id: string;
    imageSrc: string;
    name: string;
    quantity: number;
    price: number;
}

const CartCard: React.FC<CartItemProps> = ({ id, imageSrc, name, quantity, price }) => {
    const router = useRouter();
    const handleRemove = async () => {
        try {
            // console.log(id);
            console.log("Item removed from cart");
            const del = await axios.delete(`/api/cart`, { data: { productId: id } });
            console.log("🚀 ~ handleRemove ~ del:", del);
        } catch (error: any) {
            console.log("Item not found in cart");
            console.log(error.message);
        }
    };

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        setTotal(price * quantity);   
    }, [price, quantity]);
    

    return (
        <div className="rounded-lg border border-black p-4 shadow-sm md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <a href={`/product-overview/${id}`} className="shrink-0 md:order-1">
                <img className="h-20 w-20" src={imageSrc} alt={name} />
            </a>
            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href={`/product-overview/${id}`} className="text-base font-medium text-gray-900 hover:underline">{name}</a>
                <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">Qty: {quantity}</span>
                <span className="text-sm font-medium text-gray-900">Price: ₹{price * quantity}</span>
                </div>
            </div>
            <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center gap-4">
                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline">
                    <svg className="me-1.5 h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                </button>
                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline" onClick={handleRemove}>
                    <svg className="me-1.5 h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>
                <button
                onClick={() => router.push(`/checkout?${total}`)} 
                type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black">
                    Buy Now
                </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CartCard;
