"use client";
import { UprightBassFilters } from "../components/FilterInterfaces";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface UprightListingsProps {
    listings: UprightBassListing[];
}



const UprightListingsGrid: React.FC<UprightListingsProps> = ({ listings }) => {

    return (
        <div className="grid grid-cols-4 gap-10">
            {listings.map((listing, index) => (
                <div key={index}>
                    <Image src={listing.imgLink.toString()} width={500} height={500} alt={`Picture of listing ${listing.title}`} />
                    <div> <Link href={listing.listingLink!}>{listing.title}</Link></div>
                    <div>price: {listing.price} </div>
                    <div>{listing.saleStatus}</div>
                    {listing.year && (listing.year != 0) && <div>year: {listing.year}</div>}
                </div>
            ))}
        </div>
    )
};

export default UprightListingsGrid;