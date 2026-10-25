'use client';

import { useCartStore } from "@/app/store/cartStore";
import CartItems from "@/components/ui/client/cartitems";



export default function CartPage() {
    const cartStoreItems = useCartStore((state) => state.cart);
    return (
        <>
            <div className="flex justify-center lg:px-[120px]">
                <div className="w-full overflow-hidden flex-col gap-10 
                px-[10px] py-[15px] md:px-[20px] md:py-[20px] lg:px-[18px] lg:py-[20px] 
                lg:w-3/4 blue-def rounded-t-2xl">
                    <div id="head" className="flex flex-col gap-5 px-2 pb-2">
                        <h1 className="font-whitefamily-def-H12 font-semibold">Your Cart ({cartStoreItems.length} Items)</h1>
                    </div>
                    <div className="shadow-border-def bg-white">
                        <CartItems></CartItems>
                    </div>

                </div>
            </div>
        </>
    );
}
