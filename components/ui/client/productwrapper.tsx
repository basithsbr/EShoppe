'use client'


import React from "react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../sheet"
import { Button } from "@base-ui/react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer" 
import { ProductDetails } from "./productdetails"
import Link from "next/link"

interface Props {
    children: React.ReactNode,
    product: any
}
export function ProductWrapper({ product, children }: Props) {
    const [sheetOpen, setSheetOpen] = React.useState<boolean>(false);
    const handleSheetOpen = (sheetOpen: boolean) => {
        setSheetOpen(true);
    }

    return (
        <>
            
                <div className="cursor-pointer">                    
                    <Link href={`/product/${product._id}`} className="cursor-pointer">
                        {children}
                    </Link>
                </div>
                <div onClick={() => handleSheetOpen(true)} className="cursor-pointer md:hidden lg:hidden">                    
                    {children}
                </div>
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>                    
                    <SheetContent className="w-full md:w-3/3 lg:w-3/4 h-7/8! lg:h-7/8! md:h-7/8! max-h-none! left-1/2! -translate-x-1/2 rounded-t-2xl" side="bottom">
                        <ProductDetails product={product}></ProductDetails>
                    </SheetContent>                
                </Sheet>
            
        </>
    )
}