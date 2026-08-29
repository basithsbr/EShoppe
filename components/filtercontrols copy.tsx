
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
    IndianRupee
} from "lucide-react";

// Shadcn UI + Base UI Component Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PriceFilter } from "@/components/pricefilter";


interface FilterControlsProps {
    CATEGORIES: string[];
    selectedCategory: string;
    setSelectedCategory: (category1: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    
}

export function FilterController ({
    selectedCategory,
    setSelectedCategory,
    CATEGORIES,
    priceRange,
    setPriceRange,
    setOpen
  }: {
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
    CATEGORIES: string[];
    priceRange: [number, number];
    setPriceRange: (val: [number, number]) => void;
    setOpen: (val: boolean) => void;
  }) {
    // Your local state here will now persist properly across clicks!
    const [localCategory, setLocalCategory] = React.useState(selectedCategory);
    const [localPriceFilter, setLocalPriceFilter] = React.useState(priceRange);
    const handleApplyFilters = () => {
      setSelectedCategory(localCategory);
      setPriceRange(localPriceFilter);

      setOpen(false);
    };
    return (
      <div className="w-full flex flex-col gap-5">
        <ProductFilter
          selectedCategory={localCategory}
          setSelectedCategory={setLocalCategory}
          CATEGORIES={CATEGORIES}
          priceRange={localPriceFilter}
          setPriceRange={setLocalPriceFilter}
        />

        <div className="text-right p-3 ">
          <Button onClick={handleApplyFilters} className="w-[150px] font-redfamily-def blue-def">
            Apply Filters
          </Button>
        </div>
      </div>
    );
}
export function ProductFilter({ CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
}: FilterControlsProps) {

    return <><div>
                <h3 className="text-sm tracking-tight text-[#e91e63] font-[Arial,sans-serif] mb-3 ml-2">Categories</h3>
                <div className="space-y-2 space-x-2 flex flex-col">
                    {CATEGORIES.map((category) => (
                        <button
                            type="button"
                            key={category}
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

            <div className="px-2.5">
                <div className="flex justify-between items-center ">
                    <h3 className="text-sm font-semibold font-bluefamily-def text-[12px]">Price Range</h3>
                    <span className="text-xs text-muted-foreground mt-7">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <PriceFilter
                    priceRange={priceRange}
                    // onPriceChangeCommit={(val) => setPriceRange(val)}
                    onPriceChangeCommit={(val) => setPriceRange(val)}
                />
            </div>
            </>
}