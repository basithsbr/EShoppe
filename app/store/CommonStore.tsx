import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchAll } from '@/app/services/clientservices';

interface CartState {
  cart: any[];
  // addToCart: (product: any) => void;
  addToCart: (item: any) => void;
  getCartCount: () => number;
  removeItemInCard: (itemIndex: number) => void
  clearCart: () => void;
  getCartAmount: () => number;
  updateCart: (itemIndex: number, item: any) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => (
      {
        cart: [],
        addToCart: (item) => set((state) => ({
          cart: [...(Array.isArray(state.cart) ? state.cart : []), item]
        })),
        clearCart: () =>
          set({ cart: [] }),
        removeItemInCard: (itemIndex: number) => set((state) => {
          const updatedCart = state.cart.filter((_, index) => index !== itemIndex);
          console.log("cart - ", updatedCart.length)
          return { cart: updatedCart };
          //     }),
        }),
        getCartCount: () => {
          const cart = get().cart;
          return Array.isArray(cart) ? cart.length : 0;
        },

        getCartAmount: () => {
          const cart = get().cart;
          
          const retAmt =  Array.isArray(cart) && cart.length > 0 ? cart.reduce((total, item) => {
            if (!item || item.price === undefined || item.price === null) {
              return total;
            }
            
            const itemQty = item.qty ?? 1;
            return total + (Number(item.price) * itemQty);
          },0) : 0;
          console.log("retAmt : ",retAmt);
          return retAmt;
        },

        updateCart: (itemIndex, itemUpdate) => set((state) => {
          const cartItem = state.cart.map((item, index) => {
            return index === itemIndex ? { ...item, qty: itemUpdate.qty } : item;
          });
          console.log("cartItem : ", cartItem)
          return { cart: cartItem }
        })
      }
    ),
    {
      name: 'elite-cart-storage', // Key name in localStorage
    }
  ));

interface ProductState {
  allProducts: any[]
  filteredProducts: any[]
  isLoading: boolean
  fetchCatalog: () => Promise<void>
  filterProducts: (searchTerm: string, category?: string) => void
  isSearchOpen: boolean
  setSearchOpen: (isOpen: boolean) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  isLoading: false,
  isSearchOpen: false,

  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  // Fetch the full catalog once on app load
  fetchCatalog: async () => {
    console.log("fetchCatalog - ");
    if (get().allProducts.length > 0) return; // Already loaded

    set({ isLoading: true });
    try {
      // You can store this JSON statically on Vercel or Cloudflare R2

      const res = await fetchAll();
      const data = await res.json();
      set({ allProducts: data, filteredProducts: data, isLoading: false });
    } catch (error) {
      console.error("Failed to load catalog", error);
      set({ isLoading: false });
    }
  },

  // High-speed client side search and filter function
  filterProducts: (searchTerm: string, category = 'all') => {
    const { allProducts } = get();
    console.log("searchTerm - ", searchTerm);
    if (searchTerm === ' ') {
      set({ filteredProducts: [] });
      return;
    }
    const query = searchTerm.toLowerCase().trim();

    const results = allProducts.filter((product) => {
      const matchesSearch = query ? product.category.toLowerCase().includes(query) : true;
      const matchesCategory = category !== 'all' ? product.category === category : true;
      return matchesSearch && matchesCategory;
    });

    set({ filteredProducts: results });
  }
}));