'use client';

import { useCartStore } from "@/components/store/cartStore";
import CartItems from "@/components/ui/client/cartitems";



export default function CartPage() {
    
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full overflow-hidden flex-col gap-10 
        px-[10px] py-[30px] md:px-[20px] md:py-[30px] lg:px-[70px] lg:py-[30px] lg:w-3/4">
                    <div id="head" className="flex flex-col gap-5">
                        <h1 className="text-[#071b4b] font-bold lg:text-[20px] text-[20px] md:text-[5vw] leading-[1.1]">Cart Items</h1>
                    </div>
                    <div className="shadow-border-def mt-5">
                        <CartItems></CartItems>
                    </div>

                </div>
            </div>
        </>
    );
}
