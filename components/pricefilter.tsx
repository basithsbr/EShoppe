import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
    priceRange: [number, number];
    onPriceChangeCommit: (val: [number, number]) => void;
}

export function PriceFilter({ priceRange, onPriceChangeCommit }: PriceFilterProps) {


    const [localMin, setLocalMin] = useState<string>(priceRange[0].toString());
    const [localMax, setLocalMax] = useState<string>(priceRange[1].toString());

    // 2. Keep state in sync if parent resets filters externally
    // useEffect(() => {
    //     setLocalMin(priceRange[0].toString());
    //     setLocalMax(priceRange[1].toString());
    // }, [priceRange]);

    // 3. Typings update instantly local text values with ZERO lag or focus loss
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setLocalMin(rawValue);
        const numericalVal = rawValue === '' ? 0 : Number(rawValue);
        onPriceChangeCommit([numericalVal, Number(localMax) || 350]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setLocalMax(rawValue);
        const numericalVal = rawValue === '' ? 350 : Number(rawValue);
        onPriceChangeCommit([Number(localMin) || 0, numericalVal]);
    };


    return (
        <div className="space-y-5 w-full">
            <div className="flex gap-3 items-center">
                {/* Minimum Input Box */}
                <div className="flex flex-1 items-center border rounded-md px-2 py-1.5 bg-muted/40 focus-within:ring-1 focus-within:ring-ring">
                    <span className="text-xs text-muted-foreground mr-1 select-none">$</span>
                    <input
                        type="number"
                        min={0}
                        max={350}
                        value={localMin}
                        className="w-full bg-transparent text-[13px] outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={handleMinChange}
                    />
                </div>

                <span className="text-muted-foreground text-xs font-bold select-none">to</span>

                {/* Maximum Input Box */}
                <div className="flex flex-1 items-center border rounded-md px-2 py-1.5 bg-muted/40 focus-within:ring-1 focus-within:ring-ring">
                    <span className="text-xs text-muted-foreground mr-1 select-none">$</span>
                    <input
                        type="number"
                        min={0}
                        max={350}
                        value={localMax}
                        className="w-full bg-transparent text-[13px] outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
        </div>
    );
}
