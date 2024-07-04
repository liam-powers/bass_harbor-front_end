"use client";
import { UprightBassFilters } from "../components/FilterInterfaces";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UprightBassListing from "./UprightBassListing";

export interface UprightListingsProps {
    listings: UprightBassListing[];
}



const UprightListingsGrid: React.FC<UprightListingsProps> = ({ listings }) => {

    return (
        <div className="grid grid-cols-4 gap-10">
            {listings.map((listing, index) => (
                <div key={index}>
                    <Image src={listing.imgLink.toString()} width={500} height={500} alt={`Picture of listing ${listing.title}`} />
                    <div>
                        {listing.source === "talkbass" ? (
                            <span>
                                <span className="font-extrabold">Price:</span> ${listing.price}
                            </span>
                        ) : listing.source === "basschat" ? (
                            <span>
                                <span className="font-extrabold">Price:</span> £{listing.price}
                            </span>
                        ) : (
                            <span>
                                <span className="font-extrabold">Price:</span> {listing.price}
                            </span>
                        )}
                    </div>
                    {listing.location ? (<div><span className="font-extrabold">Location:</span> {listing.location}</div>) : null}
                    {listing.year ? <div><span className="font-extrabold">Year:</span> {listing.year}</div> : null}
                    < div > <span className="font-extrabold">{listing.saleStatus}</span></div>
                </div >
            ))}
        </div >
    )
};

export default UprightListingsGrid;