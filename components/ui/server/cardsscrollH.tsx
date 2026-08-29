'use client'

import ServerCard from "./productscards";
import { Badge } from "lucide-react";
import { Card, CardContent, CardFooter } from "../card";
import { Button } from "@base-ui/react";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    type: string,
    children: React.ReactNode; 
}

export function ShowCardsScrollH({ searchParams, type, children}: props) {
    const currentParams = useSearchParams();
    const router = useRouter();
    // const [cardType, setCardType] = React.useState<string>(type);
    // React.useEffect(() => {
    //     console.log("cardType - ",type);
    //     // if (cardType == 'Cosmetics') {
    //     //     const params = new URLSearchParams(searchParams.toString());
    //     //     params.set('category', type);
    //     //     router.push(`?${params.toString()}`, { scroll: false });
    //     // }
    // }, [cardType]); // Only runs when searchParams change


    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    return (
        <>
            {/* Parent wrapper with px-6 to offset absolute buttons */}
            <div className="relative w-full px-2 py-10">
                {/* Left Arrow Button (Outside flex) */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute md:hidden hidden lg:block left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-gray-800 transition-all flex items-center justify-center border w-10 h-10"
                    aria-label="Scroll left"
                >
                    <span className="text-xl flex items-center justify-center font-bold font-mono">‹</span>
                </button>

                {/* Scrollable Container (Only contains cards now) */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-3 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
                    >
                    {children}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute md:hidden hidden lg:block right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-gray-800 transition-all flex items-center justify-center border w-10 h-10"
                        aria-label="Scroll right"
                    >
                        <span className="text-xl font-bold font-mono">›</span>
                    </button>
                </div>
            </div>
        </>
    )
}