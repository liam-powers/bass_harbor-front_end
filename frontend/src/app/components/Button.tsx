"use client";
import React from 'react';

interface ButtonProps {
    link: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ link, children }) => {
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <button
            onClick={handleClick}
            className={`hover:underline bg-[#FD5353] text-easy-black font-bold py-4 px-8 rounded-[40px]`}
            children={children}
        >
        </button>
    );
}

export default Button;