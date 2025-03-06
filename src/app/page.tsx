"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SideFilter from "../components/SideFilter";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Add state for filtered products

  useEffect(() => {
    // Simulate fetching data from a database
    async function fetchProducts() {
      const response = await fetch("/api/product"); // Replace with actual API endpoint
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white flex">
        <SideFilter setFilteredProducts={setFilteredProducts} /> {/* Pass setFilteredProducts to SideFilter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
