"use client";
import React, { useState, useEffect, useRef } from 'react';
import { UprightBassFilters } from '../components/FilterInterfaces';

interface FilterButtonProps {
    filterToToggle: keyof UprightBassFilters;
    filters: UprightBassFilters;
    toggleFilter: (filterToToggle: keyof UprightBassFilters) => void;
    children: React.ReactNode;
}

const UprightFilterButton: React.FC<FilterButtonProps> = ({ filterToToggle, filters, toggleFilter, children }) => {
    const [buttonBgColor, setButtonBgColor] = useState("bg-blue-300");
    
    const clickHandle = () => {
        toggleFilter(filterToToggle);
    };

    useEffect(() => {
        // Update button background color based on filter state
        if (filters[filterToToggle]) {
            setButtonBgColor("bg-blue-500");
        } else {
            setButtonBgColor("bg-blue-300");
        }
    }, [filters, filterToToggle]);

    return (
        <div>
            <button
                onClick={clickHandle}
                className={`hover:underline ${buttonBgColor} outline-black text-white font-bold py-2 px-4 rounded-lg`}
            >
                {children}
            </button>
        </div>
    );
};

export default UprightFilterButton;