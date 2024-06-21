"use client";
import { useState, useEffect } from 'react';
import { UprightBassFilters } from '../components/FilterInterfaces';
import UprightFilterButton from './UprightFilterButton';
import { Input } from '@nextui-org/react';
import PriceRangeComponent from './PriceRangeComponent';
import 'rc-slider/assets/index.css';
import PlacesAutocomplete from '../components/GoogleMapsSearch';
import UprightListingsGrid from './UprightListingsGrid';
// import axios from 'axios';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig.json";

const myApp = initializeApp(firebaseConfig);
const functions = getFunctions(myApp);
connectFunctionsEmulator(functions, "127.0.0.1", 5001); // TODO: remove this line for production
const fetchListings = httpsCallable(functions, 'fetchListings');

interface UprightBassListing {
    title?: string;
    imgLink: string;
    listingLink?: string;
    location?: string;
    saleStatus?: string;
    price?: string;
    year?: number;
    maker?: string;
}

const renderKeywords = (keywords: String[], removeKeyword: (keyword: String) => void) => {
    return (
        <div className="flex gap-2 pt-4 flex-wrap" style={{ maxWidth: '300px' }}>
            {keywords.map((keyword) => (
                <button className="hover:line-through bg-blue-500 outline-black text-white font-bold py-2 px-4 rounded-lg"
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
                const result = await fetchListings();
                const fetchedListings: UprightBassListing[] = result.data as UprightBassListing[];
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
        <div className="flex flex-row align-top gap-40">
            <div className="w-full h-40 sticky top-40">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-3xl font-bold pb-6">filters:</div>
                    <div className="flex flex-col gap-10">
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
                        <div>
                            {/* <PlacesAutocomplete /> */}
                        </div>
                    </div>  
                </div>
            </div>

            <div className="min-w-[60rem] max-w-[60rem] pb-20">
                <div className="text-3xl font-bold pb-6">your matches:</div>
                <UprightListingsGrid listings={listings} />
            </div>
        </div>
    );
};

export default UprightClientComponent;
