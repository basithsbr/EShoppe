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
    const query = searchTerm.toLowerCase().trim();

    const results = allProducts.filter((product) => {
      const matchesSearch = query ? product.category.toLowerCase().includes(query) : true;
      const matchesCategory = category !== 'all' ? product.category === category : true;
      return matchesSearch && matchesCategory;
    });

    set({ filteredProducts: results });
  }
}));