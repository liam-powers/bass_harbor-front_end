"use client";
import React, { useState, useEffect } from 'react';

interface PipelineButtonProps {
    link: string;
    children: React.ReactNode;
}

const PipelineButton: React.FC<PipelineButtonProps> = ({ link, children }) => {
    const [buttonBgColor, setButtonBgColor] = useState("bg-blue-300");
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isClicked) {
            setButtonBgColor("bg-blue-500");
        } else {
            setButtonBgColor("bg-blue-300");
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