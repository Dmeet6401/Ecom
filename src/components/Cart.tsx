"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
    import { removeFromCart, addToCart, deleteFromCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-summary">
        <p>Total Items: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => dispatch(removeFromCart(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => dispatch(deleteFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
