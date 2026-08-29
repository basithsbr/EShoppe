

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
  minPrice: number;
  maxPrice: number;
}

export default async function EliteCardsServer({ selectedCategory,
  minPrice, maxPrice }: FilterProps) {

  let products: Product[] = [];
  let errorMsg: string | null = null;

  try {
    // 1. Append params directly to the backend URL on the server side
    const url = `https://typicode.com{category}`;
    const res = await fetch(url, { cache: "no-store" }); // Ensure live SSR on every request

    if (!res.ok) throw new Error("Backend could not verify product data.");
    const data = await res.json();

    // 2. Parse mock database items matching the constraints
    // products = data.map((item: any) => ({
    //   id: item.id,
    //   name: item.title.substring(0, 20),
    //   category: category === "All" ? "Tech" : category,
    //   price: Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
    //   image: "https://unsplash.com"
    // }));
  } catch (err: any) {
    errorMsg = err.message || "Something went wrong.";
  }




  return (
    <main className="max-w-6xl mx-auto">

      {!errorMsg && products.length === 0 && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
          <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg">No products found</h3>
          <p className="text-muted-foreground text-sm mt-1 max-w-xs">
            Try loosening your filters, adjusting your price range, or searching for something else.
          </p>
        </div>
      )}

      {/* Handle Error State Inline */}
      {errorMsg && (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
          <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4 bg-accent" />
          <h3 className="font-semibold text-lg text-red-500">Error in connection</h3>
        </div>
      )}

      {!errorMsg && products.length > 0 &&
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
      }
    </main>
  );
}
