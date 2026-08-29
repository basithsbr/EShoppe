"use client"; // Required for useState, useEffect, and onClick events


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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


interface Product {
  id: number, name: string, category: string, price: number, rating: any, image: string
}

interface FilterProps {
  selectedCategory: string;  
  setSelectedCategory: (category: string) => void
  priceRange: [number, number];  
  setPriceRange: (range: [number, number]) => void;
}

export default async function EliteCards({selectedCategory,
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
      

      {/* Error Message */}
      {error &&
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
          <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4 bg-accent" />
          <h3 className="font-semibold text-lg text-red-500">Error in connection</h3>

        </div>
      }

      {/* Grid container for cards */}
      {!error && products.length === 0 ?
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
          <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg">No products found</h3>
          <p className="text-muted-foreground text-sm mt-1 max-w-xs">
            Try loosening your filters, adjusting your price range, or searching for something else.
          </p>
          <Button
            variant="link"
            className="mt-4"
            onClick={() => {setSelectedCategory("All"); setPriceRange([0, 350]); }}
          >
            Clear all filters
          </Button>
        </div> : <div></div>}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {
          products.map((product) => (

            <Card key={product.id} className="min-w-[260px] sm:min-w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow gap-0 py-[0px] snap-start shrink-0">

              <CardContent className="relative grid aspect-[5/4] bg-[#eef1f6] py-[5px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-3 right-3 rounded-full opacity-90 hover:opacity-100 shadow-sm"
                >
                  <Heart className="h-4 w-4 text-muted-foreground group-hover:text-destructive group-hover:fill-destructive" />
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 bg-white items-start">
                <Badge variant="secondary" className="p-2 pt-3 text-[8px] uppercase font-semibold font-bluefamily-def">
                  {product.category}
                </Badge>
                <h3 className="text-sm font-medium ">{product.name}</h3>

                <span className="flex flex-row text-sm font-medium text-foreground"><IndianRupee className="mt-1 h-3 w-3" />{product.price}</span>
                <Button size="sm" className="w-full py-[10px] bg-[#071b4b] text-[13px] font-semi font-[family:Arial,sans-serif]">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Empty State */}
      {!isLoading && products.length === 0 && !error && (
        <p className="text-gray-500">No cards loaded yet. Click the button above.</p>
      )}
    </main>
  );
}
