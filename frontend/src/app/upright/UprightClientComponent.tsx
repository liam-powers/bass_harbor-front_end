"use client";
import { useState, useEffect } from 'react';
import { UprightBassFilters } from '../components/FilterInterfaces';
import UprightFilterButton from './UprightFilterButton';
import { Input } from '@nextui-org/react';
import PriceRangeComponent from './PriceRangeComponent';
import 'rc-slider/assets/index.css';
import UprightListingsGrid from './UprightListingsGrid';
import axios from 'axios';

const fetchListings = async (filters: UprightBassFilters) => {
    const functionUrl = 'http://127.0.0.1:5001/bass-harbor-free/us-central1/fetchListings';
  
    try {
      const response = await axios({
        method: 'post', // or 'get' if you prefer
        url: functionUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
            priceRange: filters.priceRange,
            keywords: filters.keywords,
            carved: filters.carved,
            hybrid: filters.hybrid,
            plywood: filters.plywood
        },
      });

      console.log("Fetch listings completed. ");
      console.log("Response.data: ", response.data);

      return response.data;
    } catch (error) {
      console.error('Error triggering scrape and add:', error);
      throw error;
    }
}

interface UprightBassListing {
    title?: string;
    imgLink: string;
    listingLink?: string;
    location?: string;
    saleStatus?: string;
    price?: string;
    year?: number;
    maker?: string;
    source: string;
}

const renderKeywords = (keywords: String[], removeKeyword: (keyword: String) => void) => {
    return (
        <div className="flex gap-2 pt-4 flex-wrap" style={{ maxWidth: '300px' }}>
            {keywords.map((keyword) => (
                <button className="hover:line-through bg-pastel-red outline-black text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => removeKeyword(keyword)}>{keyword}</button>
            ))}
        </div>
    );
};

const UprightClientComponent = () => {
    const [filters, setFilters] = useState<UprightBassFilters>({
        keywords: [],
        carved: false,
        hybrid: false,
        plywood: false,
    });

    const [listings, setListings] = useState<UprightBassListing[]>([]);

    useEffect(() => {
        const tryFetchListings = async () => {
            try {
                const fetchedListings = await fetchListings(filters);;// as UprightBassListing[];
                console.log("Listings fetched: ", fetchedListings);
                setListings(fetchedListings);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        }

        tryFetchListings();
    }, [filters]);

    const toggleFilter = (filterToToggle: keyof UprightBassFilters) => {
        const updatedFilters = {
            ...filters,
            [filterToToggle]: !filters[filterToToggle]
        };
        setFilters(updatedFilters);
        console.log("Successfully updated filters to: ", updatedFilters);
    };

    const removeKeyword = (keyword: String) => {
        const updatedFilters = {
            ...filters,
            keywords: filters.keywords?.filter((kw) => kw !== keyword)
        };
        setFilters(updatedFilters);
        console.log("Successfully updated filters to: ", updatedFilters);
    }

    const [keyword, setKeyword] = useState("");

    const handleKeywordAdd = (keyword: String) => {
        if (keyword.trim() !== "") { // Check if the keyword is not empty
            const updatedFilters = {
                ...filters,
                keywords: filters.keywords ? [...filters.keywords, keyword.trim()] : [keyword.trim()]
            };
            setFilters(updatedFilters);
            setKeyword(""); // Clear keyword input after adding
            console.log("Successfully updated filters to: ", updatedFilters);
        }
    };

    if (!filters) {
        return <div>Loading...</div>;
    }

    return (
       <div className="pt-20">
            <div className="flex flex-row w-full pl-20 pr-40 gap-40 justify-between">
                <div className="sticky top-0 h-full flex flex-row pt-">
                    <div className="min-w-[20rem]">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold pb-6">filters</div> 
                            <div className="flex flex-col gap-8">
                                <div>
                                    <div className="text-2xl font-bold pb-2">wood type:</div>
                                    <div className="flex flex-row flex-wrap gap-2">
                                        <UprightFilterButton filterToToggle="carved" filters={filters} toggleFilter={toggleFilter}>
                                            carved
                                        </UprightFilterButton>
                                        <UprightFilterButton filterToToggle="hybrid" filters={filters} toggleFilter={toggleFilter}>
                                            hybrid
                                        </UprightFilterButton>
                                        <UprightFilterButton filterToToggle="plywood" filters={filters} toggleFilter={toggleFilter}>
                                            plywood
                                        </UprightFilterButton>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold pb-2">keywords:</div>
                                        <div className="flex flex-row items-center gap-6 text-2xl font-bold">
                                            <Input className="" placeholder="enter keyword here" label="keyword" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                                            <button onClick={() => handleKeywordAdd(keyword)}>+</button>
                                        </div>
                                        {renderKeywords(filters.keywords ?? [], removeKeyword)}
        
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold pb-2">price range:</div>
                                    <PriceRangeComponent filters={filters} setFilters={setFilters} />
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
    
                <div className="">
                    <div className="text-3xl font-bold pb-6">your matches ({listings.length}):</div>
                    <UprightListingsGrid listings={listings} />
                </div>
            </div>
       </div>
    );
};

export default UprightClientComponent;
