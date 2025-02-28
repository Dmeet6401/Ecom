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
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: '1', imageSrc: '/path/to/image1.jpg', name: 'Produ    ct 1', quantity: 2, price: 100 },
        { id: '2', imageSrc: '/path/to/image2.jpg', name: 'Product 2', quantity: 1, price: 200 },
    ]);

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
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default CartList;
