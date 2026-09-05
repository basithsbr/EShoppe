import { create } from 'zustand';

interface CartState {
    cart: any[];
    addToCart: (product: any) => void;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    getCartCount: () => get().cart.length,
}));
