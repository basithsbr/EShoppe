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

// Mock Product Data
const PRODUCTS = [
  { id: 1, name: "Minimalist Leather Watch", category: "Accessories", price: 189, rating: 4.8, image: "https://unsplash.com" },
  { id: 2, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 299, rating: 4.9, image: "https://unsplash.com" },
  { id: 3, name: "Ergonomic Mechanical Keyboard", category: "Electronics", price: 145, rating: 4.7, image: "https://unsplash.com" },
  { id: 4, name: "Waterproof Travel Backpack", category: "Bags", price: 95, rating: 4.5, image: "https://unsplash.com" },
  { id: 5, name: "Premium Scented Candle Set", category: "Home", price: 42, rating: 4.6, image: "https://unsplash.com" },
  { id: 6, name: "Full-Grain Leather Wallet", category: "Accessories", price: 65, rating: 4.4, image: "https://unsplash.com" }
];

const CATEGORIES = ["All", "Accessories", "Electronics", "Bags", "Home"];

export default function ShopPage() {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 350]);
  const [sortBy, setSortBy] = React.useState<string | null>("featured");

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Reusable Filter Sidebar
  const FilterControls = () => (
    <div className="w-full flex flex-col gap-4">
      <div>
        <h3 className="text-sm tracking-tight text-[#e91e63] font-[Arial,sans-serif] mb-3 ml-2">Categories</h3>
        <div className="space-y-2 space-x-2 flex flex-col">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

      <Separator />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold font-bluefamily-def text-[12px]">Price Range</h3>
          <span className="text-xs text-muted-foreground">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <Slider
          min={0}
          max={350}
          step={10}
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          className="py-2"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="px-4 md:px-6 lg:px-8 py-8">

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

            <Select value={sortBy} onValueChange={setSortBy}>
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
            <Sheet >
              <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" />}>
                <SlidersHorizontal className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent side="left" className="!w-screen !max-w-none sm:!max-w-sm h-full">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <FilterControls />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 ">
          {/* Desktop Sidebar Layout */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-6 border p-5 rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 mb-4 font-semibold text-sm uppercase tracking-wider tracking-tight text-[#071b4b] font-[Arial,sans-serif]">
                <Layers className="h-4 w-4" />
                Filters
              </div>
              <FilterControls />
            </div>
          </aside>

          {/* Product Cards Container */}
          <main className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
                <LayoutGrid className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No products found</h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                  Try loosening your filters, adjusting your price range, or searching for something else.
                </p>
                <Button
                  variant="link"
                  className="mt-4"
                  onClick={() => { setSearch(""); setSelectedCategory("All"); setPriceRange([0, 350]); }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                  </Card>))}
              </div>
            )}
          </main>
        </div>
      </div>

      <br />
      <br />
      <br />
    </>
  );
}
