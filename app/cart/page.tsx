'use client';

import { useCartStore } from "@/app/store/cartStore";
import CartItems from "@/components/ui/client/cartitems";



export default function CartPage() {
    const cartStoreItems = useCartStore((state) => state.cart);
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full overflow-hidden flex-col gap-10 
                px-[10px] py-[30px] md:px-[20px] md:py-[30px] lg:px-[70px] lg:py-[30px] lg:w-3/4">
                    <div id="head" className="flex flex-col gap-5 px-2 pb-2">
                        <h1 className="font-bluefamily-def-H2 font-semibold">Your Cart ({cartStoreItems.length} Items)</h1>
                    </div>
                    <div className="shadow-border-def">
                        <CartItems></CartItems>
                    </div>

                </div>
            </div>
        </>
    );
}
