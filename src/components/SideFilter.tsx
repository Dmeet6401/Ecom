"use client";
import React, { useState } from 'react';

const categoriesList = ['tShirt', 'Jeans', 'Shirt'];
const personTypeList = ['Men', 'Women', 'Kids'];

const SideFilter = () => {
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    
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

    return (
        <div className="side-filter max-w-xs mx-auto mt-4">
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
                                checked={categories[lookingfortypes]}
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
        </div>
    );
};

export default SideFilter;
