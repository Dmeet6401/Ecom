"use client";
import axios from "axios";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  _id: any;
  id: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  color: string;
  price: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // State to track whether the heart button is clicked
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Toggle function for heart button click
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const [prod, setProd] = useState({
    productId: product._id,
    quantity: 0,
  });

  useEffect(() => {
    setProd({ ...prod, quantity: quantity });
  }, [quantity]);

  // console.log("🚀 ~ prod:", prod)

  const handleAddClick = async () => {
    setIsAdded(!isAdded);
    try {
      await axios.post("/api/cart", prod);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleViewProduct = async () => {
    try {
      router.push(`/product-overview/${product._id}`);
    } catch (error:any) {
      console.log(error.message);
    }
    // Router.push(`/product-overview/${product._id}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
        <div className="group relative">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={`/product-overview/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {product.price} ₹
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-4 justify-between">
          {/* <button onClick={handleLikeClick} className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? "red" : "none"}
              xmlns="http://www.w3.org/2000/svg"
              stroke={isLiked ? "red" : "currentColor"}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
          {/* <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-gray-200 rounded-md"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-gray-200 rounded-md"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddClick}
            className={`flex items-center px-4 py-2 text-white text-sm font-medium rounded-md ${
              isAdded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-black"
            }`}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button> */}
          <button
            onClick={handleViewProduct}
            className="w-full py-2 text-white text-sm font-medium rounded-md bg-gray-600 hover:bg-black"
          >
            View Product
          </button>
          
          {/* Heart Like Button */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
