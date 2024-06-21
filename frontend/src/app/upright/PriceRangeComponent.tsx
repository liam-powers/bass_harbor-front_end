"use client";
import React from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { UprightBassFilters } from '../components/FilterInterfaces';
import mongoose from 'mongoose';

interface PriceRangeComponentProps {
    filters: UprightBassFilters;
    setFilters: React.Dispatch<React.SetStateAction<UprightBassFilters>>;
};

const PriceRangeComponent: React.FC<PriceRangeComponentProps> = ({ filters, setFilters }) => {
    const [priceRange, setPriceRange] = React.useState([0, 100000]);

    const handleChange = (newPriceRange: number[]) => {
        setPriceRange(newPriceRange);
        const updatedFilters = { ...filters, priceRange: newPriceRange };
        setFilters(updatedFilters);
        console.log(updatedFilters);
    };

    /*
    mongoose.connect("mongodb+srv://liampowers2026:6Ff7ExPhGgfH9KRsysXNd4GU4pHoPQPS@music-sales-webscraper.dbvrd1i.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    */

    return (
        <div>
            <div className="pb-10">
                <Slider range
                    min={0}
                    max={100000}
                    marks={{ 0: "$0", 100000: "$100,000+" }}
                    value={priceRange}
                    onChange={(newPriceRange: number | number[]) => handleChange(newPriceRange as number[])}
                    onChangeComplete={(newPriceRange: number | number[]) => setTimeout(handleChange, 1500, (newPriceRange as number[]))}
                    allowCross={false}
                    step={50} />
            </div>
            <div className="">
                price range: ${priceRange[0]} - ${priceRange[1]}
            </div>

        </div>
    );
};

export default PriceRangeComponent;