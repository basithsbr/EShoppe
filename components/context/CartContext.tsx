
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    // Adds the new product to the current array of cart items
    setCart((prevCart) => [...prevCart, product]);
  };

  // Derived count to show in your Header
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}