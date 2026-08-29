// import { useRef } from "react";
import {
    Heart,
    Layers,
    LayoutGrid,
    SlidersHorizontal,
    Search,
    ShoppingBag,
    Star
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
import { GenericChild } from "@/components/ui/genericChild";
import { Suspense } from "react";
import Link from 'next/link';
import { ShowCardsScrollH } from "@/components/ui/server/cardsscrollH";
import ServerCard from "@/components/ui/server/productscards";


interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function homePage({ searchParams }: PageProps) {
    const categories = ['Gadgets', 'Clothing', 'Accessories', 'Cosmetics', 'Jerseys', 'Abaya & Hijab', 'Household', 'Toys', 'Games', 'Women\'s Wear', 'Footwear', 'Hampers', 'Magazines', 'Frames']
    const selectCategory = (category: any) => {

    }
    return (
        <>

            <div className="flex flex-col md:flex-col lg:flex-row  md:justify-between gap-5  py-10 px-5 lg:px-[70px]">
                <div className="flex flex-col w-full align-items-center justify-center md:justify-center lg:justify-center gap-2">
                    <div className="font-black text-[#e91e63] text-[11px] tracking-[1px] font-[Arial,sans-serif]">
                        CAREEMSTORE RESELLER
                    </div>
                    <h1 className="mt-5 text-[#071b4b] font-bold lg:text-[60px] font-[Arial,sans-serif] text-[40px] md:text-[6vw] leading-[1.1]">Everything you need.
                        <br />
                        <span className="text-[#e91e63] font-bold mb-8">One trusted Store.</span>
                    </h1>

                    <p className=" text-lg   mr-5 mb-8 font-[Arial,sans-serif] text-[#667085] line-height-[1.7]" >
                        Gadgets, clothing, jerseys, accessories, footwear, home essentials and more.</p>

                    <Link
                        href="/shoppe"
                        className="flex items-center justify-center  text-[12px] blue-def font-family-def h-10 w-32 font-black rounded-[10px] text-white hover:bg-[#d81b60] transition-colors"
                    >
                        Shop Now
                    </Link>


                </div>

                <div className=" py-25 md:py-50  w-full flex flex-col items-center justify-center 
                     items-center justify-center bg-[#071b4b] rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <small className="text-white text-[17px] font-[family:Arial,sans-serif]">Since</small>
                    <strong className="text-white text-[90px] font-[family:Arial,sans-serif]">1984</strong>
                    <span className="text-white text-[17px] font-[family:Arial,sans-serif]">Collaborate • Create • Grow Together</span>
                </div>

            </div>
            <div id="section1" className="grid flex-col gap-15 py-10 px-5 lg:px-[70px]">
                <div id="head" className="grid flex-col gap-5">
                    <div className="text-[#e91e63] font-black text-[11px] font-[Arial,sans-serif] tracking-[2px] ">EXPLORE</div>
                    <h1 className="text-[#071b4b] font-bold lg:text-[30px] text-[30px] md:text-[5vw] leading-[1.1]">Shop by Category</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5" id="cats">
                    {/* onClick={() => choose('Gadgets')} */}
                    {categories.map((category, i) =>
                    (
                        <Link
                            key={category}
                            href={`/shoppe?category=${category}`}
                            className="btn-category inline-block text-center"
                        >
                            {category}
                        </Link>
                    ))
                    }

                </div>
            </div>

            {/* </div> */}
            <div id="section2" className="w-full overflow-hidden bg-[#f5f7fb] flex-col gap-10 px-[10px] py-[40px] md:px-[20px] md:py-[50px] lg:px-[70px] lg:py-[50px] ">
                <div id="head" className="grid flex-col gap-5">
                    <div className="text-[#e91e63] font-black text-[12px] font-[Arial,sans-serif] tracking-[2px] ">CURATED FOR YOU</div>
                    <h1 className="text-[#071b4b] font-bold lg:text-[30px] text-[30px] md:text-[5vw] leading-[1.1]">Products</h1>
                </div>

                <Suspense>
                    <ShowCardsScrollH searchParams={searchParams} type="new">
                        <ServerCard searchParams={searchParams} />
                    </ShowCardsScrollH>
                </Suspense>
                {/* Parent wrapper with px-6 to offset absolute buttons */}

                <div className="w-full px-2 py-1">
                    <Card className="blue-def">
                        <CardContent >
                            <div className="flex flex-col md:flex-row lg:flex-row justify-between p-4 gap-8">
                                <div className="flex flex-col gap-4">
                                    <div className="font-black text-[#e91e63] text-[11px] tracking-[1px] font-[Arial,sans-serif]">
                                        CAREEMSTORE
                                    </div>
                                    <h1 className="text-white font-bold 
                                lg:text-[25px] font-[Arial,sans-serif]
                                 text-[25px] md:text-[6vw] leading-[1.1]">
                                        New drops. Smart deals. Trusted service.
                                    </h1>

                                    <p className="text-white text-[19px] line-height-[1.7]" >
                                        Online payment only • COD not available</p>
                                </div>
                                <div className="content-end">
                                    {/* <button
                                        className="
                                        text-sm text-[12px] red-def font-[sans-serif] h-10 
                                        w-32 font-black rounded-[10px] text-white hover:bg-[#d81b60] transition-colors"
                                        onClick={() => window.location.href = '/shoppe'}
                                    >
                                        
                                        Explore
                                    </button> */}

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    );
}