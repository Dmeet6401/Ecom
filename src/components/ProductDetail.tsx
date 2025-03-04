"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';


interface Product {
  imageSrc: string;
  name: string;
  price: number;
  describe: string;
}

const ProductDetail = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    const [prod, setProd] = useState({
        productId: id,
        quantity: 0,
      });
    
      useEffect(() => {
        setProd({ ...prod, quantity: quantity });
      }, [quantity]);

    
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/product?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

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

    return (
        <section className="py-8 bg-white md:py-16">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <img className="w-full" src={product.imageSrc} alt={product.name} />
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            {product.name}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                ₹{product.price}
                            </p>
                            {/* <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm font-medium leading-none text-gray-500">(5.0)</p>
                                <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">345 Reviews</a>
                            </div> */}
                        </div>

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <button onClick={handleLikeClick} className="flex items-center border border-gray-300 p-2 rounded-lg">
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
                                <span className="ml-2">{isLiked ? "Remove from Favourite" : "Add to Favourite"}</span>
                            </button>

                            {/* <a href="#" title="" className="text-white mt-4 sm:mt-0 bg-gray-600 hover:bg-black focus:ring-4 focus:ring-offset-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center" role="button">
                                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                </svg>
                                Add to cart
                            </a> */}
                            <div className="flex items-center space-x-2">
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
                            </button>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200" />

                        <p className="mb-6 text-gray-500">{product.describe}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
