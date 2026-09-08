'use client'

import { useCartStore } from "@/components/store/cartStore";
import { Button } from "@base-ui/react";
import { Icon, X } from "lucide-react";
import React, { useEffect } from "react";

interface Props {
    cartItems: any[]
}

export default function CartItems() {
    const cartStoreItems = useCartStore((state) => state.cart);
    const removeItemInCard = useCartStore((state) => state.removeItemInCard);
    const[cartItems, setCartItems] = React.useState(cartStoreItems);
    const removeItem = (itemIndex: number) => {
        console.log("remove item - ",itemIndex);
        removeItemInCard(itemIndex);
        console.log("cartStoreItems - ",cartStoreItems.length);
        setCartItems((prevItems) => 
                // console.log("test")
                prevItems.filter((_, idx) => idx !== itemIndex)
            
        );           
    }
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-15">
                {
                    cartItems && cartItems.length > 0 ? (
                        <>
                            <div className="flex flex-col gap-5">
                                {cartItems.map((item, index) => (
                                    <div key={index}>
                                    <div className="w-full text-right">
                                            <button key={index} onClick={() => removeItem(index)}  
                                            className="close-btn cursor-pointer">
                                                    <X size={20} />
                                            </button>
                                    </div>
                                    <div key={index} className="flex flex-row justify-around">
                                        
                                        <div className="w-[100px] h-[100px]">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col gap-2">                                            
                                            <h3 className="font-bold">{item.category}</h3>
                                            <h3 className="font-bold">{item.name}</h3>
                                            <p>Price: ₹{item.price}</p>
                                            <p>Qty: {item.quantity}</p>
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
            <div className="w-full text-right">
                {
                    cartItems && cartItems
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