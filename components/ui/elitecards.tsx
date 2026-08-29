"use client"; // Required for useState, useEffect, and onClick events


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EliteCardsServer from "@/components/ui/elitecardsserver";
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
  Loader2 
} from "lucide-react";


interface Product {
  id: number, name: string, category: string, price: number, rating: any, image: string
}

interface FilterProps {
  selectedCategory: string;  
  setSelectedCategory: (category: string) => void
  priceRange: [number, number];  
  setPriceRange: (range: [number, number]) => void
  // cardsContent: React.ReactNode;
}

export default function EliteCards({selectedCategory,
  setSelectedCategory,priceRange,setPriceRange }:FilterProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Triggered on user click
  // const handleFetchPosts = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     // Fetching happens client-side when this function runs
  //     const res = await fetch("https://typicode.com");

  //     if (!res.ok) {
  //       // throw new Error("Failed to load cards.");
  //     }

  //     const data: Product[] = await res.json();
  //     setProducts(data);
  //   } catch (err: any) {
  //     setError(err.message || "Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // This hook runs immediately on mount, and re-triggers whenever "category" changes
  React.useEffect(() => {
    async function fetchFilteredCards() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Appending the filter state dynamically to your API request URL
        const url = `https://typicode.com{category}`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error("Could not retrieve card data.");
        
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchFilteredCards();
  }, [priceRange,selectedCategory]); 

  return (
    <main className="max-w-6xl mx-auto">
      
    <React.Suspense 
        key={`${selectedCategory}-${priceRange[0]}-${priceRange[1]}`}
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin mb-2 text-[#071b4b]" />
            <p className="text-sm">Fetching fresh items from server...</p>
          </div>
        }
      >
        {/* Render your server component here exactly as you designed */}
        { <EliteCardsServer
          selectedCategory={selectedCategory}
          minPrice={priceRange[0]}
          maxPrice={priceRange[1]}
        /> }
         {/* {cardsContent} */}
      </React.Suspense>
      {/* Empty State */}
      {!isLoading && products.length === 0 && !error && (
        <p className="text-gray-500">No cards loaded yet. Click the button above.</p>
      )}
    </main>
  );
}
