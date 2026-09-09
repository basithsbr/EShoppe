import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartState {
    cart: any[];
    // addToCart: (product: any) => void;
    addToCart: (item: any) => void;
    getCartCount: () => number;    
    removeItemInCard: (itemIndex: number) => void
    clearCart: () => void;
    getCartAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set,get) => (
            {
                cart: [],
                addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
                clearCart: () =>
                    set({ cart: [] }),
                removeItemInCard: (itemIndex: number) => set((state) => {
                    const updatedCart = state.cart.filter((_, index) => index !== itemIndex);
                    console.log("cart - ", updatedCart.length)
                    return { cart: updatedCart };
                    //     }),
                }),
                getCartCount: () => get().cart.length,
                getCartAmount : () => get().cart.reduce((total, item) => {
                    console.log("item.price - ",item.price)
                    // console.log("total - ",total)
                    return total + Number(item.price);
                },0)
            }
        ),        
        {
            name: 'elite-cart-storage', // Key name in localStorage
        }
    ));
