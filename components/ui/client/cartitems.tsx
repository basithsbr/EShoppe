'use client'

import { useCartStore } from "@/app/store/cartStore";
import { Button, Separator, Slider } from "@base-ui/react";
import { Icon, SeparatorVertical, SlidersHorizontal, X } from "lucide-react";
import React, { useEffect } from "react";
import CartAmount from "./cartamount";
import ContactDetails from "./contactdetails";

interface Props {
    cartItems: any[]
}

export default function CartItems() {
    const cartStoreItems = useCartStore((state) => state.cart);
    const removeItemInCard = useCartStore((state) => state.removeItemInCard);
    const [cartItems, setCartItems] = React.useState(cartStoreItems);
    const [hasHydrated, setHydrated] = React.useState<boolean>(false);
    const cartAmount = useCartStore((state) => state.getCartAmount());
    console.log("cartItems ",cartItems.length)
    const removeItem = (itemIndex: number) => {
        console.log("remove item - ", itemIndex);
        removeItemInCard(itemIndex);
        console.log("cartStoreItems - ", cartStoreItems.length);
        setCartItems((prevItems) =>
            // console.log("test")
            prevItems.filter((_, idx) => idx !== itemIndex)

        );
    }

    React.useEffect(() => {
        // setCartItems(useCartStore((state) => state.cart));
        setHydrated(true);
        console.log("Effect called...");
    },[])

    if (!hasHydrated) {
        return <div>Loading cart...</div>; 
    }
    
    return (
        
        <div className="flex flex-col gap-5">            
            <div className="flex lg:flex-row md:flex-row flex-col shrink-0 gap-5 lg:gap-15">
                <div className="flex flex-col gap-15 lg:w-1/2 md:w-2/3">
                    {
                        cartStoreItems && cartStoreItems.length > 0 ? (
                            <>
                                <div className="flex flex-col gap-5">
                                    {cartStoreItems.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-5">
                                            <div className="w-full text-right">
                                                <button key={index} onClick={() => removeItem(index)}
                                                    className="close-btn cursor-pointer">
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <div key={index} className="flex flex-row gap-5">

                                                <div className="w-[150px] h-[150px] flex-1">
                                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col gap-2 w-1/3 py-3">
                                                    <h3 className="font-bluefamily-def-H2 font-semibold">{item.category}</h3>
                                                    {/* <h3 className="font-bluefamily-def-H2 font-semibold">{item.name}</h3> */}
                                                    <p className="font-bluefamily-def-H3">Size: {item.size}</p>
                                                    <p className="font-bluefamily-def-H3">Price: ₹{item.price}</p>
                                                    <p className="font-bluefamily-def-H3">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    ))}
                                </div>

                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
                                <h3 className="font-semibold text-lg">No items in the cart</h3>
                                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                                    Your cart is currently empty. Start adding items to your cart and they will appear here.
                                </p>
                            </div>
                        )
                    }
                </div>
                <div className="vertical-line-def" aria-hidden="true" />
                {
                    <CartAmount amount={cartAmount}></CartAmount>
                }
            </div>
            <div className="horizontal-line-def"></div>
            <ContactDetails></ContactDetails>
            <div className="w-full text-right">
                {
                    cartStoreItems && cartStoreItems
                        .length > 0 ? (
                        <div>
                            <button className="button-def">
                                Proceed to Pay
                            </button>
                        </div>
                    ) : ''
                }

            </div>
        </div>
    );
}