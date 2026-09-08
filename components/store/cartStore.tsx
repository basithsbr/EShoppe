import { create } from 'zustand';

interface CartState {
    cart: any[];
    addToCart: (product: any) => void;
    getCartCount: () => number;
    removeItemInCard: (itemIndex: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    removeItemInCard: (itemIndex: number) => set((state) => {
        const updatedCart = state.cart.filter((_, index) => index !== itemIndex);
        console.log("cart - ",updatedCart.length)
        return { cart: updatedCart };
    }),
    getCartCount: () => get().cart.length,
}));
