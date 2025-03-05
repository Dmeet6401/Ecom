"use client";
import React, { useState } from 'react';
import CartCard from './CartCard';

interface CartItem {
    id: string;
    imageSrc: string;
    name: string;
    quantity: number;
    price: number;
}

const CartList: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleRemove = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div>
            {cartItems.map(item => (
                <CartCard
                    key={item.id}
                    id={item.id}
                    imageSrc={item.imageSrc}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    // onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default CartList;
