"use client";

import * as React from "react";
import {
    Heart,
    Layers,
    LayoutGrid,
    SlidersHorizontal,
    Search,
    ShoppingBag,
    Star,
    IndianRupee,
    Icon,
    AdIcon,
    ListIcon,
    Menu
} from "lucide-react";

// Shadcn UI + Base UI Component Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PriceFilter } from "@/components/pricefilter";
import FilterWrapper from "../../filterWrapper";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


interface FilterControllerProps {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    child?: React.ReactNode;
    // CloseWrapper: React.ComponentType<{ asChild?: boolean; children: React.ReactNode }>;
    // CloseWrapper: React.ComponentType<any>; 
    // searchParams: {
    //     category?: string;
    //     // priceRange: [number, number];
    // };
}



export function FilterController({ searchParams, child }: FilterControllerProps) {

    // const resolvedParams = use(searchParams);
    const router = useRouter();
    const pathname = usePathname();
    const currentParams = useSearchParams();

    const category = currentParams.get('category') || '';

    const [localCategory, setLocalCategory] = React.useState(category);
    const [localPriceFilter, setLocalPriceFilter] = React.useState<[number, number]>([0, 350]);
    const categories = ['Gadgets', 'Clothing', 'Accessories', 'Cosmetics', 'Jerseys', 'Abaya & Hijab', 'Household', 'Toys', 'Games', 'Women\'s Wear', 'Footwear', 'Hampers', 'Magazines', 'Frames']

    const handleSubmit = () => {
        console.log("handle Submit...");
        const params = new URLSearchParams(currentParams.toString());
        params.set('category', localCategory);
        params.set('showFilter', 'false');
        router.push(`${pathname}?${params.toString()}`);

    }

    return (

        <>
            <Sheet>
                <SheetTrigger>
                    {/* <Menu className="w-18 h-8" /> */}
                    <SlidersHorizontal className="p-0! h-4 w-4 bg-white border-0" />
                    <span className="text-[10px] absolute right-3">Filter</span>
                    {/* <Bars3Icon className="w-8 h-8" /> */}
                </SheetTrigger>

                <SheetContent side="right" className="w-2/3! !max-w-none sm:!max-w-sm h-full overflow-y-auto">
                    <SheetHeader className="px-2 font-bluefamily-def">
                        <SheetTitle className="flex flex-row gap-2">
                            {/* <Layers className="h-4 w-5" />                        */}
                            Filter Products</SheetTitle>
                        <div>
                            
                        </div>
                    </SheetHeader>
                    <div className="w-full flex flex-col gap-5">
                        <ProductFilter
                            selectedCategory={localCategory}
                            setSelectedCategory={setLocalCategory}
                            CATEGORIES={categories}
                            priceRange={localPriceFilter}
                            setPriceRange={setLocalPriceFilter}
                        />

                        <div className="text-right p-3 ">
                            <SheetClose onClick={handleSubmit} className="font-redfamily-def blue-def rounded-[5px] p-3 text-white">
                                Apply Filters
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <aside className="w-full hidden md:block md:col-span-1 sticky">
                <div className="sticky top-6 border p-5 rounded-lg bg-card text-card-foreground shadow-sm">
                    <div className="flex items-center gap-2 mb-4 font-semibold text-sm uppercase tracking-wider tracking-tight text-[#071b4b] font-[Arial,sans-serif]">
                        <Layers className="h-4 w-4" />
                        Filters
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <ProductFilter
                            selectedCategory={localCategory}
                            setSelectedCategory={setLocalCategory}
                            CATEGORIES={categories}
                            priceRange={localPriceFilter}
                            setPriceRange={setLocalPriceFilter}
                        />
                        <div className="text-right p-3 ">
                            <Button onClick={handleSubmit} className=" font-redfamily-def blue-def">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>
        </>

    );
}


interface FilterControlsProps {
    CATEGORIES: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;

}

function ProductFilter({ CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
}: FilterControlsProps) {

    return <><div>
        <h3 className="text-sm tracking-tight text-[#e91e63] font-[Arial,sans-serif] mb-3 ml-2">Categories</h3>
        <div className="space-y-2 space-x-2 flex flex-col overflow-y-auto">
            {CATEGORIES.map((category, i) => (
                <button
                    type="button"
                    key={`${category}_${i}`}
                    onClick={(e) => {
                        setSelectedCategory(category)
                    }
                    }
                    className={`text-left text-[12px] px-2 py-1.5 rounded-md transition-colors ml-2 ${selectedCategory === category
                        ? "bg-[#e91e63] text-[#071b4b] font-family-def font-bold"
                        : "text-muted-foreground hover:bg-muted font-family-def"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    </div>

        <div className="px-2">
            <Separator className="bg-border" />
        </div>

        {/* <div className="px-2.5">
            <div className="flex justify-between items-center ">
                <h3 className="text-sm font-semibold font-bluefamily-def text-[12px]">Price Range</h3>
                <span className="text-xs text-muted-foreground mt-7">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <PriceFilter
                priceRange={priceRange}
                // onPriceChangeCommit={(val) => setPriceRange(val)}
                onPriceChangeCommit={(val) => setPriceRange(val)}
            />
        </div> */}
    </>
}