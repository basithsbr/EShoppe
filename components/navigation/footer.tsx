
'use client'
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import { FilterController } from "../ui/client/filtercontrols";

export function Footer() {
  const searchParams = Promise<{ [key: string]: string | string[] | undefined }>;
  const currentYear = new Date().getFullYear();
  const pathname = usePathname()
  const shopPage = pathname === '/shoppe' || pathname === '/shoppe/'
  const homePage = pathname === '/' || pathname === '/'
  const helpPage = pathname === '/help' || pathname === '/help/'
  // const router = useRouter();

  // const isShoppeActive = pathname === '/shoppe' || pathname === '/shoppe/';
  // const [page, setPage] = React.useState<string>("")
  // const getLinkClass = (path: string) => {
  //   // setPage(page);
  //   return cn(
  //     "text-sm font-medium transition-colors font-bluefamily-def hover:font-redfamily-def",
  //     // If current path matches, apply the active text color      
  //     pathname === path ? "text-sm font-medium hover:text-primary font-redfamily-def blue-def" : "text-muted-foreground",
  //   )
  // }
  return (
    <>
      <footer className="w-full border-t bg-card text-card-foreground mt-auto text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#071b4b] text-white" >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg tracking-tight">EliteShoppe</h3>
              <p className="text-sm text-[#aeb9ce] max-w-xs leading-relaxed">
                Curating premium modern goods designed to elevate your daily architectural lifestylea.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3" >
              <h4 className="text-xs font-semibold uppercase tracking-wider ">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/shop" className="text-[#aeb9ce] hover:underline  hover:text-foreground">All Catalog</Link></li>
                <li><Link href="/shop?cat=electronics" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Electronics</Link></li>
                <li><Link href="/shop?cat=accessories" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Accessories</Link></li>
              </ul>
            </div>

            {/* Column 3: Corporate Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider ">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-[#aeb9ce] hover:underline  hover:text-foreground">About Us</Link></li>
                <li><Link href="/careers" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Careers</Link></li>
                <li><Link href="/privacy" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Customer Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider ">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Contact Us</Link></li>
                <li><Link href="/faq" className="text-[#aeb9ce] hover:underline  hover:text-foreground">FAQs & Help</Link></li>
                <li><Link href="/shipping" className="text-[#aeb9ce] hover:underline  hover:text-foreground">Tracking</Link></li>
              </ul>
            </div>

          </div>

          <Separator className="my-8" />

          {/* Copyright notice row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ">
            <p>&copy; {currentYear} EliteShoppe Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="flex flex-row w-full  sticky bottom-0 left-0 right-0 md:hidden bg-white shadow-lg border-t border-gray-200 z-50">
        {/* <button 
        className="w-full flex items-center justify-center h-14 text-black text-sm font-medium border active:bg-[#aba2a2] active:scale-95 transition-all"> */}
        {/* // className={`w-full flex items-center justify-center h-14 text-black text-sm font-medium border active:bg-[#aba2a2] active:scale-95 transition-all */}
        {/* // ${page === 'home' ? 'border-black' : 'border-transparent'}`} */}
        <button
          className={`w-full flex items-center justify-center h-14 text-black text-sm font-medium border active:bg-[#aba2a2] active:scale-95 transition-all
        ${homePage ? 'border-t-[#071b4b] border-5' : 'border-transparent'}`}>
          {/* <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link> */}
          {/* <Link href="/" className={getLinkClass("/")}>Home</Link> */}
          <Link href="/">Home</Link>
        </button>

        <button className={`w-full flex items-center justify-center h-14 text-black text-sm font-medium border active:bg-[#aba2a2] active:scale-95 transition-all
        ${shopPage ? 'border-t-[#071b4b] border-5' : 'border-transparent'}`}>
          {/* <Link href="/shoppe" className={getLinkClass("/shoppe/")}>Products</Link> */}
          <Link href="/shoppe">Products</Link>
        </button>

        {/* <Link href="/shoppe" className="text-sm font-medium hover:text-primar
        {/* <Link href="/shoppe" className={getLinkClass("/shoppe/")}>Products</Link> */}

        <button className={`w-full flex items-center justify-center h-14 text-black text-sm font-medium border active:bg-[#aba2a2] active:scale-95 transition-all
        ${helpPage ? 'border-t-[#071b4b] border-5' : 'border-transparent'}`}>
          <Link href="/" className="text-sm font-medium hover:text-primary">Help</Link>
        </button>        
        <div className="flex items-center px-4">
        <FilterController>
        </FilterController>
      </div>
      </div>
      
    </>
  );
}
