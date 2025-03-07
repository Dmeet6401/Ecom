"use client";
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Import the burger menu icon

const categoriesList = ['T-Shirts', 'Pants', 'Shoes'];
const personTypeList = ['Men', 'Women', 'Kids'];

interface SideFilterProps {
    setFilteredProducts: (products: any) => void;
}

const SideFilter: React.FC<SideFilterProps> = ({ setFilteredProducts }) => { // Accept setFilteredProducts as a prop
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for menu open/close

    const [lookingFor, setLookingFor] = useState(
        personTypeList.reduce((acc, personType) => {
            acc[personType] = false;
            return acc;
        }, {} as Record<string, boolean>),
    );

    const [categories, setCategories] = useState(
        categoriesList.reduce((acc, category) => {
            acc[category] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const [sliderValue, setSliderValue] = useState(2.5); // Add state for the slider value

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategories({
            ...categories,
            [event.target.name]: event.target.checked,
        });
    };

    const handleLookingForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLookingFor({
            ...lookingFor,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseFloat(event.target.value));
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = {
            priceFrom: priceFrom ? parseFloat(priceFrom) : undefined,
            priceTo: priceTo ? parseFloat(priceTo) : undefined,
            lookingFor: lookingFor,
            categories: categories,
        };
        // console.log("=================", payload);

        const response = await fetch('/api/product/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
  
        setFilteredProducts(data); // Pass filtered products to the parent component
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="side-filter max-w-xs mx-auto mt-4">
                <div className="md:hidden flex justify-end mb-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
                        <FaBars />
                    </button>
                </div>
                <div className={`filter-content ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="filter-section border p-4 mb-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                        <input
                            id="steps-range"
                            type="range"
                            min="0"
                            max="5"
                            value={sliderValue} // Set value to the state
                            step="0.5"
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            onChange={handleSliderChange} // Handle slider change
                        />
                        <div className="flex justify-between mt-2">
                            <input
                                type="number"
                                placeholder="From"
                                value={priceFrom}
                                onChange={(e) => setPriceFrom(e.target.value)}
                                className="border p-2 rounded w-24"
                            />
                            <input
                                type="number"
                                placeholder="To"
                                value={priceTo}
                                onChange={(e) => setPriceTo(e.target.value)}
                                className="border p-2 rounded w-24"
                            />
                        </div>
                    </div>
                    <div className="filter-section border p-4 mb-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Looking For</h3>
                        <div className="flex flex-col gap-2 ">
                            {personTypeList.map((lookingfortypes) => (
                                <label key={lookingfortypes} className="flex justify-between items-center">
                                    {lookingfortypes.charAt(0).toUpperCase() + lookingfortypes.slice(1)}
                                    <input
                                        type="checkbox"
                                        name={lookingfortypes}
                                        checked={lookingFor[lookingfortypes]}
                                        onChange={handleLookingForChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="filter-section border p-4 mb-4 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <div className="flex flex-col gap-2">
                            {categoriesList.map((category) => (
                                <label key={category} className="flex justify-between items-center">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                    <input
                                        type="checkbox"
                                        name={category}
                                        checked={categories[category]}
                                        onChange={handleCategoryChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Apply Filters</button>
                </div>
            </div>
        </form>
    );
};

export default SideFilter;
