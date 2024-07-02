"use client";
import React, { useState, useEffect } from 'react';

interface PipelineButtonProps {
    link: string;
    children: React.ReactNode;
}

const PipelineButton: React.FC<PipelineButtonProps> = ({ link, children }) => {
    const [buttonBgColor, setButtonBgColor] = useState("bg-pastel-red");
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isClicked) {
            setButtonBgColor("bg-pastel-red-dark");
        } else {
            setButtonBgColor("bg-pastel-red");
        }
    }, [isClicked]);

    const handleClick = () => {
        setIsClicked(!isClicked);
        window.location.href = link;
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className={`hover:underline ${buttonBgColor} outline-black text-white font-bold p-4 rounded-lg`}>
                {children}
            </button>
        </div>
    );
};

export default PipelineButton;