// src/app/page.tsx
import { Suspense } from 'react';

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
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PriceFilter } from "@/components/pricefilter";
import { FilterController } from "@/components/ui/client/filtercontrols";
import { getProducst } from "@/app/api/producs/clientservice";
import EliteCards from "@/components/ui/elitecards";
import ServerCard from '@/components/ui/server/productscards';




interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShoppePage({ searchParams }: PageProps) {
  
  // const router = useRouter();
  
  // const isOpen = typeof resolvedParams.showFilters === 'boolean' 
  //   ? false : 'true';
    async function handleFilterSubmit(formData: FormData) {
        'use server';
        console.log("handle Submit...");
        const params = new URLSearchParams(searchParams.toString());
        const selectedCategory = formData.get('category');
        console.log("selectedCategory :: "+selectedCategory)
        // params.set('category', localCategory);
        // router.push(`${pathname}?${params.toString()}`);
        // router.push(`${pathname}?showFilters=false`);
    }
  return (

    <><div className="px-4 md:px-6 lg:px-8 py-8">

      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b">
        <div>
          <h1 className="font-bold tracking-tight text-[#071b4b] font-[Arial,sans-serif] text-[30px]">Products</h1>
          <p className=" text-[#e91e63] font-black text-[12px] font-[Arial,sans-serif] tracking-[1px] mt-1">Discover premium modern goods curated just for you.</p>
        </div>

        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}

          <Select  >
            <SelectTrigger className="w-[160px] bg-[#071b4b] text-white font-[Arial,sans-serif] text-[13px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="featured" className="font-[Arial,sans-serif] text-[11px]">Featured</SelectItem>
              <SelectItem value="price-low" className="font-[Arial,sans-serif] text-[11px]">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="font-[Arial,sans-serif] text-[11px]">Price: High to Low</SelectItem>
              <SelectItem value="rating" className="font-[Arial,sans-serif] text-[11px]">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          {/* Base UI Sheet for Mobile viewports */}          
            <div className="md:hidden lg:hidden " >
              <Suspense fallback={null}>
                <FilterController searchParams={searchParams} />                                                    
              </Suspense>
              </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 tems-start ">
        {/* Desktop Sidebar Layout */}
          <div className="hidden md:block sticky top-16 lg:block items-start " >
            <Suspense fallback={null}>
              <FilterController searchParams={searchParams} />
            </Suspense>
          </div>

        {/* Product Cards Container */}
        <main className="md:col-span-3">
          {/* 
            <EliteCards selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} priceRange={priceRange}
              setPriceRange={setPriceRange}></EliteCards> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          <Suspense fallback={<p className="text-sm text-gray-500">Streaming from server...</p>}>
            {/* <RightSheetController searchParams={searchParams} /> */}
            <ServerCard searchParams={searchParams} />
          </Suspense>
          </div>
        </main>
      </div>
    </div>

      <br />
      <br />
      <br />
    </>


  );
}
