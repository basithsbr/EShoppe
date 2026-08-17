"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  // Helper function to check if the route matches
  const getLinkClass = (path: string) => {
    return cn(
      "text-sm font-medium transition-colors font-bluefamily-def hover:font-redfamily-def",
      // If current path matches, apply the active text color
      pathname === path ? "font-redfamily-def" : "text-muted-foreground"
    )
  }
  return (
    <>
    <div className="text-center p-1 h-7 text-[12px] bg-[#071b4b] text-white">
            Premium Quality • Trusted Since 1984 • Shipping Across India
        </div>
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        
      <div className=" px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Mobile Navigation Trigger */}
         <div className="flex items-center gap-2 md:hidden">
          {/* <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
                <Link href="/shop" className="text-sm font-medium hover:text-primary">Shop</Link>
                <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
              </nav>
            </SheetContent>
          </Sheet> */}
          <Link href="/" className="font-bold text-lg tracking-tight">EliteShoppe</Link>
        </div>

        {/* Desktop Brand Logo */}
        <Link href="/" className="hidden md:block font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
          EliteShoppe
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={getLinkClass("/")}>Home</Link>
          <Link href="/shoppe" className={getLinkClass("/shoppe")}>Shop</Link>
          <Link href="/about" className="text-sm font-medium font-bluefamily-def active:font-redfamily-def hover:text-foreground transition-colors">About</Link>
        </nav>

        {/* Search Bar & Action Buttons */}
        <div className="flex items-center gap-4 flex-1 md:flex-initial max-w-md w-full justify-end">
          <div className="relative w-full hidden sm:block max-w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search store..." className="pl-8 h-9" />
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Heart className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 relative ml-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

      </div>
    </header>
    </>
  );
}
